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
          label="班别编号">
          <a-input placeholder="大写英文字母和数字，最长6位！" v-decorator="['teamNo', validatorRules.teamNo ]" maxLength="6" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="班别名称">
          <a-input placeholder="请输入班别名称，最长10个汉字！" v-decorator="['teamNm', validatorRules.teamNm ]" maxLength="10" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="派工阶段">
<!--          <a-input placeholder="请输入派工阶段" v-decorator="['deptNo', {}]" />-->
          <j-select-deptm v-decorator="['deptNo', {}]"></j-select-deptm>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产量阶段">
<!--          <a-input placeholder="请输入产量阶段" v-decorator="['stgNo', {}]" />-->
          <j-select-stgm v-decorator="['stgNo', {}]"></j-select-stgm>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="归属组别">
<!--          <a-input placeholder="请输入归属线别" v-decorator="['secNo', {}]" />-->
          <j-select-sec v-decorator="['belSec', {}]"></j-select-sec>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="归属多个组别">
          <a-input placeholder="请输入归属多个组别" v-decorator="['secNos', {}]" maxLength="66" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="锁定注记">
<!--          <a-input placeholder="请输入锁定注记" v-decorator="['lockRmk', {}]" />-->
          <j-dict-select-tag v-decorator="['lockRmk', {}]" :type="'radio'" :triggerChange="true" dictCode="lock_rmk_yn" />
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
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['rmk', {}]" maxLength="66" />
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JSelectDeptm from '@/components/jeecgbiz/JSelectDeptm'
  import JSelectStgm from '@/components/jeecgbiz/JSelectStgm'
  import JSelectSec from '@/components/jeecgbiz/JSelectSec'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'

  export default {
    name: "StgteamModal",
    components: {
      JSelectDeptm,
      JSelectStgm,
      JSelectSec,
      JDictSelectTag,
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
        teamNo:{rules: [{ required: true, message: '请输入班别编号，大写英文字母和数字，最长6位！' }]},
        teamNm:{rules: [{ required: true, message: '请输入班别名称，最长10个汉字！' }]},
        lockRmk:{rules: [{ required: true, message: '请选择锁定注记!' }], initialValue: 'N'},
        },
        url: {
          add: "/product/stgteam/add",
          edit: "/product/stgteam/edit",
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
          this.form.setFieldsValue(pick(this.model,'factNo','teamNo','teamNm','deptNo','stgNo','secNo','secNos','lockRmk','userNo','modifyDt','rmk'))
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