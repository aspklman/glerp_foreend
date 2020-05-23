<template>
  <div class="page-header-index-wide">

    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
                @change="changeTab">
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a-radio-group :value="value" button-style="solid">
                <a-radio-button @click="getCustRevOdrQty('today')" value="today">今日</a-radio-button>
                <a-radio-button @click="getCustRevOdrQty('week')" value="week">本周</a-radio-button>
                <a-radio-button @click="getCustRevOdrQty('month')" value="month">本月</a-radio-button>
                <a-radio-button @click="getCustRevOdrQty('year')" value="year">本年</a-radio-button>
              </a-radio-group>
            </div>
            <a-range-picker @change="getCustRevOdrQty" :style="{width: '256px'}" :value="rangePickerValue"/>
          </div>
          <a-tab-pane loading="true" tab="客户" key="1">
            <a-row>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <bar
                  title="订单数量"
                  :dataSource="custOdrQty"
                  yaxisText="订单数量"
                  :height="height"/>
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <pie
                  title="订单比率"
                  :dataSource="custOdrQtyPercent"
                  :height="height"/>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="品牌" key="2">
            <a-row>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <bar
                  title="订单数量"
                  :dataSource="brandOdrQty"
                  yaxisText="订单数量"
                  :height="height"/>
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <pie
                  title="订单比率"
                  :dataSource="brandOdrQtyPercent"
                  :height="height"/>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="型体" key="3">
            <a-row>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <bar
                  title="订单数量"
                  :dataSource="styleOdrQty"
                  yaxisText="订单数量"
                  :height="height"/>
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <pie
                  title="订单比率"
                  :dataSource="styleOdrQtyPercent"
                  :height="height"/>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="目的地" key="4">
            <a-row>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <bar
                  title="订单数量"
                  :dataSource="destOdrQty"
                  yaxisText="订单数量"
                  :height="height"/>
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <pie
                  title="订单比率"
                  :dataSource="destOdrQtyPercent"
                  :height="height"/>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

  </div>
</template>

