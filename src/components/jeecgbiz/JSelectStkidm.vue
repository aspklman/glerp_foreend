<template>
  <div>
    <a-input-search
      v-model="selectedStkidms"
      placeholder="请选择仓库编号"
      disabled
      @search="onSearchStkidm">
      <a-button slot="enterButton" :disabled="disabled">选择仓库</a-button>
    </a-input-search>
    <j-select-stkidm-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchStkidmCallBack"/>
  </div>
</template>

<script>
  import JSelectStkidmModal from './modal/JSelectStkidmModal'

  export default {
    name: 'JSelectStkidm',
    components: { JSelectStkidmModal },
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
        selectedStkidms: ''
      }
    },
    mounted() {
      this.selectedStkidms = this.value
    },
    watch: {
      value(val) {
        this.selectedStkidms = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择仓库
      onSearchStkidm() {
        this.$refs.selectModal.showModal()
        this.onSearchStkidmCallBack('')
      },
      onSearchStkidmCallBack(selectedStkidms) {
        this.selectedStkidms = selectedStkidms
        this.$emit('change', selectedStkidms)
      }
    }
  }
</script>

<style scoped>

</style>