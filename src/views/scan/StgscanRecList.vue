<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="5" :sm="7">
            <a-form-item label="扫描日期">
              <j-date placeholder="请选择日期" v-model="queryParam.recDate"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="仓库">
              <j-select-stkidm placeholder="请选择仓库" v-model="queryParam.stkNo" disabled/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="存放区域">
              <j-select-locate placeholder="请输入存放区域" v-model="queryParam.locateNo" disabled/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="6">
            <a-form-item label="存放地点">
              <a-input placeholder="请扫描地点条码" v-model="queryParam.locArea" disabled></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">

          </template>
          <a-col :md="2" :sm="3" align="center">
            <a title="产生入库单" style="margin-right: 8px" @click="genInStock">
              <img width="24" height="24" src="@/assets/run.png"/>
            </a>
            <a title="未扫描箱号">
              <img width="24" height="24" src="@/assets/noScan.png"/>
            </a>
<!--            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">-->
<!--            <a @click="handleToggleSearch" style="margin-left: 8px">-->
<!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
<!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
<!--              </a>-->
<!--            </span>-->
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div>
      <a-row :gutter="24" style="margin-bottom: 8px">
        <a-col :md="6" :sm="8">
          <a-input
            @keyup.enter="handleKeyupEnter"
            placeholder="扫描条码(地点6位|外箱12位)"
            v-model="queryParam.barNo"
            size="large"
            style="padding-left: 4px">
            <a-icon slot="prefix" type="scan"/>
          </a-input>
          <audio ref="audio" :src="audioFile" autoplay />
<!--          <audio ref="audio" :src="audioFile" muted />-->
        </a-col>
        <a-col :md="18" :sm="16">
          <span style="font-size: 24px; color: red">
            {{ errorMessage }}
          </span>
        </a-col>
      </a-row>

      <!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <!--      <a-button type="primary" icon="download" @click="handleExportXls('成品入库扫描(卡洛驰)')">导出</a-button>-->
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
      <a-row :span="24" style="margin-bottom: 10px">
        <a-col :span="3">
          <a-row>
            <div style="border:1px solid #91d5ff; border-radius: 4px; color: purple">
              <a-row style="font-size: 18px; padding-left: 4px; text-align:left">
                {{this.sizeNo==''?'SIZE':this.sizeNo}}
              </a-row>
              <a-row>
                <div style="font-size: 72px; margin-top: -27px; text-align: center">
                  {{this.sizeQty}}
                </div>
              </a-row>
            </div>
          </a-row>
          <a-row>
            <div style="text-align:center">
              扫描中
            </div>
          </a-row>
        </a-col>
        <a-col :span="5">
          <a-row>
            <div style="border:1px solid #91d5ff; border-radius: 4px; font-size: 72px; text-align: center; color: blue">
              {{this.scannedBoxes}}
            </div>
          </a-row>
          <a-row>
            <div style="text-align:center">
              已扫描箱数
            </div>
          </a-row>
        </a-col>
        <a-col :span="11">
          <a-row>
            <div style="border:1px solid #91d5ff; border-radius: 4px; font-size: 72px; text-align:center; color: green">
              {{this.totalBoxes}}/{{this.totalPairs}}
            </div>
          </a-row>
          <a-row>
            <div style="text-align:center">
              总箱数 / 总双数
            </div>
          </a-row>
        </a-col>
        <a-col :span="5">
          <a-row>
            <div align="left" style="border:1px solid #91d5ff; border-radius: 4px; font-size: 24px; padding-left: 4px">
              <a-row>
                <a-row :span="24">
<!--                  <a-col :span="8">-->
                    订单: {{this.factOdrNo}}
<!--                  </a-col>-->
<!--                  <a-col :span="16">-->

<!--                  </a-col>-->
                </a-row>
                <a-row :span="24">
<!--                  <a-col :span="8">-->
                    型体: {{this.styleNo}}
<!--                  </a-col>-->
<!--                  <a-col :span="16">-->

<!--                  </a-col>-->
                </a-row>
                <a-row :span="24">
