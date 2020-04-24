<template>
  <div>
    <a-input-search
      v-model="selectedLocates"
      placeholder="请选择存放区域编号"
      disabled
      @search="onSearchLocate">
      <a-button slot="enterButton" :disabled="disabled">选择存放区域</a-button>
    </a-input-search>
    <j-select-locate-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchLocateCallBack"/>
  </div>
</template>

<script>
  import JSelectLocateModal from './modal/JSelectLocateModal'

  export default {
    name: 'JSelectLocate',
    components: { JSelectLocateModal },
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
        selectedLocates: ''
      }
    },
    mounted() {
      this.selectedLocates = this.value
    },
    watch: {
      value(val) {
        this.selectedLocates = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择存放区域
      onSearchLocate() {
        this.$refs.selectModal.showModal()
        this.onSearchLocateCallBack('')
      },
      onSearchLocateCallBack(selectedLocates) {
        this.selectedLocates = selectedLocates
        this.$emit('change', selectedLocates)
      }
    }
  }
</script>

<style scoped>

</style>