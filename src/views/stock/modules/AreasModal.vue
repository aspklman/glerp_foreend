<template>
  <a-modal
    :title="title"
    :width="600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="生产厂别">
<!--          <a-input placeholder="请输入生产厂别" v-decorator="['proFact', validatorRules.proFact ]" />-->
          <j-dict-select-tag placeholder="请选择生产厂别" v-decorator="['proFact', validatorRules.proFact]" :triggerChange="true" dictCode="pro_dept" />
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="厂区编号">-->
<!--          <a-input placeholder="请输入厂区编号" v-decorator="['factNo', validatorRules.factNo ]" />-->
<!--        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="仓库编号">
<!--          <a-input placeholder="请输入仓库编号" v-decorator="['stkNo', validatorRules.stkNo ]" />-->
          <j-select-stkidm v-decorator="['stkNo', validatorRules.stkNo]"></j-select-stkidm>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="区域编号">
          <j-select-locate v-decorator="['locNo', validatorRules.locNo]"></j-select-locate>
<!--          <a-input placeholder="请输入区域编号" v-decorator="['locNo', validatorRules.locNo ]" />-->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="仓库栋别">
<!--          <a-input placeholder="请输入仓库栋别" v-decorator="['buildingNo', validatorRules.buildingNo ]" />-->
          <j-dict-select-tag placeholder="请选择仓库栋别" v-decorator="['buildingNo', validatorRules.buildingNo]" :triggerChange="true" dictCode="building_no" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="仓库楼层">
<!--          <a-input placeholder="请输入仓库楼层" v-decorator="['floorNo', validatorRules.floorNo ]" />-->
          <j-dict-select-tag
            placeholder="请选择仓库楼层"
            v-decorator="['floorNo', validatorRules.floorNo]"
            :triggerChange="true"
            dictCode="floor_no"
            @change="genLocArea">
          </j-dict-select-tag>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="地点编号">
          <a-input placeholder="请输入地点编号" v-decorator="['locArea', validatorRules.locArea ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="地点名称">
          <a-input placeholder="请输入地点名称" v-decorator="['locAreaDesc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-textarea placeholder="请输入备注" v-decorator="['memo', {}]" :autosize="{ minRows: 2, maxRows: 6 }"/>
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import JSelectStkidm from '@/components/jeecgbiz/JSelectStkidm'
  import ATextarea from 'ant-design-vue/es/input/TextArea'
  import JSearchSelectTag from '@/components/dict/JSearchSelectTag'
  import JSelectLocate from '@/components/jeecgbiz/JSelectLocate'

  export default {
    name: "AreasModal",
    components: {
      ATextarea,
      JSelectStkidm,
      JDictSelectTag,
      JSearchSelectTag,
      JSelectLocate,
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
        proFact:{rules: [{ required: true, message: '请输入生产厂别!' }]},
        factNo:{rules: [{ required: true, message: '请输入厂区编号!' }]},
        stkNo:{rules: [{ required: true, message: '请输入仓库编号!' }]},
        locNo:{rules: [{ required: true, message: '请输入区域编号!' }]},
        buildingNo:{rules: [{ required: true, message: '请输入仓库栋别!' }]},
        floorNo:{rules: [{ required: true, message: '请输入仓库楼层!' }]},
        locArea:{rules: [{ required: true, message: '请输入地点编号!' }]},
        locNo:{rules: [{ required: true, message: '请选择存放区域!' }]},
        },
        url: {
          add: "/stock/areas/add",
          edit: "/stock/areas/edit",
        },
      }
    },
    created () {
    },
    methods: {
      genLocArea(e) {
        //存放区域
        let locNoTemp = this.form.getFieldValue('locNo');
        let locNo = '';
        if (locNoTemp == '01') {
          locNo = 'R';
        } else if (locNoTemp == '02'){
          locNo = 'A';
        } else if (locNoTemp == '03'){
          locNo = 'S';
        } else if(locNoTemp == '04'){
          locNo = 'V';
        }
        //栋别
        let buildingNo = this.form.getFieldValue('buildingNo');
        //楼层
        let floorNo = e;
        //序号
        let serialNo = '001';
        //存放地点
        //需要取最大序号,怎么实现?
        let locArea = locNo + buildingNo + floorNo + serialNo;
        this.form.setFieldsValue({'locArea': locArea});
        console.log(locArea);

      },

      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'proFact','factNo','stkNo','locNo','buildingNo','floorNo','locArea','locAreaDesc','memo'))
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