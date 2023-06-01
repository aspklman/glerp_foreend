<template>
  <div>
    <a-input-search
      v-model="selectedOrgGroups"
      placeholder="请选择班组编号"
      disabled
      @search="onSearchOrgGroup">
      <a-button slot="enterButton" :disabled="disabled">选择班组</a-button>
    </a-input-search>
    <j-select-org-group-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchOrgGroupCallBack"/>
  </div>
</template>

<script>
  import JSelectOrgGroupModal from './modal/JSelectOrgGroupModal'

  export default {
    name: 'JSelectOrgGroup',
    components: { JSelectOrgGroupModal },
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
        selectedOrgGroups: ''
      }
    },
    mounted() {
      this.selectedOrgGroups = this.value
    },
    watch: {
      value(val) {
        this.selectedOrgGroups = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择班组
      onSearchOrgGroup() {
        this.$refs.selectModal.showModal()
        this.onSearchOrgGroupCallBack('')
      },
      onSearchOrgGroupCallBack(selectedOrgGroups) {
        this.selectedOrgGroups = selectedOrgGroups
        this.$emit('change', selectedOrgGroups)
      }
    }
  }
</script>

<style scoped>

</style>