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
      <!-- 主表单区域 -->
      <a-form :form="form">
        <a-row>
<!--          <a-col :span="12" :gutter="8">-->
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户订单">
              <a-input placeholder="请输入客户订单" v-decorator="['custOdrNo', validatorRules.custOdrNo]"/>
            </a-form-item>
<!--          </a-col>-->
        </a-row>
        <a-row>
<!--        <a-col :span="12" :gutter="8">-->
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="Pace编码">
            <a-input placeholder="请输入Pace编码" v-decorator="['paceCode', validatorRules.paceCode]"/>
          </a-form-item>
<!--        </a-col>-->
        </a-row>
        <a-row>
<!--          <a-col :span="12" :gutter="8">-->
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="模具名称和颜色">
              <a-input placeholder="请输入模具名称和颜色" v-decorator="['modelColour', validatorRules.modelColour]"/>
            </a-form-item>
<!--          </a-col>-->
        </a-row>
        <a-row>
<!--          <a-col :span="12" :gutter="8">-->
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="订单类型">
              <j-dict-select-tag v-decorator="['orderType', validatorRules.orderType]" :type="'radio'" :triggerChange="true" dictCode="odr_type_inspect"/>
            </a-form-item>
<!--          </a-col>-->
        </a-row>

        <a-row>
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="厂区编号">-->
<!--              <a-input placeholder="请输入厂区编号" v-decorator="['factNo', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->


        </a-row>
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="版本编号">-->
<!--              <a-input placeholder="请输入版本编号" v-decorator="['versionNo', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="型体编号">-->
<!--              <a-input placeholder="请输入型体编号" v-decorator="['styleShorten', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
        <a-row>


        </a-row>
<!--        <a-row>-->

<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="验货日期">-->
<!--              <a-date-picker-->
<!--                placeholder="请输入验货日期"-->
<!--                style="width:100%"-->
<!--                v-decorator="[ 'inspectDate', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="验货结果">-->
<!--              <a-input placeholder="请输入验货结果" v-decorator="['inspectorDecision', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
      </a-form>

