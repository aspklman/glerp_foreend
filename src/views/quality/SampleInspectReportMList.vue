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
            <a-form-item label="客户订单">
              <a-input placeholder="请输入客户订单" v-model="queryParam.custOdrNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleReportMAdd" type="primary" icon="plus">新增</a-button>
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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio', columnTitle: '选择行'}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">验货</a>
<!--          <a-divider type="vertical" />-->
<!--          <a @click="handleReportMRpt(record)">报告</a>-->

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleReportMRework(record)">翻箱</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleReportMRpt(record)">验货报告</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>

            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <sampleInspectReportM-modal ref="modalForm" @ok="modalFormOk" :reportMain="reportMain" />

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
  import moment from 'moment'

  const formatDate = (val) => {
    // return val ? moment(val).format('YYYY-MM-DD') : ''
    return val ? val.slice(0, 10) : ''
  }

  export default {
    name: "SampleInspectReportMList",
    mixins: [JeecgListMixin],
    components: {
      SampleInspectReportMModal,
      SampleInspectReportMAddModal,
      SampleInspectReportMRptModal,
      SampleInspectReportMReworkModal,
    },
    data () {
      return {
        description: '验货报告主表管理页面',
        reportMain: [],
        reworkParams: [],
        // 表头
        columns: [
          // {
          //   title: '#',
          //   dataIndex: '',
          //   key: 'rowIndex',
          //   width: 60,
          //   align: "center",
          //   customRender:function (t, r, index) {
          //     return parseInt(index)+1;
          //   }
          // },
          // {
          //   title: '厂区编号',
          //   align:"center",
          //   dataIndex: 'factNo'
          // },
          {
            title: '客户订单',
            align:"center",
            dataIndex: 'custOdrNo',
            sorter: true,
          },
          {
            title: '验货次数',
            align:"center",
            dataIndex: 'versionNo',
            sorter: true,
          },
          {
            title: '型体编号',
            align:"center",
            dataIndex: 'styleShorten'
          },
          {
            title: 'Pace编码',
            align:"center",
            dataIndex: 'paceCode'
          },
          {
            title: '模具名称和颜色',
            align:"center",
            dataIndex: 'modelColour'
          },
          {
            title: '订单类型',
            align:"center",
            dataIndex: 'orderType_dictText'
          },
          {
            title: '订单数量',
            align:"center",
            dataIndex: 'odrQty'
          },
          {
            title: '验货日期',
            align:"center",
            dataIndex: 'inspectDate',
            render: formatDate()
          },
          {
            title: '验货结果',
            align:"center",
            dataIndex: 'inspectorDecision_dictText'
          },
          {
            title: '操作',
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

      handleReportMAdd: function() {
        this.$refs.reportMAddModal.add();
      },

      handleReportMRpt: function(record) {
        this.$refs.reportMRptModal.edit(record);
      },

      handleReportMRework(record) {
        this.$refs.reportMReworkModal.edit(record);
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
              // 验货报告主表数据
              this.reportMain[0] = record.custOdrNo
              this.reportMain[1] = record.styleShorten
              this.reportMain[2] = record.inspectDate.slice(0,10)
              this.reportMain[3] = record.versionNo
              this.reportMain[4] = record.odrQty
              this.reportMain[5] = record.paceCode
              this.reportMain[6] = record.modelColour
              this.reportMain[7] = record.orderType
              this.reportMain[57] = record.inspectorDecision
              let itemMainNo
              let itemMediumNo
              // 验货报告--取样数量
              this.getSampleQty(this.reportMain[0])
              // 验货报告--缺陷数量
              let items_defect_qty = 19
              for (let i=1; i<=3; i++) {
                itemMainNo = i * 2
                items_defect_qty = items_defect_qty + 1
                this.getDefectQty(this.reportMain[0], itemMainNo, items_defect_qty)
              }
              // 验货报告--检查点
              let items_check_points = 8
              for (let i=1; i<=3; i++) {
                if (i == 1 || i == 3) {
                  for (let j=1; j<=4; j++) {
                    itemMainNo = i * 2
                    itemMediumNo = j * 2
                    items_check_points = items_check_points + 1
                    // console.log(`参数_1_：${record.custOdrNo}|${record.versionNo}|${record.styleShorten}|${itemMainNo.toString()}|${itemMediumNo.toString()}|${items_check_points}`)
                    this.getCheckPoints(record.custOdrNo, record.versionNo, record.styleShorten, itemMainNo.toString(), itemMediumNo.toString(), items_check_points)
                  }
                } else if (i == 2) {
                  for (let j=1; j<=3; j++) {
                    itemMainNo = i * 2
                    itemMediumNo = j * 2
                    items_check_points = items_check_points + 1
                    // console.log(`参数_1_：${record.custOdrNo}|${record.versionNo}|${record.styleShorten}|${itemMainNo.toString()}|${itemMediumNo.toString()}|${items_check_points}`)
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
            // console.log(`取样数量：${this.reportMain[8]}`)
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
      },

      getDefectQty(custOdrNo, itemMainNo, items_defect_qty) {
        let pp = new Array(2)
        pp[0] = custOdrNo
        pp[1] = itemMainNo
        let pssr = pp.toString()
        getAction(this.url.getDefectQty, { pssr: pssr }).then((res) => {
          if (res.success) {
            console.log(`缺陷数量：${res.result}`)
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
        // console.log(`参数:${pp[0]}|${pp[1]}|${pp[2]}|${pp[3]}|${pp[4]}`)
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

      initDictConfig() {
      }

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>