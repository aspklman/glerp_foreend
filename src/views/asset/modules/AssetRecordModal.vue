<template>
  <a-modal
    :title="title"
    :width="1580"
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
<!--          <a-input placeholder="请输入厂区编号" v-decorator="['factNo', {}]" />-->
<!--        </a-form-item>-->


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="验收日期">
              <!--          <a-input placeholder="请输入验收日期" v-decorator="['acceptDate', {}]" />-->
              <j-date placeholder="请选择验收日期" v-decorator="['acceptDate', validatorRules.acceptDate ]" dateFormat="YYYY-MM-DD" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="资产来源">
<!--              <a-input placeholder="请选择资产来源" v-decorator="['kind', {}]" />-->
              <j-dict-select-tag v-decorator="['kind', validatorRules.kind]" :type="'radio'" :triggerChange="true" dictCode="asset_source" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="使用状况">
<!--              <a-input placeholder="请输入使用状况" v-decorator="['state', {}]" />-->
              <j-dict-select-tag v-decorator="['state', validatorRules.state]" :type="'radio'" :triggerChange="true" dictCode="asset_use_status"/>
            </a-form-item>
          </a-col>
        </a-row>

        <hr align=center color=#987cb9 SIZE=1>
        <br>

        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="资产明细编号">
              <!--              <a-input placeholder="请输入资产明细编号" v-decorator="['catalogId', {}]" />-->
              <j-select-kind-no-small @change="getAssetNo" v-decorator="['catalogId', validatorRules.catalogId]" ></j-select-kind-no-small>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="中分类编号">
              <a-input placeholder="自动获取中分类，无须填写！" v-decorator="['midKind', validatorRules.midKind]" :disabled="true"/>
<!--              <j-select-kind-no-mid v-decorator="['midKind', validatorRules.midKind]"></j-select-kind-no-mid>-->
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="大分类编号">
              <a-input placeholder="自动获取大分类，无须填写" v-decorator="['kindNo', validatorRules.kindNo]" :disabled="true"/>
<!--              <j-select-kind-no-main v-decorator="['kindNo', validatorRules.kindNo]"></j-select-kind-no-main>-->
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="资产编号">
              <a-input placeholder="自动获取资产编号，无须填写！" v-decorator="['assetNo', validatorRules.assetNo]" :disabled="true" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="资产名称">
              <a-input placeholder="自动获取资产名称，无须填写！" v-decorator="['assetName', validatorRules.assetName]" :disabled="true" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="单位">
              <a-input placeholder="请输入单位" v-decorator="['unit', {}]" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="供应商">
<!--              <a-input placeholder="请输入供应商" v-decorator="['supplier', {}]" />-->
              <j-select-asset-vendorm> v-decorator="['supplier', validatorRules.supplier]"></j-select-asset-vendorm>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="制造商">
              <a-input placeholder="请输入制造商" v-decorator="['manufacturer', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="产地">
              <a-input placeholder="请输入产地" v-decorator="['originPlace', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="品牌">
              <a-input placeholder="请输入品牌" v-decorator="['brand', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="型号规格">
              <a-input placeholder="请输入型号规格" v-decorator="['specifications', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="配件清单">
<!--              <a-input placeholder="请输入配件清单" v-decorator="['accessory', {}]" />-->
              <a-textarea placeholder="请输入配件清单" v-decorator="['accessory', {}]" :autosize="{ minRows: 3, maxRows: 6}"/>
            </a-form-item>
          </a-col>
        </a-row>





        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="原始单价">
              <a-input placeholder="请输入原始单价" v-decorator="['originalPrice', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="币别">
<!--              <a-input placeholder="请输入币别" v-decorator="['hb', {}]" />-->
              <j-dict-select-tag v-decorator="['hb', validatorRules.hb]" :triggerChange="true" dictCode="coin_kind"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="入账单价">
              <a-input placeholder="请输入入账单价" v-decorator="['price', {}]" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="折旧方法">
