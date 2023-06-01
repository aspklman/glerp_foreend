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
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="大分类编号">
            <a-input placeholder="自动获取大分类编号，无须填写！" v-decorator="['kindNoMain', validatorRules.kindNoMain]" :disabled="true" />
            <!--        <j-select-kind-no-main v-decorator="['kindNoMain', validatorRules.kindNoMain]" />-->
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="中分类编号">
            <!--          <a-input placeholder="请输入中分类编号" v-decorator="['kindNoMid', {}]" />-->
            <j-select-kind-no-mid @change="getKindNoSmall" v-decorator="['kindNoMid', validatorRules.kindNoMid]" />
          </a-form-item>
  <!--        <a-form-item-->
  <!--          :labelCol="labelCol"-->
  <!--          :wrapperCol="wrapperCol"-->
  <!--          label="厂区编号">-->
  <!--          <a-input placeholder="请输入厂区编号" v-decorator="['factNo', {}]" />-->
  <!--        </a-form-item>-->
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="编号">
            <a-input placeholder="自动获取明细类编号，无须填写！" v-decorator="['kindNo', {}]" :disabled="true" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="名称">
            <a-input placeholder="请输入名称" v-decorator="['kindName', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="单位">
            <a-input placeholder="请输入单位" v-decorator="['unit', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="备注">
<!--            <a-input placeholder="请输入备注" v-decorator="['notes', {}]" />-->
            <a-textarea placeholder="请输入备注" v-decorator="['notes', {}]" :autosize="{ minRows: 3, maxRows: 6}"/>
          </a-form-item>

        </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { getAction } from '@/api/manage'
  import JSelectKindNoMain from '../../../components/jeecgbiz/JSelectKindNoMain'
  import JSelectKindNoMid from '../../../components/jeecgbiz/JSelectKindNoMid'

  export default {
    name: "BasicSmallKindModal",
    components: {
      JSelectKindNoMain,
      JSelectKindNoMid
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
          kindNoMain:{rules: [{ required: true, message: '请选择大分类编号!' }]},
          kindNoMid:{rules: [{ required: true, message: '请选择中分类编号!' }]},
        },
        url: {
          add: "/asset/basicSmallKind/add",
          edit: "/asset/basicSmallKind/edit",
          getKindNoSmall: "/asset/basicSmallKind/getKindNoSmall",
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
          this.form.setFieldsValue(pick(this.model,'factNo','kindNoMain','kindNoMid','kindNo','kindName','unit','notes'))
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

      // 获取【明细类编号】
      getKindNoSmall(e) {
        let kindNoMid = e.toString()
        let pp = new Array(1)
        pp[0] = kindNoMid
        let pssr = pp.toString()
        console.log('pssr的值：' + pssr)
        getAction(this.url.getKindNoSmall, {pssr: pssr}).then((res) => {
          if (res.success) {
            this.form.setFieldsValue({'kindNoMain': res.result.kindNoMain})
            this.form.setFieldsValue({'kindNo': res.result.kindNoSmall})
            // console.log(res.result);
            // this.$message.success(res.message)
            // console.log(`提交成功!`)
          }
          if (res.code === 510) {
            // this.$message.warning(res.message)
          }
        })
        this.$forceUpdate()
      },


    }
  }
</script>

<style lang="less" scoped>

</style>