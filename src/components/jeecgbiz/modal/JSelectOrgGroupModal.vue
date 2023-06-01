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

        <p>
          使用厂别:
          <j-dict-select-tag v-model="queryParam.companyNo"
                             :change="filterCompanyNo"
                             :type="'radio'"
                             dictCode="asset_fact_location"/>
        </p>

        班组名称:
        <a-input-search
          :style="{width:'150px',marginBottom:'15px'}"
          placeholder="请输入班组名称"
          v-model="queryParam.groupName"
          @search="onSearch"
        ></a-input-search>
        <a-button @click="searchReset(1)" style="margin-left: 20px" icon="redo">重置</a-button>
        <!--班组列表-->
        <a-table
          ref="table"
          :scroll="scrollTrigger"
          size="middle"
          rowKey="id"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :rowSelection="{type: 'radio', selectedRowKeys: selectedRowKeys, onChange: onSelectChange, columnTitle: '选择行'}"
          @change="handleTableChange">
        </a-table>
      </a-card>
    </a-row>
  </a-modal>
</template>

<script>
  import { filterObj } from '@/utils/util'
  import { getOrgGroupList } from '@/api/api'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'

  export default {
    name: 'JSelectOrgGroupModal',
    components: {
      JDictSelectTag,
    },
    props: ['modalWidth'],
    data() {
      return {
        queryParam: {
          groupNo: ''
        },
        columns: [
          {
            title: '班组编号',
            align: 'center',
            dataIndex: 'groupNo'
          },
          {
            title: '班组名称',
            align: 'center',
            dataIndex: 'groupName'
          },
          {
            title: '使用部门编号',
            align: 'center',
            dataIndex: 'departmentNo'
          },
          {
            title: '使用部门名称',
            align: 'center',
            dataIndex: 'departmentName'
          },
          {
            title: '使用厂别编号',
            align: 'center',
            dataIndex: 'companyNo'
          },
          {
            title: '使用厂别名称',
            align: 'center',
            dataIndex: 'companyName'
          },
          // {
          //   title: '备注',
          //   align: 'center',
          //   dataIndex: 'notes'
          // },
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
        groupNameArr: [],
        title: '选择班组',
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
          column: 'groupNo',
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
      filterDepartmentNo() {
        this.loadData()
      },
    },

    computed: {
      filterCompanyNo() {
        this.loadData()
      },
    },

    methods: {

      loadData(arg) {
        if (arg === 1) {
          this.ipagination.current = 1
        }
        let params = this.getQueryParams()//查询条件
        getOrgGroupList(params).then((res) => {
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
        that.groupNameArr = []
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
          this.getgroupNos(this.selectedRowKeys[i])
        }
        that.$emit('ok', that.groupNameArr.join(','))
        that.close()
      },
      // 遍历匹配,获取【班组编号】
      getgroupNos(rowId) {
        let dataSource = this.dataSource
        for (let i = 0, len = dataSource.length; i < len; i++) {
          if (rowId === dataSource[i].id) {
            this.groupNameArr.push(dataSource[i].groupNo)
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
      },

      // onClickRow(record, index) {
      //   return {
      //     on: {
      //       click: () => {
      //         let keys = []
      //         keys.push(record.kindNo)
      //         this.selectedRowKeys = keys
      //         this.rowIndex = index
      //         // this.$emit('change', record.kindNo, record.kindName);
      //         // console.log('编号：' + record.kindNo)
      //         // console.log('名称：' + record.kindName)
      //       }
      //     }
      //   }
      // },

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