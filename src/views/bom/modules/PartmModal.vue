<template>
  <a-modal
    :title="title"
    :width="580"
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
          label="部位编号">
          <a-input placeholder="请输入部位编号" v-decorator="['partNo', validatorRules.partNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="部位名称">
          <a-input placeholder="请输入部位名称" v-decorator="['partNm', validatorRules.partNm ]" />
        </a-form-item>
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="部位英文名">
        <a-input placeholder="请输入部位英文名" v-decorator="['partEngNm', {}]" />
      </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="部位种类">
<!--          <a-select placeholder="请输入部位种类" v-decorator="['partMode', validatorRules.partMode ]" >-->
<!--            <a-select-option value="1">1.面部部位</a-select-option>-->
<!--            <a-select-option value="2">2.底部部位</a-select-option>-->
<!--            <a-select-option value="3">3.内盒部位</a-select-option>-->
<!--            <a-select-option value="4">4.外箱部位</a-select-option>-->
<!--            <a-select-option value="5">5.配件部位</a-select-option>-->
<!--            <a-select-option value="6">6.布标部位</a-select-option>-->
<!--            <a-select-option value="7">7.SIZE印刷部位</a-select-option>-->
<!--            <a-select-option value="8">8.标签部位</a-select-option>-->
<!--            <a-select-option value="9">9.车绣线部位</a-select-option>-->
<!--            <a-select-option value="A">A.胶药水部位</a-select-option>-->
<!--            <a-select-option value="I">I.成品类</a-select-option>-->
<!--          </a-select>-->
<!--          <a-input placeholder="请输入部位种类" v-decorator="['partMode', validatorRules.partMode ]" />-->
          <j-dict-select-tag placeholder="请选择部位种类" v-decorator="['partMode', validatorRules.partMode]" :triggerChange="true" dictCode="part_type"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主料注记编码">
<!--          <a-input v-decorator="['sameRmk', validatorRules.sameRmk ]" disabled="true" />-->
          <j-dict-select-tag v-decorator="['sameRmk', validatorRules.sameRmk ]" :type="'radio'" dictCode="yn_status" disabled="true" />
        </a-form-item>

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="异动人">-->
<!--          <a-input placeholder="请输入异动人" v-decorator="['userNo', validatorRules.userNo ]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="异动时间">-->
<!--          <a-input placeholder="请输入异动时间" v-decorator="['modifyDt', validatorRules.modifyDt ]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="成本部位编号">-->
<!--          <a-input placeholder="请输入成本部位编号" v-decorator="['cpartNo', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="成本部位名称">-->
<!--          <a-input placeholder="请输入成本部位名称" v-decorator="['cpartNm', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="预计用量可修改">-->
<!--          <a-input placeholder="请输入预计用量可修改" v-decorator="['purplanRmk', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="依订单计算用量时用">-->
<!--          <a-input placeholder="请输入依订单计算用量时用" v-decorator="['odrqRmk', {}]" />-->
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
  import JCheckbox from '@/components/jeecg/JCheckbox'

  export default {
    name: "PartmModal",
    components: {
      JDictSelectTag,
      JCheckbox
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
        partNo:{rules: [{ required: true, message: '请输入部位编号!' }]},
        partNm:{rules: [{ required: true, message: '请输入部位名称!' }]},
        partMode:{rules: [{ required: true, message: '请选择部位种类!' }]},
        sameRmk:{rules: [{ required: true, message: '请输入主料注记编码!' }], initialValue: 'N'},
        userNo:{rules: [{ required: true, message: '请输入异动人!' }]},
        modifyDt:{rules: [{ required: true, message: '请输入异动时间!' }]},
        },
        url: {
          add: "/bom/partm/add",
          edit: "/bom/partm/edit",
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
          this.form.setFieldsValue(pick(this.model,'factNo','partNo','partNm','partMode','sameRmk','partEngNm','userNo','modifyDt','cpartNo','cpartNm','purplanRmk','odrqRmk'))
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