<!--                  <a-col :span="8">-->
                    颜色: {{this.styleColor}}
<!--                  </a-col>-->
<!--                  <a-col :span="16">-->

<!--                  </a-col>-->
                </a-row>
              </a-row>
            </div>
          </a-row>
          <a-row>
            <div align="center">
              订单信息
            </div>
          </a-row>
        </a-col>
      </a-row>

      <!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
      <!--        <a-row :gutter="24">-->
      <!--          <a-col :md="3" :sm="3" style="text-align: center; font-size: 96px">-->
      <!--            96-->
      <!--          </a-col>-->
      <!--          <a-col :md="6" :sm="6" style="text-align: center; font-size: 96px">-->
      <!--            24470-->
      <!--          </a-col>-->
      <!--          <a-col :md="15" :sm="15">-->
      <!--            <a-row style="text-align: center; font-size: 72px">-->
      <!--              24470/197640-->
      <!--            </a-row>-->
      <!--            <a-row>-->
      <!--              <a-row :gutter="24">-->
      <!--                <a-col :md="12" :sm="12">-->
      <!--                  订单：-->
      <!--                </a-col>-->
      <!--                <a-col :md="12" :sm="12">-->
      <!--                  颜色：-->
      <!--                </a-col>-->
      <!--              </a-row>-->
      <!--              <a-row>-->
      <!--                型体：-->
      <!--              </a-row>-->
      <!--            </a-row>-->
      <!--          </a-col>-->
      <!--        </a-row>-->
      <!--        <a-row :gutter="24">-->
      <!--          <a-col :md="6" :sm="8">-->

      <!--          </a-col>-->
      <!--        </a-row>-->
      <!--&lt;!&ndash;        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&ndash;&gt;-->
      <!--&lt;!&ndash;        <a style="margin-left: 24px" @click="onClearSelected">清空</a>&ndash;&gt;-->
      <!--      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="barNo"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading">

        <span
          slot="actionRecDate"
          slot-scope="text, record, index">
          {{ dataSource[index].recDate.substring(0,4) + '/' + dataSource[index].recDate.substring(4,6) + '/' +  dataSource[index].recDate.substring(6,8) }}
        </span>

        <span
          slot="actionRecTime"
          slot-scope="text, record, index">
          {{ dataSource[index].recTime.substring(0,2) + ':' + dataSource[index].recTime.substring(2,4) + ':' +  dataSource[index].recTime.substring(4) }}
        </span>

        <span slot="action" slot-scope="text, record">
          <a-popconfirm title="确定删除吗?" @confirm="() => deleteScanRecord(record.barNo)">
            <a-icon slot="icon" type="question-circle-o" style="color: red" />
            <a>删除</a>
          </a-popconfirm>

<!--          <a @click="handleEdit(record)">编辑</a>-->

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
    <stgscanRec-modal ref="modalForm" @ok="modalFormOk"></stgscanRec-modal>
  </a-card>
</template>

