<template>
  <a-modal
    title="详情"
    :width="1080"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :footer="null"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <div class="no-print" style="text-align: left">
      <a-button v-print="'#printContent'" ghost type="primary">打印</a-button>
    </div>

    <section ref="print" id="printContent" class="abcdefg">
      <a-row style="text-align: center">
        <h2>
          迪卡侬验货抽检标准
        </h2>

      </a-row>
      <div>
        <a-row :style="{ marginTop: '18px' }">
          <a-col :span="24">
            <!--        <a-card :loading="loading" :bordered="false" title="半成品" :style="{ marginTop: '24px' }">-->
            <a-row>
              <a-col :span="7">
                <head-info title="工厂订单" :content="inspectMain[0]"></head-info>
              </a-col>
              <a-col :span="5">
                <head-info title="客户订单" :content="inspectMain[1]"></head-info>
              </a-col>
              <a-col :span="4">
                <head-info title="型体编号" :content="inspectMain[2]"></head-info>
              </a-col>
              <a-col :span="8">
                <head-info title="型体名称" :content="inspectMain[3]"></head-info>
              </a-col>

            </a-row>
            <a-row :style="{ marginTop: '24px' }">
              <a-col :span="4">
                <head-info title="订单总箱数" :content="inspectMain[4].toString()"></head-info>
              </a-col>
              <a-col :span="4">
                <head-info title="订单总双数" :content="inspectMain[5].toString()"></head-info>
              </a-col>
              <a-col :span="4">
                <head-info title="AQL标准箱数" :content="inspectMain[6].toString()"></head-info>
              </a-col>
              <a-col :span="4">
                <head-info title="AQL标准双数" :content="inspectMain[7].toString()"></head-info>
              </a-col>
              <a-col :span="4">
                <head-info title="功能性检测双数" :content="inspectMain[8].toString()"></head-info>
              </a-col>
              <a-col :span="4">
                <head-info title="结构性检测双数" :content="inspectMain[9].toString()"></head-info>
              </a-col>
            </a-row>
            <!--        </a-card>-->
          </a-col>
        </a-row>

      </div>

      <a-row :style="{ marginTop: '24px' }"/>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="size_no"
        :columns="columns"
        :dataSource="inspectMain[10]"
        :pagination="false">
      </a-table>
    </section>
  </a-modal>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { httpAction } from '@/api/manage'
  import { getAction, postAction, deleteAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from 'moment'
  import HeadInfo from '@/components/tools/HeadInfo.vue'

  export default {
    name: 'SampleInspectStdModal',
    mixins: [JeecgListMixin],
    props: ['inspectMain'],
    // props: {
    //   factOdrNo: {
    //     type: String,
    //     required: true,
    //   }
    // },
    components: {
      HeadInfo
    },
    data() {
      return {
        title: '操作',
        dataSource: [],
        columns: [
          {
            title: 'SIZE编号',
            align: 'center',
            dataIndex: 'size_no'
          },
          {
            title: '订单双数',
            align: 'center',
            dataIndex: 'cus_qty'
          },
          {
            title: '订单箱数',
            align: 'center',
            dataIndex: 'ctn_qty'
          },
          {
            title: '抽验箱数',
            align: 'center',
            dataIndex: 'ctn_qty_aql'
          },
          {
            title: '抽验双数',
            align: 'center',
            dataIndex: 'sample_qty_aql'
          },
          {
            title: '功能性检测双数',
            align: 'center',
            dataIndex: 'func_qty_aql'
          },
          {
            title: '结构性检测双数',
            align: 'center',
            dataIndex: 'str_qty_aql'
          }
        ],
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          factNo: { rules: [{ required: true, message: '请输入factNo!' }] },
          工厂订单: { rules: [{ required: true, message: '请输入工厂订单!' }] },
          型体编号: { rules: [{ required: true, message: '请输入型体编号!' }] },
          型体名称: { rules: [{ required: true, message: '请输入型体名称!' }] }
        },
        url: {
          list: '/quality/sampleInspectStd/list',
          add: '/quality/sampleInspectStd/add',
          // edit: '/quality/sampleInspectStd/edit',
          // getInspectDetail: '/quality/sampleInspectStd/getInspectDetail'
        }
      }
    },

    mounted() {

    },


    methods: {

      add() {
        this.edit({})
      },

      edit(record) {
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        // this.$nextTick(() => {
        //   this.form.setFieldsValue(pick(this.model, 'factNo', 'proDept', '工厂订单', '客户订单', '型体编号', '型体名称', '订单总箱数', '订单总双数', 'aql标准箱数', 'aql标准双数', '功能性检测双数', '结构性检测双数'))
        //   //时间格式化
        // })
      },

      close() {
        this.$emit('close')
        this.visible = false
      },

      handleOk() {
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true
            let httpurl = ''
            let method = ''
            if (!this.model.id) {
              httpurl += this.url.add
              method = 'post'
            } else {
              httpurl += this.url.edit
              method = 'put'
            }
            let formData = Object.assign(this.model, values)
            //时间格式化
            console.log(formData)
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            }).finally(() => {
              that.confirmLoading = false
              that.close()
            })
          }
        })
      },

      handleCancel() {
        this.close()
      }

    }
  }
</script>

<style lang="less" scoped>

</style>