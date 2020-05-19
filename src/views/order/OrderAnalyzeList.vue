<template>
  <div class="page-header-index-wide">

    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}" @change="changeTab">
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a @click="getCustRevOdrQty('today')">今日</a>
              <a @click="getCustRevOdrQty('week')">本周</a>
              <a @click="getCustRevOdrQty('month')">本月</a>
              <a @click="getCustRevOdrQty('year')">本年</a>
            </div>
            <a-range-picker @change="getCustRevPeriodOdrQty" :style="{width: '256px'}" />
          </div>
          <a-tab-pane loading="true" tab="客户" key="1">
            <a-row>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <bar
                  title="订单数量"
                  :dataSource="custOdrQty"
                  yaxisText="订单数量"
                  :height="height" />
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <pie
                  title="订单比率"
                  :dataSource="custOdrQtyPercent"
                  :height="height"/>
              </a-col>
<!--              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">-->
<!--                <rank-list title="门店销售排行榜" :list="rankList"/>-->
<!--              </a-col>-->
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="品牌" key="2">
            <a-row>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <bar
                  title="订单数量"
                  :dataSource="brandOdrQty"
                  yaxisText="订单数量"
                  :height="height" />
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <pie
                  title="订单比率"
                  :dataSource="brandOdrQtyPercent"
                  :height="height"/>
              </a-col>
<!--              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">-->
<!--                <rank-list title="门店销售排行榜" :list="rankList"/>-->
<!--              </a-col>-->
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="型体" key="3">
            <a-row>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <bar
                  title="订单数量"
                  :dataSource="styleOdrQty"
                  yaxisText="订单数量"
                  :height="height" />
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <pie
                  title="订单比率"
                  :dataSource="styleOdrQtyPercent"
                  :height="height"/>
              </a-col>
