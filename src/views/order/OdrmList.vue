<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <!-- 工厂编号 -->
<!--          <a-col :span="6">-->
<!--            <a-form-item label="工厂编号" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              <a-select v-decorator="[ 'factNo', validatorRules.factNo ]" placeholder="请选择工厂编号" v-model="queryParam.factNo">-->
<!--                <a-select-option :value="'0006'">广东国立科技股份有限公司</a-select-option>-->
<!--                <a-select-option :value="'0002'">东莞市国立飞织制品有限公司</a-select-option>-->
<!--              </a-select>-->
<!--            </a-form-item>-->

<!--            <a-form-item label="工厂编号" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              <a-select defaultValue="0006" style="width: 300px" @change="handleChange">>-->
<!--                <a-select-option value="0006">广东国立科技股份有限公司</a-select-option>-->
<!--                <a-select-option value="0002">广东国立科技股份有限公司</a-select-option>-->
<!--              </a-select>-->
<!--            </a-form-item>-->

<!--            <a-form-item label="工厂编号" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              <a-input placeholder="请输入工厂编号" v-model="queryParam.factNo" defaultValue="0006"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->

          <!-- 订单批号 -->
          <a-col :span="6">
            <a-form-item label="订单批号">
              <a-input placeholder="请输入订单批号" v-model="queryParam.factOdrNo"></a-input>
            </a-form-item>
          </a-col>

          <!-- 型体编号 -->
          <a-col :span="6">
            <a-form-item label="型体编号">
              <a-input placeholder="请输入型体编号" v-model="queryParam.styleNo"></a-input>
            </a-form-item>
          </a-col>

