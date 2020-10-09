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
          <a-col :md="8" :sm="8">
            <a-form-item label="结算组织">
              <j-dict-select-tag
                @input="updateSettleOrg"
                placeholder="请输入结算组织"
                v-model="queryParam.settleOrg"
                dictCode="settle_org"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="8">
            <a-form-item label="截止日期">
              <j-date
                @change="updateAnalysisEndDate"
                v-model="queryParam.analysisEndDate"
                placeholder="请输入截止日期"></j-date>
            </a-form-item>
          </a-col>
          <!--        <template v-if="toggleSearchStatus">-->
          <!--          <a-col :md="6" :sm="8">-->
          <!--          <a-form-item label="绩效部门">-->
          <!--            <a-input placeholder="请输入绩效部门" v-model="queryParam.deptNm"></a-input>-->
          <!--          </a-form-item>-->
          <!--        </a-col>-->
          <!--        <a-col :md="5" :sm="8">-->
          <!--            <a-form-item label="客户简称">-->
          <!--              <a-input placeholder="请输入客户简称" v-model="queryParam.custShortNm"></a-input>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col :md="6" :sm="8">-->
          <!--            <a-form-item label="custFullNm">-->
          <!--              <a-input placeholder="请输入custFullNm" v-model="queryParam.custFullNm"></a-input>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col :md="6" :sm="8">-->
          <!--            <a-form-item label="recCondition">-->
          <!--              <a-input placeholder="请输入recCondition" v-model="queryParam.recCondition"></a-input>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--           </template>-->
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
              <!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
              <!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
              <!--              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>


    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button type="primary" icon="download" @click="handleExportXls('债权明细表')">导出</a-button>

      <a-divider type="horizontal"/>

      <a-row :gutter="24">
        <h2 :style="{textAlign: 'center', marginTop: '1px'}">债权明细表</h2>
      </a-row>
      <a-row :gutter="24">
        <a-col :md="12" :sm="12">
          <div :style="{textAlign: 'left', marginTop: '1px'}">
<!--            结算组织：{{dataSource[0].settleOrg.toString()}}-->
          </div>
        </a-col>
        <a-col :md="12" :sm="12">
          <div :style="{textAlign: 'right', marginTop: '1px'}">
<!--            截止日期：{{dataSource[0].analysisEndDate.toString().slice(0,10)}}-->
          </div>
        </a-col>
      </a-row>

      <!--      <div class="no-print">-->
      <!--        <a-button icon="printer" v-print="'#printContent'" ghost type="primary">打印</a-button>-->
      <!--      </div>-->
      <!--      <a-button type="primary" icon="printer" @click="handlePrint('债权明细表')">打印</a-button>-->
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

    <!-- 打印 -->
    <section ref="print" id="printContent" class="abcdefg">

      <!-- table区域-begin -->
      <div>
        <!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
        <!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项-->
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

        <span slot="action1" slot-scope="text, record, index">
          {{ record.fDate.toString().slice(0,10) }}
        </span>

          <span slot="action2" slot-scope="text, record, index">
          {{ record.fEndDate.toString().slice(0,10) }}
        </span>

<!--          <span slot="action3" slot-scope="text, record, index">-->
<!--          {{ record.analysisEndDate.toString().slice(0,10) }}-->
<!--        </span>-->


          <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
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

    </section>

    <!-- 表单区域 -->
    <vCreditorsRightsDetail-modal ref="modalForm" @ok="modalFormOk"></vCreditorsRightsDetail-modal>
  </a-card>
</template>

<script>
  import VCreditorsRightsDetailModal from './modules/VCreditorsRightsDetailModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JDate from '../../components/jeecg/JDate'
  import { getAction } from '@/api/manage'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'

  export default {
    name: 'VCreditorsRightsDetailList',
    mixins: [JeecgListMixin],
    components: {
      JDate,
      VCreditorsRightsDetailModal,
      JDictSelectTag
    },
    data() {
      return {
        description: '债权明细表管理页面',
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
          //   title: '结算组织',
          //   align:"center",
          //   dataIndex: 'settleOrg'
          // },
          {
            title: '绩效部门',
            align: 'center',
            dataIndex: 'deptNm'
          },
          {
            title: '客户简称',
            align: 'center',
            dataIndex: 'custShortNm'
          },
          {
            title: '客户全称',
            align: 'center',
            dataIndex: 'custFullNm'
          },
          {
            title: '月结方式',
            align: 'center',
            dataIndex: 'recCondition'
          },
          {
            title: '月结天数',
            align: 'center',
            dataIndex: 'recConditionDays'
          },
          {
            title: '币别',
            align: 'center',
            dataIndex: 'currencyNm'
          },
          // {
          //      title: 'fDate',
          //      align:"center",
          //      dataIndex: 'fDate'
          //     },
          {
            title: '业务日期',
            dataIndex: 'action1',
            align: 'center',
            scopedSlots: { customRender: 'action1' }
          },
          // {
          //      title: 'fEndDate',
          //      align:"center",
          //      dataIndex: 'fEndDate'
          //     },
          {
            title: '到期日',
            dataIndex: 'action2',
            align: 'center',
            scopedSlots: { customRender: 'action2' }
          },
          {
            title: '应收金额',
            align: 'center',
            dataIndex: 'amountReceivable'
          },
          {
            title: '逾期天数',
            align: 'center',
            dataIndex: 'overdueDays'
          },
          // {
          //   title: '截止日期',
          //   align: 'center',
          //   dataIndex: 'analysisEndDate',
          //   scopedSlots: { customRender: 'action3' }
          // },
          {
            title: '账期范围',
            align: 'center',
            dataIndex: 'accountPeriodRange'
          }
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align:"center",
          //   scopedSlots: { customRender: 'action' },
          // }
        ],
        url: {
          updateSettleOrg: '/finance/vCreditorsRightsDetail/updateSettleOrg',
          updateAnalysisEndDate: '/finance/vCreditorsRightsDetail/updateAnalysisEndDate',
          list: '/finance/vCreditorsRightsDetail/list',
          delete: '/finance/vCreditorsRightsDetail/delete',
          deleteBatch: '/finance/vCreditorsRightsDetail/deleteBatch',
          exportXlsUrl: 'finance/vCreditorsRightsDetail/exportXls',
          importExcelUrl: 'finance/vCreditorsRightsDetail/importExcel'
        }
      }
    },

    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      },



    },

    methods: {
      updateSettleOrg() {
        // this.queryParam = {}
        let p = this.getQueryParams()
        let settleOrg = ''
        Object.keys(p).forEach(function(key) {
          if (key == 'settleOrg') {
            settleOrg = p[key]
          }
        })
        console.log(`组织机构：${settleOrg}`)
        getAction(this.url.updateSettleOrg, { pssr: settleOrg }).then((res) => {
          if (res.success) {
            console.log(`更新成功！`)
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
      },

      updateAnalysisEndDate() {
        // this.queryParam = {}
        let p = this.getQueryParams()
        let analysisEndDate = ''
        Object.keys(p).forEach(function(key) {
          if (key == 'analysisEndDate') {
            analysisEndDate = p[key]
          }
        })
        console.log(`组织机构：${analysisEndDate}`)
        getAction(this.url.updateAnalysisEndDate, { pssr: analysisEndDate }).then((res) => {
          if (res.success) {
            console.log(`更新成功！`)
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>