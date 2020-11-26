<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
<!--          <a-col :span="6">-->
<!--            <a-form-item label="厂区编号">-->
<!--              <a-input placeholder="请输入厂区编号" v-model="queryParam.factNo"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :span="6">
            <a-form-item :label="$t('odrm.custOdrNo')" >
              <a-input :placeholder="$t('common.pleaseInput') + $t('odrm.custOdrNo')" v-model="queryParam.custOdrNo"></a-input>
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

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleReportMAdd" type="primary" icon="plus">{{ $t('common.add') }}</a-button>
<!--      <a-button type="primary" icon="download" @click="handleExportXls('验货报告主表')">导出</a-button>-->
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
<!--      </a-dropdown>-->
    </div>

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
        :customRow="onClickRow"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio', columnTitle: $t('common.select') + $t('common.row')}"
        @change="handleTableChange">

        <span slot="actionInspectDate" slot-scope="text, record, index">
          {{ record.inspectDate.toString().slice(0,10) }}
        </span>

        <span :style="{color: record.inspectorDecision=='0'?'green':record.inspectorDecision=='1'?'red':''}"
              slot="actionInspectorDecision" slot-scope="text, record, index">
          {{ record.inspectorDecision=='0'?$t('sampleInspectReportM.accepted'):record.inspectorDecision=='1'?$t('sampleInspectReportM.rejected'):'' }}
        </span>

        <span slot="action" slot-scope="text, record">
