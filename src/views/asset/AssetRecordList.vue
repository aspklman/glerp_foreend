<template>
  <a-card :bordered="false">

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
            <a-form-item label="资产编号">
              <a-input placeholder="请输入资产编号" v-model="queryParam.assetNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="资产名称">
              <a-input placeholder="请输入资产名称" v-model="queryParam.assetName"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :md="6" :sm="8">
            <a-form-item :label="班组">
              <j-select-org-group v-model="queryParam.deptNo" />
            </a-form-item>
          </a-col>

<!--          <a-col :md="6" :sm="8">-->
<!--            <a-form-item label="单位">-->
<!--              <a-input placeholder="请输入单位" v-model="queryParam.unit"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :md="6" :sm="8">-->
<!--            <a-form-item label="资产明细编号">-->
<!--              <a-input placeholder="请输入资产明细编号" v-model="queryParam.catalogId"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
           </template>
          <a-col :md="6" :sm="8" >
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

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button v-has="'assetrecord:add'" @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button v-has="'assetrecord:exportExcel'" type="primary" icon="download" @click="handleExportXls('资产档案表')">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button v-has="'assetrecord:importExcel'" type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="2" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button v-has="'assetrecord:deleteBatch'" style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
<!--      </a-dropdown>-->
    </div>

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
        :customRow="onClickRow"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio', columnTitle: '选择行'}"
        @change="handleTableChange">

        <!--------验收日期-------->
        <span
          slot="actionAcceptDate"
          slot-scope="text, record, index">
          <span v-if="record.acceptDate">{{ record.acceptDate.substring(0,4) + '-' + record.acceptDate.substring(4,6) + '-' +  record.acceptDate.substring(6,8) }}</span>
        </span>

        <!--------使用状况-------->
        <span :style="{color: record.state=='1'?'green':record.state=='2'?'blue':record.state=='3'?'greenyellow':record.state=='4'?'orange':record.state=='5'?'red':record.state=='6'?'purple':''}"
              slot="actionState" slot-scope="text, record, index">
          {{ record.state_dictText }}
        </span>

        <span slot="action" slot-scope="text, record">
          <a v-has="'assetrecord:edit'" @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a v-has="'assetrecord:detail'" @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a v-has="'assetrecord:assetCard'" @click="handleAssetCard(record)">固定资产卡</a>
              </a-menu-item>
              <a-menu-item>
                <a v-has="'assetrecord:assetInspect'" @click="handleAssetInspect(record)">固定资产验收单</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'assetrecord:delete'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <assetRecord-modal ref="modalForm" @ok="modalFormOk"></assetRecord-modal>

    <!-- 固定资产卡 -->
    <assetCard-modal ref="assetCardModal" :assetCard="assetCard" />

    <!-- 固定资产验收单 -->
    <assetInspect-modal ref="assetInspectModal" :assetInspect="assetInspect" />

  </a-card>
</template>

