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

<!--            <a-col :md="6" :sm="8">-->
<!--              <a-form-item label="型体编号">-->
<!--                <a-input placeholder="请输入型体编号" v-model="queryParam.型体编号"></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
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
<!--      <a-button type="primary" icon="download" @click="handleExportXls('验货抽检标准')">导出</a-button>-->
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"-->
<!--                @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel">-->
<!--            <a-icon type="delete"/>-->
<!--            删除-->
<!--          </a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作-->
<!--          <a-icon type="down"/>-->
<!--        </a-button>-->
<!--      </a-dropdown>-->
<!--    </div>-->

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{-->
<!--        selectedRowKeys.length }}</a>项-->
<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
<!--      </div>-->

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

        <span slot="action" slot-scope="text, record">
<!--          <a @click="handleEdit(record)">编辑</a>-->
          <a @click="handleEdit(record)">详情</a>

<!--          <a-divider type="vertical"/>-->
<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>-->
<!--            <a-menu slot="overlay">-->
<!--              <a-menu-item>-->
<!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
<!--                  <a>删除</a>-->
<!--                </a-popconfirm>-->
<!--              </a-menu-item>-->
<!--            </a-menu>-->
<!--          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <sampleInspectStd-modal ref="modalForm" @ok="modalFormOk" :inspectMain="inspectMain"></sampleInspectStd-modal>
  </a-card>
</template>

<script>
  import SampleInspectStdModal from './modules/SampleInspectStdModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction, postAction, deleteAction } from '@/api/manage'

  export default {
    name: 'SampleInspectStdList',
    mixins: [JeecgListMixin],
    components: {
      SampleInspectStdModal
    },
    data() {
      return {
        description: '验货抽检标准管理页面',
        inspectMain: [],
        // factOdrNo,
        // cust_odr_no,
        // artic_no,
        // style_no,
        // ctn_qty_ttl,
        // cus_qty_ttl,
        // ctn_qty_aql_ttl,
        // sample_qty_aql_ttl,
        // func_qty_aql_ttl,
        // str_qty_aql,
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
            title: '订单总箱数',
            align: 'center',
            dataIndex: '订单总箱数'
          },
          {
            title: '订单总双数',
            align: 'center',
            dataIndex: '订单总双数'
          },
          // {
          //   title: 'AQL标准箱数',
          //   align: 'center',
          //   dataIndex: 'aql标准箱数'
          // },
          // {
          //   title: 'AQL标准双数',
          //   align: 'center',
          //   dataIndex: 'aql标准双数'
          // },
          // {
          //      title: '功能性检测双数',
          //      align:"center",
          //      dataIndex: '功能性检测双数'
          //     },
          // {
          //      title: '结构性检测双数',
          //      align:"center",
          //      dataIndex: '结构性检测双数'
          //     },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/quality/sampleInspectStd/list',
          delete: '/quality/sampleInspectStd/delete',
          deleteBatch: '/quality/sampleInspectStd/deleteBatch',
          exportXlsUrl: 'quality/sampleInspectStd/exportXls',
          importExcelUrl: 'quality/sampleInspectStd/importExcel',
          getInspectDetail: '/quality/sampleInspectStd/getInspectDetail',
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
              let keys = []
              keys.push(record.工厂订单)
              this.selectedRowKeys = keys
              //验货抽检标准主档数据
              this.inspectMain[0] = record.工厂订单
              this.inspectMain[1] = record.客户订单
              this.inspectMain[2] = record.型体编号
              this.inspectMain[3] = record.型体名称
              this.inspectMain[4] = record.订单总箱数
              this.inspectMain[5] = record.订单总双数
              this.inspectMain[6] = record.aql标准箱数
              this.inspectMain[7] = record.aql标准双数
              this.inspectMain[8] = record.功能性检测双数
              this.inspectMain[9] = record.结构性检测双数
              //验货抽检标准子档数据
              this.getInspectDetail(this.inspectMain[0])
            }
          }
        }
      },
      getInspectDetail(pssr) {
        getAction(this.url.getInspectDetail, {pssr: pssr}).then((res) => {
          if (res.success) {
            this.inspectMain[10] = res.result;
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
      },


    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>