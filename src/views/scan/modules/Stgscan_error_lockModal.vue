<template>
  <a-modal
    :title="title"
    :width="500"
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
          label="组别编号">
          <!--          <a-input placeholder="请输入组别编号" v-decorator="['secNo', validatorRules.secNo ]" />-->
          <j-select-sec v-decorator="['secNo', validatorRules.secNo]"></j-select-sec>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="锁定标记">
          <!--          <a-input placeholder="请输入锁定标记" v-decorator="['lockRmk', validatorRules.lockRmk]" />-->
          <j-dict-select-tag v-decorator="['lockRmk', validatorRules.lockRmk]" :type="'radio'" :triggerChange="true"
                             dictCode="lock_rmk"/>
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
    import {httpAction} from '@/api/manage'
    import pick from 'lodash.pick'
    import moment from "moment"
    import JSelectSec from '@/components/jeecgbiz/JSelectSec'
    import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'

    export default {
        name: "Stgscan_error_lockModal",
        components: {
            JSelectSec,
            JDictSelectTag,
        },
        data() {
            return {
                title: "操作",
                visible: false,
                model: {},
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 5},
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 16},
                },

                confirmLoading: false,
                form: this.$form.createForm(this),
                validatorRules: {
                    factNo: {rules: [{required: true, message: '请输入厂区编号!'}]},
                    secNo: {rules: [{required: true, message: '请输入组别编号!'}]},
                    lockRmk: {rules: [{required: true, message: '请选择锁定标记!'}], initialValue: '0'},
                },
                url: {
                    add: "/scan/stgscan_error_lock/add",
                    edit: "/scan/stgscan_error_lock/edit",
                },
            }
        },
        created() {
        },
        methods: {
            add() {
                this.edit({});
            },
            edit(record) {
                this.form.resetFields();
                this.model = Object.assign({}, record);
                this.visible = true;
                this.$nextTick(() => {
                    this.form.setFieldsValue(pick(this.model, 'factNo', 'secNo', 'lockRmk', 'userNo', 'modifyDt'))
                    //时间格式化
                });

            },
            close() {
                this.$emit('close');
                this.visible = false;
            },
            handleOk() {
                const that = this;
                // 触发表单验证
                this.form.validateFields((err, values) => {
                    if (!err) {
                        that.confirmLoading = true;
                        let httpurl = '';
                        let method = '';
                        if (!this.model.id) {
                            httpurl += this.url.add;
                            method = 'post';
                        } else {
                            httpurl += this.url.edit;
                            method = 'put';
                        }
                        let formData = Object.assign(this.model, values);
                        //时间格式化

                        console.log(formData)
                        httpAction(httpurl, formData, method).then((res) => {
                            if (res.success) {
                                that.$message.success(res.message);
                                that.$emit('ok');
                            } else {
                                that.$message.warning(res.message);
                            }
                        }).finally(() => {
                            that.confirmLoading = false;
                            that.close();
                        })


                    }
                })
            },
            handleCancel() {
                this.close()
            },


        }
    }
</script>

<style lang="less" scoped>

</style>