<!--      &lt;!&ndash; 子表单区域 &ndash;&gt;-->
<!--      <a-tabs v-model="activeKey" @change="handleChangeTabs">-->
<!--        <a-tab-pane tab="验货报告子表" :key="refKeys[0]" :forceRender="true">-->
<!--          <j-editable-table-->
<!--            :ref="refKeys[0]"-->
<!--            :loading="sampleInspectReportDTable.loading"-->
<!--            :columns="sampleInspectReportDTable.columns"-->
<!--            :dataSource="sampleInspectReportDTable.dataSource"-->
<!--            :maxHeight="300"-->
<!--            :rowNumber="true"-->
<!--            :rowSelection="true"-->
<!--            :actionButton="true"/>-->
<!--        </a-tab-pane>-->
<!--      </a-tabs>-->

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
    name: 'SampleInspectReportMModal',
    mixins: [JEditableTableMixin],
    components: {
      JDictSelectTag,
    },
    props: ['executeModule'],
    data() {
      return {
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
            dataIndex: 'custOdrNo'
          },
          {
            title: '版本编号',
            align:"center",
            dataIndex: 'versionNo'
          },
          // {
          //   title: '型体编号',
          //   align:"center",
          //   dataIndex: 'styleShorten'
          // },
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
            dataIndex: 'orderType'
          },
          // {
          //   title: '订单数量',
          //   align:"center",
          //   dataIndex: 'odrQty'
          // },
          // {
          //   title: '验货日期',
          //   align:"center",
          //   dataIndex: 'inspectDate'
          // },
          // {
          //   title: '验货结果',
          //   align:"center",
          //   dataIndex: 'inspectorDecision'
          // }
        ],

        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        },
        refKeys: ['sampleInspectReportD', ],
        activeKey: 'sampleInspectReportD',
        // // 验货报告子表
        // sampleInspectReportDTable: {
        //   loading: false,
        //   dataSource: [],
        //   columns: [
        //     {
        //       title: '厂区编号',
        //       key: 'factNo',
        //       type: FormTypes.input,
        //       defaultValue: '',
        //       placeholder: '请输入${title}',
        //     },
        //     {
        //       title: '客户订单编号',
        //       key: 'custOdrNo',
        //       type: FormTypes.input,
        //       defaultValue: '',
        //       placeholder: '请输入${title}',
        //     },
        //     {
        //       title: '版本编号',
        //       key: 'versionNo',
        //       type: FormTypes.input,
        //       defaultValue: '',
        //       placeholder: '请输入${title}',
        //     },
        //     {
        //       title: '型体编号',
        //       key: 'styleShorten',
        //       type: FormTypes.input,
        //       defaultValue: '',
        //       placeholder: '请输入${title}',
        //     },
        //     {
        //       title: '主分类编号',
        //       key: 'itemMainNo',
        //       type: FormTypes.input,
        //       defaultValue: '',
        //       placeholder: '请输入${title}',
        //     },
        //     {
        //       title: '中分类编号',
        //       key: 'itemMediumNo',
        //       type: FormTypes.input,
        //       defaultValue: '',
        //       placeholder: '请输入${title}',
        //     },
        //     {
        //       title: '检查点编号',
        //       key: 'checkPointsNo',
        //       type: FormTypes.input,
        //       defaultValue: '',
        //       placeholder: '请输入${title}',
        //     },
        //     {
        //       title: '次要',
        //       key: 'minor',
        //       type: FormTypes.input,
        //       defaultValue: '',
        //       placeholder: '请输入${title}',
        //     },
        //     {
        //       title: '主要',
        //       key: 'major',
        //       type: FormTypes.input,
        //       defaultValue: '',
        //       placeholder: '请输入${title}',
        //     },
        //     {
        //       title: '重要',
        //       key: 'critical',
        //       type: FormTypes.input,
        //       defaultValue: '',
        //       placeholder: '请输入${title}',
        //     },
        //     {
        //       title: '次要可用状态',
        //       key: 'minorEnable',
        //       type: FormTypes.input,
        //       defaultValue: '',
        //       placeholder: '请输入${title}',
        //     },
        //     {
        //       title: '主要可用状态',
        //       key: 'majorEnable',
        //       type: FormTypes.input,
        //       defaultValue: '',
        //       placeholder: '请输入${title}',
        //     },
        //     {
        //       title: '重要可用状态',
        //       key: 'criticalEnable',
        //       type: FormTypes.input,
        //       defaultValue: '',
        //       placeholder: '请输入${title}',
        //     },
        //     {
        //       title: '验货报告主表ID',
        //       key: 'mainId',
        //       type: FormTypes.input,
        //       defaultValue: '',
        //       placeholder: '请输入${title}',
        //     },
        //   ]
        // },
        validatorRules: {
          custOdrNo: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('sampleInspectReportM.custOdrNo') }] },
          paceCode: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('sampleInspectReportM.paceCode') }] },
          modelColour: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('sampleInspectReportM.modelColour') }] },
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

    // mounted() {
    //   // console.log(`执行：${this.executeModule[0]}`)
    //   if (this.executeModule[0] == 'rework') {
    //     this.form.setFieldsValue({'custOdrNo': this.executeModule[1]})
    //     this.form.setFieldsValue({'paceCode': this.executeModule[2]})
    //     this.form.setFieldsValue({'modelColour': this.executeModule[3]})
    //     this.form.setFieldsValue({'orderType': this.executeModule[4]})
    //   }
    // },

    methods: {

        handleOk () {
          const that = this;
          // 触发表单验证
          this.form.validateFields((err, values) => {
            if (!err) {
              // that.confirmLoading = true;
              // let httpurl = '';
              // let method = '';
              // if(!this.model.id){
              //   httpurl+=this.url.add;
              //   method = 'post';
              // }else{
              //   httpurl+=this.url.edit;
              //   method = 'put';
              // }
              // let formData = Object.assign(this.model, values);
              let custOdrNo = this.form.getFieldValue('custOdrNo')
              let versionNo = this.form.getFieldValue('versionNo') + 1
              let paceCode = this.form.getFieldValue('paceCode')
              let modelColour = this.form.getFieldValue('modelColour')
              let orderType = this.form.getFieldValue('orderType')
              console.log(`参数：${custOdrNo}/${versionNo.toString()}/${paceCode}/${modelColour}/${orderType}`)
              this.queryCustOdrNo(custOdrNo, versionNo.toString(), paceCode, modelColour, orderType)
            }
          })
        },

      queryCustOdrNo(custOdrNo, versionNo, paceCode, modelColour, orderType) {
        const that = this;
        that.confirmLoading = true;
        getAction(this.url.queryCustOdrNo, {pssr: custOdrNo}).then((res)=>{
          if(res.success){
            console.log(`客户订单1：${res.result}`)
            if (res.result == 1) {
              that.insertReportM(custOdrNo, versionNo, paceCode, modelColour, orderType)
              that.insertReportD(custOdrNo, versionNo, )
              that.$message.success('增加成功！');
              that.$emit('ok');
              that.close();
            } else {
              that.$message.warning(`客户订单不存在！`);
            }
          }
          // else {
          //   that.$message.warning(res.message);
          // }
        }).finally(() => {
          that.confirmLoading = false;
        })
      },

      insertReportM(custOdrNo, versionNo, paceCode, modelColour, orderType) {
        const that = this;
        that.confirmLoading = true;
        let pp = new Array(4)
        pp[0] = custOdrNo
        pp[1] = versionNo
        pp[2] = paceCode
        pp[3] = modelColour
        pp[4] = orderType
        let pssr = pp.toString()
        getAction(this.url.insertReportM, {pssr: pssr}).then((res)=>{
          if(res.success){
            console.log(`增加主档成功!`)
          }
          // else{
          //   that.$message.warning(res.message);
          // }
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