<!--          <a @click="handleEdit(record)">验货</a>-->
          <a @click="handleEdit(record)">{{recordId==record.id?$t('sampleInspectReportM.inspect'):''}}</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">{{ $t('common.more') }}<a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleReportMRework(record)">{{ $t('sampleInspectReportM.rework') }}</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleReportMRpt(record)">{{ $t('sampleInspectReportM.inspectionReport') }}</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm :title="$t('common.deleteConfirm')" @confirm="() => handleDelete(record.id)">
                  <a>{{ $t('common.delete') }}</a>
                </a-popconfirm>
              </a-menu-item>

            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 验货 -->
    <sampleInspectReportM-modal ref="modalForm" @freshPage="freshPage" :reportMain="reportMain" />

    <!-- 新增 -->
    <sampleInspectReportMAdd-modal ref="reportMAddModal" @ok="reportMAddOk" />

    <!-- 报告 -->
    <sampleInspectReportMRpt-modal ref="reportMRptModal" @ok="reportMRptOk" :reportMain="reportMain" />

    <!-- 翻箱 -->
    <sampleInspectReportMRework-modal ref="reportMReworkModal" @ok="reportMReworkOk" :reworkParams="reworkParams" />

  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import SampleInspectReportMModal from './modules/SampleInspectReportMModal'
  import SampleInspectReportMAddModal from './modules/SampleInspectReportMAddModal'
  import SampleInspectReportMRptModal from './modules/SampleInspectReportMRptModal'
  import SampleInspectReportMReworkModal from './modules/SampleInspectReportMReworkModal'
  import { getAction } from '../../api/manage'


  export default {
    name: "SampleInspectReportMList",
    mixins: [JeecgListMixin],
    components: {
      SampleInspectReportMModal,
      SampleInspectReportMAddModal,
      SampleInspectReportMRptModal,
      SampleInspectReportMReworkModal,
    },
    // props: ['custOdrNo'],
    data () {
      return {
        description: '验货报告主表管理页面',
        reportMain: [],
        reworkParams: [],
        recordId: '',
        routeParam: '',
        // 表头
        columns: [
          // {
          //   title: '工厂订单',
          //   align:"center",
          //   dataIndex: 'factOdrNo',
          //   sorter: true,
          // },
          {
            title: this.$t('odrm.custOdrNo'),
            align:"center",
            dataIndex: 'custOdrNo',
            sorter: true,
          },
          {
            title: this.$t('sampleInspectReportM.inspectTimes'),
            align:"center",
            dataIndex: 'versionNo',
            sorter: true,
          },
          {
            title: this.$t('sampleInspectReportM.factStyleNo'),
            align:"center",
            dataIndex: 'styleShorten'
          },
          {
            title: this.$t('sampleInspectReportM.custStyleNo'),
            align:"center",
            dataIndex: 'paceCode'
          },
          // {
          //   title: '客户型体名称',
          //   align:"center",
          //   dataIndex: 'modelColour'
          // },
          {
            title: this.$t('sampleInspectReportM.orderType'),
            align:"center",
            dataIndex: 'orderType_dictText'
          },
          {
            title: this.$t('sampleInspectReportM.orderQty'),
            align:"center",
            dataIndex: 'odrQty'
          },
          {
            title: this.$t('sampleInspectReportM.inspectDate'),
            align:"center",
            dataIndex: 'inspectDate',
            scopedSlots: { customRender: 'actionInspectDate' },
          },
          {
            title: this.$t('sampleInspectReportM.inspectorDecision'),
            align:"center",
            dataIndex: 'actionInspectorDecision',
            scopedSlots: { customRender: 'actionInspectorDecision' },
          },
          {
            title: this.$t('common.action'),
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        // 请求参数
        url: {
          list: "/quality/sampleInspectReportM/list",
          delete: "/quality/sampleInspectReportM/delete",
          deleteBatch: "/quality/sampleInspectReportM/deleteBatch",
          exportXlsUrl: "quality/sampleInspectReportM/exportXls",
          importExcelUrl: "quality/sampleInspectReportM/importExcel",
          getSampleQty: "quality/sampleInspectReportM/getSampleQty",
          getDefectQty: "quality/sampleInspectReportM/getDefectQty",
          getCheckPoints: "quality/sampleInspectReportM/getCheckPoints",
          insertReportM: "/quality/sampleInspectReportM/insertReportM",
          insertReportD: "/quality/sampleInspectReportM/insertReportD",
        },
      }
    },

    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },


    methods: {

      freshPage() {
        this.loadData();
      },

      handleReportMAdd: function() {
        this.$refs.reportMAddModal.add();
      },

      handleReportMRpt: function(record) {
        this.$refs.reportMRptModal.edit(record);
      },

      handleReportMRework(record) {
        let inspectorDecision = record.inspectorDecision
        if (inspectorDecision == '1') {
          this.$refs.reportMReworkModal.edit(record);
        } else {
          this.$message.warning(`验货结果被拒绝时，才允许翻箱操作！`)
          return
        }
      },

      reportMAddOk() {
      },

      reportMRptOk() {
      },

      reportMReworkOk() {
      },

      onClickRow(record) {
        return {
          on: {
            click: () => {
              let keys = []
              keys.push(record.id)
              this.selectedRowKeys = keys
              this.recordId = record.id
              // 验货报告主表数据
              this.reportMain[100] = record.factOdrNo.trim()
              if (record.traceabilityCode == null) {
                this.reportMain[200] = ''
              } else {
                this.reportMain[200] = record.traceabilityCode.trim()
              }
              this.reportMain[0] = record.custOdrNo
              this.reportMain[1] = record.styleShorten
              this.reportMain[2] = record.inspectDate.slice(0,10)
              this.reportMain[3] = record.versionNo
              this.reportMain[4] = record.odrQty
              this.reportMain[5] = record.paceCode
              this.reportMain[6] = record.modelColour
              this.reportMain[7] = record.orderType
              this.reportMain[90] = record.inspectorDecision
              let itemMainNo
              let itemMediumNo
              // 验货报告--取样数量
              this.getSampleQty(this.reportMain[100])
              // 验货报告--缺陷数量
              let items_defect_qty = 50
              for (let i=1; i<=3; i++) {
                itemMainNo = i * 2
                items_defect_qty = items_defect_qty + 1
                this.getDefectQty(this.reportMain[100], itemMainNo, items_defect_qty, this.reportMain[3])
              }
              // 验货报告--检查点
              let items_check_points = 8
              for (let i=1; i<=3; i++) {
                if (i == 1 || i == 2) {
                  for (let j=1; j<=4; j++) {
                    itemMainNo = i * 2
                    itemMediumNo = j * 2
                    items_check_points = items_check_points + 1
                    this.getCheckPoints(record.custOdrNo, record.versionNo, record.styleShorten, itemMainNo.toString(), itemMediumNo.toString(), items_check_points)
                  }
                } else if (i == 3) {
                  for (let j=1; j<=5; j++) {
                    itemMainNo = i * 2
                    itemMediumNo = j * 2
                    items_check_points = items_check_points + 1
                    this.getCheckPoints(record.custOdrNo, record.versionNo, record.styleShorten, itemMainNo.toString(), itemMediumNo.toString(), items_check_points)
                  }
                }
              }
            }
          }
        }
      },

      getSampleQty(pssr) {
        getAction(this.url.getSampleQty, {pssr: pssr}).then((res) => {
          if (res.success) {
            this.reportMain[8] = res.result;
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
      },

      getDefectQty(factOdrNo, itemMainNo, items_defect_qty, versionNo) {
        let pp = new Array(3)
        pp[0] = factOdrNo
        pp[1] = itemMainNo
        pp[2] = versionNo
        let pssr = pp.toString()
        getAction(this.url.getDefectQty, { pssr: pssr }).then((res) => {
          if (res.success) {
            this.reportMain[items_defect_qty] = res.result;
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
      },

      getCheckPoints(custOdrNo, versionNo, styleShorten, itemMainNo, itemMediumNo, items_check_points) {
        let pp = new Array(5)
        pp[0] = custOdrNo
        pp[1] = versionNo
        pp[2] = styleShorten
        pp[3] = itemMainNo
        pp[4] = itemMediumNo
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

      queryOrder(custOdrNo) {
        this.queryParam.custOdrNo = custOdrNo;
        this.searchQuery();
      },

      initDictConfig() {
      }

    },

    created() {
      console.log(`客户订单`)
      this.routeParam = this.$route.params.custOdrNo;
      console.log(`客户订单2：${this.routeParam}`)
      this.queryOrder(this.routeParam)
      this.loadData()
    },

  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>