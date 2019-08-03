<template>
  <div>
    <a-input-search
      v-model="selectedStylems"
      placeholder="请选择型体编号"
      disabled
      @search="onSearchStylem">
      <a-button slot="enterButton" :disabled="disabled">选择型体</a-button>
    </a-input-search>
    <j-select-stylem-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchStylemCallBack"/>
  </div>
</template>

<script>
  import JSelectStylemModal from './modal/JSelectStylemModal'

  export default {
    name: 'JSelectStylem',
    components: { JSelectStylemModal },
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
        selectedStylems: ''
      }
    },
    mounted() {
      this.selectedStylems = this.value
    },
    watch: {
      value(val) {
        this.selectedStylems = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择型体
      onSearchStylem() {
        this.$refs.selectModal.showModal()
        this.onSearchStylemCallBack('')
      },
      onSearchStylemCallBack(selectedStylems) {
        this.selectedStylems = selectedStylems
        this.$emit('change', selectedStylems)
      }
    }
  }
</script>

<style scoped>

</style>