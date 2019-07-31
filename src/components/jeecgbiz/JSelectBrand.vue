<template>
  <div>
    <a-input-search
      v-model="selectedBrands"
      placeholder="请选择品牌编号"
      disabled
      @search="onSearchBrand">
      <a-button slot="enterButton" :disabled="disabled">选择品牌</a-button>
    </a-input-search>
    <j-select-brand-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchBrandCallBack"/>
  </div>
</template>

<script>
  import JSelectBrandModal from './modal/JSelectBrandModal'

  export default {
    name: 'JSelectBrand',
    components: { JSelectBrandModal },
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
        selectedBrands: ''
      }
    },
    mounted() {
      this.selectedBrands = this.value
    },
    watch: {
      value(val) {
        this.selectedBrands = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择品牌
      onSearchBrand() {
        this.$refs.selectModal.showModal()
        this.onSearchBrandCallBack('')
      },
      onSearchBrandCallBack(selectedBrands) {
        this.selectedBrands = selectedBrands
        this.$emit('change', selectedBrands)
      }
    }
  }
</script>

<style scoped>

</style>