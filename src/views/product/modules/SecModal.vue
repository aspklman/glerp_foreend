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

        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组别编号">
              <a-input placeholder="大写英文字母和数字，最长6位！" v-decorator="['secNo', validatorRules.secNo ]" maxLength="6" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组别名称">
              <a-input placeholder="最长10个汉字！" v-decorator="['secNm', validatorRules.secNm ]" maxLength="10" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="生产厂别">
<!--              <a-input placeholder="请输入生产厂别" v-decorator="['proFact', validatorRules.proFact ]" />-->
              <j-dict-select-tag placeholder="请选择生产厂别" v-decorator="['proFact', validatorRules.proFact]" :triggerChange="true" dictCode="pro_dept" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="派工组别">
<!--              <a-input placeholder="请输入派工组别" v-decorator="['belSec', {}]" />-->
              <j-select-sec v-decorator="['belSec', {}]"></j-select-sec>
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="派工阶段">
<!--              <a-input placeholder="请输入派工阶段" v-decorator="['deptNo', {}]" />-->
              <j-select-deptm v-decorator="['deptNo', {}]"></j-select-deptm>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="产量阶段">
<!--              <a-input placeholder="请输入产量阶段" v-decorator="['borDept', {}]" />-->
              <j-select-stgm v-decorator="['borDept', {}]"></j-select-stgm>
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="锁定注记">
<!--              <a-input placeholder="请输入锁定注记" v-decorator="['lockRmk', validatorRules.lockRmk ]" />-->
              <j-dict-select-tag v-decorator="['lockRmk', validatorRules.lockRmk]" :type="'radio'" :triggerChange="true" dictCode="lock_rmk_yn"  @change="changeLockDate" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="锁定日期">
<!--              <a-input placeholder="请输入锁定日期" v-decorator="['lockDate', {}]" />-->
              <j-date v-decorator="['lockDate', validatorRules.lockDate]" dateFormat="YYYYMMDD" disabled="true" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="厂别注记">
<!--              <a-input placeholder="请输入厂别注记" v-decorator="['proType', {}]" />-->
              <j-dict-select-tag v-decorator="['proType', validatorRules.proType]" :type="'radio'" :triggerChange="true" dictCode="yn_status" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="备注">
              <!--              <a-input placeholder="请输入备注" v-decorator="['secDesc', {}]" />-->
              <a-textarea placeholder="请输入备注，最长13个汉字！" v-decorator="['secDesc', {} ]" :autosize="{ minRows: 2, maxRows: 6}" maxLength="13" />
            </a-form-item>
          </a-col>
        </a-row>

		
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
  import JCheckbox from '../../../components/jeecg/JCheckbox'
  import JSelectDeptm from '@/components/jeecgbiz/JSelectDeptm'
  import JSelectStgm from '@/components/jeecgbiz/JSelectStgm'
  import JSelectSec from '@/components/jeecgbiz/JSelectSec'

  export default {
    name: "SecModal",
    components: {
      JCheckbox,
      JDictSelectTag,
      JDate,
      JSelectDeptm,
      JSelectStgm,
      JSelectSec,
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
        secNo:{rules: [{ required: true, message: '请输入组别编号，大写英文字母和数字，最长6位！' }]},
        secNm:{rules: [{ required: true, message: '请输入组别名称，最长10个汉字！' }]},
        aimRate:{rules: [{ required: true, message: '请输入AIM_RATE!' }]},
        awardRmk:{rules: [{ required: true, message: '请输入AWARD_RMK!' }]},
        proFact:{rules: [{ required: true, message: '请输入生产厂别!' }]},
        lockRmk:{rules: [{ required: true, message: '请选择锁定注记!' }], initialValue: 'N'},
        proType:{rules: [{ required: true, message: '请选择厂别注记!' }], initialValue: 'N'},
        },
        url: {
          add: "/product/sec/add",
          edit: "/product/sec/edit",
        },
      }
    },

    created () {
    },

    methods: {

      //锁定时自动填写锁定日期
      changeLockDate(e) {
        if (e == 'Y') {
          this.form.setFieldsValue({'lockDate': ((new Date()).getFullYear().toString()) + (((new Date()).getMonth()+1<10) ? ('0'+((new Date()).getMonth()+1).toString()) : (((new Date()).getMonth()+1).toString())) + (((new Date()).getDate()<10) ? ('0'+(new Date()).getDate().toString()) : ((new Date()).getDate().toString()))})
        } else if (e == 'N') {
          this.form.setFieldsValue({'lockDate': ''})
        }
      },

      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'factNo','secNo','secNm','cardNm','secKind','borNo','secLevel','belSec','salRmk','aimRate','awardRmk','idNo','boardNo','secDesc','userNo','modifyDt','deptNo','proFact','upSec','lockRmk','lockDate','managerPer','relTel','proxyPer','assPer','secondProxy','borDept','lineNo','groupNo','timingKind','proType','proflNo','countItem','awardSec','secSimpleNm','secId'))
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

      // inputChangeLockDate(value){
      //   if(value=='Y'){
      //     this.form.setFieldsValue(pick(this.model,'lockDate','11'));
      //     console.log('abc');
      //   }
      // },

    },
  }
</script>

<style lang="less" scoped>

</style>