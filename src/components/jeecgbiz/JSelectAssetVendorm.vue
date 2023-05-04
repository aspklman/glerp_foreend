<template>
  <div>
    <a-input-search
      v-model="selectedAssetVendorms"
      placeholder="请选择供应商编号"
      disabled
      @search="onSearchAssetVendorm">
      <a-button slot="enterButton" :disabled="disabled">选择供应商</a-button>
    </a-input-search>
    <j-select-asset-vendorm-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchAssetVendormCallBack"/>
  </div>
</template>

<script>
  import JSelectAssetVendormModal from './modal/JSelectAssetVendormModal'

  export default {
    name: 'JSelectAssetVendorm',
    components: { JSelectAssetVendormModal },
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
        selectedAssetVendorms: ''
      }
    },
    mounted() {
      this.selectedAssetVendorms = this.value
    },
    watch: {
      value(val) {
        this.selectedAssetVendorms = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择供应商
      onSearchAssetVendorm() {
        this.$refs.selectModal.showModal()
        this.onSearchAssetVendormCallBack('')
      },
      onSearchAssetVendormCallBack(selectedAssetVendorms) {
        this.selectedAssetVendorms = selectedAssetVendorms
        this.$emit('change', selectedAssetVendorms)
      }
    }
  }
</script>

<style scoped>

</style>