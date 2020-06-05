<template>
  <a-modal
    :width="modalWidth"
    :visible="visible"
    :title="title"
    @ok="handleSubmit"
    @cancel="close"
    :cancelText="$t('common.close')"
    style="margin-top: -70px"
    wrapClassName="ant-modal-cust-warp"
  >
    <a-row :gutter="10" style="background-color: #ececec; padding: 10px; margin: -10px">
      <a-card :bordered="false">

        <p>
          {{$t('profactm.proFact')}}:
          <j-dict-select-tag v-if="this.$i18n.locale=='zh-CN'"
                             v-model="queryParam.proFact"
                             :change="filterProFact"
                             :type="'radio'"
                             dictCode="pro_fact_cn"/>
          <j-dict-select-tag v-else-if="this.$i18n.locale=='en-US'"
                             v-model="queryParam.proFact"
                             :change="filterProFact"
                             :type="'radio'"
                             dictCode="pro_fact_en"/>
          <j-dict-select-tag v-else-if="this.$i18n.locale=='vi-VN'"
                             v-model="queryParam.proFact"
                             :change="filterProFact"
                             :type="'radio'"
                             dictCode="pro_fact_vn"/>
        </p>


        {{$t('depart.departName')}}:
        <a-input-search
          :style="{width:'150px',marginBottom:'15px'}"
          :placeholder="$t('common.pleaseInput') + $t('depart.departName')"
          v-model="queryParam.departNm"
          @search="onSearch"/>
        <a-button @click="searchReset(1)" style="margin-left: 20px" icon="redo">{{$t('common.reset')}}</a-button>


        <!--组别列表-->
        <a-table
          ref="table"
          :scroll="scrollTrigger"
          size="middle"
          rowKey="id"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :rowSelection="{type: 'radio', selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="handleTableChange">
        </a-table>
      </a-card>
    </a-row>
  </a-modal>
</template>

<script>
  import { filterObj } from '@/utils/util'
  import { getDepartList } from '@/api/api'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'

  export default {
    name: 'GSelectDepartModal',
    components: {
      JDictSelectTag
    },
    props: ['modalWidth'],
    data() {
      return {
        queryParam: {
          proFact: '',
          departNo: ''
        },
        columns: [
          {
            title: this.$t('depart.departNo'),
            align: 'center',
            dataIndex: 'departNo'
          },
          {
            title: this.$t('depart.departName'),
            align: 'center',
            dataIndex: 'departNm'
          },
          // {
          //   title: this.$t('profactm.proFact'),
          //   align: 'center',
          //   dataIndex: 'proFact_dictText'
          // },
          {
            title: this.$t('common.createTime'),
            align: 'center',
            dataIndex: 'createTime'
          },
          {
            title: this.$t('common.updateTime'),
            align: 'center',
            dataIndex: 'updateTime'
          }
        ],
        scrollTrigger: {},
        dataSource: [],
        selectedKeys: [],
        departNmArr: [],
        title: this.$t('common.select') + this.$t('depart.depart'),
        ipagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + this.$t('common.total') + total + this.$t('common.item')
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        isorter: {
          column: 'departNo',
          order: 'asc'
        },
        selectedRowKeys: [],
        selectedRows: [],
        visible: false,
        form: this.$form.createForm(this)
      }
    },
    created() {
      // 该方法触发屏幕自适应
      this.resetScreenSize()
      this.loadData()
    },

    computed: {
      filterProFact() {
        this.loadData()
      }
    },

    methods: {
      loadData(arg) {
        if (arg === 1) {
          this.ipagination.current = 1
        }
        let params = this.getQueryParams()//查询条件
        getDepartList(params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total
          }
        })
      },
      // 触发屏幕自适应
      resetScreenSize() {
        let screenWidth = document.body.clientWidth
        if (screenWidth < 500) {
          this.scrollTrigger = { x: 800 }
        } else {
          this.scrollTrigger = {}
        }
      },
      showModal() {
        this.visible = true
        this.form.resetFields()
      },
      getQueryParams() {
        let param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        return filterObj(param)
      },
      getQueryField() {
        let str = 'id,'
        for (let a = 0; a < this.columns.length; a++) {
          str += ',' + this.columns[a].dataIndex
        }
        return str
      },
      searchReset(num) {
        let that = this
        if (num !== 0) {
          that.queryParam = {}
          that.loadData(1)
        }
        that.selectedRowKeys = []
        that.departNmArr = []
        that.selectedKeys = []
      },
      close() {
        this.searchReset(0)
        this.visible = false
      },
      handleTableChange(pagination, filters, sorter) {
        //TODO 筛选
        if (Object.keys(sorter).length > 0) {
          this.isorter.column = sorter.field
          this.isorter.order = 'ascend' === sorter.order ? 'asc' : 'desc'
        }
        this.ipagination = pagination
        this.loadData()
      },
      handleSubmit() {
        let that = this
        for (let i = 0, len = this.selectedRowKeys.length; i < len; i++) {
          this.getDepartNos(this.selectedRowKeys[i])
        }
        that.$emit('ok', that.departNmArr.join(','))
        that.close()
      },
      // 遍历匹配,获取【组别编号】
      getDepartNos(rowId) {
        let dataSource = this.dataSource
        for (let i = 0, len = dataSource.length; i < len; i++) {
          if (rowId === dataSource[i].id) {
            this.departNmArr.push(dataSource[i].departNo)
          }
        }
      },
      onSelectChange(selectedRowKeys, selectionRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectionRows = selectionRows
      },
      onSearch() {
        this.loadData(1)
      },
      modalFormOk() {
        this.loadData()
      }

    }
  }
</script>

<style scoped>
  .ant-table-tbody .ant-table-row td {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  #components-layout-demo-depart-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
  }
</style>