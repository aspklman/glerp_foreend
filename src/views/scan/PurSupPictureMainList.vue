<!--<template>-->
<!--  <div>-->
<!--    <div class="change-locale">-->
<!--      <span :style="{ marginRight: '16px' }">Change locale of components: </span>-->
<!--      <a-radio-group :defaultValue="null" @change="changeLocale">-->
<!--        <a-radio-button key="en" :value="null">中文</a-radio-button>-->
<!--        <a-radio-button key="vi" :value="viVN">Độ khẩn:</a-radio-button>-->
<!--      </a-radio-group>-->
<!--    </div>-->
<!--    <a-locale-provider :locale="locale">-->
<!--      <div class="locale-components" :key="(!!locale).toString()">-->
<!--        &lt;!&ndash; HACK: just refresh in production environment&ndash;&gt;-->
<!--        <div class="example">-->
<!--          <a-pagination :defaultCurrent="1" :total="50" showSizeChanger />-->
<!--        </div>-->
<!--        <div class="example">-->
<!--          <a-select showSearch style="width: 200px">-->
<!--            <a-select-option value="jack">jack</a-select-option>-->
<!--            <a-select-option value="lucy">lucy</a-select-option>-->
<!--          </a-select>-->
<!--          <a-date-picker />-->
<!--          <a-time-picker />-->
<!--          <a-range-picker style=" width: 200px " />-->
<!--        </div>-->
<!--        <div class="example">-->
<!--          <a-button type="primary" @click="showModal">Show Modal</a-button>-->
<!--          <a-button @click="info">Show info</a-button>-->
<!--          <a-button @click="confirm">Show confirm</a-button>-->
<!--          <a-popconfirm title="Question?">-->
<!--            <a href="#">Click to confirm</a>-->
<!--          </a-popconfirm>-->
<!--        </div>-->
<!--        <div className="example">-->
<!--          <a-transfer :dataSource="[]" showSearch :targetKeys="[]" :render="item => item.title" />-->
<!--        </div>-->
<!--        <div :style="{ width: '319px', border: '1px solid #d9d9d9', borderRadius: '4px' }">-->
<!--          <a-calendar :fullscreen="false" :value="moment()" />-->
<!--        </div>-->
<!--        <a-modal title="Locale Modal" v-model="visible">-->
<!--          <p>Locale Modal</p>-->
<!--        </a-modal>-->
<!--      </div>-->
<!--    </a-locale-provider>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--  // you should use import viVN from 'ant-design-vue/lib/locale-provider/vi_VN'-->
<!--  import viVN from 'ant-design-vue/lib/locale-provider/vi_VN';-->
<!--  import { Modal } from 'ant-design-vue';-->
<!--  import moment from 'moment';-->
<!--  import 'moment/locale/vi';-->
<!--  moment.locale('en');-->
<!--  const columns = [-->
<!--    {-->
<!--      title: 'Name',-->
<!--      dataIndex: 'name',-->
<!--      filters: [-->
<!--        {-->
<!--          text: 'filter1',-->
<!--          value: 'filter1',-->
<!--        },-->
<!--      ],-->
<!--    },-->
<!--    {-->
<!--      title: 'Age',-->
<!--      dataIndex: 'age',-->
<!--    },-->
<!--  ];-->
<!--  export default {-->
<!--    data() {-->
<!--      return {-->
<!--        visible: false,-->
<!--        locale: null,-->
<!--        viVN,-->
<!--      };-->
<!--    },-->
<!--    methods: {-->
<!--      moment,-->
<!--      showModal() {-->
<!--        this.visible = true;-->
<!--      },-->
<!--      hideModal() {-->
<!--        this.visible = false;-->
<!--      },-->
<!--      info() {-->
<!--        Modal.info({-->
<!--          title: 'some info',-->
<!--          content: 'some info',-->
<!--        });-->
<!--      },-->
<!--      confirm() {-->
<!--        Modal.confirm({-->
<!--          title: 'some info',-->
<!--          content: 'some info',-->
<!--        });-->
<!--      },-->
<!--      changeLocale(e) {-->
<!--        const localeValue = e.target.value;-->
<!--        this.locale = localeValue;-->
<!--        if (!localeValue) {-->
<!--          moment.locale('en');-->
<!--        } else {-->
<!--          moment.locale('vi');-->
<!--        }-->
<!--      },-->
<!--    },-->
<!--  };-->
<!--</script>-->