<!--              <a-input placeholder="请输入折旧方法" v-decorator="['depreciation', {}]" />-->
              <j-dict-select-tag v-decorator="['depreciation', validatorRules.depreciation]" :triggerChange="true" dictCode="asset_depreciation"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="折旧率">
<!--              <a-input placeholder="请输入折旧率" v-decorator="['rate', {}]" />-->
              <a-input-number placeholder="请输入折旧率"
                              v-decorator="['rate', validatorRules.rate ]"
                              :default-value="0"
                              :min="0"
                              :max="100"
                              :formatter="value => `${value}%`"
                              :parser="value => value.replace('%', '')" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="折旧月数">
              <a-input placeholder="请输入折旧月数" v-decorator="['num', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="残值率">
<!--              <a-input placeholder="请输入残值率" v-decorator="['residual', {}]" />-->
              <a-input-number placeholder="请输入残值率"
                              v-decorator="['residual', validatorRules.residual ]"
                              :default-value="0"
                              :min="0"
                              :max="100"
                              :formatter="value => `${value}%`"
                              :parser="value => value.replace('%', '')" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">

          </a-col>
          <a-col :span="8" :gutter="7">

          </a-col>
        </a-row>

        <hr align=center color=#987cb9 SIZE=1>
        <br>

        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="使用厂别">
<!--              <a-input placeholder="请选择使用厂别" v-decorator="['factLocation', validatorRules.factLocation]" dictCode="asset_fact_location" />-->
              <j-dict-select-tag
                                 placeholder="请选择使用厂别"
                                 v-decorator="['factLocation', validatorRules.factLocation]"
                                 :triggerChange="true"
                                 dictCode="asset_fact_location"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="使用部门">
<!--              <a-input placeholder="请输入使用部门" v-decorator="['deptNo', {}]" />-->
              <j-select-org-unit v-decorator="['deptNo', validatorRules.deptNo]" ></j-select-org-unit>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="保管人">
              <a-input placeholder="请输入保管人" v-decorator="['custodian', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="使用人">
              <a-input placeholder="请输入使用人" v-decorator="['custodianUser', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">

          </a-col>
          <a-col :span="8" :gutter="7">

          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="存放楼层">
<!--              <a-input placeholder="请输入存放楼层" v-decorator="['locationFl', {}]" />-->
              <j-dict-select-tag @change="autoFillFact"
                                 placeholder="请选择存放楼层"
                                 v-decorator="['locationFl', validatorRules.locationFl]"
                                 :triggerChange="true"
                                 dictCode="asset_location_fl"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="存放区域">
<!--              <a-input placeholder="自动获取存放区域，无须填写！" v-decorator="['locationDl', validatorRules.locationDl]" />-->
              <j-dict-select-tag placeholder="自动获取存放区域，无须填写！" v-decorator="['locationDl', validatorRules.locationDl]" :triggerChange="true" dictCode="asset_location_dl" :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="存放厂区">
<!--              <a-input placeholder="自动获取存放厂区，无须填写！" v-decorator="['locationFact', validatorRules.locationFact]" />-->
              <j-dict-select-tag placeholder="自动获取存放厂区，无须填写！" v-decorator="['locationFact', validatorRules.locationFact]" :triggerChange="true" dictCode="asset_location_fact" :disabled="true"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="存放位置">
              <a-input placeholder="请输入存放位置" v-decorator="['location', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <hr align=center color=#987cb9 SIZE=1>
        <br>

        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否监管">
<!--              <a-input placeholder="请输入是否监管" v-decorator="['lb', {}]" />-->
              <j-dict-select-tag v-decorator="['lb', validatorRules.lb]" :type="'radio'" :triggerChange="true" dictCode="yn_status" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否核算">
