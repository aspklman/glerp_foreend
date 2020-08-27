<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="工厂订单">
              <a-input placeholder="请输入工厂订单" v-model="queryParam.工厂订单"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户订单">
              <a-input placeholder="请输入客户订单" v-model="queryParam.客户订单"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="抵扣工厂订单">
                <a-input placeholder="请输入抵扣工厂订单" v-model="queryParam.抵扣工厂订单"></a-input>
              </a-form-item>
            </a-col>
<!--            <a-col :md="6" :sm="8">-->
<!--              <a-form-item label="型体编号">-->
<!--                <a-input placeholder="请输入型体编号" v-model="queryParam.型体编号"></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
            <a-col :md="10" :sm="8">
              <a-form-item label="接单日期">
                <j-date
                  v-model="queryParam.接单日期_begin"
                  date-format="YYYYMMDD"
                  style="width:45%"
                  placeholder="请选择开始日期"></j-date>
                <span style="width: 10px;">~</span>
                <j-date
                  v-model="queryParam.接单日期_end"
                  date-format="YYYYMMDD"
                  style="width:45%"
                  placeholder="请选择结束日期"></j-date>
              </a-form-item>
            </a-col>
            <a-col :md="10" :sm="8">
              <a-form-item label="订单交期">
                <j-date
                  v-model="queryParam.订单交期_begin"
                  date-format="YYYYMMDD"
                  style="width:45%"
                  placeholder="请选择开始日期"></j-date>
                <span style="width: 10px;">~</span>
                <j-date
                  v-model="queryParam.订单交期_end"
                  date-format="YYYYMMDD"
                  style="width:45%"
                  placeholder="请选择结束日期"></j-date>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!--    &lt;!&ndash; 操作按钮区域 &ndash;&gt;-->
    <!--    <div class="table-operator">-->
    <!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
    <!--      <a-button type="primary" icon="download" @click="handleExportXls('全流程表')">导出</a-button>-->
    <!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
    <!--        <a-button type="primary" icon="import">导入</a-button>-->
    <!--      </a-upload>-->
    <!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
    <!--        <a-menu slot="overlay">-->
    <!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
    <!--        </a-menu>-->
    <!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
    <!--      </a-dropdown>-->
    <!--    </div>-->

    <!-- table区域-begin -->
    <div>
<!--            <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--              <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项-->
<!--              <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
<!--            </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="工厂订单"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :customRow="onClickRow"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio', columnTitle: '选择行'}"
        @change="handleTableChange">
<!--                <span slot="action" slot-scope="text, record">-->
<!--                  <a @click="handleEdit(record)">编辑</a>-->