<!--<style scoped>-->
<!--  .locale-components {-->
<!--    border-top: 1px solid #d9d9d9;-->
<!--    padding-top: 16px;-->
<!--  }-->

<!--  .example {-->
<!--    margin: 16px 0;-->
<!--  }-->

<!--  .example > * {-->
<!--    margin-right: 8px;-->
<!--  }-->

<!--  .change-locale {-->
<!--    margin-bottom: 16px;-->
<!--  }-->
<!--</style>-->




<template>
  <a-card :bordered="false">

<!--    &lt;!&ndash; 切换语言组件 &ndash;&gt;-->
<!--    <div class="change-locale">-->
<!--      <span :style="{ marginRight: '16px' }">Change locale of components: </span>-->
<!--        <a-radio-group :defaultValue="null" @change="changeLocale">-->
<!--          <a-radio-button key="en" :value="null">English</a-radio-button>-->
<!--          <a-radio-button key="cn" :value="zhCN">中文</a-radio-button>-->
<!--          <a-radio-button key="vi" :value="viVN">Văn Tịnh</a-radio-button>-->
<!--        </a-radio-group>-->
<!--    </div>-->



    <a-locale-provider :locale="locale">
      <div class="locale-components" :key="(!!locale).toString()">

<!--        <div>-->
<!--          {{ $t('lang') }}-->
<!--        </div>-->

        <!-- 查询区域 -->
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="24">
    <!--          <a-col :span="6">-->
    <!--            <a-form-item label="公司编号">-->
    <!--              <a-input placeholder="请输入公司编号" v-model="queryParam.factNo"></a-input>-->
    <!--            </a-form-item>-->
    <!--          </a-col>-->
              <a-col :span="6">
                <a-form-item label="SKU">
                  <a-input placeholder="请输入SKU" v-model="queryParam.sku"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8" >
                <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                  <a-button type="primary" @click="searchQuery" icon="search">{{ $t('common.query') }}</a-button>
                  <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">{{ $t('common.reset') }}</a-button>
                </span>
              </a-col>

            </a-row>
          </a-form>
        </div>


<!--    &lt;!&ndash; 操作按钮区域 &ndash;&gt;-->
<!--    <div class="table-operator">-->
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
<!--      <a-button type="primary" icon="download" @click="handleExportXls('主表-SKU基础资料表')">导出</a-button>-->
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
<!--      </a-dropdown>-->
<!--    </div>-->



    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i>-->
<!--        <span>已选择</span>-->
<!--        <a style="font-weight: 600">-->
<!--          {{ selectedRowKeys.length }}-->
<!--        </a>-->
<!--        <span>项</span>-->
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
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">{{ $t('uploadPicture') }}</a>
<!--          <a-divider type="vertical" />-->
<!--          <a @click="handleDelete(record)">删除图片</a>-->



