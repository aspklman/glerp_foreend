<template>
  <a-modal
    title="固定资产卡"
    footer=""
    :width="400"
    :visible="visible"
    @cancel="handleCancel">


    <div class="no-print" style="text-align: left; padding-bottom: 20px">
      <a-button v-print="'#printAssetCard'" ghost type="primary">
        打印
      </a-button>
    </div>

    <section ref="print" id="printAssetCard" class="wholeReport">

<!--      <a-table :columns="columns"-->
<!--               :data-source="assetCard"-->
<!--               bordered-->
<!--               :showHeader="false"-->
<!--               :pagination="false">-->
<!--          <span slot="actionAssetNo" slot-scope="text, record, index">-->

<!--          </span>-->
<!--&lt;!&ndash;          <span slot="actionAssetName" slot-scope="text, record, index">&ndash;&gt;-->
<!--&lt;!&ndash;            {{ assetCard.assetName }}&ndash;&gt;-->
<!--&lt;!&ndash;          </span>&ndash;&gt;-->
<!--      </a-table>-->

    <div style="background-color: #ececec; padding: 20px">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-card title="固定资产卡" :bordered="false">
            资产编号：{{ assetCard.assetNo }}
            <br>
            资产名称：{{ assetCard.assetName }}
            <br>
            使用厂别：{{ assetCard.factLocation_dictText}}
            <br>
<!--            使用部门：{{ assetCard.deptNo }}-->
<!--            <br>-->
            验收日期：<span v-if="assetCard.acceptDate">{{ assetCard.acceptDate.substring(0,4) + '-' + assetCard.acceptDate.substring(4,6) + '-' + assetCard.acceptDate.substring(6) }}</span>
          </a-card>
        </a-col>
<!--        <a-col :span="8">-->
<!--          <a-card title="Card title" :bordered="false">-->
<!--            <p>card content</p>-->
<!--          </a-card>-->
<!--        </a-col>-->
<!--        <a-col :span="8">-->
<!--          <a-card title="Card title" :bordered="false">-->
<!--            <p>card content</p>-->
<!--          </a-card>-->
<!--        </a-col>-->
      </a-row>
    </div>


    </section>

  </a-modal>
</template>

<script>
  import HeadInfo from '@/components/tools/HeadInfo.vue'
  import BarMultid from '../../../components/chart/BarMultid'
  // import AssetCardModal from './AssetCardModal'

  // const columns = [
  //   {
  //     title: '资产编号',
  //     dataIndex: 'assetNo',
  //     width: 200,
  //     fixed: true,
  //     // scopedSlots: { customRender: 'actionAssetNo' },
  //   },
  //   // {
  //   //   title: '资产名称',
  //   //   dataIndex: 'assetName',
  //   //   width: 200,
  //   //   fixed: true,
  //   //   scopedSlots: { customRender: 'actionAssetName' },
  //   // },
  // ]


  export default {
    name: 'AssetCardModal',
    props: ['assetCard'],
    components: {
      // AssetCardModal,
      // BarMultid,
      // HeadInfo
    },
    data() {
      return {
        // columns,
        // defectColumns,
        visible: false,
        loading: true,
        confirmLoading: false,
        // totalDefectFound: this.$t('sampleInspectReportM.totalDefectFound'),
        // maxDefectAccept: this.$t('sampleInspectReportM.maxDefectAccept'),
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