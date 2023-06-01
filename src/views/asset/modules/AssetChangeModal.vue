<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :footer="title!='新增'?null:footer"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="厂区编号">-->
<!--          <a-input placeholder="请输入厂区编号" v-decorator="['factNo', {}]" />-->
<!--        </a-form-item>-->

        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="异动单号">
              <a-input placeholder="自动获取异动单号，无须填写！" v-decorator="['changeNo', validatorRules.changeNo]" :disabled="true" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="异动日期">
<!--              <a-input placeholder="请输入异动日期" v-decorator="['changeDt', validatorRules.changeDt]" />-->
              <j-date placeholder="请选择异动日期" v-decorator="['changeDt', validatorRules.changeDt ]" dateFormat="YYYY-MM-DD" />
            </a-form-item>
          </a-col>
        </a-row>

        <hr align=center color=#987cb9 SIZE=1>
        <br>

        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="资产编号">
<!--              <a-input v-decorator="['assetNo', validatorRules.assetNo]" />-->
              <j-select-asset-no @change="fillAssetDetail" v-decorator="['assetNo', validatorRules.assetNo]" />
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
              label="原使用状况">
<!--              <a-input placeholder="自动获取原使用状况，无须填写！" v-decorator="['stateOld', {}]" :disabled="true" />-->
              <j-dict-select-tag v-decorator="['stateOld', validatorRules.stateOld]" :type="'radio'" :triggerChange="true" dictCode="asset_use_status" :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="现使用状况">
<!--              <a-input placeholder="请输入现使用状况" v-decorator="['state', {}]" />-->
              <j-dict-select-tag v-decorator="['state', validatorRules.state]" :type="'radio'" :triggerChange="true" dictCode="asset_use_status" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="原使用厂别">
              <j-dict-select-tag
                placeholder="自动获取原使用厂别，无须填写！"
                v-decorator="['factLocationOld', {}]"
                :triggerChange="true"
                dictCode="asset_fact_location"
                :disabled="true" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="现使用厂别">
              <j-dict-select-tag
                placeholder="请选择现使用厂别"
                v-decorator="['factLocation', validatorRules.factLocation]"
                :triggerChange="true"
                dictCode="asset_fact_location"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="原班组">
              <a-input placeholder="自动获取原班组，无须填写！" v-decorator="['deptNoOld', {}]" :disabled="true" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="现班组">
<!--              <a-input placeholder="请输入现班组" v-decorator="['deptNo', {}]" />-->
              <j-select-org-group v-decorator="['deptNo', validatorRules.deptNo]" ></j-select-org-group>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="原存放位置">
              <a-input placeholder="自动获取原存放位置，无须填写！" v-decorator="['locationOld', {}]" :disabled="true" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="现存放位置">
              <a-input placeholder="请输入现存放位置" v-decorator="['location', validatorRules.location]" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="原存放楼层">
<!--              <a-input placeholder="自动获取原存放楼层，无须填写！" v-decorator="['locationFlOld', {}]" :disabled="true" />-->
              <j-dict-select-tag placeholder="自动获取原存放楼层，无须填写！" v-decorator="['locationFlOld', {}]" dictCode="asset_location_fl" :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="现存放楼层">
<!--              <a-input placeholder="请输入现存放楼层" v-decorator="['locationFl', {}]" />-->
<!--              <j-dict-select-tag v-decorator="['locationFl', validatorRules.locationFl]" dictCode="asset_location_fl" />-->
              <j-dict-select-tag @change="fillFact"
                                 placeholder="请选择现存放楼层"
                                 v-decorator="['locationFl', validatorRules.locationFl]"
                                 :triggerChange="true"
                                 dictCode="asset_location_fl"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="原存放区域">
<!--              <a-input placeholder="自动获取原存放区域，无须填写！" v-decorator="['locationDlOld', {}]" :disabled="true" />-->
              <j-dict-select-tag placeholder="自动获取原存放区域，无须填写！" v-decorator="['locationDlOld', {}]" dictCode="asset_location_dl" :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="现存放区域">
