<template>
  <a-modal
    title="移库"
    :width="500"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :footer="null"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <!--        <a-form-item-->
        <!--          :visible="false"-->
        <!--          :labelCol="labelCol"-->
        <!--          :wrapperCol="wrapperCol"-->
        <!--          label="厂区编号">-->
        <!--          <a-input placeholder="请输入厂区编号" v-decorator="['factNo', validatorRules.factNo ]" />-->
        <!--        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="库别编号">
          <a-input placeholder="请输入库别编号" v-decorator="['stkNo', validatorRules.stkNo ]" disabled/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="库存年月">
          <a-input placeholder="请输入库存年月" v-decorator="['stockYymm', validatorRules.stockYymm ]" disabled/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单批号">
          <a-input placeholder="请输入订单批号" v-decorator="['factOdrNo', validatorRules.factOdrNo ]" disabled/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存放区域">
          <a-input placeholder="请输入存放区编号" v-decorator="['locNo', validatorRules.locNo ]" disabled/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="成本部位">
          <a-input placeholder="请输入成本部位" v-decorator="['cpartNo', validatorRules.cpartNo ]" disabled/>
        </a-form-item>
        <!--        <a-form-item-->
        <!--          :labelCol="labelCol"-->
        <!--          :wrapperCol="wrapperCol"-->
        <!--          label="仓管员编号">-->
        <!--          <a-input placeholder="请输入仓管员编号" v-decorator="['whmanNo', {}]" />-->
        <!--        </a-form-item>-->
        <!--        <a-form-item-->
        <!--          :labelCol="labelCol"-->
        <!--          :wrapperCol="wrapperCol"-->
        <!--          label="存放区域流水号">-->
        <!--          <a-input placeholder="请输入存放区域流水号" v-decorator="['locateSeq', {}]" />-->
        <!--        </a-form-item>-->
        <!--        <a-form-item-->
        <!--          :labelCol="labelCol"-->
        <!--          :wrapperCol="wrapperCol"-->
        <!--          label="现在库存量">-->
        <!--          <a-input placeholder="请输入现在库存量" v-decorator="['stockQty', validatorRules.stockQty ]" />-->
        <!--        </a-form-item>-->
        <!--        <a-form-item-->
        <!--          :labelCol="labelCol"-->
        <!--          :wrapperCol="wrapperCol"-->
        <!--          label="期初库存量">-->
        <!--          <a-input placeholder="请输入期初库存量" v-decorator="['startQty', validatorRules.startQty ]" />-->
        <!--        </a-form-item>-->
        <!--        <a-form-item-->
        <!--          :labelCol="labelCol"-->
        <!--          :wrapperCol="wrapperCol"-->
        <!--          label="本月入库量">-->
        <!--          <a-input placeholder="请输入本月入库量" v-decorator="['inQty', validatorRules.inQty ]" />-->
        <!--        </a-form-item>-->
        <!--        <a-form-item-->
        <!--          :labelCol="labelCol"-->
        <!--          :wrapperCol="wrapperCol"-->
        <!--          label="本月出库量">-->
        <!--          <a-input placeholder="请输入本月出库量" v-decorator="['outQty', validatorRules.outQty ]" />-->
        <!--        </a-form-item>-->
        <!--        <a-form-item-->
        <!--          :labelCol="labelCol"-->
        <!--          :wrapperCol="wrapperCol"-->
        <!--          label="调整入库量">-->
        <!--          <a-input placeholder="请输入调整入库量" v-decorator="['fallotInQty', validatorRules.fallotInQty ]" />-->
        <!--        </a-form-item>-->
        <!--        <a-form-item-->
        <!--          :labelCol="labelCol"-->
        <!--          :wrapperCol="wrapperCol"-->
        <!--          label="调整出库量">-->
        <!--          <a-input placeholder="请输入调整出库量" v-decorator="['fallotOutQty', {}]" />-->
        <!--        </a-form-item>-->
        <!--        <a-form-item-->
        <!--          :labelCol="labelCol"-->
        <!--          :wrapperCol="wrapperCol"-->
        <!--          label="盘盈亏数量">-->
        <!--          <a-input placeholder="请输入盘盈亏数量" v-decorator="['waxQty', validatorRules.waxQty ]" />-->
        <!--        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="移出地点">
          <a-input placeholder="请输入移出地点" v-decorator="['locArea', validatorRules.locArea ]" disabled/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="移入地点">
          <a-radio-group
            @change="SelectedArea"
            :options="otherAreas"
            v-decorator="['otherAreas', validatorRules.otherAreas ]" />
<!--            v-decorator="['otherAreas', validatorRules.otherAreas ]"></a-radio-group>-->
        </a-form-item>

        <a-form-item
          v-if="this.selectedArea=='其它地点'"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其它地点">
          <j-select-areas
            v-decorator="['locAreaIn', validatorRules.locAreaIn ]" />
