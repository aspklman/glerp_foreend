<template>
  <div class="barClass" :style="{ padding: '0 0 32px 32px' }">
    <h4 :style="{ marginBottom: '20px', textAlign: 'center' }">{{ title }}</h4>
    <v-chart :forceFit="true" :height="height" :data="dataSource" :scale="scale" :padding="padding">
      <v-tooltip />
      <v-axis />
      <v-bar position="x*y" :label="['y', { offset: 10 }]" />
    </v-chart>
  </div>
</template>

<script>
    import {triggerWindowResizeEvent} from '@/utils/util'

    export default {
        name: 'Bar',
        props: {
            dataSource: {
                type: Array,
                required: true
            },
            yaxisText: {
                type: String,
                default: 'y'
            },
            title: {
                type: String,
                default: ''
            },
            height: {
                type: Number,
                default: 254
            }
        },
        data() {
            return {padding: ['20', '60', '20', '60']}
        },
        computed: {
            scale() {
                return [{
                    dataKey: 'y',
                    alias: this.yaxisText
                }]
            },
        },
        mounted() {
            triggerWindowResizeEvent()
        }
    }
</script>

<style lang="less" scoped>
  /*div.barClass {*/
  /*  border-top: 1px dashed black;*/
  /*  border-right: 1px solid black;*/
  /*  border-bottom: 1px solid black;*/
  /*  border-left: 1px solid black;*/
  /*}*/
</style>