<template>
  <a-modal
    :title="title"
    :width="1200"
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
              label="订单批号">
              <a-input placeholder="请输入订单批号" v-decorator="['factOdrNo', validatorRules.factOdrNo ]"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户订单">
              <a-input placeholder="请输入客户订单" v-decorator="['custOdrNo', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户编号">
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
              label="品牌编号">
              <j-select-brand v-decorator="['brandNo', validatorRules.brandNo]"></j-select-brand>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="订单类别">
              <j-dict-select-tag v-decorator="['odrKind', validatorRules.odrKind]" dictCode="odr_kind" />
              <!--              <a-input placeholder="请输入订单类别1.正式 2.销样" v-decorator="['odrKind', validatorRules.odrKind ]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="订单性质">
              <j-dict-select-tag v-decorator="['odrType', validatorRules.odrType]" dictCode="odr_type" />
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
              label="型体编号">
              <j-select-stylem v-decorator="['styleNo', validatorRules.styleNo]"></j-select-stylem>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="楦头肥度">
              <j-dict-select-tag v-decorator="['lastWidth', validatorRules.lastWidth]" dictCode="last_type"/>
              <!--              <a-input placeholder="请输入楦头肥度" v-decorator="['lastWidth', validatorRules.lastWidth]" disabled/>-->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="生产部别">
              <j-dict-select-tag v-decorator="['proDept', validatorRules.proDept]" dictCode="pro_dept"/>
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
              label="接单日期">
              <j-date placeholder="请选择接单日期" v-decorator="['revOdrDate', validatorRules.revOdrDate ]" :showTime="true" dateFormat="YYYYMMDD" />
              <!--              <a-input placeholder="请输入接单日期" v-decorator="['revOdrDate', validatorRules.revOdrDate ]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户交期">
              <j-date placeholder="请选择客户交期" v-decorator="['custReqDate', validatorRules.custReqDate ]" :showTime="true" dateFormat="YYYYMMDD" />
              <!--              <a-input placeholder="请输入客户交期" v-decorator="['custReqDate', validatorRules.custReqDate ]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="目的地">
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
              label="订单双数">
              <a-input v-decorator="['odrQty', validatorRules.odrQty ]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="用量编号">
              <a-input v-decorator="['purplanNo', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="用量时间">
              <j-date v-decorator="['purplanDate', {} ]" :showTime="true" dateFormat="YYYY-MM-DD HH:mm:ss" disabled/>
              <!--              <a-input v-decorator="['purplanDate', {}]" disabled/>-->
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="第一次确认日">-->
<!--              <j-date v-decorator="['fCfmDate', validatorRules.fCfmDate ]" :showTime="true" dateFormat="YYYYMMDD" disabled/>-->
<!--              &lt;!&ndash;              <a-input v-decorator="['fCfmDate', {}]" disabled/>&ndash;&gt;-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="最后确认日">-->
<!--              <j-date v-decorator="['lCfmDate', validatorRules.lCfmDate ]" :showTime="true" dateFormat="YYYYMMDD" disabled/>-->
<!--&lt;!&ndash;              <a-input v-decorator="['lCfmDate', {}]" disabled/>&ndash;&gt;-->
<!--            </a-form-item>-->
<!--          </a-col>-->
        </a-row>
        <a-row>
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="SIZE种类">-->
<!--              <a-input v-decorator="['sizeKind', validatorRules.sizeKind ]" disabled/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->

<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="每箱双数">-->
<!--              <a-input v-decorator="['ctnPair', validatorRules.ctnPair ]" disabled/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="总箱数">-->
<!--              <a-input v-decorator="['odrTotCtn', validatorRules.odrTotCtn ]" disabled/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="安排验货日">-->
<!--              <j-date v-decorator="['arrInsDate', validatorRules.arrInsDate ]" :showTime="true" dateFormat="YYYYMMDD" disabled/>-->
<!--              &lt;!&ndash;              <a-input v-decorator="['arrInsDate', {}]" disabled/>&ndash;&gt;-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="实际验货日">-->
<!--              <j-date v-decorator="['actInsDate', validatorRules.actInsDate ]" :showTime="true" dateFormat="YYYYMMDD" disabled/>-->
<!--              &lt;!&ndash;              <a-input v-decorator="['actInsDate', {}]" disabled/>&ndash;&gt;-->
<!--            </a-form-item>-->
<!--          </a-col>-->
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="订单年月">
              <j-date v-decorator="['odrYymm', validatorRules.odrYymm ]" :showTime="true" dateFormat="YYYYMM"/>
              <!--              <a-input v-decorator="['odrYymm', validatorRules.odrYymm ]" disabled/>-->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="实际出货日">
              <j-date v-decorator="['shipDate', validatorRules.shipDate ]" :showTime="true" dateFormat="YYYY-MM-DD" disabled/>
              <!--              <a-input v-decorator="['shipDate', {}]" disabled/>-->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="出货数量">
              <a-input placeholder="请输入出货数量" v-decorator="['shipQty', validatorRules.shipQty ]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="取消日期">
              <j-date placeholder="请输入取消日期" v-decorator="['cancelDate', validatorRules.cancelDate ]" :showTime="true" dateFormat="YYYYMMDD" />
              <!--              <a-input placeholder="请输入取消日期" v-decorator="['cancelDate', {}]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="币别">
              <j-dict-select-tag v-decorator="['coinKind', validatorRules.coinKind ]" dictCode="coin_kind"/>    <!-- 使用字典作为下拉窗口(1) -->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="含税单价">
              <a-input placeholder="请输入含税单价" v-decorator="['unitPrice', validatorRules.unitPrice ]"/>
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
              label="增值代码">
              <j-select-vacode v-decorator="['vacodeNo', {}]"></j-select-vacode>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="用量版次">
              <a-input placeholder="请输入用量版次" v-decorator="['edition', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="开发版号">
              <a-input placeholder="请输入开发版号" v-decorator="['skuNo', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指令确认注记">
              <j-dict-select-tag v-decorator="['proeRmk', validatorRules.proeRmk]" dictCode="yn_status" disabled/>
