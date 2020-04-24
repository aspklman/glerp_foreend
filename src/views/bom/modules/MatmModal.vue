<template>
  <a-modal
    :title="title"
    :width="1380"
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
<!--          <a-input placeholder="请输入厂区编号" v-decorator="['factNo', validatorRules.factNo ]" />-->
<!--        </a-form-item>-->
        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="材料编号">
              <a-input placeholder="请输入材料编号" v-decorator="['matNo', validatorRules.matNo ]" />
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="单位">
<!--              <a-input placeholder="请输入材料单位" v-decorator="['matUnit', validatorRules.matUnit ]" />-->
              <j-dict-select-tag v-decorator="['matUnit', validatorRules.matUnit ]" dictCode="mat_cn_unit" :triggerChange="true" @change="changeMatEngUnit" />
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="英文单位">
<!--              <a-input placeholder="请输入材料英文单位" v-decorator="['matEngUnit', {}]" />-->
              <j-dict-select-tag v-decorator="['matEngUnit', validatorRules.matEngUnit ]" dictCode="mat_en_unit" :triggerChange="true" disabled="true" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="材料名称">
              <a-textarea placeholder="请输入材料名称" v-decorator="['matNm', validatorRules.matNm ]" :autosize="{ minRows: 2, maxRows: 6}"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="英文名称">
<!--              <a-input placeholder="请输入材料英文名称" v-decorator="['matEngNm', {}]" />-->
              <a-textarea placeholder="请输入材料英文名称" v-decorator="['matEngNm', validatorRules.matEngNm ]" :autosize="{ minRows: 2, maxRows: 6}"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="尺寸注记">
              <!--          <a-input placeholder="请输入尺寸注记" v-decorator="['sizeRmk', validatorRules.sizeRmk ]" />-->
              <j-dict-select-tag v-decorator="['sizeRmk', validatorRules.sizeRmk]" dictCode="size_rmk" :triggerChange="true" />
            </a-form-item>
          </a-col>
<!--          <a-col :span="7" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="颜色">-->
<!--              <a-input placeholder="请输入材料颜色" v-decorator="['matColor', {}]" />-->
<!--            </a-form-item>-->
<!--          </a-col>-->
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="最小用量">
              <a-input placeholder="请输入最小用量" v-decorator="['minLot', validatorRules.minLot ]" />
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="已订未交量">
              <a-input placeholder="请输入已订未交量" v-decorator="['onOrderQty', validatorRules.onOrderQty ]" disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="进货未验量">
              <a-input placeholder="请输入进货未验量" v-decorator="['unqcQty', validatorRules.unqcQty ]" disabled="true"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="保税注记">
<!--              <a-input placeholder="请输入保税注记" v-decorator="['taxRmk', validatorRules.taxRmk ]" dictCode="tax_rmk" />-->
              <j-dict-select-tag v-decorator="['taxRmk', validatorRules.taxRmk ]" :type="'radio'" dictCode="tax_rmk" :triggerChange="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="托外注记">
<!--              <a-input placeholder="请输入托外注记" v-decorator="['preprdRmk', validatorRules.preprdRmk ]" />-->
              <j-dict-select-tag v-decorator="['preprdRmk', validatorRules.preprdRmk ]" :type="'radio'" dictCode="yn_status" :triggerChange="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="安全库存">
              <a-input placeholder="请输入安全库存" v-decorator="['safeStkQty', validatorRules.safeStkQty ]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="采购政策">
<!--              <a-input placeholder="请输入采购政策" v-decorator="['purPolicy', validatorRules.purPolicy ]" />-->
              <j-dict-select-tag v-decorator="['purPolicy', validatorRules.purPolicy ]" :type="'radio'" dictCode="pur_policy" :triggerChange="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="平均单价">
              <a-input placeholder="请输入平均单价" v-decorator="['avgUnitprice', validatorRules.avgUnitprice ]" disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="采购提前期">
              <a-input placeholder="请输入采购提前期" v-decorator="['leadTime', validatorRules.leadTime ]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="最近进料日">
