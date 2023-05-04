<template>
  <div>
    <a-input-search
      v-model="selectedKindNoMains"
      placeholder="请选择大分类编号"
      disabled
      @search="onSearchKindNoMain">
      <a-button slot="enterButton" :disabled="disabled">选择大分类</a-button>
    </a-input-search>
    <j-select-kind-no-main-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchKindNoMainCallBack"/>
  </div>
</template>

<script>
  import JSelectKindNoMainModal from './modal/JSelectKindNoMainModal'

  export default {
    name: 'JSelectKindNoMain',
    components: { JSelectKindNoMainModal },
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
        selectedKindNoMains: ''
      }
    },
    mounted() {
      this.selectedKindNoMains = this.value
    },
    watch: {
      value(val) {
        this.selectedKindNoMains = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择大分类
      onSearchKindNoMain() {
        this.$refs.selectModal.showModal()
        this.onSearchKindNoMainCallBack('')
      },
      onSearchKindNoMainCallBack(selectedKindNoMains) {
        this.selectedKindNoMains = selectedKindNoMains
        this.$emit('change', selectedKindNoMains)
      }
    }
  }
</script>

<style scoped>

</style>