<template>
  <a-modal
    :width="modalWidth"
    :visible="visible"
    :title="title"
    @ok="handleSubmit"
    @cancel="close"
    cancelText="关闭"
    style="margin-top: -70px"
    wrapClassName="ant-modal-cust-warp"
  >
    <a-row :gutter="10" style="background-color: #ececec; padding: 10px; margin: -10px">
      <a-card :bordered="false">
        中分类名称:
        <a-input-search
          :style="{width:'150px',marginBottom:'15px'}"
          placeholder="请输入中分类名称"
          v-model="queryParam.kindName"
          @search="onSearch"
        ></a-input-search>
        <a-button @click="searchReset(1)" style="margin-left: 20px" icon="redo">重置</a-button>
        <!--中分类列表-->
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
  import { getKindNoMidList } from '@/api/api'

  export default {
    name: 'JSelectKindNoMidModal',
    components: {},
    props: ['modalWidth'],
    data() {
      return {
        queryParam: {
          kindNo: ''
        },
        columns: [
          {
            title: '中分类编号',
            align: 'center',
            dataIndex: 'kindNo'
          },
          {
            title: '中分类名称',
            align: 'center',
            dataIndex: 'kindName'
          },
          {
            title: '备注',
            align: 'center',
            dataIndex: 'notes'
          },
          {
            title: '主分类编号',
            align: 'center',
            dataIndex: 'kindNoMain'
          },
          // {
          //   title: '创建时间',
          //   align: 'center',
          //   dataIndex: 'createTime'
          // },
          // {
          //   title: '修改时间',
          //   align: 'center',
          //   dataIndex: 'updateTime'
          // }
        ],
        scrollTrigger: {},
        dataSource: [],
        selectedKeys: [],
        kindNameArr: [],
        title: '选择中分类',
        ipagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        isorter: {
          column: 'kindNo',
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
    methods: {
      loadData(arg) {
        if (arg === 1) {
          this.ipagination.current = 1
        }
        let params = this.getQueryParams()//查询条件
        getKindNoMidList(params).then((res) => {
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
        that.kindNameArr = []
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
          this.getKindNos(this.selectedRowKeys[i])
        }
        that.$emit('ok', that.kindNameArr.join(','))
        that.close()
      },
      // 遍历匹配,获取【中分类编号】
      getKindNos(rowId) {
        let dataSource = this.dataSource
        for (let i = 0, len = dataSource.length; i < len; i++) {
          if (rowId === dataSource[i].id) {
            this.kindNameArr.push(dataSource[i].kindNo)
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

  #components-layout-demo-matm-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
  }
</style>