<!--              <a-input placeholder="请输入现存放区域" v-decorator="['locationDl', {}]" />-->
              <j-dict-select-tag placeholder="自动获取现存放区域，无须填写！" v-decorator="['locationDl', validatorRules.locationDl]" dictCode="asset_location_dl" :disabled="true"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="原存放厂区">
<!--              <a-input placeholder="自动获取原存放厂区，无须填写！" v-decorator="['locationFactOld', {}]" :disabled="true" />-->
              <j-dict-select-tag placeholder="自动获取原存放厂区，无须填写！" v-decorator="['locationFactOld', {}]" dictCode="asset_location_fact" :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="现存放厂区">
<!--              <a-input placeholder="请输入现存放厂区" v-decorator="['locationFact', {}]" />-->
              <j-dict-select-tag placeholder="自动获取现存放厂区，无须填写！" v-decorator="['locationFact', validatorRules.locationFact]" dictCode="asset_location_fact" :disabled="true"/>
            </a-form-item>
          </a-col>
        </a-row>


<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="原厂别">-->
<!--          <a-input placeholder="请输入原厂别" v-decorator="['factOld', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="原绩效中心">-->
<!--          <a-input placeholder="请输入原绩效中心" v-decorator="['factCentreOld', {}]" />-->
<!--        </a-form-item>-->


        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="原保管人">
              <a-input placeholder="自动获取原保管人，无须填写！" v-decorator="['custodianOld', {}]" :disabled="true" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="现保管人">
              <a-input placeholder="请输入现保管人" v-decorator="['custodian', validatorRules.custodian]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="原使用人">
              <a-input placeholder="自动获取原使用人，无须填写！" v-decorator="['custodianUserOld', {}]" :disabled="true" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="现使用人">
              <a-input placeholder="请输入现使用人" v-decorator="['custodianUser', validatorRules.custodianUser]" />
            </a-form-item>
          </a-col>
        </a-row>



<!--        <a-form-item-->
<!--        :labelCol="labelCol"-->
<!--        :wrapperCol="wrapperCol"-->
<!--        label="原管理经理">-->
<!--        <a-input placeholder="请输入原管理经理" v-decorator="['custodianManagerOld', {}]" />-->
<!--      </a-form-item>-->

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="现厂别">-->
<!--          <a-input placeholder="请输入现厂别" v-decorator="['fact', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="现绩效中心">-->
<!--          <a-input placeholder="请输入现绩效中心" v-decorator="['factCentre', {}]" />-->
<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="现管理经理">-->
<!--          <a-input placeholder="请输入现管理经理" v-decorator="['custodianManager', {}]" />-->
<!--        </a-form-item>-->

        <hr align=center color=#987cb9 SIZE=1>
        <br>

        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="备注">
<!--              <a-input placeholder="请输入备注" v-decorator="['notes', {}]" />-->
              <a-textarea placeholder="请输入备注" v-decorator="['notes', {}]" :autosize="{ minRows: 3, maxRows: 6}"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">

          </a-col>
        </a-row>

        <hr align=center color=#987cb9 SIZE=1>
        <br>

        <a-row type="flex" justify="space-between">
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="创建人">
              <a-input placeholder="" v-decorator="['createBy', {}]" :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="创建日期">
              <a-input placeholder="" v-decorator="['createTime', {}]" :disabled="true"/>
            </a-form-item>
          </a-col>
        </a-row>

