<template>

  <a-modal
    :title="title"
    :width="1600"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <!-- 主表单区域 -->
      <a-form :form="form">
        <a-row type="flex" justify="space-between">
          <!--          <a-col :span="12" :gutter="8">-->
          <!--            <a-form-item-->
          <!--              :labelCol="labelCol"-->
          <!--              :wrapperCol="wrapperCol"-->
          <!--              label="厂区编号">-->
          <!--              <a-input placeholder="请输入厂区编号" v-decorator="['factNo', validatorRules.factNo ]"/>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.factOdrNo')">
              <a-input :placeholder="this.$t('common.pleaseInput') + this.$t('odrm.factOdrNo')" v-decorator="['factOdrNo', validatorRules.factOdrNo ]" />
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.custOdrNo')">
              <a-input :placeholder="this.$t('common.pleaseInput') + this.$t('odrm.custOdrNo')" v-decorator="['custOdrNo', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.customNo')">
              <j-select-custom v-decorator="['customNo', validatorRules.customNo]"></j-select-custom>    <!-- 【客户编号】字段与【客户组件】关联 -->
              <!--              <j-select-user-by-dep v-decorator="['users']"/>-->
              <!--              <j-search-select-tag-->
              <!--                placeholder="请输入客户编号"-->
              <!--                v-decorator="['customNo', {}]"-->
              <!--                v-model="asyncSelectValue"-->
              <!--                dict="custom,custom_fnm,custom_no"-->
              <!--                :async="true">-->
              <!--              </j-search-select-tag>-->
              <!--              <a-input placeholder="请输入客户编号" v-decorator="['customNo', {}]"/>-->
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <!--          <a-col :span="12" :gutter="8">-->
          <!--            <a-form-item-->
          <!--              :labelCol="labelCol"-->
          <!--              :wrapperCol="wrapperCol"-->
          <!--              label="唛头编号">-->
          <!--              <a-input placeholder="请输入唛头编号" v-decorator="['markNo', {}]"/>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.brandNo')">
              <j-select-brand v-decorator="['brandNo', validatorRules.brandNo]"></j-select-brand>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="$t('odrm.odrKind')">
              <!--              <a-input v-decorator="[$t('odrm.odrKindValue1')]" :triggerChange="true" />-->
              <!--              <a-input v-decorator="['odrKind', validatorRules.odrKind]" :triggerChange="true" />-->
              <j-dict-select-tag v-decorator="['odrKind', validatorRules.odrKind]" :type="'radio'" :triggerChange="true" dictCode="odr_kind" />
              <!--              <a-input placeholder="请输入订单类别1.正式 2.销样" v-decorator="['odrKind', validatorRules.odrKind ]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.odrType')">
              <j-dict-select-tag v-decorator="['odrType', validatorRules.odrType]" :type="'radio'" :triggerChange="true" dictCode="odr_type" />
              <!--              <a-input placeholder="请输入订单性质1.正式 2.客户PO 3.预购" v-decorator="['odrType', validatorRules.odrType ]"/>-->
            </a-form-item>
          </a-col>
          <!--          <a-col :span="12" :gutter="8">-->
          <!--            <a-form-item-->
          <!--              :labelCol="labelCol"-->
          <!--              :wrapperCol="wrapperCol"-->
          <!--              label="线别编号">-->
          <!--              <a-input placeholder="请输入线别编号" v-decorator="['lineNo', {}]"/>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.styleNo')">
              <j-select-stylem v-decorator="['styleNo', validatorRules.styleNo]"></j-select-stylem>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.lastWidth')">
              <j-dict-select-tag v-decorator="['lastWidth', validatorRules.lastWidth]" :triggerChange="true" dictCode="last_type"/>
              <!--              <a-input placeholder="请输入楦头肥度" v-decorator="['lastWidth', validatorRules.lastWidth]" :disabled="true"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.proDept')">
              <j-dict-select-tag :placeholder="this.$t('common.pleaseSelect') + this.$t('odrm.proDept')" v-decorator="['proDept', validatorRules.proDept]" :triggerChange="true" dictCode="pro_dept"/>
              <!--              <a-input v-decorator="['proDept', validatorRules.proDept]" dictCode="pro_dept"/>-->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <!--          <a-col :span="12" :gutter="8">-->
          <!--            <a-form-item-->
          <!--              :labelCol="labelCol"-->
          <!--              :wrapperCol="wrapperCol"-->
          <!--              label="冲销po信息">-->
          <!--              <a-input placeholder="请输入冲销po信息" v-decorator="['poNo', {}]"/>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="$t('odrm.revOdrDate')">
              <!--              <j-date placeholder="请选择接单日期" v-decorator="['revOdrDate', validatorRules.revOdrDate ]" />-->
              <j-date v-decorator="['revOdrDate', validatorRules.revOdrDate ]" />
              <!--              <a-input placeholder="请输入接单日期" v-decorator="['revOdrDate', validatorRules.revOdrDate ]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="$t('odrm.custReqDate')">
              <!--              <j-date placeholder="请选择客户交期" v-decorator="['custReqDate', validatorRules.custReqDate ]" />-->
              <j-date
                :placeholder="this.$t('common.pleaseSelect') + this.$t('odrm.custReqDate')"
                v-decorator="['custReqDate', validatorRules.custReqDate ]"
                @change="changeOdrYymm" />
              <!--              <a-input placeholder="请输入客户交期" v-decorator="['custReqDate', validatorRules.custReqDate ]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.destCountry')">
              <j-select-country v-decorator="['destCountry', validatorRules.destCountry]"></j-select-country>
              <!--              <a-input placeholder="请输入目的地" v-decorator="['destCountry', {}]"/>-->
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.odrQty')">
              <a-input
                v-decorator="['odrQty', validatorRules.odrQty ]"
                style="width:50%; text-align:right"
                :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.purplanNo')">
              <a-input v-decorator="['purplanNo', {}]" :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.purplanDate')">
              <j-date
                v-decorator="['purplanDate', {} ]"
                dateFormat="YYYY-MM-DD HH:mm:ss"
                :disabled="true"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <!--          <a-col :span="12" :gutter="8">-->
          <!--            <a-form-item-->
          <!--              :labelCol="labelCol"-->
          <!--              :wrapperCol="wrapperCol"-->
          <!--              label="第一次确认日">-->
          <!--              <j-date v-decorator="['fCfmDate', validatorRules.fCfmDate ]" :showTime="true" dateFormat="YYYYMMDD" :disabled="true"/>-->
          <!--              &lt;!&ndash;              <a-input v-decorator="['fCfmDate', {}]" :disabled="true"/>&ndash;&gt;-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col :span="12" :gutter="8">-->
          <!--            <a-form-item-->
          <!--              :labelCol="labelCol"-->
          <!--              :wrapperCol="wrapperCol"-->
          <!--              label="最后确认日">-->
          <!--              <j-date v-decorator="['lCfmDate', validatorRules.lCfmDate ]" :showTime="true" dateFormat="YYYYMMDD" :disabled="true"/>-->
          <!--&lt;!&ndash;              <a-input v-decorator="['lCfmDate', {}]" :disabled="true"/>&ndash;&gt;-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
        </a-row>
        <a-row>
          <!--          <a-col :span="12" :gutter="8">-->
          <!--            <a-form-item-->
          <!--              :labelCol="labelCol"-->
          <!--              :wrapperCol="wrapperCol"-->
          <!--              label="SIZE种类">-->
          <!--              <a-input v-decorator="['sizeKind', validatorRules.sizeKind ]" :disabled="true"/>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->

          <!--        <a-row>-->
          <!--          <a-col :span="12" :gutter="8">-->
          <!--            <a-form-item-->
          <!--              :labelCol="labelCol"-->
          <!--              :wrapperCol="wrapperCol"-->
          <!--              label="每箱双数">-->
          <!--              <a-input v-decorator="['ctnPair', validatorRules.ctnPair ]" :disabled="true"/>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col :span="12" :gutter="8">-->
          <!--            <a-form-item-->
          <!--              :labelCol="labelCol"-->
          <!--              :wrapperCol="wrapperCol"-->
          <!--              label="总箱数">-->
          <!--              <a-input v-decorator="['odrTotCtn', validatorRules.odrTotCtn ]" :disabled="true"/>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--        </a-row>-->
          <!--        <a-row>-->
          <!--          <a-col :span="12" :gutter="8">-->
          <!--            <a-form-item-->
          <!--              :labelCol="labelCol"-->
          <!--              :wrapperCol="wrapperCol"-->
          <!--              label="安排验货日">-->
          <!--              <j-date v-decorator="['arrInsDate', validatorRules.arrInsDate ]" :showTime="true" dateFormat="YYYYMMDD" :disabled="true"/>-->
          <!--              &lt;!&ndash;              <a-input v-decorator="['arrInsDate', {}]" :disabled="true"/>&ndash;&gt;-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col :span="12" :gutter="8">-->
          <!--            <a-form-item-->
          <!--              :labelCol="labelCol"-->
          <!--              :wrapperCol="wrapperCol"-->
          <!--              label="实际验货日">-->
          <!--              <j-date v-decorator="['actInsDate', validatorRules.actInsDate ]" :showTime="true" dateFormat="YYYYMMDD" :disabled="true"/>-->
          <!--              &lt;!&ndash;              <a-input v-decorator="['actInsDate', {}]" :disabled="true"/>&ndash;&gt;-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.odrYymm')">
              <j-date
                placeholder="选[客户交期]自动填写"
                v-decorator="['odrYymm', validatorRules.odrYymm ]"
                dateFormat="YYYY-MM"
                :disabled="true"
                style="width:60%" />
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.shipDate')">
              <j-date v-decorator="['shipDate', validatorRules.shipDate ]" :disabled="true" />
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.shipQty')">
              <a-input
                style="width: 50%; text-align: right"
                :placeholder="this.$t('common.pleaseInput') + this.$t('odrm.shipQty')"
                v-decorator="['shipQty', validatorRules.shipQty ]"
                :disabled="true"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.cancelDate')">
              <j-date
                :placeholder="this.$t('common.pleaseSelect') + this.$t('odrm.cancelDate')"
                v-decorator="['cancelDate', {} ]" />
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.coinKind')">
              <j-dict-select-tag v-decorator="['coinKind', validatorRules.coinKind ]" :triggerChange="true" dictCode="coin_kind"/>    <!-- 使用字典作为下拉窗口(1) -->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.unitPrice')">
              <a-input
                style="width: 50%; text-align: right"
                :placeholder="this.$t('common.pleaseInput') + this.$t('odrm.unitPrice')"
                v-decorator="['unitPrice', validatorRules.unitPrice ]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <!--        <a-row>-->
        <!--          <a-col :span="12" :gutter="8">-->
        <!--            <a-form-item-->
        <!--              :labelCol="labelCol"-->
        <!--              :wrapperCol="wrapperCol"-->
        <!--              label="异动人">-->
        <!--              <a-input placeholder="请输入异动人" v-decorator="['userNo', validatorRules.userNo ]"/>-->
        <!--            </a-form-item>-->
        <!--          </a-col>-->
        <!--          <a-col :span="12" :gutter="8">-->
        <!--            <a-form-item-->
        <!--              :labelCol="labelCol"-->
        <!--              :wrapperCol="wrapperCol"-->
        <!--              label="异动时间">-->
        <!--              <a-input placeholder="请输入异动时间" v-decorator="['modifyDt', validatorRules.modifyDt ]"/>-->
        <!--            </a-form-item>-->
        <!--          </a-col>-->
        <!--        </a-row>-->

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.vaCode')">
              <j-select-vacode v-decorator="['vaCode', {}]"></j-select-vacode>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.edition')">
              <a-input
                style="width: 50%; text-align: right"
                v-decorator="['edition', {}]"
                :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.skuNo')">
              <a-input :placeholder="this.$t('common.pleaseInput') + this.$t('odrm.skuNo')" v-decorator="['skuNo', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.proeRmk')">
              <j-dict-select-tag v-decorator="['proeRmk', validatorRules.proeRmk]" :type="'radio'" dictCode="yn_status" :disabled="true"/>
              <!--              <a-input placeholder="请输入生产指令确认注记" v-decorator="['proeRmk', {}]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.proeUser')">
              <a-input
                style="width: 50%"
                v-decorator="['proeUser', {}]"
                :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.proeDt')">
              <j-date
                v-decorator="['proeDt', {} ]"
                dateFormat="YYYY-MM-DD HH:mm:ss"
                :disabled="true"/>
              <!--              <a-input v-decorator="['proeDt', {}]" :disabled="true" />-->
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.remark')">
              <!--              <a-input placeholder="请输入备注" v-decorator="['remark', {}]"/>-->
              <a-textarea :placeholder="this.$t('common.pleaseInput') + this.$t('odrm.remark')" v-decorator="['remark', {}]" :autosize="{ minRows: 2, maxRows: 6}" />
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.salKind')">
              <j-dict-select-tag v-decorator="['salKind', validatorRules.salKind]" :triggerChange="true" dictCode="sale_kind" />
              <!--              <a-input placeholder="销售类别" v-decorator="['salKind', validatorRules.salKind]" />-->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.avaRmk')">
              <j-dict-select-tag v-decorator="['avaRmk', validatorRules.avaRmk]" :type="'radio'" :triggerChange="true" dictCode="yn_status" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.verifyRmk')">
              <j-dict-select-tag v-decorator="['verifyRmk', validatorRules.verifyRmk]" :type="'radio'" dictCode="audit_status" :disabled="true"/>
              <!--              <a-input placeholder="请输入审核注记" v-decorator="['verifyRmk', validatorRules.verifyRmk ]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.verifyUser')">
              <a-input
                style="width: 50%"
                v-decorator="['verifyUser', {}]"
                :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.verifyDt')">
              <j-date
                v-decorator="['verifyDt', {} ]"
                dateFormat="YYYY-MM-DD HH:mm:ss"
                :disabled="true"/>
              <!--              <a-input v-decorator="['verifyDt', {}]" :disabled="true"/>-->
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.taxRate')">
              <a-input
                style="width: 50%; text-align: right"
                :placeholder="this.$t('common.pleaseInput') + this.$t('odrm.taxRate')"
                v-decorator="['taxRate', validatorRules.taxRate]" />
              %
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.taxPrice')">
              <a-input
                style="width: 50%; text-align: right"
                v-decorator="['taxPrice', validatorRules.taxPrice]"
                :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('odrm.cusQty')">
              <a-input
                style="width: 50%; text-align: right"
                v-decorator="['cusQty', validatorRules.cusQty ]"
                :disabled="true"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="$t('odrm.chd')">
              <j-date :placeholder="this.$t('common.pleaseSelect') + this.$t('odrm.chd')" v-decorator="['chd', validatorRules.chd ]" />
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="$t('odrm.ahd')">
              <j-date :placeholder="this.$t('common.pleaseSelect') + this.$t('odrm.ahd')" v-decorator="['ahd', validatorRules.ahd ]" />
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">

          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('common.createBy')">
              <a-input
                style="width: 50%"
                v-decorator="['createBy', {}]"
                :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('common.createTime')">
              <!--              <a-input v-decorator="['createTime', {}]" :disabled="true"/>-->
              <j-date v-decorator="['createTime', {}]" dateFormat="YYYY-MM-DD HH:mm:ss" :disabled="true" />
            </a-form-item>
          </a-col>
          <a-col :span="7"></a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('common.updateBy')">
              <a-input
                style="width: 50%"
                v-decorator="['updateBy', {}]"
                :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="this.$t('common.updateTime')">
              <!--              <a-input v-decorator="['updateTime', {}]" :disabled="true"/>-->
              <j-datetime v-decorator="['updateTime', {}]" dateFormat="YYYY-MM-DD HH:mm:ss"  :disabled="true" />
            </a-form-item>
          </a-col>
          <a-col :span="7">
          </a-col>
        </a-row>
      </a-form>

      <!-- 子表单区域 -->
      <a-tabs v-model="activeKey" @change="handleChangeTabs">
        <a-tab-pane :tab="this.$t('odrm.orderDetailTable')" :key="refKeys[0]" :forceRender="true">
          <j-editable-table
            :ref="refKeys[0]"
            :loading="odrdTable.loading"
            :columns="odrdTable.columns"
            :dataSource="odrdTable.dataSource"
            :maxHeight="300"
            :rowNumber="true"
            :rowSelection="true"
            :actionButton="true"/>
        </a-tab-pane>
      </a-tabs>

    </a-spin>
  </a-modal>