<!--              <a-input placeholder="请输入是否核算" v-decorator="['torf', {}]" />-->
              <j-dict-select-tag v-decorator="['torf', validatorRules.torf]" :type="'radio'" :triggerChange="true" dictCode="yn_status" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">

          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="备注">
              <!--          <a-input placeholder="请输入备注" v-decorator="['note', {}]" />-->
              <a-textarea placeholder="请输入备注" v-decorator="['note', {}]" :autosize="{ minRows: 3, maxRows: 6}"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">

          </a-col>
          <a-col :span="8" :gutter="7">

          </a-col>
        </a-row>

        <hr align=center color=#987cb9 SIZE=1>
        <br>

        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="创建人">
              <a-input placeholder="" v-decorator="['createBy', {}]" :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="创建日期">
              <a-input placeholder="" v-decorator="['createTime', {}]" :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">

          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="修改人">
              <a-input placeholder="" v-decorator="['updateBy', {}]" :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="修改日期">
              <a-input placeholder="" v-decorator="['updateTime', {}]" :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">

          </a-col>
        </a-row>



<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="采购厂别">-->
<!--          <a-input placeholder="请输入采购厂别" v-decorator="['fact', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="绩效部门">-->
<!--          <a-input placeholder="请输入绩效部门" v-decorator="['factCentre', {}]" />-->
<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="设备类型">-->
<!--          <a-input placeholder="请输入设备类型" v-decorator="['typeNo', {}]" />-->
<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="管理经理">-->
<!--          <a-input placeholder="请输入管理经理" v-decorator="['custodianManager', {}]" />-->
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
  import JSelectKindNoMain from '../../../components/jeecgbiz/JSelectKindNoMain'
  import JSelectKindNoMid from '../../../components/jeecgbiz/JSelectKindNoMid'
  import JSelectKindNoSmall from '../../../components/jeecgbiz/JSelectKindNoSmall'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import JSelectAssetVendorm from '../../../components/jeecgbiz/JSelectAssetVendorm'
  import { getAction } from '@/api/manage'
  import JSelectOrgUnit from '../../../components/jeecgbiz/JSelectOrgUnit'

  export default {
    name: "AssetRecordModal",
    components: {
      JSelectOrgUnit,
      JSelectAssetVendorm,
      JDate,
      JSelectKindNoMain,
      JSelectKindNoMid,
      JSelectKindNoSmall,
      JDictSelectTag,
    },
    data () {
      return {
        assetName: '',
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
          acceptDate: { rules: [{ required: true, message: '请选择验收日期！' }], initialValue: ((new Date()).getFullYear().toString()) + (((new Date()).getMonth()+1<10) ? ('0'+((new Date()).getMonth()+1).toString()) : (((new Date()).getMonth()+1).toString())) + (((new Date()).getDate()<10) ? ('0'+(new Date()).getDate().toString()) : ((new Date()).getDate().toString())) },
          kind:{rules: [{ required: true, message: '请选择资产来源!' }], initialValue: '1' },
          state:{rules: [{ required: true, message: '请选择使用状况!' }], initialValue: '1' },
          kindNo:{rules: [{ required: true, message: '请选择大分类编号!' }]},
          midKind:{rules: [{ required: true, message: '请选择中分类编号!' }]},
          catalogId:{rules: [{ required: true, message: '请选择明细类编号!' }]},
          assetNo:{rules: [{ required: true, message: '请输入资产编号!' }]},
          assetName:{rules: [{ required: true, message: '请输入资产名称!' }]},
          supplier:{rules: [{ required: true, message: '请选择供应商!' }]},
          hb:{rules: [{ required: true, message: '请选择币别!' }], initialValue: '2' },
          depreciation:{rules: [{ required: true, message: '请选择折旧方法!' }], initialValue: '1' },
          rate:{rules: [{ required: true, message: '请输入折旧率!' }], initialValue: 0 },
          residual:{rules: [{ required: true, message: '请输入残值率!' }], initialValue: 0 },
          factLocation:{rules: [{ required: true, message: '请选择使用厂别!' }]},
          deptNo:{rules: [{ required: true, message: '请选择使用部门!' }]},
          locationFact:{rules: [{ required: true, message: '请选择存放厂区!' }]},
          locationDl:{rules: [{ required: true, message: '请选择存放区域!' }]},
          locationFl:{rules: [{ required: true, message: '请选择存放楼层!' }]},
          lb:{rules: [{ required: true, message: '请选择是否监管!' }], initialValue: 'Y' },
          torf:{rules: [{ required: true, message: '请选择是否核算!' }], initialValue: 'Y' },
        },
        url: {
          add: "/asset/assetRecord/add",
          edit: "/asset/assetRecord/edit",
          getAssetNo: "/asset/assetRecord/getAssetNo",
          getAssetName: "/asset/basicSmallKind/getAssetName",
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
          this.form.setFieldsValue(pick(this.model,'factNo','assetNo','assetName','unit','catalogId','kindNo','midKind','fact','factCentre','deptNo','kind','acceptDate','originalPrice','price','rate','num','residual','location','state','depreciation','custodian','manufacturer','supplier','originPlace','specifications','note','hb','brand','lb','torf','accessory','typeNo','factLocation','locationFact','locationDl','locationFl','custodianManager','custodianUser','createBy','createTime','updateBy','updateTime'))
		  //时间格式化
        });

      },

      close () {
        this.$emit('close');
        this.visible = false;
      },

      async handleOk () {
        const that = this;

        // // 获取并填写资产编号
        // let catalogId = this.form.getFieldValue('catalogId');
        // let assetNo = this.form.getFieldValue('assetNo');
        // // if (catalogId == '' || catalogId == null || catalogId == undefined) {
        // //   // 无【资产明细编号】，无法组合出资产编号
        // // } else {
        // if (assetNo == '' || assetNo == null || assetNo == undefined) {
        //   // this.getAssetNo(catalogId);
        //   // getAssetNo(catalogId) {
        //   let pp = new Array(1)
        //   pp[0] = catalogId
        //   let pssr = pp.toString()
        //   await getAction(this.url.getAssetNo, {pssr: pssr}).then((res) => {
        //     if (res.success) {
        //       console.log(res.result)
        //       let assetNo = catalogId + res.result;
        //       this.form.setFieldsValue({'assetNo': assetNo})
        //       // console.log(res.result);
        //       // this.$message.success(res.message)
        //       // console.log(`提交成功!`)
        //     }
        //     if (res.code === 510) {
        //       // this.$message.warning(res.message)
        //     }
        //   })
        //   // this.$forceUpdate()
        //   // }
        // } else {
        //   //不需要资产编号
        // }
        // // }

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



          } else {

          }
        })
      },

      autoFillFact(e) {
        let locationDl = e.substr(0,3)
        let locationFact = e.substr(0,2)
        this.form.setFieldsValue({'locationDl': locationDl})
        this.form.setFieldsValue({'locationFact': locationFact})
      },


      // 获取并填写资产编号
      async getAssetNo(e) {
        // console.log('编号：' + kindNo)
        // console.log('名称：' + kindName)
        // return
        let catalogId = e.toString()
        // console.log('用户选择的【资产明细编号】：' + catalogId)
        let pp = new Array(1)
        pp[0] = catalogId
        let pssr = pp.toString()
        await getAction(this.url.getAssetNo, {pssr: pssr}).then((res) => {
          if (res.success) {
            // console.log(res.result)
            let assetNo = catalogId + res.result;
            this.form.setFieldsValue({'assetNo': assetNo})
            // console.log(res.result);
            // this.$message.success(res.message)
            // console.log(`提交成功!`)
          }
          if (res.code === 510) {
            // this.$message.warning(res.message)
          }
        })
        await getAction(this.url.getAssetName, {pssr: pssr}).then((res) => {
          if (res.success) {
            console.log(res.result)
            // let assetNo = catalogId + res.result;
            this.form.setFieldsValue({'assetName': res.result.assetName})
            this.form.setFieldsValue({'midKind': res.result.kindNoMid})
            this.form.setFieldsValue({'kindNo': res.result.kindNoMain})
            // console.log(res.result);
            // this.$message.success(res.message)
            // console.log(`提交成功!`)
          }
          if (res.code === 510) {
            // this.$message.warning(res.message)
          }
        })
        // this.$forceUpdate()
      },

      // // 获取资产名称
      // getAssetName(e) {
      //   console.log(e);
      // },


      // clearAssetNo() {
      //   this.form.setFieldsValue({'assetNo': ''})
      // },


      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>

</style>