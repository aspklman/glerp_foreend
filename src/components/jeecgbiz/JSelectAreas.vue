<template>
  <div>
    <a-input-search
      v-model="selectedAreass"
      placeholder="请选择地点"
      disabled
      @search="onSearchAreas">
      <a-button slot="enterButton" :disabled="disabled">选择地点</a-button>
    </a-input-search>
    <j-select-areas-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchAreasCallBack"/>
  </div>
</template>

<script>
  import JSelectAreasModal from './modal/JSelectAreasModal'

  export default {
    name: 'JSelectAreas',
    components: { JSelectAreasModal },
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
        selectedAreass: ''
      }
    },
    mounted() {
      this.selectedAreass = this.value
    },
    watch: {
      value(val) {
        this.selectedAreass = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择存放地点
      onSearchAreas() {
        this.$refs.selectModal.showModal()
        this.onSearchAreasCallBack('')
      },
      onSearchAreasCallBack(selectedAreass) {
        this.selectedAreass = selectedAreass
        this.$emit('change', selectedAreass)
      }
    }
  }
</script>

<style scoped>

</style>