<!--              <a-input v-decorator="['lastInDate', {}]" disabled="true"/>-->
              <j-date v-decorator="['lastInDate', {}]" disabled="true" />
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="最近出库日">
<!--              <a-input v-decorator="['lastOutDate', {}]" disabled="true"/>-->
              <j-date v-decorator="['lastOutDate', {}]" disabled="true" />
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="物品材质">
              <a-input placeholder="请输入物品材质" v-decorator="['matSpec', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="锁定注记">
<!--              <a-input placeholder="请输入锁定注记" v-decorator="['lockStatus', validatorRules.lockStatus ]" />-->
              <j-dict-select-tag v-decorator="['lockStatus', validatorRules.lockStatus ]" :type="'radio'" dictCode="lock_status" :triggerChange="true" @change="changeLockDate"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="锁定日期">
<!--              <a-input v-decorator="['lockDate', {}]" />-->
              <j-date v-decorator="['lockDate', {} ]" disabled="true" />
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
              label="审核人">
              <a-input v-decorator="['verifyUser', {}]" disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="审核时间">
<!--              <a-input v-decorator="['verifyDt', {}]" disabled="true"/>-->
              <j-datetime v-decorator="['verifyDt', {}]" :showTime="true" disabled="true" />
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">

          </a-col>
        </a-row>


<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="单重审核人">-->
<!--          <a-input placeholder="请输入单重审核人" v-decorator="['wgtVerifyUser', {}]" />-->
<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="单重审核日">-->
<!--          <a-input placeholder="请输入单重审核日" v-decorator="['wgtVerifyDate', {}]" />-->
<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="英文颜色">-->
<!--          <a-input placeholder="请输入英文颜色" v-decorator="['matEngColor', {}]" />-->
<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="平均单价锁定">-->
<!--          <a-input placeholder="请输入平均单价锁定" v-decorator="['accNo', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="资材代号">-->
<!--          <a-input placeholder="请输入资材代号" v-decorator="['accMatno', {}]" />-->
<!--        </a-form-item>-->