<!--          &lt;!&ndash; 创建时间 &ndash;&gt;-->
<!--          <a-col :md="10" :sm="12">-->
<!--            <a-form-item label="创建时间" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">-->
<!--              <j-date v-model="queryParam.createTime_begin" :showTime="true" date-format="YYYY-MM-DD HH:mm:ss" style="width:45%" placeholder="请选择开始日期" ></j-date>-->
<!--              <span style="width: 10px;">~</span>-->
<!--              <j-date v-model="queryParam.createTime_end" :showTime="true" date-format="YYYY-MM-DD HH:mm:ss" style="width:45%" placeholder="请选择结束日期"></j-date>-->
<!--            </a-form-item>-->
<!--          </a-col>-->

          <!-- 查询按钮区域 -->
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('订单主表')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>
        <span>已选择</span>
        <a style="font-weight: 600">
          {{ selectedRowKeys.length }}
        </a>
        <span>项</span>
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :scroll="{ x: 1200, y: 1000 }"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
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

    <!-- 表单区域 -->
    <odrm-modal ref="modalForm" @ok="modalFormOk"/>

  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import OdrmModal from './modules/OdrmModal'
  // import moment from 'moment'
  import JDate from '@/components/jeecg/JDate'

  export default {
    name: "OdrmList",
    mixins: [JeecgListMixin],
    components: {
      OdrmModal,
      JDate
    },
    data () {
      return {
        description: '订单主表管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 40,
            fixed: 'left',
            align: "center",
            customRender:function (t, r, index) {
              return parseInt(index)+1;
            }
          },
          // {
          //   title: '厂区编号',
          //   align:"center",
          //   dataIndex: 'factNo',
          //   key: 'factNo',
          //   width: 100,
          //   fixed: 'left'
          // },
          {
            title: '订单批号',
            align:"center",
            dataIndex: 'factOdrNo',
            key: 'factOdrNo',
            width: 100,
            fixed: 'left'
          },
          {
            title: '客户编号',
            align:"center",
            dataIndex: 'customNo',
            width: 80,
          },
          // {
          //   title: '唛头编号',
          //   align:"center",
          //   dataIndex: 'markNo',
          //   width: 80,
          // },
          // {
          //   title: '线别编号',
          //   align:"center",
          //   dataIndex: 'lineNo',
          //   width: 80,
          // },
          {
            title: '型体编号',
            align:"center",
            dataIndex: 'styleNo',
            width: 120,
          },
          // {
          //   title: '品牌编号',
          //   align:"center",
          //   dataIndex: 'brandNo',
          //   width: 80,
          // },
          // {
          //   title: '楦头肥度',
          //   align:"center",
          //   dataIndex: 'lastWidth',
          //   width: 80,
          // },
          // {
          //   title: '冲销po信息',
          //   align:"center",
          //   dataIndex: 'poNo',
          //   width: 80,
          // },
          // {
          //   title: '生产部别',
          //   align:"center",
          //   dataIndex: 'proDept',
          //   width: 80,
          // },
          {
            title: '客户订单编号',
            align:"center",
            dataIndex: 'custOdrNo',
            width: 120,
          },
          {
            title: '客户交期',
            align:"center",
            dataIndex: 'custReqDate',
            width: 100,
          },
          {
            title: '接单日期',
            align:"center",
            dataIndex: 'revOdrDate',
            width: 100,
          },
          // {
          //   title: '预计用量编号',
          //   align:"center",
          //   dataIndex: 'purplanNo',
          //   width: 100,
          // },
          // {
          //   title: '第一次确认日',
          //   align:"center",
          //   dataIndex: 'fCfmDate',
          //   width: 80,
          // },
          // {
          //   title: '最后确认日',
          //   align:"center",
          //   dataIndex: 'lCfmDate',
          //   width: 80,
          // },
          // {
          //   title: 'SIZE种类',
          //   align:"center",
          //   dataIndex: 'sizeKind',
          //   width: 80,
          // },
          {
            title: '订单双数',
            align:"center",
            dataIndex: 'odrQty',
            width: 80,
          },
          // {
          //   title: '每箱双数',
          //   align:"center",
          //   dataIndex: 'ctnPair',
          //   width: 80,
          // },
          // {
          //   title: '总箱数',
          //   align:"center",
          //   dataIndex: 'odrTotCtn',
          //   width: 80,
          // },
          // {
          //   title: '安排验货日',
          //   align:"center",
          //   dataIndex: 'arrInsDate',
          //   width: 80,
          // },
          // {
          //   title: '实际验货日',
          //   align:"center",
          //   dataIndex: 'actInsDate',
          //   width: 80,
          // },
          // {
          //   title: '实际出货日',
          //   align:"center",
          //   dataIndex: 'shipDate',
          //   width: 80,
          // },
          // {
          //   title: '取消日期',
          //   align:"center",
          //   dataIndex: 'cancelDate',
          //   width: 80,
          // },
          // {
          //   title: '目的国家',
          //   align:"center",
          //   dataIndex: 'destCountry',
          //   width: 80,
          // },
          // {
          //   title: '目的港口',
          //   align:"center",
          //   dataIndex: 'destPort',
          //   width: 80,
          // },
          // {
          //   title: '订单年月',
          //   align:"center",
          //   dataIndex: 'odrYymm',
          //   width: 100,
          // },
          // {
          //   title: '订单类别',
          //   align:"center",
          //   dataIndex: 'odrKind',
          //   width: 80,
          // },
          // {
          //   title: '订单性质',
          //   align:"center",
          //   dataIndex: 'odrType',
          //   width: 80,
          // },
          // {
          //   title: '原订单厂别',
          //   align:"center",
          //   dataIndex: 'oriFctryNo',
          //   width: 80,
          // },
          // {
          //   title: '代工厂别',
          //   align:"center",
          //   dataIndex: 'outworkFctryNo',
          //   width: 80,
          // },
          // {
          //   title: '用量产生时间',
          //   align:"center",
          //   dataIndex: 'purplanDate',
          //   width: 140,
          // },
          // {
          //   title: '主料加成比',
          //   align:"center",
          //   dataIndex: 'mainmatAddRate',
          //   width: 80,
          // },
          // {
          //   title: '副料加成比',
          //   align:"center",
          //   dataIndex: 'submatAddRate',
          //   width: 80,
          // },
          // {
          //   title: '厂内交期',
          //   align:"center",
          //   dataIndex: 'factReqDate',
          //   width: 80,
          // },
          // {
          //   title: '出货数量',
          //   align:"center",
          //   dataIndex: 'shipQty',
          //   width: 80,
          // },
          {
            title: '币别',
            align:"center",
            dataIndex: 'coinKind_dictText',
            width: 120,
          },
          {
            title: '含税单价',
            align:"center",
            dataIndex: 'unitPrice',
            width: 80,
          },
          // {
          //   title: '异动人',
          //   align:"center",
          //   dataIndex: 'userNo',
          //   width: 100,
          // },
          // {
          //   title: '异动时间',
          //   align:"center",
          //   dataIndex: 'modifyDt',
          //   width: 140,
          // },
          // {
          //   title: '预计用量版次',
          //   align:"center",
          //   dataIndex: 'edition',
          //   width: 80,
          // },
          // {
          //   title: '用量转档注记',
          //   align:"center",
          //   dataIndex: 'tranRmk',
          //   width: 80,
          // },
          // {
          //   title: '暂定版SIZE编号',
          //   align:"center",
          //   dataIndex: 'sizeNo',
          //   width: 80,
          // },
          // {
          //   title: '验货数量',
          //   align:"center",
          //   dataIndex: 'insTqty',
          //   width: 80,
          // },
          // {
          //   title: 'SKU NO 开发版本编号',
          //   align:"center",
          //   dataIndex: 'skuNo',
          //   width: 100,
          // },
          // {
          //   title: '固定装注记',
          //   align:"center",
          //   dataIndex: 'ctnFixRmk',
          //   width: 80,
          // },
          // {
          //   title: '翻箱次数',
          //   align:"center",
          //   dataIndex: 'siCheckNum',
          //   width: 80,
          // },
          // {
          //   title: '生产年月',
          //   align:"center",
          //   dataIndex: 'productYymm',
          //   width: 80,
          // },
          // {
          //   title: '生产周次',
          //   align:"center",
          //   dataIndex: 'productWeek',
          //   width: 80,
          // },
          // {
          //   title: '销售注记',
          //   align:"center",
          //   dataIndex: 'salRmk',
          //   width: 80,
          // },
          // {
          //   title: '生产指令确认注记',
          //   align:"center",
          //   dataIndex: 'proeRmk',
          //   width: 80,
          // },
          // {
          //   title: '生产指令确认人',
          //   align:"center",
          //   dataIndex: 'proeUser',
          //   width: 100,
          // },
          // {
          //   title: '生产指令确认时间',
          //   align:"center",
          //   dataIndex: 'proeDt',
          //   width: 140,
          // },
          // {
          //   title: '实际生产栋别',
          //   align:"center",
          //   dataIndex: 'aproDept',
          //   width: 80,
          // },
          // {
          //   title: '增值代码',
          //   align:"center",
          //   dataIndex: 'vaCode',
          //   width: 80,
          // },
          // {
          //   title: '条码批号',
          //   align:"center",
          //   dataIndex: 'lotNo',
          //   width: 100,
          // },
          // {
          //   title: '备注',
          //   align:"center",
          //   dataIndex: 'remark',
          //   width: 300,
          // },
          // {
          //   title: '销售类别(财务)',
          //   align:"center",
          //   dataIndex: 'salKind',
          //   width: 80,
          // },
          // {
          //   title: '请款数量',
          //   align:"center",
          //   dataIndex: 'payQty',
          //   width: 80,
          // },
          {
            title: '审核注记',
            align:"center",
            dataIndex: 'verifyRmk_dictText',
            width: 80,
          },
          // {
          //   title: '审核人',
          //   align:"center",
          //   dataIndex: 'verifyUser',
          //   width: 80,
          // },
          // {
          //   title: '审核时间',
          //   align:"center",
          //   dataIndex: 'verifyDt',
          //   width: 80,
          // },
          // {
          //   title: '需成品鞋利库',
          //   align:"center",
          //   dataIndex: 'avaRmk',
          //   width: 80,
          // },
          // {
          //   title: '外包bom配色',
          //   align:"center",
          //   dataIndex: 'matchNo',
          //   width: 80
          // },
          // ,
          // {
          //   title: '创建人',
          //   align:"center",
          //   dataIndex: 'createBy',
          //   sorter: true
          // },
          {
            title: '创建时间',
            align:"center",
            dataIndex: 'createTime',
            sorter: true,
            width: 160
          },
          {
            title: '修改时间',
            align:"center",
            dataIndex: 'updateTime',
            sorter: true
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
            width: 120,
            fixed: 'right'
          }
        ],
        // validatorRules: {
        //   factNo: { rules: [{ required: true, message: '请输入工厂编号!'}], initialValue: '0006'},
        // },
        // 请求参数
    	url: {
              list: "/order/odrm/list",
              delete: "/order/odrm/delete",
              deleteBatch: "/order/odrm/deleteBatch",
              exportXlsUrl: "order/odrm/exportXls",
              importExcelUrl: "order/odrm/importExcel",
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
        }
      }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>