<script>
  import StgscanRecModal from './modules/StgscanRecModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JDate from '@/components/jeecg/JDate'
  import JSelectStkidm from '@/components/jeecgbiz/JSelectStkidm'
  import JSelectLocate from '@/components/jeecgbiz/JSelectLocate'
  import { getAction } from '@/api/manage'
  import $ from 'jquery'
  import { dateFormat } from '../../components/_util/dateFormat'

  export default {
    name: 'StgscanRecList',
    mixins: [JeecgListMixin],
    components: {
      StgscanRecModal,
      JDate,
      JSelectStkidm,
      JSelectLocate
    },
    data() {
      return {
        description: '成品入库扫描(卡洛驰)管理页面',
        errorMessage: '',
        audioFile: '',
        addressPrefix: 'http://192.168.3.11/',
        locAreaStatus: 'OLD',
        styleNo: '',
        articNo: '',
        styleColor: '',
        sizeNo: '',
        sizeQty: 0,
        factOdrNo: '',
        customNo: '',
        totalBoxes: 0,
        totalPairs: 0,
        scannedBoxes: 0,
        insertSuccess: false,
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
          // {
          //      title: '阶段编号',
          //      align:"center",
          //      dataIndex: 'stgNo'
          //     },
          {
            title: '外箱编号',
            align: 'center',
            dataIndex: 'barNo'
          },
          // {
          //   title: '订单',
          //   align: 'center',
          //   dataIndex: 'factOdrNo'
          // },
          // {
          //   title: '型体',
          //   align: 'center',
          //   dataIndex: 'styleNo'
          // },
          // {
          //   title: '颜色',
          //   align: 'center',
          //   dataIndex: 'styleColor'
          // },
          {
            title: '扫描日期',
            align: 'center',
            // dataIndex: 'recDate'
            dataIndex: 'actionRecDate',
            scopedSlots: { customRender: 'actionRecDate' }
          },
          {
            title: '扫描时间',
            align: 'center',
            // dataIndex: 'recTime'
            dataIndex: 'actionRecTime',
            scopedSlots: { customRender: 'actionRecTime' }
          },
          // {
          //   title: '组别编号',
          //   align: 'center',
          //   dataIndex: 'secNo'
          // },
          // {
          //      title: '入库单号',
          //      align:"center",
          //      dataIndex: 'inNo'
          //     },
          {
            title: '仓库',
            align: 'center',
            dataIndex: 'stkNo'
          },
          // {
          //   title: '存放区编号',
          //   align: 'center',
          //   dataIndex: 'locateNo'
          // },
          // {
          //      title: '电脑IP',
          //      align:"center",
          //      dataIndex: 'scanIp'
          //     },
          // {
          //   title: '生产日期',
          //   align: 'center',
          //   dataIndex: 'proDate'
          // },
          // {
          //      title: '生产厂别',
          //      align:"center",
          //      dataIndex: 'proFact'
          //     },
          // {
          //      title: '产生入库单标记(0:未产生 1:已产生 2:待产生)',
          //      align:"center",
          //      dataIndex: 'genInStockRmk'
          //     },
          {
            title: '存放地点',
            align: 'center',
            dataIndex: 'locArea'
          },
          {
            title: '扫描用户',
            align: 'center',
            dataIndex: 'userNo'
          },
          // {
          //      title: 'locNoOut',
          //      align:"center",
          //      dataIndex: 'locNoOut'
          //     },
          // {
          //      title: 'locAreaOut',
          //      align:"center",
          //      dataIndex: 'locAreaOut'
          //     },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/scan/stgscanRec/list',
          delete: "/scan/stgscanRec/delete",
          // deleteBatch: "/scan/stgscanRec/deleteBatch",
          getLocArea: '/scan/stgscanRec/getLocArea',
          getMonthlySettlement: '/scan/stgscanRec/getMonthlySettlement',
          getRepeatScan: '/scan/stgscanRec/getRepeatScan',
          getOrderData: '/scan/stgscanRec/getOrderData',
          getMoldingData: '/scan/stgscanRec/getMoldingData',
          getNoGenOrder: '/scan/stgscanRec/getNoGenOrder',
          getTotalBoxesPairs: '/scan/stgscanRec/getTotalBoxesPairs',
          getScannedBoxes: '/scan/stgscanRec/getScannedBoxes',
          getLastLocArea: '/scan/stgscanRec/getLastLocArea',
          insertScanRecord: '/scan/stgscanRec/insertScanRecord',
          genInStock: '/scan/stgscanRec/genInStock',
          deleteScanRecord: '/scan/stgscanRec/deleteScanRecord',
          exportXlsUrl: 'scan/stgscanRec/exportXls',
          importExcelUrl: 'scan/stgscanRec/importExcel'
        }
      }
    },

    created() {
      // let today = dateFormat('yyyyMMdd', new Date())
      // this.queryParam.recDate = today
      this.queryParam.stkNo = 'GC'
      this.queryParam.locateNo = '01'
    },

    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {


      async handleKeyupEnter(e) {
        let startDate = new Date()
        // let userNo = this.$store.state.user.username
        // let userNo1 = this.$store.state.user
        // for (let key in userNo1) {
        //   console.log(key + ':' + userNo1[key])
        // }
        // if (userNo == null || userNo == '') {
        //   this.audioFile = this.addressPrefix + 'hammer.mp3'
        //   this.audioFile = require("@/assets/audio/other/hammer.mp3")
        //   this.$refs.audio.load()
        //   this.errorMessage = '获取登录用户名失败，请尝试退出再重新登录！'
        //   return
        // }
        /*
          1.检查是否选择【扫描日期】
          2.获取扫描日期、扫描时间、扫描年月
          */
        let recDate = this.queryParam.recDate
        let recTime = dateFormat('HHmmss', new Date())
        if (recDate == undefined || recDate == null || recDate == '') {
          // this.audioFile = this.addressPrefix + "hammer.mp3"
          this.audioFile = require("@/assets/audio/other/hammer.mp3")
          this.$refs.audio.load()
          this.errorMessage = '请选择扫描日期！'
          this.queryParam.barNo = ''
          return
        }
        recDate = this.queryParam.recDate.replace(/-/g, "")
        let recYearMonth = recDate.slice(0,6)
        /*
          1.检查是否选择【仓库】
          */
        let stkNo = this.queryParam.stkNo
        // if (stkNo.length == 0) {
        //   this.audioFile = this.addressPrefix + 'hammer.mp3'
        //   this.audioFile = require("@/assets/audio/other/hammer.mp3")
        //   this.$refs.audio.load()
        //   this.errorMessage = '请选择仓库！'
        //   this.queryParam.barNo = ''
        //   return
        // }
        /*
          1.正在扫描的条码，包括存放地点条码和外箱条码
          */
        let barNo = e.target.value
        /*
          1.检查条码长度，存放地点条码长度6位，外箱编号条码长度12位
          */
        if (barNo.length != 6 && barNo.length != 12) {
          // this.audioFile = this.addressPrefix + 'lengtherror.mp3'
          this.audioFile = require("@/assets/audio/other/lengtherror.mp3")
          this.$refs.audio.load()
          this.errorMessage = '条码长度错误(地点6位|外箱12位)：' + barNo
          this.queryParam.barNo = ''
          return
        }
        /*
          1.检查是否月结
          */
        let monthlySettlement = ''
        await getAction(this.url.getMonthlySettlement, { pssr: stkNo }).then((res) => {
          if (res.success) {
            monthlySettlement = res.result
          } else if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
        if (recYearMonth <= monthlySettlement) {
          // this.audioFile = this.addressPrefix + 'yyj.mp3'
          this.audioFile = require("@/assets/audio/other/yyj.mp3")
          this.$refs.audio.load()
          this.errorMessage = '已月结，不允许扫描，请检查扫描日期！'
          this.queryParam.barNo = ''
          return
        }
        /*
          1.当条码长度为6位时，说明当前扫描的条码是【存放地点】条码
          2.检查【存放地点】条码是否存在
          3.自动填写【存放地点】并返回
          4.每次扫描【存放地点】条码后，将存放地点状态改为"NEW"
         */
        let locateNo = this.queryParam.locateNo
        if (barNo.length == 6) {
          let arr1 = new Array(3)
          arr1[0] = stkNo
          arr1[1] = '01'
          arr1[2] = barNo.toUpperCase()
          let pssr = arr1.toString()
          await getAction(this.url.getLocArea, { pssr: pssr }).then((res) => {
            if (res.success) {
              this.queryParam.locArea = res.result
            } else if (res.code === 510) {
              this.$message.warning(res.message)
            }
          })
          if (this.queryParam.locArea == null) {
            // this.audioFile = this.addressPrefix + 'areaerror.mp3'
            this.audioFile = require("@/assets/audio/other/areaerror.mp3")
            this.$refs.audio.load()
            this.errorMessage = '存放地点错误：' + barNo.toUpperCase()
            this.queryParam.barNo = ''
            return
          } else {
            // this.audioFile = this.addressPrefix + 'notify.mp3'
            this.audioFile = require("@/assets/audio/other/notify.mp3")
            this.$refs.audio.load()
            this.errorMessage = '已设置新的存放地点：' + barNo.toUpperCase()
            this.locAreaStatus = 'NEW'
            this.queryParam.locArea = barNo.toUpperCase()
            this.queryParam.barNo = ''
            return
          }
        }
        /*
          1.获取订单、型体、外箱编号等数据
          2.客户是【爱派客】和【爱派客(香港)】时，将仓库改为【爱派客汀山成品仓(DS)】
         */
        let orderData = ''
        await getAction(this.url.getOrderData, { pssr: barNo }).then((res) => {
          if (res.success) {
            orderData = res.result
            if (orderData != null) {
              this.styleNo = res.result.styleNo
              this.articNo = res.result.articNo
              this.styleColor = res.result.styleColor
              this.sizeNo = res.result.sizeNo
              this.sizeQty = res.result.sizeQty
              this.factOdrNo = res.result.factOdrNo
              this.customNo = res.result.customNo
              // console.log(`订单信息：${this.factOdrNo}|${this.styleNo}|${this.styleColor}|${this.sizeNo}|${this.sizeQty}`)
            }
          } else if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
        if (orderData == null) {
          // this.audioFile = this.addressPrefix + 'outboxerror.mp3'
          this.audioFile = require("@/assets/audio/other/outboxerror.mp3")
          this.$refs.audio.load()
          this.errorMessage = '外箱编号错误：' + barNo
          this.queryParam.barNo = ''
          return
        } else {
          if (this.customNo == 'CR002' || this.customNo == 'GT018') {
            stkNo = 'DS'
            this.queryParam.stkNo = 'DS'
          } else {
            stkNo = 'GC'
            this.queryParam.stkNo = 'GC'
          }
        }
        /*
          1.本条码是否重复扫描(已做成品入库扫描)
         */
        let repeatScan = false
        await getAction(this.url.getRepeatScan, { pssr: barNo }).then((res) => {
          if (res.success && res.result > 0) {
            repeatScan = true
            // console.log(`重复扫描：${repeatScan}`)
          } else if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
        if (repeatScan == true) {
          // this.audioFile = this.addressPrefix + 'repeatscan.mp3'
          this.audioFile = require("@/assets/audio/other/repeatscan.mp3")
          this.$refs.audio.load()
          this.errorMessage = '重复扫描：' + barNo
          this.queryParam.barNo = ''
          return
        }
        /*
          1.是否已完成成型包装扫描，并产生回馈单
          2.获取成型包装扫描之厂别、组别、本箱双数、本箱已扫描数
         */
        let proFact = ''
        let secNo = ''
        let outboxQty = ''
        let scanQty = ''
        await getAction(this.url.getMoldingData, { pssr: barNo }).then((res) => {
          if (res.success) {
            proFact = res.result.proFact
            secNo = res.result.secNo
            outboxQty = res.result.outboxQty
            scanQty = res.result.scanQty
          } else if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
        if (scanQty < outboxQty) {
          // this.audioFile = this.addressPrefix + 'hammer.mp3'
          this.audioFile = require("@/assets/audio/other/hammer.mp3")
          this.$refs.audio.load()
          this.errorMessage = '成型包装未扫描或未产生回馈单：' + barNo
          this.queryParam.barNo = ''
          return
        }
        /*
          1.获取未产生入库单之订单编号
          2.同一用户，扫描同一张工厂订单，需产生一张入库单，否则不能扫描另一张订单
         */
        let noGenOrder = ''
        // let arr2 = new Array(2)
        // arr2[0] = stkNo
        // arr2[1] = userNo
        // let pssr1 = arr2.toString()
        await getAction(this.url.getNoGenOrder, { pssr: stkNo }).then((res) => {
          if (res.success) {
            noGenOrder = res.result
            // console.log(`订单编号：${noGenOrder}`)
          } else if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
        if (noGenOrder != null && noGenOrder != '' && noGenOrder != this.factOdrNo) {
          // this.audioFile = this.addressPrefix + 'hammer.mp3'
          this.audioFile = require("@/assets/audio/other/hammer.mp3")
          this.$refs.audio.load()
          this.errorMessage = '上一张订单未产生入库单，请检查！'
          this.queryParam.barNo = ''
          return
        }
        /*
          1.获取订单总箱数、总双数、已扫描箱数
         */
        await getAction(this.url.getTotalBoxesPairs, { pssr: this.factOdrNo }).then((res) => {
          if (res.success) {
            this.totalBoxes = res.result.totalBoxes
            this.totalPairs = res.result.totalPairs
            this.scannedBoxes = res.result.scanBoxes
            // console.log(`总箱数：${this.totalBoxes}，总双数：${this.totalPairs}`)
          } else if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
        // /*
        //   1.获取订单已扫描箱数
        //  */
        // await getAction(this.url.getScannedBoxes, { pssr: this.factOdrNo }).then((res) => {
        //   if (res.success) {
        //     this.scannedBoxes = res.result
        //     // console.log(`已扫描箱数：${this.scannedBoxes}`)
        //   } else if (res.code === 510) {
        //     this.$message.warning(res.message)
        //   }
        // })
        /*
          1.扫描【外箱编号】条码后，当存放地点状态为"NEW"时，改为"OLD"
          2.当存放地点状态为"OLD"时，获取订单最后一次入库之存放地点
          3.首次入库订单：未填写存放地点，提示扫描存放地点条码；已填写存放地点，提示是否存放到该地点(该地点可能是上一个订单存放的地点)
          4.非首次入库订单：未填写存放地点，自动填上存放地点；已填写存放地点，将旧存放地点改为新存放地点
         */
        let oldFactOdrNo = ''
        let lastLocArea = ''
        if (this.locAreaStatus == 'NEW') {
          this.locAreaStatus = 'OLD'
        } else if (this.locAreaStatus == 'OLD') {
          await getAction(this.url.getLastLocArea, { pssr: this.factOdrNo }).then((res) => {
            if (res.success) {
              lastLocArea = res.result
            } else if (res.code === 510) {
              this.$message.warning(res.message)
            }
          })
          if (lastLocArea == null) {
            if (oldFactOdrNo != this.factOdrNo) {
              if (this.queryParam.locArea == '' || this.queryParam.locArea == null) {
                this.errorMessage = '新订单，请扫描【存放地点】条码！'
              } else {
                this.errorMessage = '新订单，存放到【' + this.queryParam.locArea + '】？'
              }
              oldFactOdrNo = this.factOdrNo
              this.locAreaStatus = 'NEW'
              // this.audioFile = this.addressPrefix + 'hammer.mp3'
              this.audioFile = require("@/assets/audio/other/hammer.mp3")
              this.$refs.audio.load()
              this.queryParam.barNo = ''
              return
            }
          } else if (lastLocArea != null) {
            if (this.queryParam.locArea != lastLocArea) {
              this.locAreaStatus = 'NEW'
              this.queryParam.locArea = lastLocArea
              if (this.queryParam.locArea == null || this.queryParam.locArea == '') {
                this.errorMessage = '旧订单，已将存放地点改为【' + lastLocArea + '】'
              } else {
                this.errorMessage = '旧订单，已将存放地点从【' + this.queryParam.locArea + '】改为【' + lastLocArea + '】'
              }
              // this.audioFile = this.addressPrefix + 'notify.mp3'
              this.audioFile = require("@/assets/audio/other/notify.mp3")
              this.$refs.audio.load()
            }
          }
        }
        /*
          1.扫描【外箱编号】条码前，需先扫描【存放地点】条码
          */
        if (this.queryParam.locArea == null || this.queryParam.locArea == undefined) {
          // this.audioFile = this.addressPrefix + 'hammer.mp3'
          this.audioFile = require("@/assets/audio/other/hammer.mp3")
          this.$refs.audio.load()
          this.errorMessage = '请先扫描存放地点条码，再扫描外箱编号条码！'
          this.queryParam.barNo = ''
          return
        }
        /*
          1.声音提示已入库扫描箱数
          2.扫描最后一箱，播放victory提示音，表示本订单入库扫描已全部完成
         */
        let scanningBoxes = this.scannedBoxes + 1
        if (scanningBoxes < this.totalBoxes) {
          this.scannedBoxes ++
          // this.audioFile = this.addressPrefix + scanningBoxes + '.mp3'
          this.setAudioFile(this.scannedBoxes)
          this.errorMessage = ''
        } else {
          // this.audioFile = this.addressPrefix + 'victory.mp3'
          this.audioFile = require("@/assets/audio/other/victory.mp3")
          this.$refs.audio.load()
          this.errorMessage = '订单' + this.factOdrNo + '入库扫描已全部完成！'
        }
        /*
          1.显示扫描记录
         */
        let recordObject = {
          "barNo": barNo,
          "factOdrNo": this.factOdrNo,
          "styleNo": this.styleNo,
          "styleColor": this.styleColor,
          "sizeNo": this.sizeNo,
          "sizeQty": this.sizeQty,
          "stkNo": stkNo,
          "locateNo": locateNo,
          "locArea": this.queryParam.locArea,
          "userNo": this.$store.state.user.username,
          "recDate": recDate,
          "recTime": recTime
        }
        this.dataSource.push(recordObject)
        /*
          1.清除扫描输入框数据
         */
        this.queryParam.barNo = ''

        let endDate = new Date()
        let interval = endDate - startDate
        console.log(startDate + '/' + endDate + '/' + interval)

        /*
          1.插入扫描记录
         */
        let arr3 = new Array(8)
        arr3[0] = recDate
        arr3[1] = proFact
        arr3[2] = barNo
        arr3[3] = recTime
        arr3[4] = secNo
        arr3[5] = stkNo
        arr3[6] = locateNo
        arr3[7] = this.queryParam.locArea
        let pssr3 = arr3.toString()
        await getAction(this.url.insertScanRecord, { pssr: pssr3 }).then((res) => {
          if (res.success) {
            console.log('插入扫描记录成功！')
          } else if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })

      },

      genInStock() {
        getAction(this.url.genInStock, { pssr: '' }).then((res) => {
          if (res.success) {
            let oReturn = res.result
            this.queryParam.locArea = ''
            if (oReturn.slice(0, 1) == '0') {
              this.$message.success('产生入库单成功！')
            } else {
              this.$message.warning(oReturn.slice(2))
              return
            }
          } else if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
      },

      //删除扫描记录
      deleteScanRecord(e) {
        getAction(this.url.deleteScanRecord, { pssr: e }).then((res) => {
          if (res.success) {
            if (res.result == 0) {
              this.$message.success('未找到扫描记录！')
            } else if (res.result == 1) {
              this.removeByValue(this.dataSource, "barNo", e)
              this.$message.success(`已删除：${e}`)
              console.log(`删除成功：${e}`)
              return
            }
          } else if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
      },

      removeByValue: function(arr, attr, value) {  //数组，属性，属性值
        let index=0;
        for(let i in arr){
          if(arr[i][attr]==value){
            index=i;
            break;
          }
        }
        arr.splice(index,1);
      },

      //设置声音文件
      setAudioFile(audioFileName) {
        const requireComponents = require.context('@/assets/audio/number', false, /\.mp3/)
        requireComponents.keys().forEach(fileName => {
          // 组件实例
          const reqCom = requireComponents(fileName)
          // 截取路径作为组件名
          const reqComName = fileName.replace(/\.\/(.*)\.mp3/, '$1')
          if (reqComName == audioFileName) {
            this.audioFile = reqCom
            this.$refs.audio.load()
          }
          // console.log(`声音文件名称：${reqComName}`)
          // console.log(`声音文件：${reqCom}`)
        })
      }


    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>