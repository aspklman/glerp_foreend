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
        <a-row>
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="厂区编号">-->
<!--              <a-input placeholder="请输入厂区编号" v-decorator="['factNo', validatorRules.factNo ]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="订单批号">
              <a-input placeholder="请输入订单批号" v-decorator="['factOdrNo', validatorRules.factOdrNo ]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
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
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="唛头编号">
              <a-input placeholder="请输入唛头编号" v-decorator="['markNo', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="线别编号">
              <a-input placeholder="请输入线别编号" v-decorator="['lineNo', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="型体编号">
              <j-select-stylem v-decorator="['styleNo', validatorRules.styleNo]"></j-select-stylem>
<!--              <j-search-select-tag-->
<!--                placeholder="请输入型体编号"-->
<!--                v-decorator="['styleNo', validatorRules.styleNo ]"-->
<!--                v-model="asyncSelectValue"-->
<!--                dict="stylem,style_color||'('||style_no||')',style_no"-->
<!--                :async="true">-->
<!--              </j-search-select-tag>-->
<!--              <a-input placeholder="请输入型体编号" v-decorator="['styleNo', validatorRules.styleNo ]"/>-->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="品牌编号">
              <j-select-brand v-decorator="['brandNo', validatorRules.brandNo]"></j-select-brand>
<!--              <j-search-select-tag-->
<!--                placeholder="请输入品牌编号"-->
<!--                v-decorator="['brandNo', validatorRules.brandNo ]"-->
<!--                v-model="asyncSelectValue"-->
<!--                dict="brand,brand_nm||'('||brand_no||')',brand_no"-->
<!--                :async="true">-->
<!--              </j-search-select-tag>-->
<!--              <a-input placeholder="请输入品牌编号" v-decorator="['brandNo', validatorRules.brandNo ]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="楦头肥度">
              <a-input placeholder="请输入楦头肥度" v-decorator="['lastWidth', validatorRules.lastWidth]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="冲销po信息">
              <a-input placeholder="请输入冲销po信息" v-decorator="['poNo', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
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
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户订单编号">
              <a-input placeholder="请输入客户订单编号" v-decorator="['custOdrNo', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户要求交期">
              <j-date placeholder="请选择客户要求交期" v-decorator="['custReqDate', validatorRules.custReqDate ]" :showTime="true" dateFormat="YYYY/MM/DD" />
<!--              <a-input placeholder="请输入客户要求交期" v-decorator="['custReqDate', validatorRules.custReqDate ]"/>-->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="接单日期">
              <j-date placeholder="请选择接单日期" v-decorator="['revOdrDate', validatorRules.revOdrDate ]" :showTime="true" dateFormat="YYYY/MM/DD" />
              <!--              <a-input placeholder="请输入接单日期" v-decorator="['revOdrDate', validatorRules.revOdrDate ]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="预计用量编号">
              <a-input v-decorator="['purplanNo', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="第一次确认日">
              <j-date v-decorator="['fCfmDate', validatorRules.fCfmDate ]" :showTime="true" dateFormat="YYYY/MM/DD" disabled/>
              <!--              <a-input v-decorator="['fCfmDate', {}]" disabled/>-->
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="最后确认日">
              <j-date v-decorator="['lCfmDate', validatorRules.lCfmDate ]" :showTime="true" dateFormat="YYYY/MM/DD" disabled/>