<!--                  <a-divider type="vertical" />-->
<!--                  <a-dropdown>-->
<!--                    <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
<!--                    <a-menu slot="overlay">-->
<!--                      <a-menu-item>-->
<!--                        <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
<!--                          <a>删除</a>-->
<!--                        </a-popconfirm>-->
<!--                      </a-menu-item>-->
<!--                    </a-menu>-->
<!--                  </a-dropdown>-->
<!--                </span>-->

      </a-table>

      <!--      <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"-->
      <!--              @change="changeTab">-->
      <!--        <a-tab-pane loading="true" tab="SIZE数量" key="1">-->
      <!--          <a-row>-->
      <!--            &lt;!&ndash;          <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">&ndash;&gt;-->
      <!--            <bar-->
      <!--              :dataSource="custOdrQty"-->
      <!--              yaxisText="SIZE数量"-->
      <!--              :height="height"/>-->
      <!--            &lt;!&ndash;          </a-col>&ndash;&gt;-->
      <!--          </a-row>-->
      <!--        </a-tab-pane>-->
      <!--      </a-tabs>-->

      <a-row>
        <a-col :span="24">
          <a-card :loading="loading" :bordered="false" title="SIZE数量" :style="{ marginTop: '24px' }">
            <a-row>
              <bar
                :dataSource="odrQty"
                yaxisText="SIZE数量"
                :height="height"/>
            </a-row>
          </a-card>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-card :loading="loading" :bordered="false" title="半成品" :style="{ marginTop: '24px' }">
            <a-row>
              <a-col :span="6">
                <head-info title="IP派工时间" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="射出机台" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="射出最迟需上线时间" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="射出完成时间" content=""></head-info>
              </a-col>
            </a-row>
            <a-row :style="{ marginTop: '24px' }">
              <a-col :span="6">
                <head-info title="半成品入库满箱时间" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="转印最迟上线时间" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="转印完成" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <!--                                <head-info title="满箱入库时间" content="2020/08/08"></head-info>-->
              </a-col>
            </a-row>
            <a-row :style="{ marginTop: '24px' }">
              <a-col :span="6">
                <head-info title="针车最迟上线时间" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="针车完成" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <!--                <head-info title="可验货时间" content="2020/08/08"></head-info>-->
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-card :loading="loading" :bordered="false" title="成品" :style="{ marginTop: '24px' }">
            <a-row>
              <a-col :span="6">
                <head-info title="鞋部派工时间" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="合贴最迟上线时间" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="在线全检结果" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="合贴(成型扫描完成时间)" content=""></head-info>
              </a-col>
            </a-row>
            <a-row :style="{ marginTop: '24px' }">
              <a-col :span="6">
                <head-info title="组装最迟上线时间" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="组装完成时间" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <!--                <head-info title="转印完成" content="2020/07/20"></head-info>-->
              </a-col>
              <a-col :span="6">
                <!--                                <head-info title="满箱入库时间" content="2020/08/08"></head-info>-->
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-card :loading="loading" :bordered="false" title="仓库与验货" :style="{ marginTop: '24px' }">
            <a-row>
              <a-col :span="6">
                <head-info title="入库欠数" :content="stockData.owe_qty"></head-info>
              </a-col>
              <!--              <a-col :span="2">-->
              <!--                <a-spin class='circle-cust'>-->
              <!--                  <a-icon slot="indicator" type="environment" style="font-size: 24px"  />-->
              <!--                </a-spin>-->
              <!--              </a-col>-->
              <a-col :span="6">
                <head-info title="满箱入库时间" :content="stockData.in_date"></head-info>
              </a-col>
              <!--              <a-col :span="2">-->
              <!--                <a-spin class='circle-cust'>-->
              <!--                  <a-icon slot="indicator" type="team" style="font-size: 24px"  />-->
              <!--                </a-spin>-->
              <!--              </a-col>-->
              <a-col :span="6">
                <head-info title="可验货时间" :content="stockData.in_date"></head-info>
              </a-col>
              <!--              <a-col :span="2">-->
              <!--                <a-spin class='circle-cust'>-->
              <!--                  <a-icon slot="indicator" type="rise" style="font-size: 24px"  />-->
              <!--                </a-spin>-->
              <!--              </a-col>-->
              <a-col :span="6">
                <head-info title="验货报告" content=""></head-info>
              </a-col>
              <!--              <a-col :span="2">-->
              <!--                <a-spin class='circle-cust'>-->
              <!--                  <a-icon slot="indicator" type="environment" style="font-size: 24px"  />-->
              <!--                </a-spin>-->
              <!--              </a-col>-->
            </a-row>
            <a-row :style="{ marginTop: '24px' }">
              <a-col :span="6">
                <head-info title="验货结果" content=""></head-info>
              </a-col>
              <!--              <a-col :span="2">-->
              <!--                <a-spin class='circle-cust'>-->
              <!--                  <a-icon slot="indicator" type="team" style="font-size: 24px"  />-->
              <!--                </a-spin>-->
              <!--              </a-col>-->
              <a-col :span="6">
                <head-info title="翻箱次数" content=""></head-info>
              </a-col>
              <!--              <a-col :span="2">-->
              <!--                <a-spin class='circle-cust'>-->
              <!--                  <a-icon slot="indicator" type="rise" style="font-size: 24px"  />-->
              <!--                </a-spin>-->
              <!--              </a-col>-->
              <a-col :span="6">
                <head-info title="出货状态" :content="stockData.shp_status=='Y'?'已出货':'未出货'"></head-info>
              </a-col>
              <!--              <a-col :span="2">-->
              <!--                <a-spin class='circle-cust'>-->
              <!--                  <a-icon slot="indicator" type="environment" style="font-size: 24px"  />-->
              <!--                </a-spin>-->
              <!--              </a-col>-->
            </a-row>
            <!--            <a-row>-->
            <!--              <a-col :span="6">-->
            <!--&lt;!&ndash;                <head-info title="满箱入库时间" content="2020/08/08"></head-info>&ndash;&gt;-->
            <!--              </a-col>-->
            <!--              <a-col :span="2">-->
            <!--                <a-spin class='circle-cust'>-->
            <!--&lt;!&ndash;                  <a-icon slot="indicator" type="team" style="font-size: 24px"  />&ndash;&gt;-->
            <!--                </a-spin>-->
            <!--              </a-col>-->
            <!--              <a-col :span="6">-->
            <!--&lt;!&ndash;                <head-info title="可验货时间" content="2020/08/08"></head-info>&ndash;&gt;-->
            <!--              </a-col>-->
            <!--              <a-col :span="2">-->
            <!--                <a-spin class='circle-cust'>-->
            <!--&lt;!&ndash;                  <a-icon slot="indicator" type="rise" style="font-size: 24px"  />&ndash;&gt;-->
            <!--                </a-spin>-->
            <!--              </a-col>-->
            <!--            </a-row>-->
            <!--            <line-chart-multid :fields="visitFields" :dataSource="visitInfo"></line-chart-multid>-->
          </a-card>
        </a-col>
      </a-row>

    </div>


    <!-- table区域-end -->


    <!--    &lt;!&ndash; 表单区域 &ndash;&gt;-->
    <!--    <wholeProcessReport-modal ref="modalForm" @ok="modalFormOk"></wholeProcessReport-modal>-->
  </a-card>


</template>

