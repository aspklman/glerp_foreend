<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

<!--          <a-col :md="6" :sm="8">-->
<!--            <a-form-item label="locakRmk">-->
<!--              <a-input placeholder="请输入locakRmk" v-model="queryParam.locakRmk"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :md="6" :sm="8">-->
<!--            <a-form-item label="厂区编号">-->
<!--              <a-input placeholder="请输入厂区编号" v-model="queryParam.factNo"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :md="6" :sm="8">
            <a-form-item label="仓库编号">
              <a-input placeholder="请输入仓库编号" v-model="queryParam.stkNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="存放区编号">
              <a-input placeholder="请输入存放区编号" v-model="queryParam.locNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :md="6" :sm="8">
            <a-form-item label="存放区说明">
              <a-input placeholder="请输入存放区说明" v-model="queryParam.locDesc"></a-input>
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
      <a-button v-has="'locate:add'" @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button v-has="'locate:exportXls'" type="primary" icon="download" @click="handleExportXls('存放区域表')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button v-has="'locate:importExcel'" type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button v-has="'locate:deleteBatch'" style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
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
          <a v-has="'locate:edit'" @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'locate:delete'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <locate-modal ref="modalForm" @ok="modalFormOk"></locate-modal>
  </a-card>
</template>

<script>
  import LocateModal from './modules/LocateModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "LocateList",
    mixins:[JeecgListMixin],
    components: {
      LocateModal
    },
    data () {
      return {
        description: '存放区域表管理页面',
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
		   // {
       //      title: 'locakRmk',
       //      align:"center",
       //      dataIndex: 'locakRmk'
       //     },
		   // {
       //      title: '厂区编号',
       //      align:"center",
       //      dataIndex: 'factNo'
       //     },
		   {
            title: '仓库编号',
            align:"center",
            dataIndex: 'stkNo',
            sorter: true,
           },
		   {
            title: '存放区编号',
            align:"center",
            dataIndex: 'locNo',
            sorter: true,
           },
		   {
            title: '存放区说明',
            align:"center",
            dataIndex: 'locDesc',
            sorter: true,
           },
		   // {
       //      title: '责任人',
       //      align:"center",
       //      dataIndex: 'dutyPer'
       //     },
          {
            title: '创建时间',
            align:"center",
            dataIndex: 'createTime',
            sorter: true,
          },
          {
            title: '修改时间',
            align:"center",
            dataIndex: 'updateTime',
            sorter: true
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/stock/locate/list",
          delete: "/stock/locate/delete",
          deleteBatch: "/stock/locate/deleteBatch",
          exportXlsUrl: "stock/locate/exportXls",
          importExcelUrl: "stock/locate/importExcel",
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