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
              label="客户编号">
              <a-input placeholder="请输入客户编号，大写英文字母和数字，最长6位！" v-decorator="['customNo', validatorRules.customNo ]" maxLength="6" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户简称">
              <a-input placeholder="请输入客户简称，最长6个汉字！" v-decorator="['customFnm', validatorRules.customFnm ]" maxLength="6" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="集团注记">
<!--              <a-input placeholder="请输入集团注记" v-decorator="['blocRmk', validatorRules.blocRmk ]" />-->
              <j-dict-select-tag v-decorator="['blocRmk', validatorRules.blocRmk]" :type="'radio'" :triggerChange="true" dictCode="bloc_rmk" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户全称">
<!--              <a-input placeholder="请输入中文名称" v-decorator="['customGnm', validatorRules.customGnm ]" />-->
              <a-textarea placeholder="请输入客户全称，最长20个汉字！" v-decorator="['customGnm', validatorRules.customGnm ]" :autosize="{ minRows: 2, maxRows: 6}" maxLength="20" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="英文名称">
<!--              <a-input placeholder="请输入客户英文名称" v-decorator="['customEnm', {}]" />-->
              <a-textarea placeholder="请输入英文名称" v-decorator="['customEnm', {} ]" :autosize="{ minRows: 2, maxRows: 6}" maxLength="40" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户地址">
<!--              <a-input placeholder="请输入客户地址" v-decorator="['customAddr', {}]" />-->
              <a-textarea placeholder="请输入客户地址" v-decorator="['customAddr', {} ]" :autosize="{ minRows: 2, maxRows: 6}" maxLength="30" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="负责人">
              <a-input placeholder="请输入负责人" v-decorator="['cusBoss', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="负责人电话">
              <a-input placeholder="请输入负责人电话" v-decorator="['cusBossTel', {}]" />
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
              label="法人代表">
              <a-input placeholder="请输入法人代表" v-decorator="['cusLegalp', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="法人代表电话">
              <a-input placeholder="请输入法人代表电话" v-decorator="['cusLegalpTel', {}]" />
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
              label="采购负责人">
              <a-input placeholder="请输入采购负责人" v-decorator="['cusPurchasep', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="采购负责人电话">
              <a-input placeholder="请输入采购负责人电话" v-decorator="['cusPurchasepTel', {}]" />
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
              label="品质负责人">
              <a-input placeholder="请输入品质负责人" v-decorator="['cusQualityp', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="品质负责人电话">
              <a-input placeholder="请输入品质负责人电话" v-decorator="['cusQualitypTel', {}]" />
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
              label="财务负责人">
              <a-input placeholder="请输入财务负责人" v-decorator="['cusFinancep', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="财务负责人电话">
              <a-input placeholder="请输入财务负责人电话" v-decorator="['cusFinancepTel', {}]" />
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
              label="付款方式">
<!--              <a-input placeholder="请输入付款方式" v-decorator="['paymentKind', {}]" />-->
              <j-dict-select-tag placeholder="请选择付款方式" v-decorator="['paymentKind', validatorRules.paymentKind]" :triggerChange="true" dictCode="pay_kind" />
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
              label="联络人">
              <a-input placeholder="请输入联络人" v-decorator="['contactEer', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="联络人电话">
              <a-input placeholder="请输入联络人电话" v-decorator="['contactTel', {}]" />
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
              label="客户电话">
              <a-input placeholder="客户电话" v-decorator="['vendTel', {}]" />
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
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="EMAIL">
              <a-input placeholder="请输入EMAIL" v-decorator="['email', {}]" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="折扣比率">
              <a-input placeholder="请输入折扣比率" v-decorator="['discountRate', validatorRules.discountRate ]" suffix="%"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="折扣款DR(借)">
              <a-input placeholder="请输入折扣款DR(借)" v-decorator="['disaccDr', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="折扣款CR(贷)">
              <a-input placeholder="请输入折扣款CR(贷)" v-decorator="['disaccCr', {}]" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="应收款DR(借)">
              <a-input placeholder="请输入应收款DR(借)" v-decorator="['recaccDr', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="应收款CR(贷)">
              <a-input placeholder="请输入应收款CR(贷)" v-decorator="['recaccCr', {}]" />
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
              label="审核状态">