<script>
    import ChartCard from '@/components/ChartCard'
    import ACol from "ant-design-vue/es/grid/Col"
    import ATooltip from "ant-design-vue/es/tooltip/Tooltip"
    import MiniArea from '@/components/chart/MiniArea'
    import MiniBar from '@/components/chart/MiniBar'
    import MiniProgress from '@/components/chart/MiniProgress'
    import RankList from '@/components/chart/RankList'
    import Bar from '@/components/chart/Bar'
    import Pie from '@/components/chart/Pie'
    import LineChartMultid from '@/components/chart/LineChartMultid'
    import HeadInfo from '@/components/tools/HeadInfo.vue'

    import Trend from '@/components/Trend'
    import AreaChartTy from '../../components/chart/AreaChartTy'
    import Radar from '../../components/chart/Radar'
    import Liquid from '../../components/chart/Liquid'
    import DashChartDemo from '../../components/chart/DashChartDemo'
    import BarMultid from '../../components/chart/BarAndLine'
    import {getAction, postAction, deleteAction} from '../../api/manage'
    import {dateFormat} from "../../components/_util/dateFormat";

    export default {
        name: "OrderAnalyzeList",
        components: {
            BarMultid,
            DashChartDemo,
            Liquid,
            Radar,
            Pie,
            AreaChartTy,
            ATooltip,
            ACol,
            ChartCard,
            MiniArea,
            MiniBar,
            MiniProgress,
            RankList,
            Bar,
            Trend,
            LineChartMultid,
            HeadInfo,
            getAction,
            postAction,
            deleteAction
        },
        data() {
            return {
                loading: true,
                center: null,
                height: 254,
                selectedTab: 1,   //默认选择tab1
                odrQty: [],
                custOdrQty: [],
                brandOdrQty: [],
                styleOdrQty: [],
                destOdrQty: [],
                odrQtyPercent: [],
                custOdrQtyPercent: [],
                brandOdrQtyPercent: [],
                styleOdrQtyPercent: [],
                destOdrQtyPercent: [],
                value: 'today',
                rangePickerValue: [],
                url: {
                    getCustRevOdrQty: '/order/orderAnalyze/getCustRevOdrQty',
                    getBrandRevOdrQty: '/order/orderAnalyze/getBrandRevOdrQty',
                    getStyleRevOdrQty: '/order/orderAnalyze/getStyleRevOdrQty',
                    getDestRevOdrQty: '/order/orderAnalyze/getDestRevOdrQty',
                },
            }
        },

        mounted() {
            this.getCustRevOdrQty(this.value)
        },

        methods: {
            changeTab(e) {
                this.selectedTab = e
                this.custOdrQty = []
                this.custOdrQtyPercent = []
                this.brandOdrQty = []
                this.brandOdrQtyPercent = []
                this.styleOdrQty = []
                this.styleOdrQtyPercent = []
                this.destOdrQty = []
                this.destOdrQtyPercent = []
                this.getCustRevOdrQty(this.value)
            },

            // 按客户、接单日期（今日、本周、本月、本年)查询订单数量
            getCustRevOdrQty(dates) {
                this.value = dates;
                let tempUrl = "";
                let datekind = {};
                if (dates == 'today' || dates == 'week' || dates == 'month' || dates == 'year') {
                    datekind.name = dates;
                    this.rangePickerValue = [];
                } else {
                    let dateStart = dateFormat('yyyyMMdd', new Date(dates[0]))
                    let dateEnd = dateFormat('yyyyMMdd', new Date(dates[1]))
                    datekind.name = dateStart + ',' + dateEnd;
                    this.rangePickerValue = dates;
                }
                if (this.selectedTab == 1) {
                    tempUrl = this.url.getCustRevOdrQty;
                } else if (this.selectedTab == 2) {
                    tempUrl = this.url.getBrandRevOdrQty;
                } else if (this.selectedTab == 3) {
                    tempUrl = this.url.getStyleRevOdrQty;
                } else if (this.selectedTab == 4) {
                    tempUrl = this.url.getDestRevOdrQty;
                }
                getAction(tempUrl, {datekind: datekind}).then((res) => {
                    if (res.success) {
                        this.odrQty = JSON.parse(JSON.stringify(res.result).replace(/nm/g, "x").replace(/odr_qty/g, "y"));
                        this.odrQtyPercent = JSON.parse(JSON.stringify(res.result).replace(/nm/g, "item").replace(/odr_qty/g, "count"));
                        if (this.selectedTab == 1) {
                            this.custOdrQty = this.odrQty;
                            this.custOdrQtyPercent = this.odrQtyPercent;
                        } else if (this.selectedTab == 2) {
                            this.brandOdrQty = this.odrQty;
                            this.brandOdrQtyPercent = this.odrQtyPercent;
                        } else if (this.selectedTab == 3) {
                            this.styleOdrQty = this.odrQty;
                            this.styleOdrQtyPercent = this.odrQtyPercent;
                        } else if (this.selectedTab == 4) {
                            this.destOdrQty = this.odrQty;
                            this.destOdrQtyPercent = this.odrQtyPercent;
                        }
                    }
                    if (res.code === 510) {
                        this.$message.warning(res.message)
                    }
                    // this.loadData()
                    this.loading = false
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
  .circle-cust {
    position: relative;
    top: 28px;
    left: -100%;
  }

  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  /* 首页访问量统计 */
  .head-info {
    position: relative;
    text-align: left;
    padding: 0 32px 0 0;
    min-width: 125px;

    &.center {
      text-align: center;
      padding: 0 32px;
    }

    span {
      color: rgba(0, 0, 0, .45);
      display: inline-block;
      font-size: .95rem;
      line-height: 42px;
      margin-bottom: 4px;
    }

    p {
      line-height: 42px;
      margin: 0;

      a {
        font-weight: 600;
        font-size: 1rem;
      }
    }
  }
</style>