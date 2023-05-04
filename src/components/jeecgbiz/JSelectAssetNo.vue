<template>
  <div>
    <a-input-search
      v-model="selectedAssetNos"
      placeholder="请选择资产编号"
      disabled
      @search="onSearchAssetNo">
      <a-button slot="enterButton" :disabled="disabled">选择资产编号</a-button>
    </a-input-search>
    <j-select-asset-no-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchAssetNoCallBack"/>
  </div>
</template>

<script>
  import JSelectAssetNoModal from './modal/JSelectAssetNoModal'

  export default {
    name: 'JSelectAssetNo',
    components: { JSelectAssetNoModal },
    props: {
      modalWidth: {
        type: Number,
        default: 1250,
        required: false
      },
      value: {
        type: String,
        required: false
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data() {
      return {
        selectedAssetNos: ''
      }
    },
    mounted() {
      this.selectedAssetNos = this.value
    },
    watch: {
      value(val) {
        this.selectedAssetNos = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择资产
      onSearchAssetNo() {
        this.$refs.selectModal.showModal()
        this.onSearchAssetNoCallBack('')
      },
      onSearchAssetNoCallBack(selectedAssetNos) {
        this.selectedAssetNos = selectedAssetNos
        this.$emit('change', selectedAssetNos)
      }
    }
  }
</script>

<style scoped>

</style>