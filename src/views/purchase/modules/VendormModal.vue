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


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="供应商编号">
              <a-input placeholder="请输入供应商编号" v-decorator="['vendNo', validatorRules.vendNo ]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="供应商注记">
<!--              <a-input placeholder="供应商注记" v-decorator="['mocRmk', validatorRules.mocRmk ]" />-->
              <j-dict-select-tag v-decorator="['mocRmk', validatorRules.mocRmk]" :type="'radio'" :triggerChange="true" dictCode="vend_rmk" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="供应商类别">
<!--              <a-input placeholder="请输入供应商类别" v-decorator="['vendKind', validatorRules.vendKind ]" />-->
              <j-dict-select-tag v-decorator="['vendKind', validatorRules.vendKind]" :type="'radio'" :triggerChange="true" dictCode="vend_kind" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="供应商简称">
              <a-input placeholder="请输入供应商简称，最多输入5个汉字" v-decorator="['vendFnm', validatorRules.vendFnm ]" :maxLength="5" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="供应商全名">
<!--              <a-input placeholder="请输入供应商全名" v-decorator="['vendGnm', {}]" />-->
              <a-textarea placeholder="请输入供应商全名" v-decorator="['vendGnm', {}]" :autosize="{ minRows: 2, maxRows: 6}"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="工商备案号">
              <a-input placeholder="请输入工商备案号" v-decorator="['vendInvno', validatorRules.vendInvno ]" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="供应商英文名">
<!--              <a-input placeholder="请输入英文名称" v-decorator="['vendEnm', {}]" />-->
              <a-textarea placeholder="请输入供应商英文名" v-decorator="['vendEnm', {}]" :autosize="{ minRows: 2, maxRows: 6}"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="供应商地址">
<!--              <a-input placeholder="请输入供应商地址" v-decorator="['vendAddr', {}]" />-->
              <a-textarea placeholder="请输入供应商地址" v-decorator="['vendAddr', {}]" :autosize="{ minRows: 2, maxRows: 6}"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="工厂地址">
<!--              <a-input placeholder="请输入工厂地址" v-decorator="['vendFactadress', {}]" />-->
              <a-textarea placeholder="请输入工厂地址" v-decorator="['vendFactadress', {}]" :autosize="{ minRows: 2, maxRows: 6}"/>
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="付款方式">
<!--              <a-input placeholder="请输入付款方式" v-decorator="['paymentKind', {}]" />-->
              <j-dict-select-tag placeholder="请选择付款方式" v-decorator="['paymentKind', validatorRules.paymentKind]" :triggerChange="true" dictCode="pay_kind" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="付款类别">
              <a-input placeholder="请输入付款类别" v-decorator="['payKind', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="统购注记">
<!--              <a-input placeholder="请输入统购注记" v-decorator="['purRmk', {}]" />-->
              <j-dict-select-tag v-decorator="['purRmk', validatorRules.purRmk]" :type="'radio'" :triggerChange="true" dictCode="yn_status" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="汇款方式">
<!--              <a-input placeholder="请输入汇款方式" v-decorator="['salBy', {}]" />-->
              <j-dict-select-tag placeholder="请选择汇款方式" v-decorator="['salBy', {}]" :triggerChange="true" dictCode="remittance_kind" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="交易条件">
<!--              <a-input placeholder="请输入交易条件" v-decorator="['tradeCondition', {}]" />-->
              <j-dict-select-tag placeholder="请选择交易条件" v-decorator="['tradeCondition', validatorRules.tradeCondition]" :triggerChange="true" dictCode="trade_condition" />
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
              label="联络电话">
              <a-input placeholder="请输入联络电话" v-decorator="['vendTel', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="传真号码">
              <a-input placeholder="请输入传真号码" v-decorator="['vendFax', {}]" />
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
              label="供应商网址">
              <a-input placeholder="请输入供应商网址" v-decorator="['vendUrl', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="电子信箱">
              <a-input placeholder="请输入电子信箱" v-decorator="['email', {}]" />
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
              label="联络人">
              <a-input placeholder="请输入联络人" v-decorator="['contactEer', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="负责人">
              <a-input placeholder="请输入负责人" v-decorator="['vendBoss', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贸易商简称">
              <a-input placeholder="请输入贸易商简称" v-decorator="['agentCompanyName', {}]" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="送货厂商">
              <a-input placeholder="请输入送货厂商" v-decorator="['sendVendFnm', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="发货地点">
<!--              <a-input placeholder="请输入发货地点" v-decorator="['shipFromLocation', {}]" />-->
              <a-textarea placeholder="请输入发货地点" v-decorator="['shipFromLocation', {}]" :autosize="{ minRows: 2, maxRows: 6}"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="主要客户">