<!--              <a-input placeholder="请输入生产指令确认注记" v-decorator="['proeRmk', {}]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指令确认人">
              <a-input v-decorator="['proeUser', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指令确认时间">
              <j-date v-decorator="['proeDt', validatorRules.proeDt ]" :showTime="true" dateFormat="YYYY-MM-DD HH:mm:ss" disabled/>
<!--              <a-input v-decorator="['proeDt', {}]" disabled />-->
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="备注">
              <a-input placeholder="请输入备注" v-decorator="['remark', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="销售类别">
              <j-dict-select-tag v-decorator="['salKind', validatorRules.salKind]" dictCode="sale_kind" />
              <!--              <a-input placeholder="销售类别" v-decorator="['salKind', validatorRules.salKind]" />-->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="需成品利库">
              <j-dict-select-tag v-decorator="['avaRmk', validatorRules.avaRmk]" :type="'radio'" :triggerChange="true" dictCode="yn_status" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="审核注记">
              <j-dict-select-tag v-decorator="['verifyRmk', validatorRules.verifyRmk]" dictCode="audit_status" disabled/>
<!--              <a-input placeholder="请输入审核注记" v-decorator="['verifyRmk', validatorRules.verifyRmk ]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="审核人">
              <a-input v-decorator="['verifyUser', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="审核时间">
              <j-date v-decorator="['verifyDt', {} ]" :showTime="true" dateFormat="YYYYMMDD HH:mm:ss" disabled/>
              <!--              <a-input v-decorator="['verifyDt', {}]" disabled/>-->
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="创建人">
              <a-input v-decorator="['createBy', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="创建时间">
              <a-input v-decorator="['createTime', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="7"></a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="修改人">
              <a-input v-decorator="['updateBy', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="修改时间">
              <a-input v-decorator="['updateTime', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="7"></a-col>
        </a-row>
      </a-form>

      <!-- 子表单区域 -->
      <a-tabs v-model="activeKey" @change="handleChangeTabs">
        <a-tab-pane tab="订单明细表" :key="refKeys[0]" :forceRender="true">
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
  import JMultiSelectTag from '@/components/dict/JMultiSelectTag'

  export default {
    name: 'OdrmModal',
    mixins: [JEditableTableMixin],
    components: {
      JSelectStylem,
      JSearchSelectTag,
      JSelectCustom,    //导出【客户组件】
      JSelectBrand,
      JSelectCountry,
      JSelectVacode,
      JDictSelectTag,   //使用字典作为下拉窗口(3)
      JDate,
      JMultiSelectTag,
    },
    data() {
      return {

        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
          factNo: { rules: [{ required: true, message: '请输入厂区编号!' }] },
          factOdrNo: { rules: [{ required: true, message: '请输入订单批号!' }] },
          customNo: { rules: [{ required: true, message: '请选择客户编号!' }], initialValue: 'CR001' },
          styleNo: { rules: [{ required: true, message: '请选择型体编号!' }] },
          brandNo: { rules: [{ required: true, message: '请选择品牌编号!' }], initialValue: 'CR' },
          lastWidth: { rules: [{ required: true, message: '请输入楦头肥度!' }], initialValue: 'M' },
          proDept: { rules: [{ required: true, message: '请输入部别编号!' }], initialValue: 'U' },
          custReqDate: { rules: [{ required: true, message: '请输入客户交期!' }] },
          revOdrDate: { rules: [{ required: true, message: '请输入接单日期!' }], initialValue: ((new Date()).getFullYear().toString()) + (((new Date()).getMonth()+1<10) ? ('0'+((new Date()).getMonth()+1).toString()) : (((new Date()).getMonth()+1).toString())) + (((new Date()).getDate()<10) ? ('0'+(new Date()).getDate().toString()) : ((new Date()).getDate().toString())) },
          sizeKind: { rules: [{ required: true, message: '请输入SIZE种类!' }], initialValue: '1' },
          odrQty: { rules: [{ required: true, message: '请输入订单双数!' }], initialValue: 0 },
          ctnPair: { rules: [{ required: true, message: '请输入每箱双数!' }], initialValue: 0 },
          odrTotCtn: { rules: [{ required: true, message: '请输入总箱数!' }], initialValue: 0 },
          odrYymm: { rules: [{ required: true, message: '请输入订单年月!' }] },
          destCountry: { rules: [{ required: true, message: '请选择目的地!' }] },
          odrKind: { rules: [{ required: true, message: '请输入订单类别!' }], initialValue: '1'},
          odrType: { rules: [{ required: true, message: '请输入订单性质!' }], initialValue: '1' },
          mainmatAddRate: { rules: [{ required: true, message: '请输入主料加成比!' }], initialValue: 0 },
          submatAddRate: { rules: [{ required: true, message: '请输入副料加成比!' }], initialValue: 0 },
          shipQty: { rules: [{ required: true, message: '请输入出货数量!' }], initialValue: 0 },
          coinKind: { rules: [{ required: true, message: '请输入币别!' }], initialValue: '4' },
          salKind: { rules: [{ required: true, message: '请选择销售类别!' }], initialValue: '2' },
          unitPrice: { rules: [{ required: true, message: '请输入含税单价!' }] },
          userNo: { rules: [{ required: true, message: '请输入异动人!' }] },
          modifyDt: { rules: [{ required: true, message: '请输入异动时间!' }] },
          tranRmk: { rules: [{ required: true, message: '请输入用量转档注记!' }], initialValue: 'N' },
          insTqty: { rules: [{ required: true, message: '请输入验货数量!' }], initialValue: 0 },
          ctnFixRmk: { rules: [{ required: true, message: '请输入翻箱次数!' }], initialValue: '1' },
          siCheckNum: { rules: [{ required: true, message: '请输入固定装注记!' }], initialValue: 0 },
          productWeek: { rules: [{ required: true, message: '请输入生产周次!' }], initialValue: '0' },
          salRmk: { rules: [{ required: true, message: '请输入销售注记!' }], initialValue: '1' },
          proeRmk: { rules: [{ required: true, message: '请选择生产指令确认注记!' }], initialValue: 'N' },
          verifyRmk: { rules: [{ required: true, message: '请输入审核注记!' }], initialValue: 'N' },
          avaRmk: { rules: [{ required: true, message: '请选择是否需成品利库!' }], initialValue: 'N' },
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
              title: 'SIZE 编号',
              key: 'sizeNo',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }],
            },
            {
              title: '双数',
              key: 'sizeQty',
              type: FormTypes.input,
              defaultValue: '0',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }],
            },
            // {
            //   title: '出货数量',
            //   key: 'shipQty',
            //   type: FormTypes.input,
            //   defaultValue: '',
            //   placeholder: '请输入${title}',
            //   validateRules: [{ required: true, message: '${title}不能为空' }],
            // },
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

    methods: {
      getFormFieldValue(field){
        return this.form.getFieldValue(field)
      },
 
      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'factNo', 'factOdrNo', 'customNo', 'markNo', 'lineNo', 'styleNo', 'brandNo', 'lastWidth', 'poNo', 'proDept', 'custOdrNo', 'custReqDate', 'revOdrDate', 'purplanNo', 'fCfmDate', 'lCfmDate', 'sizeKind', 'odrQty', 'ctnPair', 'odrTotCtn', 'arrInsDate', 'actInsDate', 'shipDate', 'cancelDate', 'destCountry', 'destPort', 'odrYymm', 'odrKind', 'odrType', 'oriFctryNo', 'outworkFctryNo', 'purplanDate', 'mainmatAddRate', 'submatAddRate', 'factReqDate', 'shipQty', 'coinKind', 'unitPrice', 'userNo', 'modifyDt', 'edition', 'tranRmk', 'sizeNo', 'insTqty', 'skuNo', 'ctnFixRmk', 'siCheckNum', 'productYymm', 'productWeek', 'salRmk', 'proeRmk', 'proeUser', 'proeDt', 'aproDept', 'vaCode', 'lotNo', 'remark', 'salKind', 'payQty', 'verifyRmk', 'verifyUser', 'verifyDt', 'avaRmk', 'matchNo', 'createBy', 'createTime', 'updateBy', 'updateTime'))
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



    }
  }
</script>

<style scoped>
</style>