<!--              <a-input v-decorator="['lCfmDate', {}]" disabled/>-->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="SIZE种类">
              <a-input v-decorator="['sizeKind', validatorRules.sizeKind ]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="订单双数">
              <a-input v-decorator="['odrQty', validatorRules.odrQty ]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="每箱双数">
              <a-input v-decorator="['ctnPair', validatorRules.ctnPair ]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="总箱数">
              <a-input v-decorator="['odrTotCtn', validatorRules.odrTotCtn ]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="安排验货日">
              <j-date v-decorator="['arrInsDate', validatorRules.arrInsDate ]" :showTime="true" dateFormat="YYYY/MM/DD" disabled/>
              <!--              <a-input v-decorator="['arrInsDate', {}]" disabled/>-->
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="实际验货日">
              <j-date v-decorator="['actInsDate', validatorRules.actInsDate ]" :showTime="true" dateFormat="YYYY/MM/DD" disabled/>
              <!--              <a-input v-decorator="['actInsDate', {}]" disabled/>-->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="实际出货日">
              <j-date v-decorator="['shipDate', validatorRules.shipDate ]" :showTime="true" dateFormat="YYYY/MM/DD" disabled/>
              <!--              <a-input v-decorator="['shipDate', {}]" disabled/>-->
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="取消日期">
              <j-date placeholder="请输入取消日期" v-decorator="['cancelDate', validatorRules.cancelDate ]" :showTime="true" dateFormat="YYYY/MM/DD" />
<!--              <a-input placeholder="请输入取消日期" v-decorator="['cancelDate', {}]"/>-->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="目的地编号">
              <j-select-country v-decorator="['destCountry', validatorRules.destCountry]"></j-select-country>
<!--              <a-input placeholder="请输入目的地编号" v-decorator="['destCountry', {}]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="目的港口">
              <a-input v-decorator="['destPort', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="订单年月">
              <a-input v-decorator="['odrYymm', validatorRules.odrYymm ]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="订单类别">
              <j-dict-select-tag v-decorator="['odrKind', validatorRules.odrKind]" dictCode="odr_kind" />
<!--              <a-input placeholder="请输入订单类别1.正式 2.销样" v-decorator="['odrKind', validatorRules.odrKind ]"/>-->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="订单性质">
              <j-dict-select-tag v-decorator="['odrType', validatorRules.odrType]" dictCode="odr_type" />
<!--              <a-input placeholder="请输入订单性质1.正式 2.客户PO 3.预购" v-decorator="['odrType', validatorRules.odrType ]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="原订单厂别">
              <a-input v-decorator="['oriFctryNo', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="代工厂别">
              <a-input v-decorator="['outworkFctryNo', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="用量产生时间">
              <a-input v-decorator="['purplanDate', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="主料加成比">
              <a-input v-decorator="['mainmatAddRate', validatorRules.mainmatAddRate ]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="副料加成比">
              <a-input v-decorator="['submatAddRate', validatorRules.submatAddRate ]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="厂内交期">
              <j-date v-decorator="['factReqDate', {} ]" :showTime="true" dateFormat="YYYY/MM/DD" disabled/>
              <!--              <a-input placeholder="请输入厂内交期" v-decorator="['factReqDate', {}]" disabled/>-->
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="出货数量">
              <a-input placeholder="请输入出货数量" v-decorator="['shipQty', validatorRules.shipQty ]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="币别">
              <j-dict-select-tag v-decorator="['coinKind', validatorRules.coinKind ]" dictCode="coin_kind"/>    <!-- 使用字典作为下拉窗口(1) -->