<!--              <a-input placeholder="请输入主要客户" v-decorator="['vendMaincust', {}]" />-->
              <a-textarea placeholder="请输入主要客户" v-decorator="['vendMaincust', {}]" :autosize="{ minRows: 2, maxRows: 6}"/>
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="税率">
              <a-input placeholder="请输入税率" v-decorator="['taxRate', validatorRules.taxRate ]" suffix="%"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="折扣比率">
              <a-input placeholder="请输入折扣比率" v-decorator="['discountRate', validatorRules.discountRate ]" suffix="%"/>
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
              label="转厂注记">
<!--              <a-input placeholder="请输入转厂注记" v-decorator="['traFact', validatorRules.traFact ]" />-->
              <j-dict-select-tag v-decorator="['traFact', validatorRules.traFact]" :type="'radio'" :triggerChange="true" dictCode="yn_status" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="海关注记">
<!--              <a-input placeholder="请输入海关注记" v-decorator="['cusTradeRmk', {}]" />-->
              <j-dict-select-tag v-decorator="['cusTradeRmk', validatorRules.cusTradeRmk]" :type="'radio'" :triggerChange="true" dictCode="cus_rmk" />
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
              label="是否审核">
<!--              <a-input placeholder="请输入是否审核" v-decorator="['vendIfapproved', {}]" />-->
              <j-dict-select-tag v-decorator="['vendIfapproved', validatorRules.vendIfapproved]" :type="'radio'" dictCode="audit_status" disabled="true" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="审核人">
              <a-input placeholder="请输入审核人" v-decorator="['vendApprovedby', {}]" disabled="true" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="审核日期">
              <!--          <a-input placeholder="请输入审核日期" v-decorator="['vendApproveddate', {}]" />-->
              <j-datetime v-decorator="['vendApproveddate', {}]" :showTime="true" disabled="true" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="公司成立日期 ">
<!--              <a-input placeholder="请输入公司成立日期 " v-decorator="['vendReviseddate', {}]" />-->
              <j-date placeholder="请选择公司成立日期" v-decorator="['vendReviseddate', {} ]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="填表日期">
<!--              <a-input placeholder="请输入填表日期" v-decorator="['vendFilleddate', {}]" />-->
              <j-date placeholder="请选择填表日期" v-decorator="['vendFilleddate', {} ]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="一般纳税人">
              <j-dict-select-tag v-decorator="['vendIfcommontax', {}]" :type="'radio'" :triggerChange="true" dictCode="sf_status_sf" />
              <!--              <a-radio-group @change="onChange" v-decorator="['vendIfcommontax', {}]">-->
<!--                <a-radio-button value="是">是</a-radio-button>-->
<!--                <a-radio-button value="否">否</a-radio-button>-->
<!--              </a-radio-group>-->
<!--              <a-input placeholder="请输入一般纳税人" v-decorator="['vendIfcommontax', {}]" />-->
<!--              <a-select v-decorator="['vendIfcommontax', {}]" dropdownStyle="'radio'" >-->
<!--                <a-select-option value="是">是</a-select-option>-->
<!--                <a-select-option value="否">否</a-select-option>-->
<!--              </a-select>-->
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="资本额">
              <a-input placeholder="请输入资本额" v-decorator="['vendCapitalization', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="平均月营业额">
              <a-input placeholder="请输入平均月营业额" v-decorator="['vendAveragemonturnover', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="经营模式">
<!--              <a-input placeholder="请输入经营模式" v-decorator="['vendCapitalform', {}]" />-->
              <j-dict-select-tag v-decorator="['vendCapitalform', validatorRules.vendCapitalform]" :triggerChange="true" :type="'radio'" dictCode="capital_form" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="厂房建筑面积">
              <a-input placeholder="请输入厂房建筑面积" v-decorator="['vendFactarea', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="厂房类别">
<!--              <a-input placeholder="请输入厂房类别" v-decorator="['vendFactkind', {}]" />-->
              <j-dict-select-tag v-decorator="['vendFactkind', validatorRules.vendFactkind]" :triggerChange="true" :type="'radio'" dictCode="fact_kind" />
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
              label="往来银行">
              <a-input placeholder="请输入往来银行" v-decorator="['vendBank', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="往来银行帐号">
              <a-input placeholder="请输入往来银行帐号" v-decorator="['vendBankaccount', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="往来银行分行">
              <a-input placeholder="请输入往来银行分行" v-decorator="['vendBankbranch', {}]" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="技术合作厂商">
<!--              <a-input placeholder="请输入技术合作厂商" v-decorator="['vendNmofteccoopsupplier', {}]" />-->
              <a-textarea placeholder="请输入技术合作厂商" v-decorator="['vendNmofteccoopsupplier', {}]" :autosize="{ minRows: 2, maxRows: 6}"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="关系企业名称">
<!--              <a-input placeholder="请输入关系企业名称" v-decorator="['vendNmofrelenterprise', {}]" />-->
              <a-textarea placeholder="请输入关系企业名称" v-decorator="['vendNmofrelenterprise', {}]" :autosize="{ minRows: 2, maxRows: 6}"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="主要仪器设备">
