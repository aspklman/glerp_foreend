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
          <a-col :md="6" :sm="8">
            <a-form-item label="库别编号">
              <a-input placeholder="请输入库别编号" v-model="queryParam.stkNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="库别说明">
              <a-input placeholder="请输入库别说明" v-model="queryParam.stkDesc"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">

            <!--          <a-col :md="6" :sm="8">-->
            <!--            <a-form-item label="仓库类别">-->
            <!--              <a-input placeholder="请输入仓库类别" v-model="queryParam.stkKind"></a-input>-->
            <!--            </a-form-item>-->
            <!--          </a-col>-->
            <!--          <a-col :md="6" :sm="8">-->
            <!--            <a-form-item label="归属厂别">-->
            <!--              <a-input placeholder="请输入归属厂别" v-model="queryParam.proFact"></a-input>-->
            <!--            </a-form-item>-->
            <!--          </a-col>-->
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

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button v-has="'stkidm:add'" @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button v-has="'stkidm:exportXls'" type="primary" icon="download" @click="handleExportXls('仓库表')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button v-has="'stkidm:importExcel'" type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button v-has="'stkidm:deleteBatch'" style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
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
          <a v-has="'stkidm:edit'" @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'stkidm:delete'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <stkidm-modal ref="modalForm" @ok="modalFormOk"></stkidm-modal>
  </a-card>
</template>

<script>
  import StkidmModal from './modules/StkidmModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: 'StkidmList',
    mixins: [JeecgListMixin],
    components: {
      StkidmModal
    },
    data() {
      return {
        description: '仓库表管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            }
          },
          // {
          //      title: '厂区编号',
          //      align:"center",
          //      dataIndex: 'factNo'
          //     },
          {
            title: '库别编号',
            align: 'center',
            dataIndex: 'stkNo',
            sorter: true
          },
          {
            title: '库别说明',
            align: 'center',
            dataIndex: 'stkDesc',
            sorter: true
          },
          // {
          //      title: '仓库类别',
          //      align:"center",
          //      dataIndex: 'stkKind'
          //     },
          {
            title: '归属厂别',
            align: 'center',
            dataIndex: 'proFact_dictText',
            sorter: true
          },
          // {
          //      title: '仓库性质 1.自有 2.客供 3.易耗品',
          //      align:"center",
          //      dataIndex: 'oriStk'
          //     },
          // {
          //      title: '入库制程',
          //      align:"center",
          //      dataIndex: 'borNo'
          //     },
          // {
          //      title: '归属库别',
          //      align:"center",
          //      dataIndex: 'belStk'
          //     },
          // {
          //      title: '工厂类别',
          //      align:"center",
          //      dataIndex: 'factId'
          //     },
          // {
          //      title: '关务类型(1.原物料 2.在制品 3.成品)',
          //      align:"center",
          //      dataIndex: 'cusType'
          //     },
          // {
          //      title: '公司代号',
          //      align:"center",
          //      dataIndex: 'compNo'
          //     },
          // {
          //      title: '保税注记',
          //      align:"center",
          //      dataIndex: 'taxRmk'
          //     },
          // {
          //      title: '批次管理注记(Y/N)',
          //      align:"center",
          //      dataIndex: 'lotRmk'
          //     },
          // {
          //      title: 'REMARK',
          //      align:"center",
          //      dataIndex: 'remark'
          //     },
          {
            title: '创建时间',
            align: 'center',
            dataIndex: 'createTime',
            sorter: true
          },
          {
            title: '修改时间',
            align: 'center',
            dataIndex: 'updateTime',
            sorter: true
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/stock/stkidm/list',
          delete: '/stock/stkidm/delete',
          deleteBatch: '/stock/stkidm/deleteBatch',
          exportXlsUrl: 'stock/stkidm/exportXls',
          importExcelUrl: 'stock/stkidm/importExcel'
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {}
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>