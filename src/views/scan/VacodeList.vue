<template>
  <a-card :bordered="false">

    <!--    <a-locale-provider :locale="locale">-->
    <!--      <div class="locale-components" :key="(!!locale).toString()">-->

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
            <a-form-item :label="this.$t('vacode.vacodeNo')">
              <a-input :placeholder="this.$t('common.pleaseInput') + this.$t('vacode.vacodeNo')"
                       v-model="queryParam.vacodeNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item :label="this.$t('vacode.vacodeNm')">
              <a-input :placeholder="this.$t('common.pleaseInput') + this.$t('vacode.vacodeNm')"
                       v-model="queryParam.vacodeNm"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">

            <!--          <a-col :md="6" :sm="8">-->
            <!--            <a-form-item label="异动人">-->
            <!--              <a-input placeholder="请输入异动人" v-model="queryParam.userNo"></a-input>-->
            <!--            </a-form-item>-->
            <!--          </a-col>-->
            <!--          <a-col :md="6" :sm="8">-->
            <!--            <a-form-item label="异动时间">-->
            <!--              <a-input placeholder="请输入异动时间" v-model="queryParam.modifyDt"></a-input>-->
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
      <a-button v-has="'vacode:add'" @click="handleAdd" type="primary" icon="plus">{{$t('common.add')}}</a-button>
      <a-button v-has="'vacode:exportXls'" type="primary" icon="download" @click="handleExportXls('增值表')">{{$t('common.export')}}</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button v-has="'vacode:importExcel'" type="primary" icon="import">{{$t('common.import')}}</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            {{$t('common.delete')}}
          </a-menu-item>
        </a-menu>
        <a-button v-has="'vacode:deleteBatch'" style="margin-left: 8px"> {{$t('common.batchOperation')}}
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> {{$t('common.selected')}} <a
        style="font-weight: 600">{{ selectedRowKeys.length }}</a> {{$t('common.item')}}
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
          <a v-has="'vacode:edit'" @click="handleEdit(record)">{{$t('common.edit')}}</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">{{$t('common.more')}} <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'vacode:delete'">{{$t('common.delete')}}</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <vacode-modal ref="modalForm" @ok="modalFormOk"></vacode-modal>

    <!--      </div>-->
    <!--    </a-locale-provider>-->

  </a-card>
</template>

<script>
  import VacodeModal from './modules/VacodeModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  // import enUS from 'ant-design-vue/lib/locale-provider/en_US';
  // import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
  // import viVN from 'ant-design-vue/lib/locale-provider/vi_VN';

  export default {
    name: 'VacodeList',
    mixins: [JeecgListMixin],
    components: {
      VacodeModal
    },
    data() {
      return {
        // locale: enUS,
        // locale: zhCN,
        // locale: viVN,
        description: '增值表管理页面',
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
            title: this.$t('vacode.vacodeNo'),
            align: 'center',
            dataIndex: 'vacodeNo',
              sorter: true,
          },
          {
            title: this.$t('vacode.vacodeNm'),
            align: 'center',
            dataIndex: 'vacodeNm',
              sorter: true,
          },
          {
            title: this.$t('common.createTime'),
            align: 'center',
            dataIndex: 'createBy',
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
          list: '/scan/basic/vacode/list',
          delete: '/scan/basic/vacode/delete',
          deleteBatch: '/scan/basic/vacode/deleteBatch',
          exportXlsUrl: 'scan/basic/vacode/exportXls',
          importExcelUrl: 'scan/basic/vacode/importExcel'
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {

      // handleDelete() {
      //   let createByUser = this.columns["createBy"];
      //   console.log("建立用户：" + createByUser);
      //   let currentUser = this.$store.state.user.username;
      //   console.log("当前用户：" + currentUser);
      //   if (createByUser != currentUser) {
      //     alert('非本用户建立资料，不可删除！')
      //   }
      // }

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>