<!--              <a-select v-decorator="['coinKind',validatorRules.coinKind]" placeholder="请选择币别" >-->
<!--                <a-select-option :value="1">1.新台币(NTD)</a-select-option>-->
<!--                <a-select-option :value="2">2.人民币(RMB)</a-select-option>-->
<!--                <a-select-option :value="3">3.港币(HKD)</a-select-option>-->
<!--                <a-select-option :value="4">4.美金(USD)</a-select-option>-->
<!--                <a-select-option :value="5">5.英镑(GBP)</a-select-option>-->
<!--                <a-select-option :value="6">6.德国马克(DEM)</a-select-option>-->
<!--                <a-select-option :value="7">7.日币(YEN)</a-select-option>-->
<!--                <a-select-option :value="8">8.里拉(ITL)</a-select-option>-->
<!--                <a-select-option :value="9">9.欧元(EUR)</a-select-option>-->
<!--              </a-select>-->
<!--              <a-input placeholder="请输入币别" v-decorator="['coinKind', validatorRules.coinKind ]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
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
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="预计用量版次">
              <a-input placeholder="请输入预计用量版次" v-decorator="['edition', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="用量转档注记">
              <a-input v-decorator="['tranRmk', validatorRules.tranRmk ]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="暂定版SIZE编号">
              <a-input placeholder="请输入暂定版SIZE编号" v-decorator="['sizeNo', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="验货数量">
              <a-input placeholder="请输入验货数量" v-decorator="['insTqty', validatorRules.insTqty]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="开发版号">
              <a-input placeholder="请输入开发版号" v-decorator="['skuNo', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="固定装注记">
              <a-input placeholder="请输入固定装注记" v-decorator="['ctnFixRmk', validatorRules.ctnFixRmk]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="翻箱次数">
              <a-input placeholder="请输入翻箱次数" v-decorator="['siCheckNum', validatorRules.siCheckNum ]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="生产年月">
              <a-input placeholder="请输入生产年月" v-decorator="['productYymm', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="生产周次">
              <a-input v-decorator="['productWeek', validatorRules.productWeek]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="销售注记">
              <a-input v-decorator="['salRmk', validatorRules.salRmk ]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="生产指令确认注记">
              <j-dict-select-tag v-decorator="['proeRmk', validatorRules.proeRmk]" dictCode="yn_status" disabled/>
<!--              <a-input placeholder="请输入生产指令确认注记" v-decorator="['proeRmk', {}]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="生产指令确认人">
              <a-input v-decorator="['proeUser', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="生产指令确认时间">
              <a-input v-decorator="['proeDt', {}]" disabled />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="实际生产栋别">
              <a-input placeholder="请输入实际生产栋别" v-decorator="['aproDept', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="增值代码">
              <j-multi-select-tag
                placeholder="请选择增值代码"
                v-decorator="['vaCode', {}]"
                dictCode="vacode,vacode_no,vacode_no">
              </j-multi-select-tag>
<!--              <a-input placeholder="请输入增值代码" v-decorator="['vaCode', {}]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="条码批号">
              <a-input v-decorator="['lotNo', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="备注">
              <a-input placeholder="请输入备注" v-decorator="['remark', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="销售类别(财务)">
              <j-dict-select-tag v-decorator="['salKind', validatorRules.salKind]" dictCode="sale_kind" />
<!--              <a-input placeholder="销售类别(财务)" v-decorator="['salKind', validatorRules.salKind]" />-->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="请款数量">
              <a-input v-decorator="['payQty', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="审核注记">
              <j-dict-select-tag v-decorator="['verifyRmk', validatorRules.verifyRmk]" dictCode="audit_status" disabled/>
<!--              <a-input placeholder="请输入审核注记" v-decorator="['verifyRmk', validatorRules.verifyRmk ]"/>-->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="审核人">
              <a-input v-decorator="['verifyUser', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="审核时间">
              <j-date v-decorator="['verifyDt', {} ]" :showTime="true" dateFormat="YYYY/MM/DD HH:mm:ss" disabled/>
<!--              <a-input v-decorator="['verifyDt', {}]" disabled/>-->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="需成品鞋利库">
              <j-dict-select-tag v-decorator="['avaRmk', validatorRules.avaRmk]" :type="'radio'" :triggerChange="true" dictCode="yn_status" />
