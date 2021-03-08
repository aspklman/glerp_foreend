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
          <!--          <a-col :md="6" :sm="8">-->
          <!--            <a-form-item label="proDept">-->
          <!--              <a-input placeholder="请输入proDept" v-model="queryParam.proDept"></a-input>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <a-col :md="6" :sm="8">
            <a-form-item :label="this.$t('stylem.style')">
              <a-input :placeholder="this.$t('common.pleaseInput') + this.$t('stylem.style')" v-model="queryParam.styleShorten"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item :label="this.$t('custom.customFnm')">
              <a-input :placeholder="this.$t('common.pleaseInput') + this.$t('custom.customFnm')" v-model="queryParam.customFnm"></a-input>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">

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
    <!--      <a-button type="primary" icon="download" @click="handleExportXls('型体检验项目')">导出</a-button>-->
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
        rowKey="styleShorten"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :customRow="onClickRow"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio', columnTitle: '选择行'}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a>
            <img width="24" height="24" @click="handleEdit(record)" v-if="record.styleMark==0 && reportMain[100]==record.styleShorten" src="@/assets/add.png">
            <img width="24" height="24" @click="handleEdit(record)" v-else-if="record.styleMark==1 && reportMain[100]==record.styleShorten" src="@/assets/edit.png">
          </a>
          <!--          <a @click="handleEdit(record)">{{record.styleMark==0?'详情':''}}</a>-->

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
    <sampleInspectStyle-modal ref="modalForm" @ok="modalFormOk" :reportMain="reportMain"></sampleInspectStyle-modal>
  </a-card>
</template>

<script>
  import SampleInspectStyleModal from './modules/SampleInspectStyleModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction } from '../../api/manage'

  export default {
    name: 'SampleInspectStyleList',
    mixins: [JeecgListMixin],
    components: {
      SampleInspectStyleModal
    },
    data() {
      return {
        description: '型体检验项目管理页面',
        reportMain: [],
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
          // {
          //      title: 'proDept',
          //      align:"center",
          //      dataIndex: 'proDept'
          //     },
          {
            title: this.$t('stylem.style'),
            align: 'center',
            dataIndex: 'styleShorten'
          },
          {
            title: this.$t('custom.customFnm'),
            align: 'center',
            dataIndex: 'customFnm'
          },
          // {
          //   title: 'styleMark',
          //   align: 'center',
          //   dataIndex: 'styleMark'
          // },
          {
            title: this.$t('common.action'),
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/quality/sampleInspectStyle/list',
          delete: '/quality/sampleInspectStyle/delete',
          deleteBatch: '/quality/sampleInspectStyle/deleteBatch',
          exportXlsUrl: 'quality/sampleInspectStyle/exportXls',
          importExcelUrl: 'quality/sampleInspectStyle/importExcel',
          getCheckPoints: "quality/sampleInspectStyle/getCheckPoints",
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {

      onClickRow(record) {
        return {
          on: {
            click: () => {
              let keys = []
              keys.push(record.styleShorten)
              this.selectedRowKeys = keys
              this.reportMain[100] = record.styleShorten
              // 型体检验项目--检查点
              let itemMainNo
              let itemMediumNo
              let items_check_points = 8
              for (let i=1; i<=3; i++) {
                if (i == 1 || i == 2) {
                  for (let j=1; j<=4; j++) {
                    itemMainNo = i * 2
                    itemMediumNo = j * 2
                    items_check_points = items_check_points + 1
                    this.getCheckPoints(record.styleShorten, itemMainNo.toString(), itemMediumNo.toString(), items_check_points)
                  }
                } else if (i == 3) {
                  for (let j=1; j<=5; j++) {
                    itemMainNo = i * 2
                    itemMediumNo = j * 2
                    items_check_points = items_check_points + 1
                    this.getCheckPoints(record.styleShorten, itemMainNo.toString(), itemMediumNo.toString(), items_check_points)
                  }
                }
              }
            }
          }
        }
      },

      getCheckPoints(styleShorten, itemMainNo, itemMediumNo, items_check_points) {
        let pp = new Array(3)
        pp[0] = styleShorten
        pp[1] = itemMainNo
        pp[2] = itemMediumNo
        let pssr = pp.toString()
        getAction(this.url.getCheckPoints, { pssr: pssr }).then((res) => {
          if (res.success) {
            this.reportMain[items_check_points] = res.result;
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