</template>

<script>

  import moment from 'moment'
  import pick from 'lodash.pick'
  import { FormTypes } from '@/utils/JEditableTableUtil'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import JSearchSelectTag from '@/components/dict/JSearchSelectTag'
  import JSelectCustom from '@/components/jeecgbiz/JSelectCustom'       //引入【客户组件】
  import JSelectBrand from '@/components/jeecgbiz/JSelectBrand'
  import JSelectCountry from '@/components/jeecgbiz/JSelectCountry'
  import JSelectStylem from '@/components/jeecgbiz/JSelectStylem'
  import JSelectVacode from '@/components/jeecgbiz/JSelectVacode'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'   //使用字典作为下拉窗口(2)
  import JDate from '@/components/jeecg/JDate'
  import JDatetime from '@/components/jeecg/JDatetime'
  import JMultiSelectTag from '@/components/dict/JMultiSelectTag'
  import ATextarea from 'ant-design-vue/es/input/TextArea'

  export default {
    name: 'OdrmModal',
    mixins: [JEditableTableMixin],
    components: {
      ATextarea,
      JSelectStylem,
      JSearchSelectTag,
      JSelectCustom,    //导出【客户组件】
      JSelectBrand,
      JSelectCountry,
      JSelectVacode,
      JDictSelectTag,   //使用字典作为下拉窗口(3)
      JDate,
      JDatetime,
      JMultiSelectTag,
    },
    data() {
      return {
        name: '张三',

        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
          factNo: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.factNo') }] },
          factOdrNo: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.factOdrNo') }] },
          customNo: { rules: [{ required: true, message: this.$t('common.pleaseSelect') + this.$t('odrm.customNo') }] },
          styleNo: { rules: [{ required: true, message: this.$t('common.pleaseSelect') + this.$t('odrm.styleNo') }] },
          brandNo: { rules: [{ required: true, message: this.$t('common.pleaseSelect') + this.$t('odrm.brandNo') }] },
          lastWidth: { rules: [{ required: true, message: this.$t('common.pleaseSelect') + this.$t('odrm.lastWidth') }], initialValue: 'M ' },
          proDept: { rules: [{ required: true, message: this.$t('common.pleaseSelect') + this.$t('odrm.proDept') }] },
          custReqDate: { rules: [{ required: true, message: this.$t('common.pleaseSelect') + this.$t('odrm.custReqDate') }] },
          revOdrDate: { rules: [{ required: true, message: this.$t('common.pleaseSelect') + this.$t('odrm.revOdrDate') }], initialValue: ((new Date()).getFullYear().toString()) + (((new Date()).getMonth()+1<10) ? ('0'+((new Date()).getMonth()+1).toString()) : (((new Date()).getMonth()+1).toString())) + (((new Date()).getDate()<10) ? ('0'+(new Date()).getDate().toString()) : ((new Date()).getDate().toString())) },
          sizeKind: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.sizeKind') }], initialValue: '1' },
          odrQty: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.odrQty') }], initialValue: 0 },
          ctnPair: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.ctnPair') }], initialValue: 0 },
          odrTotCtn: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.odrTotCtn') }], initialValue: 0 },
          odrYymm: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.odrYymm') }] },
          destCountry: { rules: [{ required: true, message: this.$t('common.pleaseSelect') + this.$t('odrm.destCountry') }] },
          odrKind: { rules: [{ required: true, message: this.$t('common.pleaseSelect') + this.$t('odrm.odrKind') }], initialValue: '1'},
          odrType: { rules: [{ required: true, message: this.$t('common.pleaseSelect') + this.$t('odrm.odrType') }], initialValue: '1' },
          mainmatAddRate: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.mainmatAddRate') }], initialValue: 0 },
          submatAddRate: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.submatAddRate') }], initialValue: 0 },
          shipQty: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.shipQty') }], initialValue: 0 },
          coinKind: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.coinKind') }], initialValue: '4' },
          salKind: { rules: [{ required: true, message: this.$t('common.pleaseSelect') + this.$t('odrm.salKind') }], initialValue: '2' },
          unitPrice: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.unitPrice') }], initialValue: 0 },
          userNo: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.userNo') }] },
          modifyDt: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.modifyDt') }] },
          tranRmk: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.tranRmk') }], initialValue: 'N' },
          insTqty: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.insTqty') }], initialValue: 0 },
          ctnFixRmk: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.ctnFixRmk') }], initialValue: '1' },
          siCheckNum: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.siCheckNum') }], initialValue: 0 },
          productWeek: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.productWeek') }], initialValue: '0' },
          salRmk: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.salRmk') }], initialValue: '1' },
          proeRmk: { rules: [{ required: true, message: this.$t('common.pleaseSelect') + this.$t('odrm.proeRmk') }], initialValue: 'N' },
          verifyRmk: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.verifyRmk') }], initialValue: 'N' },
          avaRmk: { rules: [{ required: true, message: this.$t('common.pleaseSelect') + this.$t('odrm.avaRmk') }], initialValue: 'N' },
          taxRate: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.taxRate') }], initialValue: 0 },
          taxPrice: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.taxPrice') }], initialValue: 0 },
          cusQty: { rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('odrm.cusQty') }], initialValue: 0 },
          // chd: { rules: [{ required: true, message: this.$t('common.pleaseSelect') + this.$t('odrm.chd') }] },
          // ahd: { rules: [{ required: true, message: this.$t('common.pleaseSelect') + this.$t('odrm.ahd') }] },
        },
        refKeys: ['odrd', ],
        activeKey: 'odrd',
        // 订单明细表
        odrdTable: {
          loading: false,
          dataSource: [],
          columns: [
            // {
            //   title: '厂区编号',
            //   key: 'factNo',
            //   type: FormTypes.input,
            //   defaultValue: '',
            //   placeholder: '请输入${title}',
            //   validateRules: [{ required: true, message: '${title}不能为空' }],
            // },
            // {
            //   title: '订单批号',
            //   key: 'factOdrNo',
            //   type: FormTypes.input,
            //   defaultValue: '',
            //   placeholder: '请输入${title}',
            //   validateRules: [{ required: true, message: '${title}不能为空' }],
            // },
            {
              title: this.$t('odrm.sizeNo'),
              key: 'sizeNo',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: this.$t('common.pleaseInput') + this.$t('odrm.sizeNo'),
              validateRules: [{ required: true, message: this.$t('odrm.sizeNo') + this.$t('common.notNull') }],
            },
            {
              title: this.$t('odrm.sizeQty'),
              key: 'sizeQty',
              type: FormTypes.input,
              defaultValue: '0',
              placeholder: this.$t('common.pleaseInput') + this.$t('odrm.sizeQty'),
              validateRules: [{ required: true, message: this.$t('odrm.sizeQty') + this.$t('common.notNull') }],
            },
            {
              title: this.$t('odrm.cusQty'),
              key: 'cusQty',
              type: FormTypes.input,
              defaultValue: 0,
              placeholder: this.$t('common.pleaseInput') + this.$t('odrm.cusQty'),
              validateRules: [{ required: true, message: this.$t('odrm.cusQty') + this.$t('common.notNull') }],
            },
            // {
            //   title: '订单主ID',
            //   key: 'orderId',
            //   type: FormTypes.input,
            //   defaultValue: '',
            //   placeholder: '请输入${title}',
            // },
          ]
        },
        url: {
          add: "/order/odrm/add",
          edit: "/order/odrm/edit",
          odrd: {
            list: '/order/odrm/queryOdrdByMainId'
          },
        },

        // watch: {
        //   sizeQty: function(newQty, oldQty){
        //     console.log('新值：' + newQty + ',旧值：' + oldQty);
        //   },
        // },

      }
    },

    // watch: {
    //   salKind: function(newQty, oldQty){
    //     console.log('新值：' + newQty + ',旧值：' + oldQty);
    //   },
    // },

    computed: {

    },

    methods: {
      getFormFieldValue(field){
        return this.form.getFieldValue(field)
      },

      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'factNo', 'factOdrNo', 'customNo', 'markNo', 'lineNo', 'styleNo', 'brandNo', 'lastWidth', 'poNo', 'proDept', 'custOdrNo', 'custReqDate', 'revOdrDate', 'purplanNo', 'fCfmDate', 'lCfmDate', 'sizeKind', 'odrQty', 'ctnPair', 'odrTotCtn', 'arrInsDate', 'actInsDate', 'shipDate', 'cancelDate', 'destCountry', 'destPort', 'odrYymm', 'odrKind', 'odrType', 'oriFctryNo', 'outworkFctryNo', 'purplanDate', 'mainmatAddRate', 'submatAddRate', 'factReqDate', 'shipQty', 'coinKind', 'unitPrice', 'userNo', 'modifyDt', 'edition', 'tranRmk', 'sizeNo', 'insTqty', 'skuNo', 'ctnFixRmk', 'siCheckNum', 'productYymm', 'productWeek', 'salRmk', 'proeRmk', 'proeUser', 'proeDt', 'aproDept', 'vaCode', 'lotNo', 'remark', 'salKind', 'payQty', 'verifyRmk', 'verifyUser', 'verifyDt', 'avaRmk', 'matchNo', 'cusQty', 'taxRate', 'taxPrice', 'chd', 'ahd', 'createBy', 'createTime', 'updateBy', 'updateTime'))
          // 时间格式化
        })
        // 加载子表数据
        if (this.model.id) {
          let params = { id: this.model.id }
          this.requestSubTableData(this.url.odrd.list, params, this.odrdTable)
        }
      },

      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let main = Object.assign(this.model, allValues.formValue)
        //时间格式化
        return {
          ...main, // 展开
          odrdList: allValues.tablesValue[0].values,
        }
      },

      changeOdrYymm(e) {
        let odrYymm = e.slice(0, 7);
        console.log(odrYymm);
        this.form.setFieldsValue({'odrYymm': odrYymm});
      },

      computed: function() {

      }

    }
  }
</script>

<style scoped>
</style>