<!--              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">-->
<!--                <rank-list title="门店销售排行榜" :list="rankList"/>-->
<!--              </a-col>-->
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
  import { getLoginfo,getVisitInfo } from '@/api/api'
  import AreaChartTy from '../../components/chart/AreaChartTy'
  // import Pie from '../../components/chart/Pie'
  import Radar from '../../components/chart/Radar'
  import Liquid from '../../components/chart/Liquid'
  import DashChartDemo from '../../components/chart/DashChartDemo'
  import BarMultid from '../../components/chart/BarAndLine'
  import { getAction, postAction, deleteAction } from '../../api/manage'

  const rankList = []
  for (let i = 0; i < 7; i++) {
    rankList.push({
      name: '白鹭岛 ' + (i+1) + ' 号店',
      total: 1234.56 - i * 100
    })
  }
  const barData = []
  for (let i = 0; i < 12; i += 1) {
    barData.push({
      x: `${i + 1}月`,
      y: Math.floor(Math.random() * 1000) + 200
    })
  }
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
        rankList,
          height: 500,
        selectedTab: 1,   //默认选择tab1
        // odrQty: [
        //   {x: "卡洛驰", y: 88888},
        //   {x: "迪卡侬", y: 99999},
        //   {x: "莘威", y: 66666},
        //   {x: "迪士尼", y: 55555},
        // ],
        odrQty: [],
        custOdrQty: [],
        brandOdrQty: [],
        styleOdrQty: [],
        // odrQtyPercent: [
        //   {item: "卡洛驰", count: 88888},
        //   {item: "迪卡侬", count: 99999},
        //   {item: "莘威", count: 66666},
        //   {item: "迪士尼", count: 55555},
        // ],
        odrQtyPercent: [],
        custOdrQtyPercent: [],
        brandOdrQtyPercent: [],
        styleOdrQtyPercent: [],
        url: {
          getCustRevByToday: '/order/orderAnalyze/getCustRevByToday',
          getBrandRevByToday: '/order/orderAnalyze/getBrandRevByToday',
          getStyleRevByToday: '/order/orderAnalyze/getStyleRevByToday',
          getCustRevByWeek: '/order/orderAnalyze/getCustRevByWeek',
          getBrandRevByWeek: '/order/orderAnalyze/getBrandRevByWeek',
          getStyleRevByWeek: '/order/orderAnalyze/getStyleRevByWeek',
          getCustRevByMonth: '/order/orderAnalyze/getCustRevByMonth',
          getBrandRevByMonth: '/order/orderAnalyze/getBrandRevByMonth',
          getStyleRevByMonth: '/order/orderAnalyze/getStyleRevByMonth',
          getCustRevByYear: '/order/orderAnalyze/getCustRevByYear',
          getBrandRevByYear: '/order/orderAnalyze/getBrandRevByYear',
          getStyleRevByYear: '/order/orderAnalyze/getStyleRevByYear',
          getCustRevByPeriod: '/order/orderAnalyze/getCustRevByPeriod',
          getBrandRevByPeriod: '/order/orderAnalyze/getBrandRevByPeriod',
          getStyleRevByPeriod: '/order/orderAnalyze/getStyleRevByPeriod',
        },
        barData,
        loginfo:{},
        visitFields:['ip','visit'],
        visitInfo:[],
        indicator: <a-icon type="loading" style="font-size: 24px" spin />,
      }
    },
    created() {
      setTimeout(() => {
        this.loading = !this.loading
      }, 1000)
      this.initLogInfo();
    },

    mounted() {
        // this.getCustRevOdrQty("month")
        // return
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
          // this.getCustRevOdrQty("month")
      },

      // 按客户、接单日期（今日、本周、本月、本年)查询订单数量
      getCustRevOdrQty(e) {
        // let that=this
        // if (!this.url.getCustRevByMonth) {
        //   this.$message.error('请设置url.getCustRevByMonth属性!')
        //   return
        // }
        let tempUrl = "";
        switch (e) {
          case "today":
              if (this.selectedTab == 1) {
                  tempUrl = this.url.getCustRevByToday;
              } else if (this.selectedTab == 2) {
                  tempUrl = this.url.getBrandRevByToday;
              } else if (this.selectedTab == 3) {
                  tempUrl = this.url.getStyleRevByToday;
              }
              break;
          case "week":
              if (this.selectedTab == 1) {
                  tempUrl = this.url.getCustRevByWeek;
              } else if (this.selectedTab == 2) {
                  tempUrl = this.url.getBrandRevByWeek;
              } else if (this.selectedTab == 3) {
                  tempUrl = this.url.getStyleRevByWeek;
              }
              break;
          case "month":
              if (this.selectedTab == 1) {
                  tempUrl = this.url.getCustRevByMonth;
              } else if (this.selectedTab == 2) {
                  tempUrl = this.url.getBrandRevByMonth;
              } else if (this.selectedTab == 3) {
                  tempUrl = this.url.getStyleRevByMonth;
              }
              break;
          case "year":
              if (this.selectedTab == 1) {
                  tempUrl = this.url.getCustRevByYear;
              } else if (this.selectedTab == 2) {
                  tempUrl = this.url.getBrandRevByYear;
              } else if (this.selectedTab == 3) {
                  tempUrl = this.url.getStyleRevByYear;
              }
              break;
        }
        getAction(tempUrl).then((res) => {
          if (res.success) {
              this.odrQty = JSON.parse(JSON.stringify(res.result).replace(/nm/g,"x").replace(/odr_qty/g,"y"));
              this.odrQtyPercent = JSON.parse(JSON.stringify(res.result).replace(/nm/g,"item").replace(/odr_qty/g,"count"));
              if (this.selectedTab == 1) {
                  this.custOdrQty = this.odrQty;
                  this.custOdrQtyPercent = this.odrQtyPercent;
              } else if (this.selectedTab == 2) {
                  this.brandOdrQty = this.odrQty;
                  this.brandOdrQtyPercent = this.odrQtyPercent;
              } else if (this.selectedTab == 3) {
                  this.styleOdrQty = this.odrQty;
                  this.styleOdrQtyPercent = this.odrQtyPercent;
              }
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
          // this.loadData()
          this.loading = false
        })
      },

      // 按客户、接单日期（开始日期~结束日期)查询订单数量
      getCustRevPeriodOdrQty(date, dateString) {
        // // let that=this
        // if (!this.url.getCustRevPeriodOdrQty) {
        //   this.$message.error('请设置url.getCustRevPeriodOdrQty属性!')
        //   return
        // }
        // let p = new Array(2);
          let tempUrl = '';
          if (this.selectedTab == 1) {
              tempUrl = this.url.getCustRevByPeriod;
          } else if (this.selectedTab == 2) {
              tempUrl = this.url.getBrandRevByPeriod;
          } else if (this.selectedTab == 3) {
              tempUrl = this.url.getStyleRevByPeriod;
          }
        let p = dateString.toString().replace(/-/g,'').split(',');
        let period = p.toString();
        getAction(tempUrl, {period: period}).then((res) => {
          if (res.success) {
              this.odrQty = JSON.parse(JSON.stringify(res.result).replace(/nm/g,"x").replace(/odr_qty/g,"y"));
              this.odrQtyPercent = JSON.parse(JSON.stringify(res.result).replace(/nm/g,"item").replace(/odr_qty/g,"count"));
              if (this.selectedTab == 1) {
                  this.custOdrQty = this.odrQty;
                  this.custOdrQtyPercent = this.odrQtyPercent;
              } else if (this.selectedTab == 2) {
                  this.brandOdrQty = this.odrQty;
                  this.brandOdrQtyPercent = this.odrQtyPercent;
              } else if (this.selectedTab == 3) {
                  this.styleOdrQty = this.odrQty;
                  this.styleOdrQtyPercent = this.odrQtyPercent;
              }
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
          // this.loadData()
          this.loading = false
        })
      },

      initLogInfo () {
        getLoginfo(null).then((res)=>{
          if(res.success){
            Object.keys(res.result).forEach(key=>{
              res.result[key] =res.result[key]+""
            })
            this.loginfo = res.result;
          }
        })
        getVisitInfo().then(res=>{
          if(res.success){
            console.log("aaaaaa",res.result)
            this.visitInfo = res.result;
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .circle-cust{
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