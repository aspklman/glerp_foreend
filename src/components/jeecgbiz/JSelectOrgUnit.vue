<template>
  <div>
    <a-input-search
      v-model="selectedOrgUnits"
      placeholder="请选择使用部门编号"
      disabled
      @search="onSearchOrgUnit">
      <a-button slot="enterButton" :disabled="disabled">选择使用部门</a-button>
    </a-input-search>
    <j-select-org-unit-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchOrgUnitCallBack"/>
  </div>
</template>

<script>
  import JSelectOrgUnitModal from './modal/JSelectOrgUnitModal'

  export default {
    name: 'JSelectOrgUnit',
    components: { JSelectOrgUnitModal },
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
        selectedOrgUnits: ''
      }
    },
    mounted() {
      this.selectedOrgUnits = this.value
    },
    watch: {
      value(val) {
        this.selectedOrgUnits = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择使用部门
      onSearchOrgUnit() {
        this.$refs.selectModal.showModal()
        this.onSearchOrgUnitCallBack('')
      },
      onSearchOrgUnitCallBack(selectedOrgUnits) {
        this.selectedOrgUnits = selectedOrgUnits
        this.$emit('change', selectedOrgUnits)
      }
    }
  }
</script>

<style scoped>

</style>