<!--          </j-select-areas>-->
<!--                    <a-input-->
<!--                      :value="this.otherAreas"-->
<!--                      :type="'radio'"-->
<!--                      v-decorator="['locAreaIn', validatorRules.locAreaIn ]" />-->
        </a-form-item>

        <p style="text-align: center">
          <a-button style="margin-right: 10px" @click="queryOtherAreas">获取移入地点</a-button>
          <a-button @click="moveAreas" type="primary">移库</a-button>
        </p>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from 'moment'
  import JSelectAreas from '../../../components/jeecgbiz/JSelectAreas'
  import { getAction } from '../../../api/manage'

  export default {
    name: 'MoveAreasModal',
    components: { JSelectAreas },
    // props: ["otherAreas"],
    data() {
      return {
        title: '操作',
        visible: false,
        otherAreas: [],
        selectedArea: '',
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          factNo: { rules: [{ required: true, message: '请输入厂区编号!' }] },
          stkNo: { rules: [{ required: true, message: '请输入库别编号!' }] },
          stockYymm: { rules: [{ required: true, message: '请输入库存年月!' }] },
          factOdrNo: { rules: [{ required: true, message: '请输入订单批号!' }] },
          locNo: { rules: [{ required: true, message: '请输入存放区编号!' }] },
          cpartNo: { rules: [{ required: true, message: '请输入成本部位!' }] },
          // stockQty:{rules: [{ required: true, message: '请输入现在库存量!' }]},
          // startQty:{rules: [{ required: true, message: '请输入期初库存量!' }]},
          // inQty:{rules: [{ required: true, message: '请输入本月入库量!' }]},
          // outQty:{rules: [{ required: true, message: '请输入本月出库量!' }]},
          // fallotInQty:{rules: [{ required: true, message: '请输入调整入库量!' }]},
          // waxQty:{rules: [{ required: true, message: '请输入盘盈亏数量!' }]},
          locArea: { rules: [{ required: true, message: '请输入移出地点!' }] },
          otherAreas: { rules: [{ required: true, message: '请选择移入地点!' }] },
          locAreaIn: { rules: [{ required: true, message: '请选择移入地点!' }] }
        },
        url: {
          add: '/stock/moveAreas/add',
          edit: '/stock/moveAreas/edit',
          move: '/stock/moveAreas/move',
          queryOtherAreas: '/stock/moveAreas/queryOtherAreas',
        }
      }
    },


    methods: {
      SelectedArea(e) {
        this.selectedArea = e.target.value
      },

      queryOtherAreas: function() {
        const that = this
        if (that.otherAreas.length > 0) {
          return
        }
        let params = {}
        params.stkNo = this.form.getFieldValue('stkNo')
        params.stockYymm = this.form.getFieldValue('stockYymm')
        params.factOdrNo = this.form.getFieldValue('factOdrNo')
        params.locNo = this.form.getFieldValue('locNo')
        params.cpartNo = this.form.getFieldValue('cpartNo')
        params.locArea = this.form.getFieldValue('locArea')
        console.log('库别:' + params.stkNo)
        console.log('库存年月:' + params.stockYymm)
        console.log('订单编号:' + params.factOdrNo)
        console.log('存放区域:' + params.locNo)
        console.log('成本部位:' + params.cpartNo)
        console.log('存放地点:' + params.locArea)
        getAction(this.url.queryOtherAreas, { params: params }).then((res) => {
          if (res.success) {
            // this.$nextTick(function() {
            // that.otherAreas = new Array(res.result.length)
            Object.keys(res.result).forEach(function(key) {
              // console.log(`前端返回值:${key}：${res.result[key]}`)
              Object.keys(res.result[key]).forEach(function(childKey) {
                if (childKey == 'locArea') {
                  let areas = res.result[key][childKey]
                  // console.log(`areas:${areas.toString()}`)

                    that.otherAreas[that.otherAreas.length] = areas



                  // console.log(`返回值：${that.otherAreas}`)


                }
              })
            })
            that.otherAreas.sort()
            that.otherAreas.push('其它地点')
            // })
          } else {
            this.$message.warning(res.message)
          }
        })
        this.$forceUpdate()
      },

      moveAreas() {
        const that = this
        let params = {}
        params.stkNo = this.form.getFieldValue('stkNo')
        params.stockYymm = this.form.getFieldValue('stockYymm')
        params.factOdrNo = this.form.getFieldValue('factOdrNo')
        params.locNo = this.form.getFieldValue('locNo')
        params.cpartNo = this.form.getFieldValue('cpartNo')
        params.locAreaOut = this.form.getFieldValue('locArea')
        let otherAreasTemp = this.form.getFieldValue('otherAreas')
        if (otherAreasTemp=='其它地点') {
          params.locAreaIn = this.form.getFieldValue('locAreaIn')
        } else {
          params.locAreaIn = this.selectedArea
        }
        // console.log(`用户选择了：${params.locAreaIn}`)
        if (params.locAreaIn == null || params.locAreaIn == '') {
          this.$message.warning('请选择移入地点！');
          return
        }
        getAction(this.url.move, { params: params }).then((res) => {
          if (res.success) {
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message)
          }
          // this.loadData()
          // this.loading = false
        }).finally(() => {
          this.otherAreas = []
          this.selectedArea = ''
          that.confirmLoading = false
          that.close()
        })
      },

      add() {
        this.edit({})
      },
      edit(record) {
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'stkNo', 'stockYymm', 'factOdrNo', 'locNo', 'cpartNo', 'locArea'))
          //时间格式化
        })
      },
      close() {
        this.$emit('close')
        this.visible = false
      },
      handleOk() {
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true
            let httpurl = ''
            let method = ''
            if (!this.model.id) {
              httpurl += this.url.add
              method = 'post'
            } else {
              httpurl += this.url.edit
              method = 'put'
            }
            let formData = Object.assign(this.model, values)
            //时间格式化

            //更新成品库存表
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            }).finally(() => {
              that.confirmLoading = false
              that.close()
            })


          }
        })
      },
      handleCancel() {
        this.otherAreas = []
        this.selectedArea = ''
        this.close()
      }


    }
  }
</script>

<style lang="less" scoped>

</style>