<!--              <a-input placeholder="请输入主要仪器设备" v-decorator="['vendMainequipment', {}]" />-->
              <a-textarea placeholder="请输入主要仪器设备" v-decorator="['vendMainequipment', {}]" :autosize="{ minRows: 2, maxRows: 6}"/>
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工概况">
<!--              <a-input placeholder="请输入员工概况" v-decorator="['vendGsituationp', {}]" />-->
              <a-textarea placeholder="请输入员工概况" v-decorator="['vendGsituationp', {}]" :autosize="{ minRows: 2, maxRows: 6}"/>

            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="主要产品">
<!--              <a-input placeholder="请输入主要产品" v-decorator="['vendMainproduction', {}]" />-->
              <a-textarea placeholder="请输入主要产品" v-decorator="['vendMainproduction', {}]" :autosize="{ minRows: 2, maxRows: 6}"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">

          </a-col>
        </a-row>


<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="厂区编号">-->
<!--          <a-input placeholder="请输入厂区编号" v-decorator="['factNo', validatorRules.factNo ]" />-->
<!--        </a-form-item>-->
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
<!--          label="送货厂别">-->
<!--          <a-input placeholder="请输入送货厂别" v-decorator="['sendFact', {}]" />-->
<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="指定供应商">-->
<!--          <a-input placeholder="请输入指定供应商" v-decorator="['nbVendor', {}]" />-->
<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="填表日期">-->
<!--          <a-input placeholder="请输入填表日期" v-decorator="['filledDate', {}]" />-->
<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="海关供应商编号">-->
<!--          <a-input placeholder="请输入海关供应商编号" v-decorator="['tarVend', {}]" />-->
<!--        </a-form-item>-->


      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JDatetime from '../../../components/jeecg/JDatetime'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import ATextarea from 'ant-design-vue/es/input/TextArea'
  import JDate from '@/components/jeecg/JDate'

  export default {
    name: "VendormModal",
    components: {
      ATextarea,
      JDatetime,
      JDictSelectTag,
      ATextarea,
      JDate,
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
        traFact:{rules: [{ required: true, message: '请输入转厂注记!' }], initialValue: 'N' },
        mocRmk:{rules: [{ required: true, message: '请输入供应商注记!' }], initialValue: 'N' },
        taxRate:{rules: [{ required: true, message: '请输入税率!' }], initialValue: 0 },
        discountRate:{rules: [{ required: true, message: '请输入折扣比率!' }], initialValue: 0 },
        factNo:{rules: [{ required: true, message: '请输入厂区编号!' }]},
        vendNo:{rules: [{ required: true, message: '请输入供应商编号!' }]},
        vendKind:{rules: [{ required: true, message: '请输入供应商类别!' }], initialValue: '1' },
        vendFnm:{rules: [{ required: true, message: '请输入供应商简称，最多输入5个汉字!' }]},
        vendInvno:{rules: [{ required: true, message: '请输入工商备案号!' }]},
        paymentKind:{rules: [{ required: true, message: '请输入付款方式!' }]},
        tradeCondition:{rules: [{ required: true, message: '请输入交易条件!' }]},
        cusTradeRmk:{rules: [{ required: true, message: '请输入海关注记!' }], initialValue: '3' },
        vendIfapproved:{rules: [{ required: true, message: '请输入是否审核!' }], initialValue: 'N' },
        purRmk:{rules: [{ required: true, message: '请输入统购注记!' }], initialValue: 'N' },
        vendCapitalform:{rules: [{ required: true, message: '请输入经营模式!' }], initialValue: '独资' },
        vendFactkind:{rules: [{ required: true, message: '请输入厂房类别!' }], initialValue: '租赁' },
        },
        url: {
          add: "/purchase/vendorm/add",
          edit: "/purchase/vendorm/edit",
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
          this.form.setFieldsValue(pick(this.model,'traFact','userNo','modifyDt','mocRmk','salBy','payKind','sendVendFnm','sendFact','cusTradeRmk','nbVendor','shipFromLocation','agentCompanyName','purRmk','taxRate','discountRate','filledDate','vendEnm','vendFactadress','vendFilleddate','vendReviseddate','vendIfcommontax','vendCapitalform','vendCapitalization','vendAveragemonturnover','vendFactarea','vendFactkind','vendBank','vendBankbranch','vendBankaccount','vendMainproduction','vendMaincust','vendGsituationp','vendNmofteccoopsupplier','vendNmofrelenterprise','vendMainequipment','vendIfapproved','vendApprovedby','vendApproveddate','factNo','vendNo','vendKind','vendFnm','vendGnm','vendInvno','paymentKind','tradeCondition','vendAddr','vendTel','vendFax','vendUrl','contactEer','email','vendBoss','tarVend'))
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