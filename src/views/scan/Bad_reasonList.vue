<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">




          <a-col :md="6" :sm="8">
            <a-form-item :label="$t('badReason.badLevel')">
              <j-dict-select-tag :placeholder="$t('common.pleaseSelect') + $t('badReason.badLevel')"
                                 v-model="queryParam.badLevel" dictCode="bad_level"/>
              <!--              <a-input placeholder="请输入不良等级" v-model="queryParam.badLevel"></a-input>-->
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item :label="$t('badReason.badNo')">
              <a-input :placeholder="$t('common.pleaseSelect') + $t('badReason.badNo')"
                       v-model="queryParam.badNo"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">

            <a-col :md="6" :sm="8">
              <a-form-item :label="$t('badReason.badCause')">
                <a-input :placeholder="$t('common.pleaseSelect') + $t('badReason.badCause')"
                         v-model="queryParam.badCause"></a-input>
              </a-form-item>
            </a-col>
            <!--          <a-col :md="6" :sm="8">-->
            <!--            <a-form-item label="异动人">-->
            <!--              <a-input placeholder="请输入异动人" v-model="queryParam.userNo"></a-input>-->
            <!--            </a-form-item>-->
            <!--          </a-col>-->
          </template>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">{{$t('common.query')}}</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">{{$t('common.reset')}}</a-button>
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
      <a-button v-has="'bad_reason:add'" @click="handleAdd" type="primary" icon="plus">{{$t('common.add')}}</a-button>
      <a-button v-has="'bad_reason:exportXls'" type="primary" icon="download" @click="handleExportXls('不良原因(新材)表')">{{$t('common.export')}}</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button v-has="'bad_reason:importExcel'" type="primary" icon="import">{{$t('common.import')}}</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            {{$t('common.delete')}}
          </a-menu-item>
        </a-menu>
        <a-button v-has="'bad_reason:deleteBatch'" style="margin-left: 8px"> {{$t('common.batchOperation')}}
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> {{$t('common.selected')}} <a
        style="font-weight: 600">{{ selectedRowKeys.length }}</a>{{$t('common.item')}}
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
          <a v-has="'bad_reason:edit'" @click="handleEdit(record)">{{$t('common.edit')}}</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">{{$t('common.more')}} <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm :title="$t('common.deleteConfirm')" @confirm="() => handleDelete(record.id)">
                  <a  v-has="'bad_reason:delete'">{{$t('common.delete')}}</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <bad_reason-modal ref="modalForm" @ok="modalFormOk"></bad_reason-modal>
  </a-card>
</template>

<script>
  import Bad_reasonModal from './modules/Bad_reasonModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'

  export default {
    name: 'Bad_reasonList',
    mixins: [JeecgListMixin],
    components: {
      Bad_reasonModal,
      JDictSelectTag
    },
    data() {
      return {
        
        description: '不良原因(新材)表管理页面',
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
            title: this.$t('badReason.badLevel'),
            align: 'center',
            dataIndex: 'badLevel',
              sorter: true,
          },
          {
            title: this.$t('badReason.badNo'),
            align: 'center',
            dataIndex: 'badNo',
              sorter: true,
          },
          {
            title: this.$t('badReason.badCause'),
            align: 'center',
            dataIndex: 'badCause',
              sorter: true,
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
            title: this.$t('badReason.badCauseEn'),
            align: 'center',
            dataIndex: 'badCauseEn',
              sorter: true,
          },
          {
            title: this.$t('common.createTime'),
            align: 'center',
            dataIndex: 'createTime',
              sorter: true,
          },
          {
            title: this.$t('common.updateTime'),
            align: 'center',
            dataIndex: 'updateTime',
              sorter: true,
          },
          {
            title: this.$t('common.action'),
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/scan/bad_reason/list',
          delete: '/scan/bad_reason/delete',
          deleteBatch: '/scan/bad_reason/deleteBatch',
          exportXlsUrl: 'scan/bad_reason/exportXls',
          importExcelUrl: 'scan/bad_reason/importExcel'
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      // addToA() {
      //   console.log("Add to A")
      //   return this.a + this.age;
      // },
      // addToB() {
      //   console.log("Add to B")
      //   return this.b + this.age;
      // },
    },
    computed: {

    }

  }
</script>
<style scoped>
  @import '~@assets/less/common.less'


</style>