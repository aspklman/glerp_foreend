<template>
  <a-row :style="{marginTop: '6px'}">
    <a-col :span="4" align="center" style="border:1px solid #8B0000">
      {{ $t('sampleInspectReportM.checkPoints') }}
    </a-col>
    <a-col :span="13" align="center" style="border:1px solid #8B0000">
      {{ $t('sampleInspectReportM.testMethod') }}
    </a-col>
    <a-col :span="4" align="center" style="border:1px solid #8B0000">
      {{ $t('sampleInspectReportM.findingQuestions') }}
    </a-col>
    <!--        <a-col :span="2" align="center" style="border:1px solid #8B0000">Finding details</a-col>-->
    <!--        <a-col :span="2" align="center" style="border:1px solid #8B0000">Pictures</a-col>-->
    <a-col :span="1" align="center" style="border:1px solid #8B0000">
      {{ $t('sampleInspectReportM.minor') }}
    </a-col>
    <a-col :span="1" align="center" style="border:1px solid #8B0000">
      {{ $t('sampleInspectReportM.major') }}
    </a-col>
    <a-col :span="1" align="center" style="border:1px solid #8B0000">
      {{ $t('sampleInspectReportM.critical') }}
    </a-col>
  </a-row>
</template>

<script>
  export default {
    name: 'SampleInspectReportMRptTitle.vue'
  }
</script>

<style scoped>

</style>