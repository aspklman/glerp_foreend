<template>
  <a-modal
    title="新增"
    :width="550"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row>
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户订单">
              {{ this.custOdrNo }}
            </a-form-item>
        </a-row>
        <a-row>
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="订单类型">
              <j-dict-select-tag v-decorator="['orderType', validatorRules.orderType]" :type="'radio'" :triggerChange="true" dictCode="odr_type_inspect"/>
            </a-form-item>
        </a-row>
      </a-form>

    </a-spin>
  </a-modal>
</template>

<script>

  import moment from 'moment'
  import pick from 'lodash.pick'
  import { FormTypes } from '@/utils/JEditableTableUtil'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import { getAction } from '@/api/manage'

  export default {
    name: 'SampleInspectReportMAdd1Modal',
    mixins: [JEditableTableMixin],
    components: {
      JDictSelectTag,
    },
    // props: ['executeModule'],
    props: ['custOdrNo'],
    data() {
      return {
        columns: [
          {
            title: '客户订单',
            align:"center",
            dataIndex: 'custOdrNo'
          },
          {
            title: '版本编号',
            align:"center",
            dataIndex: 'versionNo'
          },
          {
            title: '订单类型',
            align:"center",
            dataIndex: 'orderType'
          },
        ],

        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        },
        refKeys: ['sampleInspectReportD'],
        activeKey: 'sampleInspectReportD',
        validatorRules: {
          custOdrNo: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('sampleInspectReportM.custOdrNo') }] },
          orderType: { rules: [{ required: true }], initialValue: '1' },
        },
        url: {
          add: "/quality/sampleInspectReportM/add",
          edit: "/quality/sampleInspectReportM/edit",
          queryCustOdrNo: "/quality/sampleInspectReportM/queryCustOdrNo",
          addInspectReport: "/quality/sampleInspectReportM/addInspectReport",
          insertReportM: "/quality/sampleInspectReportM/insertReportM",
          insertReportD: "/quality/sampleInspectReportM/insertReportD",
          sampleInspectReportD: {
            list: '/quality/sampleInspectReportM/querySampleInspectReportDByMainId'
          },
        }
      }
    },

    methods: {

        handleOk () {
          const that = this;
          // 触发表单验证
          this.form.validateFields((err, values) => {
            if (!err) {
              let custOdrNo = this.custOdrNo
              let orderType = this.form.getFieldValue('orderType')
              this.queryCustOdrNo(custOdrNo.trim(), orderType)
              this.$emit('refreshPage')
            }
          })

        },

      queryCustOdrNo(custOdrNo, orderType) {
        const that = this;
        that.confirmLoading = true;
        getAction(this.url.queryCustOdrNo, {pssr: custOdrNo}).then((res)=>{
          if(res.success){
            console.log(`客户订单1：${res.result}`)
            if (res.result == 1) {
              that.insertReportM(custOdrNo, '1', orderType)
              that.insertReportD(custOdrNo, '1')
              that.close();
            } else {
              that.$message.warning(`客户订单不存在！`);
            }
          }
        }).finally(() => {
          that.confirmLoading = false;
        })
      },

      insertReportM(custOdrNo, versionNo, orderType) {
        const that = this;
        that.confirmLoading = true;
        let pp = new Array(4)
        pp[0] = custOdrNo
        pp[1] = versionNo
        // pp[2] = paceCode
        // pp[3] = modelColour
        pp[4] = orderType
        let pssr = pp.toString()
        getAction(this.url.insertReportM, {pssr: pssr}).then((res)=>{
          if(res.success){
            // that.insertReportD(custOdrNo, versionNo)
            that.$message.success(res.message);
            console.log(`增加主档成功!`)
          }
          else{
            that.$message.warning(res.message);
          }
        }).finally(() => {
          that.confirmLoading = false;
        })
      },

      insertReportD(custOdrNo, versionNo) {
        const that = this;
        that.confirmLoading = true;
        let pp = new Array(1)
        pp[0] = custOdrNo
        pp[1] = versionNo
        let pssr = pp.toString()
        getAction(this.url.insertReportD, {pssr: pssr}).then((res)=>{
          if(res.success){
            console.log(`增加子档成功!`)
          }
          // else {
          //   that.$message.warning(res.message);
          // }
        }).finally(() => {
          that.confirmLoading = false;
        })
      },
 
      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'factNo', 'custOdrNo', 'versionNo', 'styleShorten', 'paceCode', 'modelColour', 'orderType', 'inspectDate', 'inspectorDecision', ))
          // 时间格式化
          this.form.setFieldsValue({ inspectDate: this.model.inspectDate ? moment(this.model.inspectDate) : null })
        })
        // 加载子表数据
        if (this.model.id) {
          let params = { id: this.model.id }
          this.requestSubTableData(this.url.sampleInspectReportD.list, params, this.sampleInspectReportDTable)
        }
      },
 
      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let main = Object.assign(this.model, allValues.formValue)
        //时间格式化
        main.inspectDate = main.inspectDate ? main.inspectDate.format() : null;
        return {
          ...main, // 展开
          sampleInspectReportDList: allValues.tablesValue[0].values,
        }
      }
    }
  }
</script>

<style scoped>
</style>