<script>
  import WholeProcessReportModal from './modules/WholeProcessReportModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JDate from '@/components/jeecg/JDate'

  import ChartCard from '@/components/ChartCard'
  import ACol from 'ant-design-vue/es/grid/Col'
  import ATooltip from 'ant-design-vue/es/tooltip/Tooltip'
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
  import IndexBar from '../../components/chart/IndexBar'
  import BarAndLine from '../../components/chart/BarAndLine'
  import BarMultid from '../../components/chart/BarMultid'
  import { getAction, postAction, deleteAction } from '../../api/manage'
  import { dateFormat } from '../../components/_util/dateFormat'


  import { getLoginfo, getVisitInfo } from '@/api/api'


  export default {
    name: 'WholeProcessReportList',
    mixins: [JeecgListMixin],
    components: {
      WholeProcessReportModal,
      BarAndLine,
      BarMultid,
      DashChartDemo,
      IndexBar,
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
      deleteAction,
      JDate,
    },
    data() {
      return {
        description: '全流程表管理页面',
        custOdrQty: [
          { x: '19', y: 888 },
          { x: '21', y: 999 },
          { x: '23', y: 666 },
          { x: '25', y: 555 },
          { x: '27', y: 111 },
          { x: '29', y: 666 },
          { x: '31', y: 888 },
          { x: '33', y: 1000 }
        ],
        height: 180,
        odrQty: [],
        stockData: [],
        factOdrNo: '',
        // 表头
        columns: [
             // {
             //   title: '#',
             //   dataIndex: '',
             //   key:'rowIndex',
             //   width:60,
             //   align:"center",
             //   customRender:function (t,r,index) {
             //     return parseInt(index)+1;
             //   }
             //  },
          // {
          //      title: 'factNo',
          //      align:"center",
          //      dataIndex: 'factNo'
          //     },
          // {
          //      title: 'proDept',
          //      align:"center",
          //      dataIndex: 'proDept'
          //     },
          // {
          //      title: 'customNo',
          //      align:"center",
          //      dataIndex: 'customNo'
          //     },
          {
            title: '接单日期',
            align: 'center',
            dataIndex: '接单日期'
          },
          {
            title: '订单交期',
            align: 'center',
            dataIndex: '订单交期'
          },
          {
            title: '抵扣工厂订单',
            align: 'center',
            dataIndex: '抵扣工厂订单'
          },
          {
            title: '工厂订单',
            align: 'center',
            dataIndex: '工厂订单'
          },
          {
            title: '客户订单',
            align: 'center',
            dataIndex: '客户订单'
          },
          {
            title: '型体编号',
            align: 'center',
            dataIndex: '型体编号'
          },
          {
            title: '型体名称',
            align: 'center',
            dataIndex: '型体名称'
          },
          {
            title: '颜色',
            align: 'center',
            dataIndex: '颜色'
          },
          {
            title: '订单类别',
            align: 'center',
            dataIndex: '订单类别'
          },
          {
            title: '目的地',
            align: 'center',
            dataIndex: '目的地'
          },
          {
            title: '订单数',
            align: 'center',
            dataIndex: '订单数'
          }
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align:"center",
          //   scopedSlots: { customRender: 'action' },
          // }
        ],
        url: {
          list: '/order/wholeProcessReport/list',
          delete: '/order/wholeProcessReport/delete',
          deleteBatch: '/order/wholeProcessReport/deleteBatch',
          exportXlsUrl: 'order/wholeProcessReport/exportXls',
          importExcelUrl: 'order/wholeProcessReport/importExcel',
          getSizeQty: '/order/wholeProcessReport/getSizeQty',
          getStockData: '/order/wholeProcessReport/getStockData',
        }
      }
    },

    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      },

    },
    methods: {
      onClickRow(record) {
        return {
          on: {
            click: () => {
              let keys = [];
              keys.push(record.工厂订单);
              this.selectedRowKeys = keys;
              this.getSizeQty(this.selectedRowKeys);
              this.getStockData(this.selectedRowKeys);
            }
          }
        }
      },
      // 将【工厂订单】传给后端，获取【SIZE】、【数量】
      getSizeQty(currentKey) {
        let pssr = currentKey.toString().trim();
        getAction(this.url.getSizeQty, {pssr: pssr}).then((res) => {
          if (res.success) {

            this.odrQty = JSON.parse(JSON.stringify(res.result).replace(/size_no/g, "x").replace(/odr_qty/g, "y"));
            // console.log(`工厂订单：${this.odrQty}`)
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
          // this.loadData()
          this.loading = false
        })
      },
      // 将【工厂订单】传给后端，获取【入库欠数】、【满箱入库时间】/【可验货时间】、【出货状态】
      getStockData(currentKey) {
        let pssr = currentKey.toString().trim();
        getAction(this.url.getStockData, {pssr: pssr}).then((res) => {
          if (res.success) {

            // this.stockData = JSON.parse(JSON.stringify(res.result));
            this.stockData = res.result;
            console.log(`入库欠数：${this.stockData.owe_qty}`)
            console.log(`满箱入库时间：${this.stockData.in_date}`)
            console.log(`出货状态：${this.stockData.shp_status}`)
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
<style scoped>
  @import '~@assets/less/common.less'
</style>