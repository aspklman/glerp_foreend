<template>
  <div>
    <a-input-search
      v-model="selectedSecs"
      :placeholder="$t('common.pleaseSelect') + $t('sec.sec')"
      disabled
      @search="onSearchSec">
      <a-button slot="enterButton" :disabled="disabled">{{$t('common.select')}}</a-button>
    </a-input-search>
    <j-select-sec-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchSecCallBack"/>
  </div>
</template>

<script>
  import JSelectSecModal from './modal/JSelectSecModal'

  export default {
    name: 'JSelectSec',
    components: { JSelectSecModal },
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
        selectedSecs: '',
      }
    },
    mounted() {
      this.selectedSecs = this.value
    },
    watch: {
      value(val) {
        this.selectedSecs = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择组别
      onSearchSec() {
        this.$refs.selectModal.showModal()
        this.onSearchSecCallBack('')
      },
      onSearchSecCallBack(selectedSecs) {
        this.selectedSecs = selectedSecs
        this.$emit('change', selectedSecs)
      }
    }
  }
</script>

<style scoped>

</style>