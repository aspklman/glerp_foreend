<template>
  <div>
    <a-input-search
      v-model="selectedVacodes"
      placeholder="请选择增值编号"
      disabled
      @search="onSearchVacode">
      <a-button slot="enterButton" :disabled="disabled">选择增值</a-button>
    </a-input-search>
    <j-select-vacode-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchVacodeCallBack"/>
  </div>
</template>

<script>
  import JSelectVacodeModal from './modal/JSelectVacodeModal'

  export default {
    name: 'JSelectVacode',
    components: { JSelectVacodeModal },
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
        selectedVacodes: ''
      }
    },
    mounted() {
      this.selectedVacodes = this.value
    },
    watch: {
      value(val) {
        this.selectedVacodes = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择增值
      onSearchVacode() {
        this.$refs.selectModal.showModal()
        this.onSearchVacodeCallBack('')
      },
      onSearchVacodeCallBack(selectedVacodes) {
        this.selectedVacodes = selectedVacodes
        this.$emit('change', selectedVacodes)
      }
    }
  }
</script>

<style scoped>

</style>