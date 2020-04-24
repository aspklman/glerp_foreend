<template>
  <div>
    <a-input-search
      v-model="selectedDeptms"
      placeholder="请选择派工阶段"
      disabled
      @search="onSearchDeptm">
      <a-button slot="enterButton" :disabled="disabled">选择派工阶段</a-button>
    </a-input-search>
    <j-select-deptm-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchDeptmCallBack"/>
  </div>
</template>

<script>
  import JSelectDeptmModal from './modal/JSelectDeptmModal'

  export default {
    name: 'JSelectDeptm',
    components: { JSelectDeptmModal },
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
        selectedDeptms: ''
      }
    },
    mounted() {
      this.selectedDeptms = this.value
    },
    watch: {
      value(val) {
        this.selectedDeptms = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择派工阶段
      onSearchDeptm() {
        this.$refs.selectModal.showModal()
        this.onSearchDeptmCallBack('')
      },
      onSearchDeptmCallBack(selectedDeptms) {
        this.selectedDeptms = selectedDeptms
        this.$emit('change', selectedDeptms)
      }
    }
  }
</script>

<style scoped>

</style>