<!--        <a-row type="flex" justify="space-between">-->
<!--          <a-col :span="12" :gutter="7">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="修改人">-->
<!--              <a-input placeholder="" v-decorator="['updateBy', {}]" :disabled="true"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="7">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="修改日期">-->
<!--              <a-input placeholder="" v-decorator="['updateTime', {}]" :disabled="true"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->



      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JDate from '@/components/jeecg/JDate'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import JSelectOrgUnit from '../../../components/jeecgbiz/JSelectOrgUnit'
  import JSelectAssetNo from '../../../components/jeecgbiz/JSelectAssetNo'
  import { getAction } from '../../../api/manage'
  import JSelectOrgGroup from '../../../components/jeecgbiz/JSelectOrgGroup'


  export default {
    name: "AssetChangeModal",
    components: {
      JSelectOrgGroup,
      JSelectAssetNo,
      JDate,
      JDictSelectTag,
      JSelectOrgUnit,
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
        // changeNo: '',
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          changeNo:{rules: [{ required: true, message: '自动获取异动单号，无须填写！' }]},
          changeDt: { rules: [{ required: true, message: '请选择异动日期！' }], initialValue: ((new Date()).getFullYear().toString()) + (((new Date()).getMonth()+1<10) ? ('0'+((new Date()).getMonth()+1).toString()) : (((new Date()).getMonth()+1).toString())) + (((new Date()).getDate()<10) ? ('0'+(new Date()).getDate().toString()) : ((new Date()).getDate().toString())) },
          assetNo:{rules: [{ required: true, message: '请输入资产编号!' }]},
          state:{rules: [{ required: true, message: '请输入资产编号!' }], initialValue: '1'},
          factLocation:{rules: [{ required: true, message: '请选择现使用厂别!' }]},
          deptNo:{rules: [{ required: true, message: '请选择现班组!' }]},
          location:{rules: [{ required: true, message: '请输入现存放位置!' }]},
          locationFl:{rules: [{ required: true, message: '请选择现存放楼层！' }]},
          locationDl:{rules: [{ required: true, message: '自动获取现存放区域，无须填写！' }]},
          locationFact:{rules: [{ required: true, message: '自动获取现存放厂区，无须填写！' }]},
          custodian:{rules: [{ required: true, message: '请输入现保管人！' }]},
          custodianUser:{rules: [{ required: true, message: '请输入现使用人！' }]},

        },
        url: {
          add: "/asset/assetChange/add",
          edit: "/asset/assetChange/edit",
          getAssetDetailByNo: "/asset/assetChange/getAssetDetailByNo",
          getChangeNo: "/asset/assetChange/getChangeNo",
          updateAssetDetail: "/asset/assetRecord/updateAssetDetail",
        },
      }
    },

    mounted () {

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
          this.form.setFieldsValue(pick(this.model,'factNo','changeNo','changeDt','assetNo','stateOld','factOld','factCentreOld','factLocationOld','deptNoOld','locationOld','custodianOld','custodianManagerOld','custodianUserOld','locationFlOld','locationDlOld','locationFactOld','state','fact','factCentre','factLocation','deptNo','location','custodian','custodianManager','custodianUser','locationFl','locationDl','locationFact','notes','createBy','createTime','updateBy','updateTime'))
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
            // 如果原值和现值相同，无须异动
            if (this.form.getFieldValue('stateOld') == this.form.getFieldValue('state') &&
                this.form.getFieldValue('factLocationOld') == this.form.getFieldValue('factLocation') &&
                this.form.getFieldValue('deptNoOld') == this.form.getFieldValue('deptNo') &&
                this.form.getFieldValue('locationOld') == this.form.getFieldValue('location') &&
                this.form.getFieldValue('locationFlOld') == this.form.getFieldValue('locationFl') &&
                this.form.getFieldValue('locationDlOld') == this.form.getFieldValue('locationDl') &&
                this.form.getFieldValue('locationFactOld') == this.form.getFieldValue('locationFact') &&
                this.form.getFieldValue('custodianOld') == this.form.getFieldValue('custodian') &&
                this.form.getFieldValue('custodianUserOld') == this.form.getFieldValue('custodianUser')) {
              that.$message.warning('现值和原值相同，无须异动！');
              return;
            }
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
                this.updateAssetDetail();
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

      updateAssetDetail() {
        let assetNo = this.form.getFieldValue('assetNo')
        let state = this.form.getFieldValue('state')
        let factLocation = this.form.getFieldValue('factLocation')
        let deptNo = this.form.getFieldValue('deptNo')
        let location = this.form.getFieldValue('location')
        let locationFl = this.form.getFieldValue('locationFl')
        let locationDl = this.form.getFieldValue('locationDl')
        let locationFact = this.form.getFieldValue('locationFact')
        let custodian = this.form.getFieldValue('custodian')
        let custodianUser = this.form.getFieldValue('custodianUser')
        let pp = new Array(10)
        pp[0] = assetNo
        pp[1] = state
        pp[2] = factLocation
        pp[3] = deptNo
        pp[4] = location
        pp[5] = locationFl
        pp[6] = locationDl
        pp[7] = locationFact
        pp[8] = custodian
        pp[9] = custodianUser
        let pssr = pp.toString()
        getAction(this.url.updateAssetDetail, { pssr: pssr }).then((res) => {
          if (res.success) {
            // console.log('使用状况：' + res.result.state);
            // this.$message.success(res.message)
            // console.log(`提交成功!`)
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
      },

      handleCancel () {
        this.close()
      },

      fillFact(e) {
        let locationDl = e.substr(0,3)
        let locationFact = e.substr(0,2)
        this.form.setFieldsValue({'locationDl': locationDl})
        this.form.setFieldsValue({'locationFact': locationFact})
      },


      fillAssetDetail(e) {
        let assetNo = e.toString()
        let pp = new Array(1)
        pp[0] = assetNo
        let pssr = pp.toString()
        getAction(this.url.getAssetDetailByNo, { pssr: pssr }).then((res) => {
          if (res.success) {
            // 原值
            this.form.setFieldsValue({ 'stateOld': res.result.state })
            this.form.setFieldsValue({ 'factLocationOld': res.result.factLocation })
            this.form.setFieldsValue({ 'deptNoOld': res.result.deptNo })
            this.form.setFieldsValue({ 'locationOld': res.result.location })
            this.form.setFieldsValue({ 'locationFlOld': res.result.locationFl })
            this.form.setFieldsValue({ 'locationDlOld': res.result.locationDl })
            this.form.setFieldsValue({ 'locationFactOld': res.result.locationFact })
            this.form.setFieldsValue({ 'custodianOld': res.result.custodian })
            this.form.setFieldsValue({ 'custodianUserOld': res.result.custodianUser })
            // 现值
            this.form.setFieldsValue({ 'state': res.result.state })
            this.form.setFieldsValue({ 'factLocation': res.result.factLocation })
            this.form.setFieldsValue({ 'deptNo': res.result.deptNo })
            this.form.setFieldsValue({ 'location': res.result.location })
            this.form.setFieldsValue({ 'locationFl': res.result.locationFl })
            this.form.setFieldsValue({ 'locationDl': res.result.locationDl })
            this.form.setFieldsValue({ 'locationFact': res.result.locationFact })
            this.form.setFieldsValue({ 'custodian': res.result.custodian })
            this.form.setFieldsValue({ 'custodianUser': res.result.custodianUser })
            // console.log('使用状况：' + res.result.state);
            // this.$message.success(res.message)
            // console.log(`提交成功!`)
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
        // let changeNo = this.form.getFieldValue('assetNo')
        // let pp = new Array(1)
        // pp[0] = changeNo
        // let pssr = pp.toString()
        getAction(this.url.getChangeNo, { pssr: pssr }).then((res) => {
          if (res.success) {
            // this.changeNo = res.result
            this.form.setFieldsValue({ 'changeNo': res.result })
            // console.log('异动单号：' + res.result);
            // this.$message.success(res.message)
            // console.log(`提交成功!`)
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
      },

    }
  }
</script>

<style lang="less" scoped>

</style>