<!--              <j-dict-select-tag  v-decorator="['avaRmk', validatorRules.avaRmk]" :type="'radio'" :triggerChange="true" dictCode="yn"/>-->
              <!--              <a-input placeholder="请输入需成品鞋利库" v-decorator="['avaRmk', {}]"/>-->
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="外包bom配色">
              <a-input v-decorator="['matchNo', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="创建人">
              <a-input v-decorator="['createBy', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="创建时间">
              <a-input v-decorator="['createTime', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="修改人">
              <a-input v-decorator="['updateBy', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="修改时间">
              <a-input v-decorator="['updateTime', {}]" disabled/>
            </a-form-item>
          </a-col>
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
      JDictSelectTag,   //使用字典作为下拉窗口(3)
      JDate,
      JMultiSelectTag,
    },
    data() {
      return {
        // form: this.$form.createForm(this),
        // custom:"",
        // selectValue:"",
        // asyncSelectValue:"",


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
          custReqDate: { rules: [{ required: true, message: '请输入客户要求交期!' }] },
          revOdrDate: { rules: [{ required: true, message: '请输入接单日期!' }], initialValue: ((new Date()).getFullYear().toString()) + (((new Date()).getMonth()+1<10) ? ('0'+((new Date()).getMonth()+1).toString()) : (((new Date()).getMonth()+1).toString())) + (((new Date()).getDate()<10) ? ('0'+(new Date()).getDate().toString()) : ((new Date()).getDate().toString())) },
          sizeKind: { rules: [{ required: true, message: '请输入SIZE种类!' }], initialValue: '1' },
          odrQty: { rules: [{ required: true, message: '请输入订单双数!' }] },
          ctnPair: { rules: [{ required: true, message: '请输入每箱双数!' }], initialValue: 0 },
          odrTotCtn: { rules: [{ required: true, message: '请输入总箱数!' }], initialValue: 0 },
          odrYymm: { rules: [{ required: true, message: '请输入订单年月!' }] },
          destCountry: { rules: [{ required: true, message: '请选择目的地编号!' }] },
          odrKind: { rules: [{ required: true, message: '请输入订单类别!' }], initialValue: '1'},
          odrType: { rules: [{ required: true, message: '请输入订单性质!' }], initialValue: '1' },
          mainmatAddRate: { rules: [{ required: true, message: '请输入主料加成比!' }], initialValue: 0 },
          submatAddRate: { rules: [{ required: true, message: '请输入副料加成比!' }], initialValue: 0 },
          shipQty: { rules: [{ required: true, message: '请输入出货数量!' }], initialValue: 0 },
          coinKind: { rules: [{ required: true, message: '请输入币别!' }], initialValue: '4' },
          salKind: { rules: [{ required: true, message: '请选择销售类别(财务)!' }], initialValue: '2' },
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
          avaRmk: { rules: [{ required: true, message: '请选择是否需成品鞋利库!' }], initialValue: 'N' },
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
            {
              title: '订单批号',
              key: 'factOdrNo',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }],
            },
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
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }],
            },
            {
              title: '出货数量',
              key: 'shipQty',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }],
            },
            {
              title: '订单主ID',
              key: 'orderId',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        url: {
          add: "/scan/odrm/add",
          edit: "/scan/odrm/edit",
          odrd: {
            list: '/scan/odrm/queryOdrdByMainId'
          },
        }
      }
    },
    methods: {

      getFormFieldValue(field){
        return this.form.getFieldValue(field)
      },
 
      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'factNo', 'factOdrNo', 'customNo', 'markNo', 'lineNo', 'styleNo', 'brandNo', 'lastWidth', 'poNo', 'proDept', 'custOdrNo', 'custReqDate', 'revOdrDate', 'purplanNo', 'fCfmDate', 'lCfmDate', 'sizeKind', 'odrQty', 'ctnPair', 'odrTotCtn', 'arrInsDate', 'actInsDate', 'shipDate', 'cancelDate', 'destCountry', 'destPort', 'odrYymm', 'odrKind', 'odrType', 'oriFctryNo', 'outworkFctryNo', 'purplanDate', 'mainmatAddRate', 'submatAddRate', 'factReqDate', 'shipQty', 'coinKind', 'unitPrice', 'userNo', 'modifyDt', 'edition', 'tranRmk', 'sizeNo', 'insTqty', 'skuNo', 'ctnFixRmk', 'siCheckNum', 'productYymm', 'productWeek', 'salRmk', 'proeRmk', 'proeUser', 'proeDt', 'aproDept', 'vaCode', 'lotNo', 'remark', 'salKind', 'payQty', 'verifyRmk', 'verifyUser', 'verifyDt', 'avaRmk', 'matchNo', ))
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
      }
    }
  }
</script>

<style scoped>
</style>