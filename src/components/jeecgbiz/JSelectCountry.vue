<template>
  <div>
    <a-input-search
      v-model="selectedCountrys"
      placeholder="请选择目的地"
      disabled
      @search="onSearchCountry">
      <a-button slot="enterButton" :disabled="disabled">选择目的地</a-button>
    </a-input-search>
    <j-select-country-modal
      ref="selectModal"
      :modal-width="modalWidth"
      @ok="onSearchCountryCallBack"/>
  </div>
</template>

<script>
  import JSelectCountryModal from './modal/JSelectCountryModal'

  export default {
    name: 'JSelectCountry',
    components: { JSelectCountryModal },
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
        selectedCountrys: ''
      }
    },
    mounted() {
      this.selectedCountrys = this.value
    },
    watch: {
      value(val) {
        this.selectedCountrys = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //选择目的地
      onSearchCountry() {
        this.$refs.selectModal.showModal()
        this.onSearchCountryCallBack('')
      },
      onSearchCountryCallBack(selectedCountrys) {
        this.selectedCountrys = selectedCountrys
        this.$emit('change', selectedCountrys)
      }
    }
  }
</script>

<style scoped>

</style>