<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="超交允收">-->
<!--          <a-input placeholder="请输入超交允收" v-decorator="['overRcvRmk', validatorRules.overRcvRmk ]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="商品编号">-->
<!--          <a-input placeholder="请输入商品编号" v-decorator="['goodsNo', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="序号">-->
<!--          <a-input placeholder="请输入序号" v-decorator="['goodsSeq', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="单重">-->
<!--          <a-input placeholder="请输入单重" v-decorator="['unitWeight', validatorRules.unitWeight ]" />-->
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
<!--          label="换算单位">-->
<!--          <a-input placeholder="请输入换算单位" v-decorator="['unitRate', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="共用注记">-->
<!--          <a-input placeholder="请输入共用注记" v-decorator="['shareRmk', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="物性测试注记">-->
<!--          <a-input placeholder="请输入物性测试注记" v-decorator="['matphyRmk', validatorRules.matphyRmk ]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="检验注记">-->
<!--          <a-input placeholder="请输入检验注记" v-decorator="['sgsRmk', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="材料类别编号">-->
<!--          <a-input placeholder="请输入材料类别编号" v-decorator="['matkindNo', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="材料简称">-->
<!--          <a-input placeholder="请输入材料简称" v-decorator="['uMat', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="预购注记">-->
<!--          <a-input placeholder="请输入预购注记" v-decorator="['apRmk', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="单重审核注记(Y/N)">-->
<!--          <a-input placeholder="请输入单重审核注记(Y/N)" v-decorator="['wgtVerifyRmk', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="关务材料名">-->
<!--          <a-input placeholder="请输入关务材料名" v-decorator="['matNmGw', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="创建日期">-->
<!--          <a-input placeholder="请输入创建日期" v-decorator="['creatDate', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="前次收货日">-->
<!--          <a-input placeholder="请输入前次收货日" v-decorator="['lRecDate', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="送测进料批次">-->
<!--          <a-input placeholder="请输入送测进料批次" v-decorator="['incomQty', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="IN_ACC_NO">-->
<!--          <a-input placeholder="请输入IN_ACC_NO" v-decorator="['inAccNo', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="loss比率">-->
<!--          <a-input placeholder="请输入loss比率" v-decorator="['lossRate', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="币别">-->
<!--          <a-input placeholder="请输入币别" v-decorator="['coinKind', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="去掉空格的名称">-->
<!--          <a-input placeholder="请输入去掉空格的名称" v-decorator="['nmTrim', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="是否测试">-->
<!--          <a-input placeholder="请输入是否测试" v-decorator="['istest', {}]" />-->
<!--        </a-form-item>-->
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import ATextarea from 'ant-design-vue/es/input/TextArea'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import JDate from '@/components/jeecg/JDate'
  import JDatetime from '../../../components/jeecg/JDatetime'

  export default {
    name: "MatmModal",
    components: {
      JDatetime,
      ATextarea,
      JDictSelectTag,
      JDate,
    },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        factNo:{rules: [{ required: true, message: '请输入厂区编号!' }]},
        matNo:{rules: [{ required: true, message: '请输入材料编号!' }]},
        matNm:{rules: [{ required: true, message: '请输入材料名称!' }]},
        matUnit:{rules: [{ required: true, message: '请输入材料单位!' }]},
        purPolicy:{rules: [{ required: true, message: '请输入采购政策!' }], initialValue: '1'},
        safeStkQty:{rules: [{ required: true, message: '请输入安全库存!' }], initialValue: 0},
        leadTime:{rules: [{ required: true, message: '请输入采购提前期!' }], initialValue: 0},
        avgUnitprice:{rules: [{ required: true, message: '请输入盘点单价!' }], initialValue: 0},
        taxRmk:{rules: [{ required: true, message: '请输入保税注记!' }], initialValue: '2'},
        preprdRmk:{rules: [{ required: true, message: '请输入托外注记!' }], initialValue: 'N'},
        sizeRmk:{rules: [{ required: true, message: '请输入尺寸注记!' }], initialValue: '1' },
        overRcvRmk:{rules: [{ required: true, message: '请输入超交允收!' }]},
        unitWeight:{rules: [{ required: true, message: '请输入单重!' }]},
        onOrderQty:{rules: [{ required: true, message: '请输入已订未交量!' }], initialValue: 0},
        unqcQty:{rules: [{ required: true, message: '请输入已收未验量!' }], initialValue: 0},
        lockStatus:{rules: [{ required: true, message: '请输入锁定注记!' }], initialValue: 'N'},
        matphyRmk:{rules: [{ required: true, message: '请输入物性测试注记!' }]},
        minLot:{rules: [{ required: true, message: '请输入最小用量!' }], initialValue: 0},
        },
        url: {
          add: "/bom/matm/add",
          edit: "/bom/matm/edit",
        },
      }
    },
    created () {
    },
    methods: {

      changeMatEngUnit(e) {
        this.form.setFieldsValue({ 'matEngUnit': e })
      },

      changeLockDate(e) {
        if (e == 'Y') {
          this.form.setFieldsValue({ 'lockDate': ((new Date()).getFullYear().toString()) + (((new Date()).getMonth()+1<10) ? ('0'+((new Date()).getMonth()+1).toString()) : (((new Date()).getMonth()+1).toString())) + (((new Date()).getDate()<10) ? ('0'+(new Date()).getDate().toString()) : ((new Date()).getDate().toString())) })
        } else if (e =='N') {
          this.form.setFieldsValue({ 'lockDate': '' })
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
          this.form.setFieldsValue(pick(this.model,'factNo','matNo','matNm','matEngNm','matUnit','matEngUnit','matColor','matEngColor','purPolicy','accNo','accMatno','safeStkQty','leadTime','preprdRmk','sizeRmk','overRcvRmk','goodsNo','goodsSeq','unitWeight','onOrderQty','unqcQty','lastInDate','lastOutDate','userNo','modifyDt','lockStatus','lockDate','unitRate','shareRmk','matphyRmk','sgsRmk','matkindNo','uMat','apRmk','wgtVerifyRmk','wgtVerifyUser','wgtVerifyDate','matNmGw','creatDate','lRecDate','incomQty','avgUnitprice','taxRmk','inAccNo','matSpec','lossRate','coinKind','minLot','verifyUser','verifyDt','nmTrim','istest'))
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
      //用户修改【锁定注记】为【Y.锁定】时，将【锁定日期】设置为当天的日期；用户修改【锁定注记】为【N.正常】时，将【锁定日期】设置为NULL

    }
  }
</script>

<style lang="less" scoped>

</style>