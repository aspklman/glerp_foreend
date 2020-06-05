<template>
  <div>
    <a-input-search
      v-model="selectedDeparts"
      :placeholder="$t('common.pleaseSelect') + $t('depart.depart')"
      disabled
      @search="onSearchDepart">
      <a-button slot="enterButton" :disabled="disabled">{{$t('common.select')}}</a-button>
    </a-input-search>
    <j-select-depart-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchDepartCallBack"/>
  </div>
</template>

<script>
  import GSelectDepartModal from './modal/GSelectDepartModal'

  export default {
    name: 'GSelectDepart',
    components: { GSelectDepartModal },
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
      },
    },
    data() {
      return {
        selectedDeparts: '',
      }
    },
    mounted() {
      this.selectedDeparts = this.value
    },
    watch: {
      value(val) {
        this.selectedDeparts = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择组别
      onSearchDepart() {
        this.$refs.selectModal.showModal()
        this.onSearchDepartCallBack('')
      },
      onSearchDepartCallBack(selectedDeparts) {
        this.selectedDeparts = selectedDeparts
        this.$emit('change', selectedDeparts)
      }
    }
  }
</script>

<style scoped>

</style>