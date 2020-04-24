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
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组别编号">
<!--              <a-input placeholder="请输入组别编号" v-decorator="['secNo', validatorRules.secNo ]" />-->
              <j-select-sec v-decorator="['secNo', validatorRules.secNo]"></j-select-sec>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="生效日期">
<!--              <a-input placeholder="请输入生效日期" v-decorator="['effectiveDate', validatorRules.effectiveDate ]" />-->
              <j-date v-decorator="['effectiveDate', validatorRules.effectiveDate ]" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="型体编号">
              <a-input placeholder="请输入型体编号" v-decorator="['style', validatorRules.style]" />
<!--              <j-select-stylem v-decorator="['style', validatorRules.style]"></j-select-stylem>-->
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="鞋子类型">
              <a-input placeholder="请输入鞋子类型" v-decorator="['shoeCategory', validatorRules.shoeCategory]" />
            </a-form-item>
          </a-col>
        </a-row>


<!--        <a-row type="flex" justify="space-between">-->
<!--          <a-col :span="8" :gutter="7">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="节拍时间">-->
<!--              <a-input placeholder="请输入节拍时间" v-decorator="['tt', validatorRules.tt]" disabled="true"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="8" :gutter="7">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="总周期时间">-->
<!--              <a-input placeholder="请输入总周期时间" v-decorator="['tct', validatorRules.tct]" disabled="true"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="8" :gutter="7">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="MFG_LT">-->
<!--              <a-input placeholder="请输入MFG_LT" v-decorator="['mfgLt', validatorRules.mfgLt]" disabled="true"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->


        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="目标产量">
              <a-input placeholder="请输入目标产量" v-decorator="['planQty', validatorRules.planQty]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="PPH目标">
              <a-input placeholder="请输入PPH目标" v-decorator="['pphGoal', validatorRules.pphGoal]" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="目标直通率">
              <a-input placeholder="请输入目标直通率" v-decorator="['fpyGoal', validatorRules.fpyGoal]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">

          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="应到人数">
              <a-input placeholder="请输入应到人数" v-decorator="['headcount', validatorRules.headcount]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="实到人数">
              <a-input placeholder="请输入实到人数" v-decorator="['actualWorkers', validatorRules.actualWorkers]" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="直接人工">
              <a-input placeholder="请输入直接人工" v-decorator="['directLabor', validatorRules.directLabor]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="间接人工">
              <a-input placeholder="请输入间接人工" v-decorator="['directLaborN', validatorRules.directLaborN]" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="多能工人">
              <a-input placeholder="请输入多能工人数" v-decorator="['multiSkillWorkers', validatorRules.multiSkillWorkers]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="非多能工人">
              <a-input placeholder="请输入非多能工人数" v-decorator="['multiSkillWorkersN', validatorRules.multiSkillWorkersN]" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="产线组长">
              <a-input placeholder="请输入产线组长" v-decorator="['lineLeader', validatorRules.lineLeader]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="产线厂长">
              <a-input placeholder="请输入产线厂长" v-decorator="['productionSupervisor', validatorRules.productionSupervisor]" />
            </a-form-item>
          </a-col>
        </a-row>



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
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="型体">-->
<!--          <a-input placeholder="请输入型体" v-decorator="['style', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="型体描述">-->
<!--          <a-input placeholder="请输入型体描述" v-decorator="['styleDescription', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="鞋子类型">-->
<!--          <a-input placeholder="请输入鞋子类型" v-decorator="['shoeCategory', {}]" />-->
<!--        </a-form-item>-->


		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JDate from '@/components/jeecg/JDate'
  import JSelectSec from '@/components/jeecgbiz/JSelectSec'
  import JSelectStylem from '../../../components/jeecgbiz/JSelectStylem'

  export default {
    name: "Plan_prodModal",
    components: {
      JSelectStylem,
      JDate,
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
          secNo:{rules: [{ required: true, message: '请输入组别编号!' }]},
          effectiveDate:{rules: [{ required: true, message: '请输入生效日期!' }], initialValue: ((new Date()).getFullYear().toString()) + (((new Date()).getMonth()+1<10) ? ('0'+((new Date()).getMonth()+1).toString()) : (((new Date()).getMonth()+1).toString())) + (((new Date()).getDate()<10) ? ('0'+(new Date()).getDate().toString()) : ((new Date()).getDate().toString())) },
          style:{rules: [{ required: true, message: '请输入型体编号!' }]},
          shoeCategory:{rules: [{ required: true, message: '请输入鞋子类型!' }]},
          lineLength:{rules: [{ required: true, message: '请输入线长度!' }], initialValue: 1 },
          tt:{rules: [{ required: true, message: '请输入节拍时间!' }], initialValue: 1 },
          tct:{rules: [{ required: true, message: '请输入总周期时间!' }], initialValue: 1 },
          mfgLt:{rules: [{ required: true, message: '请输入MFG_LT!' }], initialValue: 1 },
          planQty:{rules: [{ required: true, message: '请输入目标产量!' }]},
          pphGoal:{rules: [{ required: true, message: '请输入PPH目标!' }]},
          fpyGoal:{rules: [{ required: true, message: '请输入目标直通率!' }]},
          headcount:{rules: [{ required: true, message: '请输入应到人数!' }]},
          actualWorkers:{rules: [{ required: true, message: '请输入实到人数!' }]},
          directLabor:{rules: [{ required: true, message: '请输入直接人工!' }]},
          directLaborN:{rules: [{ required: true, message: '请输入间接人工!' }]},
          multiSkillWorkers:{rules: [{ required: true, message: '请输入多能人工!' }]},
          multiSkillWorkersN:{rules: [{ required: true, message: '请输入非多能人工!' }]},
          lineLeader:{rules: [{ required: true, message: '请输入产线组长!' }]},
          productionSupervisor:{rules: [{ required: true, message: '请输入产线厂长!' }]},
        },
        url: {
          add: "/scan/plan_prod/add",
          edit: "/scan/plan_prod/edit",
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
          this.form.setFieldsValue(pick(this.model,'lineLength','tt','tct','mfgLt','factNo','secNo','effectiveDate','planQty','headcount','fpyGoal','lineLeader','productionSupervisor','userNo','modifyDt','style','styleDescription','shoeCategory','pphGoal','actualWorkers','directLabor','directLaborN','multiSkillWorkers','multiSkillWorkersN'))
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