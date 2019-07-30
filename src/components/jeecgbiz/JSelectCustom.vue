<template>
  <div>
    <a-input-search
      v-model="selectedCustoms"
      placeholder="请选择客户编号"
      disabled
      @search="onSearchCustom">
      <a-button slot="enterButton" :disabled="disabled">选择客户</a-button>
    </a-input-search>
    <j-select-custom-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchCustomCallBack" />
  </div>
</template>

<script>
  import JSelectCustomModal from './modal/JSelectCustomModal'
  export default {
    name: 'JSelectCustom',
    components: { JSelectCustomModal },
    props:{
      modalWidth:{
        type:Number,
        default:1250,
        required:false
      },
      value:{
        type:String,
        required:false
      },
      disabled:{
        type: Boolean,
        required: false,
        default: false
      }
    },
    data() {
      return {
        selectedCustoms:"",
      }
    },
    mounted(){
      this.selectedCustoms = this.value
    },
    watch:{
      value(val){
        this.selectedCustoms = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择客户
      onSearchCustom() {
        this.$refs.selectModal.showModal()
        this.onSearchCustomCallBack('')
      },
      onSearchCustomCallBack(selectedCustoms) {
        this.selectedCustoms = selectedCustoms
        this.$emit("change",selectedCustoms)
      }
    }
  }
</script>

<style scoped>

</style>