<!--          <a-divider type="vertical" />-->
<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
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
    <purSupPictureMain-modal ref="modalForm" @ok="modalFormOk"/>

      </div>
    </a-locale-provider>

  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import PurSupPictureMainModal from './modules/PurSupPictureMainModal'
  import PurSupPictureModal from './modules/PurSupPictureModal'
  // you should use import viVN from 'ant-design-vue/lib/locale-provider/vi_VN'
  // import enUS from 'ant-design-vue/lib/locale-provider/en_US';
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
  // import viVN from 'ant-design-vue/lib/locale-provider/vi_VN';
  import { Modal } from 'ant-design-vue';
  // import moment from 'moment';
  // import 'moment/locale/vi';
  // import 'moment/locale/zh-cn';
  // moment.locale('en');

  export default {
    name: "PurSupPictureMainList",
    mixins: [JeecgListMixin],
    components: {
      PurSupPictureMainModal,
      PurSupPictureModal,

    },
    data () {
      return {
        visible: false,
        locale: zhCN,
        description: '主表-SKU基础资料表管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender:function (t, r, index) {
              return parseInt(index)+1;
            }
          },
          {
            title: 'SKU',
            align:"center",
            dataIndex: 'sku'
          },
          {
            title: this.$t('purSupBasicData.statusLabel'),
            align:"center",
            dataIndex: 'status'
          },
          {
            title: this.$t('purSupBasicData.skuPurchaseNmLabel'),
            align:"center",
            dataIndex: 'skuPurchaseNm'
          },
          {
            title: this.$t('commonField.createTimeLabel'),
            align:"center",
            dataIndex: 'createTime'
          },
          {
            title: this.$t('commonField.updateTimeLabel'),
            align:"center",
            dataIndex: 'updateTime'
          },
          {
            title: this.$t('commonField.actionLabel'),
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        // 请求参数
    	url: {
              list: "/scan/purSupPictureMain/list",
              delete: "/scan/purSupPictureMain/delete",
              deleteBatch: "/scan/purSupPictureMain/deleteBatch",
              exportXlsUrl: "scan/purSupPictureMain/exportXls",
              importExcelUrl: "scan/purSupPictureMain/importExcel",
           },
        }
      },
      computed: {
        importExcelUrl: function(){
          return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
        }
      },


    methods: {

      initDictConfig() {
      },

      handleDelete: function (record) {
        this.$refs.PurSupPictureModal.edit(record);
        this.$refs.PurSupPictureModal.title = "删除";
        this.$refs.PurSupPictureModal.disableSubmit = false;
      },

      changeLocale(e) {
        const localeValue = e.target.value;
        this.locale = localeValue;
        // localStorage.setItem('locale', e);
        // this.$i18n.locale = e;
        // if (localeValue == 'en') {
        //   moment.locale('en');
        //   this.$i18n.locale = en;
        //   this.locale = enUS;
        //   console.log('点击了英文！');
        // } else if (localeValue == 'cn') {
        //   moment.locale('cn');
        //   this.$i18n.locale = cn;
        //   this.locale = zhCN;
        //   console.log('点击了中文！');
        // } else if (localeValue == 'vi') {
        //   moment.locale('vi');
        //   this.$i18n.locale = vi
        //   this.locale = viVN;
        //   console.log('点击了越文！');
        // }
      },

      // changeLocale(lang) {
      //   this.$i18n.locale = lang; //改变当前语言
      //   Vue.ls.set("language", lang);//将lang 语言存在localStorage里，main里面就会根据属性值进行判断 locale: Vue.ls.get("language", "zh-CN")
      // },

    }
  }
</script>

<!--<style scoped>-->
<!--  .locale-components {-->
<!--    border-top: 1px solid #d9d9d9;-->
<!--    padding-top: 16px;-->
<!--  }-->

<!--  .example {-->
<!--    margin: 16px 0;-->
<!--  }-->

<!--  .example > * {-->
<!--    margin-right: 8px;-->
<!--  }-->

<!--  .change-locale {-->
<!--    margin-bottom: 16px;-->
<!--  }-->
<!--</style>-->

<style scoped>
  @import '~@assets/less/common.less'

  /*.locale-components {*/
  /*  border-top: 1px solid #d9d9d9;*/
  /*  padding-top: 16px;*/
  /*}*/

  /*.change-locale {*/
  /*  !*margin-bottom: 16px;*!*/
  /*  text-align: right;*/
  /*}*/

</style>