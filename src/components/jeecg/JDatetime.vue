<template>
  <a-date-picker
    :disabled="disabled || readOnly"
    :placeholder="placeholder"
    @change="handleDatetimeChange"
    :value="momVal"
    :showTime="showTime"
    :format="datetimeFormat"
    :getCalendarContainer="getCalendarContainer"
  />
</template>
<script>
  import moment from 'moment'
  export default {
    name: 'JDatetime',
    props: {
      placeholder:{
        type: String,
        default: '',
        required: false
      },
      value:{
        type: String,
        required: false
      },
      datetimeFormat:{
        type: String,
        default: 'YYYY-MM-DD HH:mm:ss',
        required: false
      },
      //此属性可以被废弃了
      triggerChange:{
        type: Boolean,
        required: false,
        default: false
      },
      readOnly:{
        type: Boolean,
        required: false,
        default: false
      },
      disabled:{
        type: Boolean,
        required: false,
        default: false
      },
      showTime:{
        type: Boolean,
        required: false,
        default: false
      },
      getCalendarContainer: {
        type: Function,
        default: () => document.body
      }
    },
    data () {
      let datetimeStr = this.value;
      return {
        decorator:"",
        momVal:!datetimeStr?null:moment(datetimeStr,this.datetimeFormat)
      }
    },
    watch: {
      value (val) {
        if(!val){
          this.momVal = null
        }else{
          this.momVal = moment(val,this.datetimeFormat)
        }
      }
    },
    methods: {
      moment,
      handleDatetimeChange(mom,datetimeStr){
        this.$emit('change', datetimeStr);
      }
    },
    //2.2新增 在组件内定义 指定父组件调用时候的传值属性和事件类型 这个牛逼
    model: {
      prop: 'value',
      event: 'change'
    }
  }
</script>
