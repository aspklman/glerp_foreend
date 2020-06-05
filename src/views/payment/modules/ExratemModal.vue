<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="厂区编号">-->
<!--          <a-input placeholder="请输入厂区编号" v-decorator="['factNo', validatorRules.factNo ]" />-->
<!--        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主币别">
<!--          <a-input placeholder="请选择主币别" v-decorator="['mainCoinKind', validatorRules.mainCoinKind ]" />-->
          <j-dict-select-tag placeholder="请选择主币别" v-decorator="['mainCoinKind', validatorRules.mainCoinKind]" :triggerChange="true" dictCode="coin_kind" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="换算币别">
<!--          <a-input placeholder="请选择换算币别" v-decorator="['exchCoinKind', validatorRules.exchCoinKind ]" />-->
          <j-dict-select-tag placeholder="请选择换算币别" v-decorator="['exchCoinKind', validatorRules.exchCoinKind]" :triggerChange="true" dictCode="coin_kind" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="生效年月">
<!--          <a-input placeholder="请选择生效年月" v-decorator="['validDate', validatorRules.validDate ]" />-->
          <j-date placeholder="请选择生效年月" v-decorator="['validDate', {} ]" dateFormat="YYYYMM" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="汇率">
          <a-input-number placeholder="请输入汇率" v-decorator="['exchRate', validatorRules.exchRate ]" min="0.0001" max="9.9999" step="0.0001"/>
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="异动人">-->
<!--          <a-input placeholder="请输入异动人" v-decorator="['userNo', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="异动时间">-->
<!--          <a-input placeholder="请输入异动时间" v-decorator="['modifyDt', {}]" />-->
<!--        </a-form-item>-->
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import JDate from '@/components/jeecg/JDate'

  export default {
    name: "ExratemModal",
    components: {
      JDictSelectTag,
      JDate,
    },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        factNo:{rules: [{ required: true, message: '请输入厂区编号!' }]},
        mainCoinKind:{rules: [{ required: true, message: '请输入主币别!' }]},
        exchCoinKind:{rules: [{ required: true, message: '请输入换算币别!' }]},
        validDate:{rules: [{ required: true, message: '请输入生效年月!' }]},
        exchRate:{rules: [{ required: true, message: '请输入汇率!' }]},
        },
        url: {
          add: "/payment/exratem/add",
          edit: "/payment/exratem/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'factNo','mainCoinKind','exchCoinKind','validDate','exchRate','userNo','modifyDt'))
		  //时间格式化
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            
            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })



          }
        })
      },
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>

</style>