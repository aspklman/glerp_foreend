<template>
  <a-modal
    :title="title"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="生产日期">
              <!--          <a-input placeholder="请输入生产日期" v-decorator="['recDate', validatorRules.recDate ]" />-->
              <j-date v-decorator="['recDate', validatorRules.recDate ]" dateFormat="YYYYMMDD"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组别编号">
              <!--          <a-input placeholder="请输入组别编号" v-decorator="['secNo', validatorRules.secNo ]" />-->
              <j-select-sec style="width:75%" v-decorator="['secNo', validatorRules.secNo]"></j-select-sec>
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="08:00-09:30">
              <!--              <a-input placeholder="请输入08:00-09:30时段产量" v-decorator="['a0800', validatorRules.a0800]" />-->
              <!--              <a-input v-model="a0800" :triggerChange="true" />-->
              <a-input
                style="width:75%; text-align:right"
                placeholder="请输入08:00-09:30时段产量，无产量请输入0！"
                v-decorator="['a0800', validatorRules.a0800]"
                @input="sumTotalQty"/>     <!--怎样将用户输入的产量作为参数传递？-->
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="09:30-11:30">
              <a-input
                style="width:75%; text-align:right"
                placeholder="请输入09:30-11:30时段产量，无产量请输入0！"
                v-decorator="['a0930', validatorRules.a0930]"
                @keyup="sumTotalQty"/>
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="11:30-12:00">
              <a-input style="width:75%; text-align:right" placeholder="请输入11:30-12:00时段产量，无产量请输入0！"
                       v-decorator="['a1130', validatorRules.a1130]" @keyup="sumTotalQty"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="13:00-15:00">
              <a-input style="width:75%; text-align:right" placeholder="请输入13:00-15:00时段产量，无产量请输入0！"
                       v-decorator="['a1300', validatorRules.a1300]" @keyup="sumTotalQty"/>
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="15:00-17:00">
              <a-input style="width:75%; text-align:right" placeholder="请输入15:00-17:00时段产量，无产量请输入0！"
                       v-decorator="['a1500', validatorRules.a1500]" @keyup="sumTotalQty"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="17:00-18:30">
              <a-input style="width:75%; text-align:right" placeholder="请输入17:00-18:30时段产量，无产量请输入0！"
                       v-decorator="['a1700', validatorRules.a1700]" @keyup="sumTotalQty"/>
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="OT">
              <a-input style="width:75%; text-align:right" placeholder="请输入OT时段产量，无产量请输入0！"
                       v-decorator="['ot', validatorRules.ot]" @keyup="sumTotalQty"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="合计产量">
              <!--              <a-input v-decorator="['totalQty', {}]" />-->
              <a-input style="width:75%; text-align:right" v-model="totalQty" :disabled="true" size="large"/>
              <!--              <p> {{ totalQty }} </p>-->
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
    import {httpAction} from '@/api/manage'
    import pick from 'lodash.pick'
    import moment from "moment"
    import JSelectSec from '@/components/jeecgbiz/JSelectSec'
    import JDate from '@/components/jeecg/JDate'

    export default {
        name: "Stgscan_molding_halfModal",
        components: {
            JSelectSec,
            JDate,
        },
        data() {
            return {
                // a0800Val: 0,
                //   a0930Val: 0,
                //   a1130Val: 0,
                //     a1300Val: 0,
                //     a1500Val: 0,
                //     a1700Val: 0,
                //     otVal: 0,
                inputValue: 0,
                totalQty: 0,
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
                    recDate: {
                        rules: [{required: true, message: '请输入生产日期!'}],
                        initialValue: ((new Date()).getFullYear().toString()) + (((new Date()).getMonth() + 1 < 10) ? ('0' + ((new Date()).getMonth() + 1).toString()) : (((new Date()).getMonth() + 1).toString())) + (((new Date()).getDate() < 10) ? ('0' + (new Date()).getDate().toString()) : ((new Date()).getDate().toString()))
                    },
                    secNo: {rules: [{required: true, message: '请输入组别编号!'}]},
                    a0800: {rules: [{required: true, message: '请输入08:00-09:30时段产量，无产量请输入0！'}], initialValue: 0},
                    a0930: {rules: [{required: true, message: '请输入09:30-11:30时段产量，无产量请输入0！'}], initialValue: 0},
                    a1130: {rules: [{required: true, message: '请输入11:30-12:00时段产量，无产量请输入0！'}], initialValue: 0},
                    a1300: {rules: [{required: true, message: '请输入13:00-15:00时段产量，无产量请输入0！'}], initialValue: 0},
                    a1500: {rules: [{required: true, message: '请输入15:00-17:00时段产量，无产量请输入0！'}], initialValue: 0},
                    a1700: {rules: [{required: true, message: '请输入17:00-18:30时段产量，无产量请输入0！'}], initialValue: 0},
                    ot: {rules: [{required: true, message: '请输入OT时段产量，无产量请输入0！'}], initialValue: 0},
                },
                url: {
                    add: "/scan/stgscan_molding_half/add",
                    edit: "/scan/stgscan_molding_half/edit",
                },
            }
        },

        created() {
        },

        methods: {
            //将各时段产量相加填入【合计产量】
            sumTotalQty() {
                let a0800Val = parseFloat(this.form.getFieldValue('a0800'));
                let a0930Val = parseFloat(this.form.getFieldValue('a0930'));
                let a1130Val = parseFloat(this.form.getFieldValue('a1130'));
                let a1300Val = parseFloat(this.form.getFieldValue('a1300'));
                let a1500Val = parseFloat(this.form.getFieldValue('a1500'));
                let a1700Val = parseFloat(this.form.getFieldValue('a1700'));
                let otVal = parseFloat(this.form.getFieldValue('ot'));
                console.log(a0800Val + '/' + a0930Val + '/' + a1130Val + '/' + a1300Val + '/' + a1500Val + '/' + a1700Val + '/' + otVal)
                this.totalQty = a0800Val + a0930Val + a1130Val + a1300Val + a1500Val + a1700Val + otVal;
                console.log(this.totalQty)
            },

            add() {
                this.totalQty = 0;      //点“新增”后，将【合计产量】改为0
                this.edit({});
            },
            edit(record) {
                this.form.resetFields();
                this.model = Object.assign({}, record);
                this.visible = true;
                this.$nextTick(() => {
                    this.form.setFieldsValue(pick(this.model, 'factNo', 'recDate', 'secNo', 'a0800', 'a0930', 'a1130', 'a1300', 'a1500', 'a1700', 'ot', 'userNo', 'modifyDt'))
                    this.sumTotalQty();   //点“编辑”后，自动填写【合计产量】
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


        },

    }
</script>

<style lang="less" scoped>

  #canvas {
    width: 600px;
    padding: 200px 20px;
    text-align: center;
    border: 1px solid #333333;
  }

</style>