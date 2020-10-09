<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

<!--          <a-col :md="6" :sm="8">-->
<!--            <a-form-item label="factNo">-->
<!--              <a-input placeholder="请输入factNo" v-model="queryParam.factNo"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :md="6" :sm="8">
            <a-form-item label="绩效部门">
              <a-input placeholder="请输入绩效部门" v-model="queryParam.deptNm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="custShortNm">
              <a-input placeholder="请输入custShortNm" v-model="queryParam.custShortNm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="custFullNm">
              <a-input placeholder="请输入custFullNm" v-model="queryParam.custFullNm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="recCondition">
              <a-input placeholder="请输入recCondition" v-model="queryParam.recCondition"></a-input>
            </a-form-item>
          </a-col>
           </template>
          <a-col :md="6" :sm="8" >
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

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button type="primary" icon="download" @click="handleExportXls('应收账龄分析表')">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
<!--      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项-->
<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
<!--      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :scroll="{ x: 2000 }"
        :loading="loading"
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
    <vRecAgingAnalysis-modal ref="modalForm" @ok="modalFormOk"></vRecAgingAnalysis-modal>
  </a-card>
</template>

<script>
  import VRecAgingAnalysisModal from './modules/VRecAgingAnalysisModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "VRecAgingAnalysisList",
    mixins:[JeecgListMixin],
    components: {
      VRecAgingAnalysisModal
    },
    data () {
      return {
        description: '应收账龄分析表管理页面',
        // 表头
        columns: [
       //    {
       //      title: '#',
       //      dataIndex: '',
       //      key:'rowIndex',
       //      width:60,
       //      align:"center",
       //      customRender:function (t,r,index) {
       //        return parseInt(index)+1;
       //      }
       //     },
		   // {
       //      title: 'factNo',
       //      align:"center",
       //      dataIndex: 'factNo'
       //     },
		   {
            title: '绩效部门',
            align:"center",
            dataIndex: 'deptNm'
           },
		   {
            title: '客户简称',
            align:"center",
            dataIndex: 'custShortNm'
           },
		   {
            title: '客户全称',
            align:"center",
            dataIndex: 'custFullNm'
           },
		   {
            title: '月结方式',
            align:"center",
            dataIndex: 'recCondition'
           },
		   {
            title: '月结天数',
            align:"center",
            dataIndex: 'recConditionDays'
           },
		   {
            title: '币别',
            align:"center",
            dataIndex: 'currencyNm'
           },
		   {
            title: '应收金额',
            align:"center",
            dataIndex: 'amountReceivable'
           },
		   {
            title: '未愈期金额',
            align:"center",
            dataIndex: 'amountNoOverdue'
           },
		   {
            title: '0～30天',
            align:"center",
            dataIndex: 'amountOverdue0'
           },
		   {
            title: '30～60天',
            align:"center",
            dataIndex: 'amountOverdue30'
           },
		   {
            title: '60～90天',
            align:"center",
            dataIndex: 'amountOverdue60'
           },
		   {
            title: '90～180天',
            align:"center",
            dataIndex: 'amountOverdue90'
           },
		   {
            title: '180～360天',
            align:"center",
            dataIndex: 'amountOverdue180'
           },
		   {
            title: '1～2年',
            align:"center",
            dataIndex: 'amountOverdue360'
           },
		   {
            title: '2年以上',
            align:"center",
            dataIndex: 'amountOverdue720'
           },
		   {
            title: '逾期金额小计',
            align:"center",
            dataIndex: 'amountOverdueTtl'
           },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align:"center",
          //   scopedSlots: { customRender: 'action' },
          // }
        ],
		url: {
          list: "/finance/vRecAgingAnalysis/list",
          delete: "/finance/vRecAgingAnalysis/delete",
          deleteBatch: "/finance/vRecAgingAnalysis/deleteBatch",
          exportXlsUrl: "finance/vRecAgingAnalysis/exportXls",
          importExcelUrl: "finance/vRecAgingAnalysis/importExcel",
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
<style scoped>
  @import '~@assets/less/common.less'
</style>