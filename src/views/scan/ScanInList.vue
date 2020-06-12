<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

<!--          <a-col :md="6" :sm="8">-->
<!--            <a-form-item label="厂区编号">-->
<!--              <a-input placeholder="请输入厂区编号" v-model="queryParam.factNo"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :md="6" :sm="8">-->
<!--            <a-form-item label="阶段编号">-->
<!--              <a-input placeholder="请输入阶段编号" v-model="queryParam.stgNo"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :md="6" :sm="8">
          <a-form-item label="库别编号">
            <a-input placeholder="请输入库别编号" v-model="queryParam.stkNo"></a-input>
          </a-form-item>
        </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="扫描时间">
              <a-input placeholder="请输入扫描时间" v-model="queryParam.scanTime"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="存放区域">
              <a-input placeholder="请输入存放区域" v-model="queryParam.locNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="存放地点">
              <a-input placeholder="请输入存放地点" v-model="queryParam.locArea"></a-input>
            </a-form-item>
          </a-col>
<!--        <template v-if="toggleSearchStatus">-->

<!--           </template>-->
<!--          <a-col :md="6" :sm="8" >-->
<!--            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">-->
<!--              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>-->
<!--              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>-->
<!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
<!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
<!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
<!--              </a>-->
<!--            </span>-->
<!--          </a-col>-->

        </a-row>
      </a-form>
    </div>

        <a-row :gutter="24">
          <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="总销售额" total="￥126,560">
              <a-tooltip title="指标说明" slot="action">
                <a-icon type="info-circle-o" />
              </a-tooltip>
              <div>
                <trend flag="up" style="margin-right: 16px;">
                  <span slot="term">周同比</span>
                  12%
                </trend>
                <trend flag="down">
                  <span slot="term">日同比</span>
                  11%
                </trend>
              </div>
              <template slot="footer">日均销售额<span>￥ 234.56</span></template>
            </chart-card>
          </a-col>
          <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="访问量" :total="8846 | NumberFormat">
              <a-tooltip title="指标说明" slot="action">
                <a-icon type="info-circle-o" />
              </a-tooltip>
              <div>
                <mini-area />
              </div>
              <template slot="footer">日访问量<span> {{ '1234' | NumberFormat }}</span></template>
            </chart-card>
          </a-col>
          <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="支付笔数" :total="6560 | NumberFormat">
              <a-tooltip title="指标说明" slot="action">
                <a-icon type="info-circle-o" />
              </a-tooltip>
              <div>
                <mini-bar :height="40" />
              </div>
              <template slot="footer">转化率 <span>60%</span></template>
            </chart-card>
          </a-col>
          <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
            <chart-card :loading="loading" title="运营活动效果" total="78%">
              <a-tooltip title="指标说明" slot="action">
                <a-icon type="info-circle-o" />
              </a-tooltip>
              <div>
                <mini-progress color="rgb(19, 194, 194)" :target="80" :percentage="78" :height="8" />
              </div>
              <template slot="footer">
                <trend flag="down" style="margin-right: 16px;">
                  <span slot="term">同周比</span>
                  12%
                </trend>
                <trend flag="up">
                  <span slot="term">日环比</span>
                  80%
                </trend>
              </template>
            </chart-card>
          </a-col>
        </a-row>



    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('成品中转扫描表')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <stgscanRecTransfer-modal ref="modalForm" @ok="modalFormOk"></stgscanRecTransfer-modal>
  </a-card>
</template>

<script>
  import StgscanRecTransferModal from './modules/StgscanRecTransferModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  import ChartCard from '@/components/ChartCard'
  import ACol from "ant-design-vue/es/grid/Col"
  import ATooltip from "ant-design-vue/es/tooltip/Tooltip"
  import MiniArea from '@/components/chart/MiniArea'
  import MiniBar from '@/components/chart/MiniBar'
  import MiniProgress from '@/components/chart/MiniProgress'
  import RankList from '@/components/chart/RankList'
  import Bar from '@/components/chart/Bar'
  import LineChartMultid from '@/components/chart/LineChartMultid'
  import HeadInfo from '@/components/tools/HeadInfo.vue'

  import Trend from '@/components/Trend'
  import { getLoginfo,getVisitInfo } from '@/api/api'

  export default {
    name: "StgscanRecTransferList",
    mixins:[JeecgListMixin],
    components: {
      StgscanRecTransferModal,

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
        HeadInfo
    },
    data () {
      return {
        description: '成品中转扫描表管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '厂区编号',
            align:"center",
            dataIndex: 'factNo'
           },
		   {
            title: '阶段编号',
            align:"center",
            dataIndex: 'stgNo'
           },
		   {
            title: '库别编号',
            align:"center",
            dataIndex: 'stkNo'
           },
		   {
            title: '条码编号',
            align:"center",
            dataIndex: 'barNo'
           },
		   {
            title: '扫描时间',
            align:"center",
            dataIndex: 'scanTime'
           },
		   {
            title: '存放区域',
            align:"center",
            dataIndex: 'locNo'
           },
		   {
            title: '存放地点',
            align:"center",
            dataIndex: 'locArea'
           },
		   {
            title: '更新标记',
            align:"center",
            dataIndex: 'updateRmk'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/scan/ScanIn/list",
          delete: "/scan/ScanIn/delete",
          deleteBatch: "/scan/ScanIn/deleteBatch",
          exportXlsUrl: "scan/ScanIn/exportXls",
          importExcelUrl: "scan/ScanIn/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
     
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


<!--<style scoped>-->
<!--  @import '~@assets/less/common.less'-->
<!--</style>-->