<!--              <a-input placeholder="请输入审核状态" v-decorator="['cusIfapproved', validatorRules.cusIfapproved ]" disabled="true"/>-->
              <j-dict-select-tag v-decorator="['cusIfapproved', validatorRules.cusIfapproved]" :type="'radio'" dictCode="audit_status" disabled="true" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="审核人">
              <a-input placeholder="请输入审核人" v-decorator="['cusApprovedby', {}]" disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="审核日期">
<!--              <a-input placeholder="请输入审核日期" v-decorator="['cusApproveddate', {}]" disabled="true"/>-->
<!--              <j-date v-decorator="['cusApproveddate', {}]" disabled="true"/>-->
              <j-datetime v-decorator="['cusApproveddate', {}]" :showTime="true" readOnly="true" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="所属行业">
<!--              <a-input placeholder="请输入所属行业" v-decorator="['cusIndustry', {}]" />-->
              <j-dict-select-tag placeholder="请选择所属行业" v-decorator="['cusIndustry', validatorRules.cusIndustry]" :triggerChange="true" dictCode="industry_type" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="设立登记日期">
<!--              <a-input placeholder="请输入设立登记日期" v-decorator="['cusFounddate', {}]" />-->
              <j-date placeholder="请选择设立登记日期" v-decorator="['cusFounddate', {} ]" dateFormat="YYYYMMDD"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="工商备案号">
              <a-input placeholder="请输入工商备案号" v-decorator="['customInvno', validatorRules.customInvno ]" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="资本型态">
<!--              <a-input placeholder="请输入资本型态" v-decorator="['cusCapitaltype', {}]" />-->
              <j-dict-select-tag v-decorator="['cusCapitaltype', validatorRules.cusCapitaltype]" :type="'radio'" :triggerChange="true" dictCode="capital_type" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="币别">
<!--              <a-input placeholder="请输入币别" v-decorator="['coinKind', validatorRules.coinKind ]" />-->
              <j-dict-select-tag v-decorator="['coinKind', validatorRules.coinKind]" :triggerChange="true" dictCode="coin_kind" />
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
              label="年营业额">
              <a-input placeholder="请输入年营业额" v-decorator="['cusAnnualsalesamt', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="资本额">
              <a-input placeholder="请输入资本额" v-decorator="['cusCapitalamt', {}]" />
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
              label="厂房">
<!--              <a-input placeholder="请输入厂房" v-decorator="['cusFactkind', {}]" />-->
              <j-dict-select-tag v-decorator="['cusFactkind', validatorRules.cusFactkind]" :type="'radio'" :triggerChange="true" dictCode="fact_kind" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="厂房面积">
              <a-input placeholder="请输入厂房面积" v-decorator="['cusFactarea', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户性质">
<!--              <a-input placeholder="请输入客户性质" v-decorator="['cusCharacter', {}]" />-->
              <j-dict-select-tag v-decorator="['cusCharacter', validatorRules.cusCharacter]" :type="'radio'" :triggerChange="true" dictCode="custom_character" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="付款地点">
<!--              <a-input placeholder="请输入付款地点" v-decorator="['cusPayaddress', {}]" />-->
              <j-dict-select-tag v-decorator="['cusPayaddress', validatorRules.cusPayaddress]" :type="'radio'" :triggerChange="true" dictCode="pay_address" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="付款方式1">
              <a-input placeholder="请输入付款方式1" v-decorator="['cusPaykind', {}]" />
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
              label="收款方式">
              <a-input placeholder="请输入收款方式" v-decorator="['cusReceivedkind', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="收款日期 ">
              <a-input placeholder="请输入收款日期 " v-decorator="['cusReceiptdate', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="请款日">
              <a-input placeholder="请输入请款日" v-decorator="['cusReceiptday', {}]" />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工状况">
