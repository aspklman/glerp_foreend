<template>
  <div>
    <a-input-search
      v-model="selectedStgms"
      placeholder="请选择产量阶段"
      disabled
      @search="onSearchStgm">
      <a-button slot="enterButton" :disabled="disabled">选择产量阶段</a-button>
    </a-input-search>
    <j-select-stgm-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchStgmCallBack"/>
  </div>
</template>

<script>
  import JSelectStgmModal from './modal/JSelectStgmModal'

  export default {
    name: 'JSelectStgm',
    components: { JSelectStgmModal },
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
        selectedStgms: ''
      }
    },
    mounted() {
      this.selectedStgms = this.value
    },
    watch: {
      value(val) {
        this.selectedStgms = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择产量阶段
      onSearchStgm() {
        this.$refs.selectModal.showModal()
        this.onSearchStgmCallBack('')
      },
      onSearchStgmCallBack(selectedStgms) {
        this.selectedStgms = selectedStgms
        this.$emit('change', selectedStgms)
      }
    }
  }
</script>

<style scoped>

</style>