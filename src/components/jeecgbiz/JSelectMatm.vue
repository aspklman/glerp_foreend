<template>
  <div>
    <a-input-search
      v-model="selectedMatms"
      placeholder="请选择材料编号"
      disabled
      @search="onSearchMatm">
      <a-button slot="enterButton" :disabled="disabled">选择材料</a-button>
    </a-input-search>
    <j-select-matm-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchMatmCallBack"/>
  </div>
</template>

<script>
  import JSelectMatmModal from './modal/JSelectMatmModal'

  export default {
    name: 'JSelectMatm',
    components: { JSelectMatmModal },
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
        selectedMatms: ''
      }
    },
    mounted() {
      this.selectedMatms = this.value
    },
    watch: {
      value(val) {
        this.selectedMatms = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择材料
      onSearchMatm() {
        this.$refs.selectModal.showModal()
        this.onSearchMatmCallBack('')
      },
      onSearchMatmCallBack(selectedMatms) {
        this.selectedMatms = selectedMatms
        this.$emit('change', selectedMatms)
      }
    }
  }
</script>

<style scoped>

</style>