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
            <a-form-item label="外箱规格编号">
              <a-input placeholder="请输入外箱规格编号" v-model="queryParam.ctnspecNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
<!--        <a-col :md="6" :sm="8">-->
<!--            <a-form-item label="材料编号">-->
<!--              <a-input placeholder="请输入材料编号" v-model="queryParam.matNo"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :md="6" :sm="8">-->
<!--            <a-form-item label="外箱(mm)长">-->
<!--              <a-input placeholder="请输入外箱(mm)长" v-model="queryParam.ctnspecLen"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :md="6" :sm="8">-->
<!--            <a-form-item label="外箱(mm)宽">-->
<!--              <a-input placeholder="请输入外箱(mm)宽" v-model="queryParam.ctnspecWid"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
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
      <a-button v-has="'ctnspec:add'" @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button v-has="'ctnspec:exportXls'" type="primary" icon="download" @click="handleExportXls('外箱规格表')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button v-has="'ctnspec:importExcel'" type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button v-has="'ctnspec:delete'" style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
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
          <a v-has="'ctnspec:edit'" @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'ctnspec:delete'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ctnspec-modal ref="modalForm" @ok="modalFormOk"></ctnspec-modal>
  </a-card>
</template>

<script>
  import CtnspecModal from './modules/CtnspecModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "CtnspecList",
    mixins:[JeecgListMixin],
    components: {
      CtnspecModal
    },
    data () {
      return {
        description: '外箱规格表管理页面',
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
       //      title: '厂区编号',
       //      align:"center",
       //      dataIndex: 'factNo'
       //     },
		   {
            title: '外箱规格编号',
            align:"center",
            dataIndex: 'ctnspecNo',
         sorter: true,
           },
		   {
            title: '材料编号',
            align:"center",
            dataIndex: 'matNo',
         sorter: true,
           },
		   // {
       //      title: '外箱(mm)长',
       //      align:"center",
       //      dataIndex: 'ctnspecLen',
       //   sorter: true,
       //     },
		   // {
       //      title: '外箱(mm)宽',
       //      align:"center",
       //      dataIndex: 'ctnspecWid',
       //   sorter: true,
       //     },
		   // {
       //      title: '外箱(mm)高',
       //      align:"center",
       //      dataIndex: 'ctnspecHig',
       //   sorter: true,
       //     },
		   // {
       //      title: '材积(CBM)',
       //      align:"center",
       //      dataIndex: 'ctnMeasu'
       //     },
		   // {
       //      title: '重量(KG)',
       //      align:"center",
       //      dataIndex: 'ctnWgt'
       //     },
          {
            title: '创建时间',
            align:"center",
            dataIndex: 'createTime',
            sorted: 'true'
          },
          {
            title: '修改时间',
            align:"center",
            dataIndex: 'updateTime',
            sorted: 'true'
          },
		   // {
       //      title: '异动人',
       //      align:"center",
       //      dataIndex: 'userNo'
       //     },
		   // {
       //      title: '异动时间',
       //      align:"center",
       //      dataIndex: 'modifyDt'
       //     },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/order/ctnspec/list",
          delete: "/order/ctnspec/delete",
          deleteBatch: "/order/ctnspec/deleteBatch",
          exportXlsUrl: "order/ctnspec/exportXls",
          importExcelUrl: "order/ctnspec/importExcel",
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