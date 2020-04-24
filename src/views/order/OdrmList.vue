<template>
  <a-card :bordered="false">

    <!--    <a-locale-provider :locale="locale">-->
    <!--      <div class="locale-components" :key="(!!locale).toString()">-->

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <!-- 订单批号 -->
          <a-col :span="6">
            <a-form-item :label="$t('odrm.factOdrNo')">
              <a-input :placeholder="this.$t('common.pleaseInput') + this.$t('odrm.factOdrNo')"
                       v-model="queryParam.factOdrNo"></a-input>
            </a-form-item>
          </a-col>
          <!-- 型体编号 -->
          <a-col :span="6">
            <a-form-item :label="$t('odrm.styleNo')">
              <a-input :placeholder="this.$t('common.pleaseInput') + this.$t('odrm.styleNo')"
                       v-model="queryParam.styleNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">{{$t('common.query')}}</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">{{$t('common.reset')}}</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">{{$t('common.add')}}</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('订单主表')">{{$t('common.export')}}</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button type="primary" icon="import">{{$t('common.import')}}</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            {{$t('common.delete')}}
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> {{$t('common.batchOperation')}}
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>
        <span>{{$t('common.selected')}}</span>
        <a style="font-weight: 600">
          {{ selectedRowKeys.length }}
        </a>
        <span>{{$t('common.item')}}</span>
        <a style="margin-left: 24px" @click="onClearSelected">{{$t('common.empty')}}</a>
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
          <a @click="handleEdit(record)">{{$t('common.edit')}}</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">{{$t('common.more')}} <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm :title="$t('common.deleteConfirm')" @confirm="() => handleDelete(record.id)">
                  <a>{{$t('common.delete')}}</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <odrm-modal ref="modalForm" @ok="modalFormOk"/>

    <!--      </div>-->
    <!--    </a-locale-provider>-->

  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import OdrmModal from './modules/OdrmModal'
  import JDate from '@/components/jeecg/JDate'
  // import enUS from 'ant-design-vue/lib/locale-provider/en_US';
  // import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
  // import viVN from 'ant-design-vue/lib/locale-provider/vi_VN';

  export default {
    name: 'OdrmList',
    mixins: [JeecgListMixin],
    components: {
      OdrmModal,
      JDate
    },
    data() {
      return {
        // locale: enUS,
        // locale: zhCN,
        // locale: viVN,
        description: '订单主表管理页面',
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
          {
            title: this.$t('odrm.factOdrNo'),
            align: 'center',
            dataIndex: 'factOdrNo'
          },
          {
            title: this.$t('odrm.styleNo'),
            align: 'center',
            dataIndex: 'styleNo'
          },
          {
            title: this.$t('odrm.custReqDate'),
            align: 'center',
            dataIndex: 'custReqDate'
          },
          {
            title: this.$t('odrm.odrQty'),
            align: 'center',
            dataIndex: 'odrQty'
          },
          {
            title: this.$t('common.createTime'),
            align: 'center',
            dataIndex: 'createTime'
          },
          {
            title: this.$t('common.updateTime'),
            align: 'center',
            dataIndex: 'updateTime'
          },
          {
            title: this.$t('common.action'),
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        // 请求参数
        url: {
          list: '/order/odrm/list',
          delete: '/order/odrm/delete',
          deleteBatch: '/order/odrm/deleteBatch',
          exportXlsUrl: 'order/odrm/exportXls',
          importExcelUrl: 'order/odrm/importExcel'
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },


    methods: {

      initDictConfig() {
      }

    },

    mounted() {
      console.log(`国际化：${this.locale}`);
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>