<script>
  import AssetRecordModal from './modules/AssetRecordModal'
  import AssetCardModal from './modules/AssetCardModal'
  import AssetInspectModal from './modules/AssetInspectModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JSelectOrgUnit from '../../components/jeecgbiz/JSelectOrgUnit'
  import JSelectOrgGroup from '../../components/jeecgbiz/JSelectOrgGroup'

  export default {
    name: "AssetRecordList",
    mixins:[JeecgListMixin],
    components: {
      JSelectOrgGroup,
      AssetRecordModal,
      AssetCardModal,
      AssetInspectModal,
      JSelectOrgUnit,
    },
    data () {
      return {
        description: '资产档案表管理页面',
        assetCard: {},
        assetInspect: {},
        // 表头
        columns: [
          // {
          //   title: '#',
          //   dataIndex: '',
          //   key:'rowIndex',
          //   width:60,
          //   align:"center",
          //   customRender:function (t,r,index) {
          //     return parseInt(index)+1;
          //   }
          // },
		   // {
       //      title: '厂区编号',
       //      align:"center",
       //      dataIndex: 'factNo'
       //     },
		   {
            title: '资产编号',
            align:"center",
            dataIndex: 'assetNo',
            sorter: true,
           },
		   {
            title: '资产名称',
            align:"center",
            dataIndex: 'assetName',
            sorter: true,
           },
		   // {
       //      title: '单位',
       //      align:"center",
       //      dataIndex: 'unit'
       //     },
		   // {
       //      title: '资产明细编号',
       //      align:"center",
       //      dataIndex: 'catalogId'
       //     },
		   // {
       //      title: '大分类编号',
       //      align:"center",
       //      dataIndex: 'kindNo'
       //     },
          // {
          //      title: '中分类编号',
          //      align:"center",
          //      dataIndex: 'midKind'
          //     },
		   // {
       //      title: '采购厂别',
       //      align:"center",
       //      dataIndex: 'fact'
       //     },
		   // {
       //      title: '绩效部门',
       //      align:"center",
       //      dataIndex: 'factCentre'
       //     },
          {
            title: '班组',
            align:"center",
            dataIndex: 'deptNo',
            sorter: true,
          },
		   {
            title: '使用厂别',
            align:"center",
            dataIndex: 'factLocation_dictText',
            sorter: true,
           },
		   // {
       //      title: '资产来源',
       //      align:"center",
       //      dataIndex: 'kind'
       //     },
        {
          title: '验收日期',
          align: 'center',
          dataIndex: 'acceptDate',
          sorter: true,
          scopedSlots: { customRender: 'actionAcceptDate' }
        },
		   // {
       //      title: '原始单价',
       //      align:"center",
       //      dataIndex: 'originalPrice'
       //     },
		   // {
       //      title: '入账单价',
       //      align:"center",
       //      dataIndex: 'price'
       //     },
		   // {
       //      title: '折旧率',
       //      align:"center",
       //      dataIndex: 'rate'
       //     },
		   // {
       //      title: '折旧月数',
       //      align:"center",
       //      dataIndex: 'num'
       //     },
		   // {
       //      title: '残值率',
       //      align:"center",
       //      dataIndex: 'residual'
       //     },
		   {
            title: '使用状况',
            align:"center",
            dataIndex: 'state',
            sorter: true,
            scopedSlots: { customRender: 'actionState' },
           },
		   // {
       //      title: '折旧方法',
       //      align:"center",
       //      dataIndex: 'depreciation'
       //     },
		   {
            title: '保管人',
            align:"center",
            dataIndex: 'custodian'
           },
		   // {
       //      title: '制造商',
       //      align:"center",
       //      dataIndex: 'manufacturer'
       //     },
		   // {
       //      title: '供应商',
       //      align:"center",
       //      dataIndex: 'supplier'
       //     },
		   // {
       //      title: '产地',
       //      align:"center",
       //      dataIndex: 'originPlace'
       //     },
		   // {
       //      title: '型号规格',
       //      align:"center",
       //      dataIndex: 'specifications'
       //     },
		   // {
       //      title: '备注',
       //      align:"center",
       //      dataIndex: 'note'
       //     },
		   // {
       //      title: '币别',
       //      align:"center",
       //      dataIndex: 'hb'
       //     },
		   // {
       //      title: '品牌',
       //      align:"center",
       //      dataIndex: 'brand'
       //     },
		   // {
       //      title: '是否监管',
       //      align:"center",
       //      dataIndex: 'lb'
       //     },
		   // {
       //      title: '是否核算',
       //      align:"center",
       //      dataIndex: 'torf'
       //     },
		   // {
       //      title: '配件清单',
       //      align:"center",
       //      dataIndex: 'accessory'
       //     },
		   // {
       //      title: '设备类型',
       //      align:"center",
       //      dataIndex: 'typeNo'
       //     },
		   // {
       //      title: '使用厂别',
       //      align:"center",
       //      dataIndex: 'factLocation'
       //     },
		   // {
       //      title: '存放厂区',
       //      align:"center",
       //      dataIndex: 'locationFact_dictText'
       //     },
		   // {
       //      title: '存放区域',
       //      align:"center",
       //      dataIndex: 'locationDl_dictText'
       //     },
		   // {
       //      title: '存放楼层',
       //      align:"center",
       //      dataIndex: 'locationFl_dictText'
       //     },
          // {
          //   title: '存放位置',
          //   align:"center",
          //   dataIndex: 'location'
          // },
		   // {
       //      title: '管理经理',
       //      align:"center",
       //      dataIndex: 'custodianManager'
       //     },
		   // {
       //      title: '使用人',
       //      align:"center",
       //      dataIndex: 'custodianUser'
       //     },
       //    {
       //      title: '建立人',
       //      align:"center",
       //      dataIndex: 'createBy',
       //      sorter: true,
       //    },
       //    {
       //      title: '建立日期',
       //      align:"center",
       //      dataIndex: 'createTime',
       //      sorter: true,
       //    },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/asset/assetRecord/list",
          delete: "/asset/assetRecord/delete",
          deleteBatch: "/asset/assetRecord/deleteBatch",
          exportXlsUrl: "asset/assetRecord/exportXls",
          importExcelUrl: "asset/assetRecord/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
  methods: {
    handleAssetCard: function(record) {
      this.$refs.assetCardModal.edit(record);
    },

    handleAssetInspect: function(record) {
      this.$refs.assetInspectModal.edit(record);
    },

    onClickRow(record) {
      return {
        on: {
          click: () => {
            let keys = []
            keys.push(record.id)
            this.selectedRowKeys = keys
            this.recordId = record.id
            this.assetCard = record
            this.assetInspect = record
          }
        }
      }
    },
  }
}
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>