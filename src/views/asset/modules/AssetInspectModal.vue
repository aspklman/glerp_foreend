<template>
  <a-modal
    title="固定资产验收单"
    footer=""
    :width="1200"
    :visible="visible"
    @cancel="handleCancel">


    <div class="no-print" style="text-align: left">
      <a-button v-print="'#printAssetInspect'" ghost type="primary">
        列印
<!--        {{ $t('sampleInspectReportM.print') }}-->
      </a-button>
    </div>



    <section ref="print" id="printAssetInspect" class="assetInspect">

      <a-row :span="24" :style="{ marginTop: '0px' }">
        <a-col :span="8">

        </a-col>
        <a-col :span="8" align="center">
          <img src="@/assets/logo.png" width="60" height="68">
          <h2>固定资产验收单</h2>
        </a-col>
        <a-col :span="8">

        </a-col>
      </a-row>

      <hr align=center :style="{ marginTop: '20px' }" color=#987cb9 SIZE=1>
      <br>

      <a-row :span="24">
        <a-col :span="8">
          验收日期：<span v-if="assetInspect.acceptDate">{{ assetInspect.acceptDate.substring(0,4) + '-' + assetInspect.acceptDate.substring(4,6) + '-' + assetInspect.acceptDate.substring(6) }}</span>
        </a-col>
        <a-col :span="8">
          资产来源：{{ assetInspect.kind_dictText }}
        </a-col>
        <a-col :span="8">

        </a-col>
      </a-row>

      <hr align=center :style="{ marginTop: '20px' }" color=#987cb9 SIZE=1>
      <br>

      <a-row :span="24" :style="{ marginTop: '10px' }">
        <a-col :span="8">
          资产编号：{{ assetInspect.assetNo }}
        </a-col>
        <a-col :span="8">
          资产名称：{{ assetInspect.assetName }}
        </a-col>
        <a-col :span="8">
          单位：{{ assetInspect.unit }}
        </a-col>
      </a-row>

      <a-row :span="24" :style="{ marginTop: '10px' }">
        <a-col :span="8">
          供应商：{{ assetInspect.supplier }}
        </a-col>
        <a-col :span="8">
          制造商：{{ assetInspect.manufacturer }}
        </a-col>
        <a-col :span="8">
          产地：{{ assetInspect.originPlace }}
        </a-col>
      </a-row>

      <a-row :span="24" :style="{ marginTop: '10px' }">
        <a-col :span="8">
          品牌：{{ assetInspect.brand }}
        </a-col>
        <a-col :span="8">
          型号规格：{{ assetInspect.specifications }}
        </a-col>
        <a-col :span="8">
          配件清单：{{ assetInspect.accessory }}
        </a-col>
      </a-row>

      <a-row :span="24" :style="{ marginTop: '10px' }">
        <a-col :span="8">
          原始单价：{{ assetInspect.originalPrice }}
        </a-col>
        <a-col :span="8">
          币别：{{ assetInspect.hb_dictText }}
        </a-col>
        <a-col :span="8">
          入账单价：{{ assetInspect.price }}
        </a-col>
      </a-row>

      <a-row :span="24" :style="{ marginTop: '10px' }">
        <a-col :span="8">
          折旧方法：{{ assetInspect.depreciation_dictText }}
        </a-col>
        <a-col :span="8">
          折旧率：{{ assetInspect.rate }}%
        </a-col>
        <a-col :span="8">
          折旧月数：{{ assetInspect.num }}
        </a-col>
      </a-row>

      <a-row :span="24" :style="{ marginTop: '10px' }">
        <a-col :span="8">
          残值率：{{ assetInspect.residual }}%
        </a-col>
        <a-col :span="8">

        </a-col>
        <a-col :span="8">

        </a-col>
      </a-row>

      <hr align=center :style="{ marginTop: '20px' }" color=#987cb9 SIZE=1>
      <br>

      <a-row :span="24">
        <a-col :span="8">
          使用厂别：{{ assetInspect.factLocation_dictText }}
        </a-col>
        <a-col :span="8">
          使用部门：{{ assetInspect.deptNo }}
        </a-col>
        <a-col :span="8">
          保管人：{{ assetInspect.custodian }}
        </a-col>
      </a-row>

      <a-row :span="24" :style="{ marginTop: '10px' }">
        <a-col :span="8">
          使用人：{{ assetInspect.custodianUser }}
        </a-col>
        <a-col :span="8">

        </a-col>
        <a-col :span="8">

        </a-col>
      </a-row>

      <a-row :span="24" :style="{ marginTop: '10px' }">
        <a-col :span="8">
          存放楼层：{{ assetInspect.locationFl_dictText }}
        </a-col>
        <a-col :span="8">
          存放区域：{{ assetInspect.locationDl_dictText }}
        </a-col>
        <a-col :span="8">
          存放厂区：{{ assetInspect.locationFact_dictText }}
        </a-col>
      </a-row>

      <a-row :span="24" :style="{ marginTop: '10px' }">
        <a-col :span="8">
          存放位置：{{ assetInspect.location }}
        </a-col>
        <a-col :span="8">

        </a-col>
        <a-col :span="8">

        </a-col>
      </a-row>

      <hr align=center :style="{ marginTop: '20px' }" color=#987cb9 SIZE=1>
      <br>

      <a-row :span="24" :style="{ marginTop: '40px' }">
        <a-col :span="8">
          备注：{{ assetInspect.note }}
        </a-col>
        <a-col :span="8">

        </a-col>
        <a-col :span="8">

        </a-col>
      </a-row>

      <hr align=center color=#987cb9 SIZE=1>
      <br>

      <a-row :span="24" :style="{ marginTop: '40px' }">
        <a-col :span="8">
          验收情况说明：
        </a-col>
        <a-col :span="8">

        </a-col>
        <a-col :span="8">

        </a-col>
      </a-row>

      <hr align=center color=#987cb9 SIZE=1>
      <br>

      <a-row :span="24" :style="{ marginTop: '40px' }">
        <a-col :span="8">
          验收人员签名：
        </a-col>
        <a-col :span="8">

        </a-col>
        <a-col :span="8">

        </a-col>
      </a-row>

      <hr align=center color=#987cb9 SIZE=1>
      <br>

      <a-row :span="24" :style="{ marginTop: '40px' }">
        <a-col :span="8">
          管理部门审核：
        </a-col>
        <a-col :span="8">

        </a-col>
        <a-col :span="8">

        </a-col>
      </a-row>

      <hr align=center color=#987cb9 SIZE=1>
      <br>

      <a-row :span="24" :style="{ marginTop: '40px' }">
        <a-col :span="8">
          (副)总经理审核：
        </a-col>
        <a-col :span="8">

        </a-col>
        <a-col :span="8">

        </a-col>
      </a-row>

      <hr align=center color=#987cb9 SIZE=1>
      <br>





    </section>

  </a-modal>
</template>

<script>
  import HeadInfo from '@/components/tools/HeadInfo.vue'
  import BarMultid from '../../../components/chart/BarMultid'



  export default {
    name: 'AssetInspectModal',
    props: ['assetInspect'],
    components: {
      BarMultid,
      HeadInfo
    },
    data() {
      return {
        visible: false,
        loading: true,
        confirmLoading: false,
        totalDefectFound: this.$t('sampleInspectReportM.totalDefectFound'),
        maxDefectAccept: this.$t('sampleInspectReportM.maxDefectAccept'),
      }
    },

    created() {
    },

    computed: {

      tableProps() {
        let _this = this
        return {
          // 列表项是否可选择
          // https://vue.ant.design/components/table-cn/#rowSelection
          rowSelection: {
            selectedRowKeys: _this.selectedRowKeys,
            onChange: (selectedRowKeys) => _this.selectedRowKeys = selectedRowKeys
          }
        }
      }
    },

    methods: {

      edit(record) {
        this.visible = true
      },

      close() {
        this.$emit('close')
        this.visible = false
      },

      handleCancel() {
        this.close()
      }

    }
  }
</script>

<style scoped>

</style>