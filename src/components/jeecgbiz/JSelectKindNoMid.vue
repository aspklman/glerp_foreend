<template>
  <div>
    <a-input-search
      v-model="selectedKindNoMids"
      placeholder="请选择中分类编号"
      disabled
      @search="onSearchKindNoMid">
      <a-button slot="enterButton" :disabled="disabled">选择中分类</a-button>
    </a-input-search>
    <j-select-kind-no-mid-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchKindNoMidCallBack"/>
  </div>
</template>

<script>
  import JSelectKindNoMidModal from './modal/JSelectKindNoMidModal'

  export default {
    name: 'JSelectKindNoMid',
    components: { JSelectKindNoMidModal },
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
        selectedKindNoMids: ''
      }
    },
    mounted() {
      this.selectedKindNoMids = this.value
    },
    watch: {
      value(val) {
        this.selectedKindNoMids = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择中分类
      onSearchKindNoMid() {
        this.$refs.selectModal.showModal()
        this.onSearchKindNoMidCallBack('')
      },
      onSearchKindNoMidCallBack(selectedKindNoMids) {
        this.selectedKindNoMids = selectedKindNoMids
        this.$emit('change', selectedKindNoMids)
      }
    }
  }
</script>

<style scoped>

</style>