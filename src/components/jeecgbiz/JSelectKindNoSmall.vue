<template>
  <div>
    <a-input-search
      v-model="selectedKindNoSmalls"
      placeholder="请选择明细类编号"
      disabled
      @search="onSearchKindNoSmall">
      <a-button slot="enterButton" :disabled="disabled">选择明细类</a-button>
    </a-input-search>
    <j-select-kind-no-small-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchKindNoSmallCallBack"/>
  </div>
</template>

<script>
  import JSelectKindNoSmallModal from './modal/JSelectKindNoSmallModal'

  export default {
    name: 'JSelectKindNoSmall',
    components: { JSelectKindNoSmallModal },
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
        selectedKindNoSmalls: ''
      }
    },
    mounted() {
      this.selectedKindNoSmalls = this.value
    },
    watch: {
      value(val) {
        this.selectedKindNoSmalls = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择明细类
      onSearchKindNoSmall() {
        this.$refs.selectModal.showModal()
        this.onSearchKindNoSmallCallBack('')
      },
      onSearchKindNoSmallCallBack(selectedKindNoSmalls) {
        this.selectedKindNoSmalls = selectedKindNoSmalls
        this.$emit('change', selectedKindNoSmalls)
      }
    }
  }
</script>

<style scoped>

</style>