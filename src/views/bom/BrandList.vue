<template>
  <a-card :bordered="false">

<!--    <a-locale-provider :locale="locale">-->
<!--      <div class="locale-components" :key="(!!locale).toString()">-->

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

<!--          <a-col :md="6" :sm="8">-->
<!--            <a-form-item label="工厂名称">-->
<!--              <a-select v-model="queryParam.factNo" defaultValue="0006">-->
<!--                <a-select-option value="0006">广东国立科技股份有限公司</a-select-option>-->
<!--              </a-select>-->
<!--&lt;!&ndash;              <a-input v-decorator="['factNo', {initialValue: '0006'}]" defaultValue="0006"></a-input>&ndash;&gt;-->
<!--&lt;!&ndash;              <a-input v-model="queryParam.factNo" defaultValue="0006"></a-input>&ndash;&gt;-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :md="6" :sm="8">
            <a-form-item label="品牌编号">
              <a-input placeholder="请输入品牌编号" v-model="queryParam.brandNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="品牌名称">
              <a-input placeholder="请输入品牌名称" v-model="queryParam.brandNm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

        </template>
          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">{{ $t('common.query') }}</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">{{ $t('common.reset') }}</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? $t('common.retract') : $t('common.expand') }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" v-has="'brand:add'" type="primary" icon="plus">{{ $t('common.add') }}</a-button>
      <a-button v-has="'brand:exportXls'" type="primary" icon="download" @click="handleExportXls('品牌表')">{{ $t('common.export') }}</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button v-has="'brand:importExcel'" type="primary" icon="import">{{ $t('common.import') }}</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>{{ $t('common.delete') }}</a-menu-item>
        </a-menu>
        <a-button v-has="'brand:deleteBatch'" style="margin-left: 8px"> {{ $t('common.batchOperation') }} <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> {{ $t('common.selected') }} <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>{{ $t('common.item') }}
        <a style="margin-left: 24px" @click="onClearSelected">{{ $t('common.empty') }}</a>
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
          <a v-has="'brand:edit'" @click="handleEdit(record)">{{ $t('common.edit') }}</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">{{ $t('common.more') }} <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'brand:delete'">{{ $t('common.delete') }}</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <brand-modal ref="modalForm" @ok="modalFormOk"></brand-modal>

<!--      </div>-->
<!--    </a-locale-provider>-->

  </a-card>
</template>

<script>
  import BrandModal from './modules/BrandModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

  export default {
    name: "BrandList",
    mixins:[JeecgListMixin],
    components: {
      BrandModal
    },

    data () {
      return {
        // locale: zhCN,
        description: '品牌表管理页面',
        // validatorRules:{
        //   factNo:{rules: [{ required: true, message: '请选择公司!'}], initialValue: '0006' },
        // },
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
       //      align:"left",
       //      dataIndex: 'factNo'
       //     },
		   {
            title: '品牌编号',
            align:"center",
            dataIndex: 'brandNo',
         sorter: true,
           },
		   {
            title: '品牌名称',
            align:"center",
            dataIndex: 'brandNm',
         sorter: true,
           },
          {
            title: this.$t('common.createTime'),
            align:"center",
            dataIndex: 'createTime',
            sorter: true,
          },
          {
            title: this.$t('common.updateTime'),
            align:"center",
            dataIndex: 'updateTime',
            sorter: true,
          },
          {
            title: this.$t('common.action'),
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/bom/brand/list",
          delete: "/bom/brand/delete",
          deleteBatch: "/bom/brand/deleteBatch",
          exportXlsUrl: "bom/brand/exportXls",
          importExcelUrl: "bom/brand/importExcel",
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