<!--              <a-input placeholder="请输入员工状况" v-decorator="['cusEmployeeDes', {}]" />-->
              <a-textarea placeholder="请输入员工状况" v-decorator="['cusEmployeeDes', validatorRules.cusEmployeeDes ]" :autosize="{ minRows: 2, maxRows: 6}"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="主要设备">
<!--              <a-input placeholder="请输入主要设备" v-decorator="['cusMainequipment', {}]" />-->
              <a-textarea placeholder="请输入主要设备" v-decorator="['cusMainequipment', validatorRules.cusMainequipment ]" :autosize="{ minRows: 2, maxRows: 6}"/>

            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="主要产品">
<!--              <a-input placeholder="请输入主要产品" v-decorator="['cusMainproduction', {}]" />-->
              <a-textarea placeholder="请输入主要产品" v-decorator="['cusMainproduction', validatorRules.cusMainproduction ]" :autosize="{ minRows: 2, maxRows: 6}"/>

            </a-form-item>
          </a-col>
        </a-row>


        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="原料需求量">
<!--              <a-input placeholder="请输入原料需求量" v-decorator="['cusMaterialrequired', {}]" />-->
              <a-textarea placeholder="请输入原料需求量" v-decorator="['cusMaterialrequired', {} ]" :autosize="{ minRows: 2, maxRows: 6}"/>

            </a-form-item>
          </a-col>
          <a-col :span="8" :gutter="7">

          </a-col>
          <a-col :span="8" :gutter="7">

          </a-col>
        </a-row>






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
<!--          label="单箱记录注记(一个箱号一条记录)">-->
<!--          <a-input placeholder="请输入单箱记录注记(一个箱号一条记录)" v-decorator="['perCtnRmk', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="同交期箱号相连注记(Y.相连 N.不相连)">-->
<!--          <a-input placeholder="请输入同交期箱号相连注记(Y.相连 N.不相连)" v-decorator="['ctnContinueRmk', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="纸箱规格抓取方式">-->
<!--          <a-input placeholder="请输入纸箱规格抓取方式" v-decorator="['ctnGetKind', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="材积系数">-->
<!--          <a-input placeholder="请输入材积系数" v-decorator="['seqGetKind', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="odrContinueRmk">-->
<!--          <a-input placeholder="请输入odrContinueRmk" v-decorator="['odrContinueRmk', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="cbmRate">-->
<!--          <a-input placeholder="请输入cbmRate" v-decorator="['cbmRate', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="销货会计科目">-->
<!--          <a-input placeholder="请输入销货会计科目" v-decorator="['salAccNo', {}]" />-->
<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="厂区编号">-->
<!--          <a-input placeholder="请输入厂区编号" v-decorator="['factNo', validatorRules.factNo ]" />-->
<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="现付折扣">-->
<!--          <a-input placeholder="请输入现付折扣" v-decorator="['cashRebate', validatorRules.cashRebate ]" />-->
<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="海关客户编号">-->
<!--          <a-input placeholder="请输入海关客户编号" v-decorator="['tarCustom', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="请款明细格式">-->
<!--          <a-input placeholder="请输入请款明细格式" v-decorator="['rptFmt1', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="记重注记">-->
<!--          <a-input placeholder="请输入记重注记" v-decorator="['wgtRmk', {}]" />-->
<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="香港客户编号">-->
<!--          <a-input placeholder="请输入香港客户编号" v-decorator="['hkcustomNo', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="收货方">-->
<!--          <a-input placeholder="请输入收货方" v-decorator="['recCustFnm', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="收货厂别">-->
<!--          <a-input placeholder="请输入收货厂别" v-decorator="['recFact', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="LOSS请款注记">-->
<!--          <a-input placeholder="请输入LOSS请款注记" v-decorator="['lossPayRmk', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="海关交易注记(1.直接出口 2.转厂 3.内销)">-->
<!--          <a-input placeholder="请输入海关交易注记(1.直接出口 2.转厂 3.内销)" v-decorator="['cusTradeRmk', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="PACKING产生注记">-->
<!--          <a-input placeholder="请输入PACKING产生注记" v-decorator="['packingRmk', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="纸箱订购注记">-->
<!--          <a-input placeholder="请输入纸箱订购注记" v-decorator="['ctnPurRmk', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="PACKINGLIST格式">-->
<!--          <a-input placeholder="请输入PACKINGLIST格式" v-decorator="['packlistForm', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="箱号前缀文字">-->
<!--          <a-input placeholder="请输入箱号前缀文字" v-decorator="['textBeforeCtn', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="SIZE混装注记(N.不混装/Y.混装)">-->
<!--          <a-input placeholder="请输入SIZE混装注记(N.不混装/Y.混装)" v-decorator="['sizeMixRmk', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="LOSS产生PACKING注记(N.不产生 Y.产生)">-->
<!--          <a-input placeholder="请输入LOSS产生PACKING注记(N.不产生 Y.产生)" v-decorator="['lossPackRmk', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="LOSS单独装箱注记(N.不单独装/Y.单独装)">-->
<!--          <a-input placeholder="请输入LOSS单独装箱注记(N.不单独装/Y.单独装)" v-decorator="['lossMixRmk', {}]" />-->
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
  import ATextarea from 'ant-design-vue/es/input/TextArea'
  import JDate from '@/components/jeecg/JDate'
  import JDatetime from '../../../components/jeecg/JDatetime'

  export default {
    name: "CustomModal",
    components: {
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
        factNo:{rules: [{ required: true, message: '请输入厂区编号!' }]},
        customNo:{rules: [{ required: true, message: '请输入客户编号，大写英文字母和数字，最长6位！' }]},
        customFnm:{rules: [{ required: true, message: '请输入客户简称，最长6个汉字！' }]},
        customGnm:{rules: [{ required: true, message: '请输入客户全称，最长20个汉字！' }]},
        customInvno:{rules: [{ required: true, message: '请输入工商备案号!' }]},
        discountRate:{rules: [{ required: true, message: '请输入折扣比率!' }], initialValue: '0' },
        blocRmk:{rules: [{ required: true, message: '请输入集团注记!' }], initialValue: '1' },
        cashRebate:{rules: [{ required: true, message: '请输入现付折扣!' }]},
        userNo:{rules: [{ required: true, message: '请输入异动人!' }]},
        modifyDt:{rules: [{ required: true, message: '请输入异动时间!' }]},
        coinKind:{rules: [{ required: true, message: '请输入币别!' }], initialValue: '2' },
        cusIfapproved:{rules: [{ required: true, message: '请输入审核状态!' }], initialValue: 'N' },
        paymentKind:{rules: [{ required: true, message: '请选择付款方式!' }]},
        },
        url: {
          add: "/order/custom/add",
          edit: "/order/custom/edit",
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
          this.form.setFieldsValue(pick(this.model,'perCtnRmk','ctnContinueRmk','ctnGetKind','seqGetKind','odrContinueRmk','cbmRate','salAccNo','coinKind','contactTel','cusBoss','cusLegalp','cusQualityp','cusFinancep','cusPurchasep','cusBossTel','cusLegalpTel','cusPurchasepTel','cusQualitypTel','cusFinancepTel','cusIndustry','cusFounddate','cusCapitaltype','cusAnnualsalesamt','cusCapitalamt','cusFactarea','cusFactkind','cusEmployeeDes','cusMainequipment','cusMainproduction','cusMaterialrequired','cusCharacter','cusPayaddress','cusReceivedkind','cusPaykind','cusReceiptday','cusReceiptdate','cusIfapproved','cusApprovedby','cusApproveddate','factNo','customNo','customGnm','customEnm','customFnm','customInvno','discountRate','paymentKind','tradeCondition','blocRmk','recaccDr','recaccCr','disaccDr','disaccCr','cashRebate','customAddr','contactEer','vendTel','vendFax','email','tarCustom','rptFmt1','wgtRmk','userNo','modifyDt','hkcustomNo','recCustFnm','recFact','lossPayRmk','cusTradeRmk','packingRmk','ctnPurRmk','packlistForm','textBeforeCtn','sizeMixRmk','lossPackRmk','lossMixRmk'))
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