<template>
  <a-modal
    :title="$t('sampleInspectReportM.inspectionReport')"
    footer=""
    :width="1200"
    :visible="visible"
    @cancel="handleCancel">


    <div class="no-print" style="text-align: left">
      <a-button v-print="'#printContent'" ghost type="primary">
        {{ $t('sampleInspectReportM.print') }}
      </a-button>
    </div>

    <section ref="print" id="printContent" class="wholeReport">

      <a-row :span="24" :style="{ marginTop: '20px' }">
        <a-col :span="3">
          <img src="@/assets/inspectReportLogo.png" width="96" height="48">
        </a-col>

        <div>
          <a-col :span="10" align="center" style="border:1px solid #8B0000">
            {{ $t('sampleInspectReportM.oxylaneQcSheetReport') }}
          </a-col>
        </div>
        <a-col :span="3" align="center">
          <a-row style="border:1px solid #8B0000">{{ $t('sampleInspectReportM.owner') }}</a-row>
          <a-row style="border:1px solid #8B0000">E.Couturier</a-row>
        </a-col>
        <a-col :span="3" align="center">
          <a-row style="border:1px solid #8B0000">{{ $t('sampleInspectReportM.lastUpdate') }}</a-row>
          <a-row style="border:1px solid #8B0000">2013/11/22</a-row>
        </a-col>
        <a-col :span="5" align="center">
          <a-row style="border:1px solid #8B0000">{{ $t('sampleInspectReportM.versionTitle') }}</a-row>
          <a-row style="border:1px solid #8B0000">{{ $t('sampleInspectReportM.versionContent') }}</a-row>
        </a-col>
      </a-row>

      <a-row :span="24" :style="{ marginTop: '6px' }">
        <a-col :span="3">
          {{ $t('sampleInspectReportM.supplierName') }}
        </a-col>
        <a-col :span="4" align="center" style="border:1px solid #8B0000; background-color: #FFD700">
          Victory
        </a-col>
        <a-col :span="5" align="center">
          {{ $t('sampleInspectReportM.inspectDate') + $t('common.colon') }}
        </a-col>
        <a-col :span="4" align="center" style="border:1px solid #8B0000; background-color: #FFD700">
          {{ reportMain[2] }}
        </a-col>
        <a-col :span="4" align="center">
          {{ $t('sampleInspectReportM.inspectName') }}
        </a-col>
        <a-col :span="4" align="center" style="border:1px solid #8B0000; color:#FFD700 ; background-color:#FFD700">
          <pre><h4></h4></pre>
        </a-col>
      </a-row>

      <a-row :style="{ marginTop: '6px' }">
        <div align="center" style="border:1px solid #8B0000; color: #FFFFFF; background-color: #8B0000">ORDER DETAILS
        </div>
      </a-row>

      <a-row :span="24" :style="{ marginTop: '6px' }">
        <a-col :span="21">
          <a-row :span="24">
            <a-col :span="3">
              {{ $t('sampleInspectReportM.orderNumber') }}
            </a-col>
            <a-col :span="3" align="center"
                   style="border:1px solid #8B0000; background-color: #FFD700; margin-right: 15px">{{ reportMain[0] }}
            </a-col>
            <a-col :span="3">
              {{ $t('sampleInspectReportM.paceCode') }}
            </a-col>
            <a-col :span="4" align="center"
                   style="border:1px solid #8B0000; background-color: #FFD700; margin-right: 15px">{{ reportMain[5] }}
            </a-col>
            <a-col :span="4">
              {{ $t('sampleInspectReportM.modelColour') }}
            </a-col>
            <a-col :span="5" align="center"
                   style="border:1px solid #8B0000; background-color: #FFD700; margin-right: 15px">{{ reportMain[6] }}
            </a-col>
          </a-row>
          <a-row :style="{ marginTop: '6px' }">
            <a-col :span="3">
              {{ $t('sampleInspectReportM.process') }}
            </a-col>
            <a-col :span="3" align="center"
                   style="border:1px solid #8B0000; background-color: #FFD700; margin-right: 15px">SHOE
            </a-col>
            <a-col :span="3">
              {{ $t('sampleInspectReportM.orderQty') + $t('common.colon') }}
            </a-col>
            <a-col :span="4" align="center"
                   style="border:1px solid #8B0000; background-color: #FFD700; margin-right: 15px">{{
              reportMain[4].toString() }}
            </a-col>
            <a-col :span="4">
              {{ $t('sampleInspectReportM.orderType') + $t('common.colon') }}
            </a-col>
            <a-col :span="5" align="center"
                   style="border:1px solid #8B0000; background-color: #FFD700; margin-right: 15px">{{
              reportMain[7]=='1'?'Mass Production':reportMain[7]=='2'?'Implantation order':'' }}
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="3">
          {{ $t('sampleInspectReportM.filledBefore') }}
        </a-col>
      </a-row>

      <a-row :span="24" :style="{ marginTop: '6px' }">
        <a-col :span="14">
          <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #8B0000">
            <div align="center">
              {{ $t('sampleInspectReportM.conclusion') }}
            </div>
          </a-row>
          <a-row>
            <a-col :span="6" align="center" style="border:1px solid #8B0000">
              {{ $t('sampleInspectReportM.commentsOfActions') }}
              <pre v-if="this.$i18n.locale=='zh-CN'"><h4></h4></pre>
            </a-col>
            <a-col :span="18" style="border:1px solid #8B0000; color: #FFD700; background-color: #FFD700">
              <pre><h4></h4></pre>
              <pre><h4></h4></pre>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="1">

        </a-col>
        <a-col :span="9">
          <a-row>
            <a-col :span="10" align="center">
              {{ $t('sampleInspectReportM.traceabilityCode') + $t('common.colon') }}
            </a-col>
            <a-col align="center" v-if="this.reportMain[200].length>0" :span="14" style="border:1px solid #8B0000; color: #8B0000; background-color: #FFD700">
              {{ this.reportMain[200] }}
            </a-col>
            <a-col v-else :span="14" style="border:1px solid #8B0000; color: #8B0000; background-color: #FFD700">
              <pre><h4></h4></pre>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8" align="center" style="border:1px solid #8B0000">
              {{ $t('sampleInspectReportM.withLaptop') }}
            </a-col>
            <a-col :span="8" align="center" style="border:1px solid #8B0000">
              {{ $t('sampleInspectReportM.calculatedResult') }}
            </a-col>
            <a-col :span="8" align="center" style="border:1px solid #8B0000">
              {{ $t('sampleInspectReportM.inspectorDecision') }}
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8" align="center" style="border:1px solid #8B0000">Yes</a-col>
            <a-col :span="8"style="border:1px solid #8B0000; color: #FFD700; background-color: #FFD700">
              <pre><h4></h4></pre>
            </a-col>

<!--            <a-col :span="8" align="center" style="border:1px solid #8B0000; background-color: #FFD700">-->
<!--              {{reportMain[90]=='0'?'ACCEPTED':reportMain[90]=='1'?'REJECTED':''}}-->
<!--            </a-col>-->
            <a-col v-if="this.reportMain[90]==undefined" :span="8" style="border:1px solid #8B0000; color: #8B0000; background-color: #FFD700">
              <pre><h4></h4></pre>
            </a-col>
            <a-col align="center" v-else :span="8" style="border:1px solid #8B0000; color: #8B0000; background-color: #FFD700">
              {{reportMain[90]=='0'?$t('sampleInspectReportM.accepted'):reportMain[90]=='1'?$t('sampleInspectReportM.rejected'):''}}
            </a-col>

          </a-row>
        </a-col>
      </a-row>

      <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #8B0000; marginTop: 12px">
        <div align="center">
          {{ $t('sampleInspectReportM.visualManual') }}
        </div>
      </a-row>

      <a-row :style="{ marginTop: '6px'}">
        <a-col :span="4">
          {{ $t('sampleInspectReportM.samplingQty') }}
        </a-col>
        <a-col :span="2">{{ reportMain[8].sampleQtyAqlTtl.toString() }}</a-col>
        <a-col :span="18"></a-col>
        <!--          <a-col :span="4" align="center" style="border:1px solid #8B0000">Nb of defect found</a-col>-->
      </a-row>

      <sample-inspect-report-m-rpt-title></sample-inspect-report-m-rpt-title>
<!--      <a-row :style="{marginTop: '6px'}">-->
<!--        <a-col :span="4" align="center" style="border:1px solid #8B0000">-->
<!--          {{ $t('sampleInspectReportM.checkPoints') }}-->
<!--        </a-col>-->
<!--        <a-col :span="13" align="center" style="border:1px solid #8B0000">-->
<!--          {{ $t('sampleInspectReportM.testMethod') }}-->
<!--        </a-col>-->
<!--        <a-col :span="4" align="center" style="border:1px solid #8B0000">-->
<!--          {{ $t('sampleInspectReportM.findingQuestions') }}-->
<!--        </a-col>-->
<!--&lt;!&ndash;        <a-col :span="2" align="center" style="border:1px solid #8B0000">Finding details</a-col>&ndash;&gt;-->
<!--&lt;!&ndash;        <a-col :span="2" align="center" style="border:1px solid #8B0000">Pictures</a-col>&ndash;&gt;-->
<!--        <a-col :span="1" align="center" style="border:1px solid #8B0000">-->
<!--          {{ $t('sampleInspectReportM.minor') }}-->
<!--        </a-col>-->
<!--        <a-col :span="1" align="center" style="border:1px solid #8B0000">-->
<!--          {{ $t('sampleInspectReportM.major') }}-->
<!--        </a-col>-->
<!--        <a-col :span="1" align="center" style="border:1px solid #8B0000">-->
<!--          {{ $t('sampleInspectReportM.critical') }}-->
<!--        </a-col>-->
<!--      </a-row>-->

      <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #A9A9A9">
        {{ $t('sampleInspectReportM.general') }}
      </a-row>

      <a-row>
        <a-table v-if="this.$i18n.locale=='zh-CN'"
          :columns="columns"
          :data-source="reportMain[9]"
          bordered
          :showHeader="false"
          :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[9][index].checkPointsCn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[9][index].testMethodReqsCn }}
          </span>
        </a-table>
        <a-table v-if="this.$i18n.locale=='en-US'"
          :columns="columns"
          :data-source="reportMain[9]"
          bordered
          :showHeader="false"
          :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[9][index].checkPointsEn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[9][index].testMethodReqsEn }}
          </span>
        </a-table>
      </a-row>

      <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #A9A9A9">
        {{ $t('sampleInspectReportM.accessoriesFunctional') }}
      </a-row>

      <a-row>
        <a-table v-if="this.$i18n.locale=='zh-CN'"
                 :columns="columns"
                 :data-source="reportMain[10]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[10][index].checkPointsCn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[10][index].testMethodReqsCn }}
          </span>
        </a-table>
        <a-table v-if="this.$i18n.locale=='en-US'"
                 :columns="columns"
                 :data-source="reportMain[10]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[10][index].checkPointsEn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[10][index].testMethodReqsEn }}
          </span>
        </a-table>
      </a-row>

      <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #A9A9A9">
        {{ $t('sampleInspectReportM.workmanship') }}
      </a-row>

      <a-row>
        <a-table v-if="this.$i18n.locale=='zh-CN'"
                 :columns="columns"
                 :data-source="reportMain[11]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[11][index].checkPointsCn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[11][index].testMethodReqsCn }}
          </span>
        </a-table>
        <a-table v-if="this.$i18n.locale=='en-US'"
                 :columns="columns"
                 :data-source="reportMain[11]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[11][index].checkPointsEn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[11][index].testMethodReqsEn }}
          </span>
        </a-table>
      </a-row>

      <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #A9A9A9">
        {{ $t('sampleInspectReportM.otherSpecificTopic') }}
      </a-row>

      <a-row>
        <a-table v-if="this.$i18n.locale=='zh-CN'"
                 :columns="columns"
                 :data-source="reportMain[12]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[12][index].checkPointsCn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[12][index].testMethodReqsCn }}
          </span>
        </a-table>
        <a-table v-if="this.$i18n.locale=='en-US'"
                 :columns="columns"
                 :data-source="reportMain[12]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[12][index].checkPointsEn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[12][index].testMethodReqsEn }}
          </span>
        </a-table>
      </a-row>

      <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #8B0000; marginTop: 12px">
        <div align="center">
          {{ $t('sampleInspectReportM.funcNonDestructive') }}
        </div>
      </a-row>

      <a-row :style="{marginTop: '6px'}">
        <a-col :span="4">
          {{ $t('sampleInspectReportM.samplingQty') }}
        </a-col>
        <a-col :span="2">{{ reportMain[8].funcQtyAqlTtl.toString() }}</a-col>
        <a-col :span="18"></a-col>
        <!--          <a-col :span="4" align="center" style="border:1px solid #8B0000">Nb of defect found</a-col>-->
      </a-row>

      <sample-inspect-report-m-rpt-title></sample-inspect-report-m-rpt-title>
<!--      <a-row :style="{marginTop: '6px'}">-->
<!--        <a-col :span="4" align="center" style="border:1px solid #8B0000">Check Points</a-col>-->
<!--        <a-col :span="13" align="center" style="border:1px solid #8B0000">Test Method/Requirements</a-col>-->
<!--        <a-col :span="4" align="center" style="border:1px solid #8B0000">Finding Questions</a-col>-->
<!--&lt;!&ndash;        <a-col :span="2" align="center" style="border:1px solid #8B0000">Finding details</a-col>&ndash;&gt;-->
<!--&lt;!&ndash;        <a-col :span="2" align="center" style="border:1px solid #8B0000">Pictures</a-col>&ndash;&gt;-->
<!--        <a-col :span="1" align="center" style="border:1px solid #8B0000">Minor</a-col>-->
<!--        <a-col :span="1" align="center" style="border:1px solid #8B0000">Major</a-col>-->
<!--        <a-col :span="1" align="center" style="border:1px solid #8B0000">Critical</a-col>-->
<!--      </a-row>-->

      <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #A9A9A9">
        {{ $t('sampleInspectReportM.packaging') }}
      </a-row>

      <a-row>
        <a-table v-if="this.$i18n.locale=='zh-CN'"
                 :columns="columns"
                 :data-source="reportMain[13]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[13][index].checkPointsCn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[13][index].testMethodReqsCn }}
          </span>
        </a-table>
        <a-table v-if="this.$i18n.locale=='en-US'"
                 :columns="columns"
                 :data-source="reportMain[13]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[13][index].checkPointsEn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[13][index].testMethodReqsEn }}
          </span>
        </a-table>
      </a-row>

      <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #A9A9A9">
        {{ $t('sampleInspectReportM.general') }}
      </a-row>

      <a-row>
        <a-table v-if="this.$i18n.locale=='zh-CN'"
                 :columns="columns"
                 :data-source="reportMain[14]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[14][index].checkPointsCn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[14][index].testMethodReqsCn }}
          </span>
        </a-table>
        <a-table v-if="this.$i18n.locale=='en-US'"
                 :columns="columns"
                 :data-source="reportMain[14]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[14][index].checkPointsEn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[14][index].testMethodReqsEn }}
          </span>
        </a-table>
      </a-row>

      <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #A9A9A9">
        {{ $t('sampleInspectReportM.accessoriesFunctional') }}
      </a-row>

      <a-row>
        <a-table v-if="this.$i18n.locale=='zh-CN'"
                 :columns="columns"
                 :data-source="reportMain[15]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[15][index].checkPointsCn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[15][index].testMethodReqsCn }}
          </span>
        </a-table>
        <a-table v-if="this.$i18n.locale=='en-US'"
                 :columns="columns"
                 :data-source="reportMain[15]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[15][index].checkPointsEn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[15][index].testMethodReqsEn }}
          </span>
        </a-table>
      </a-row>

      <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #A9A9A9">
        {{ $t('sampleInspectReportM.otherSpecificTopic') }}
      </a-row>

      <a-row>
        <a-table v-if="this.$i18n.locale=='zh-CN'"
                 :columns="columns"
                 :data-source="reportMain[16]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[16][index].checkPointsCn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[16][index].testMethodReqsCn }}
          </span>
        </a-table>
        <a-table v-if="this.$i18n.locale=='en-US'"
                 :columns="columns"
                 :data-source="reportMain[16]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[16][index].checkPointsEn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[16][index].testMethodReqsEn }}
          </span>
        </a-table>
      </a-row>

      <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #8B0000; marginTop: 12px">
        <div align="center">
          {{ $t('sampleInspectReportM.funcDestructive') }}
        </div>
      </a-row>

      <a-row :style="{ marginTop: '6px'}">
        <a-col :span="4">
          {{ $t('sampleInspectReportM.samplingQty') }}
        </a-col>
        <a-col :span="2">{{ reportMain[8].strQtyAql.toString() }}</a-col>
        <a-col :span="18"></a-col>
        <!--          <a-col :span="4" align="center" style="border:1px solid #8B0000">Nb of defect found</a-col>-->
      </a-row>

      <sample-inspect-report-m-rpt-title></sample-inspect-report-m-rpt-title>
<!--      <a-row :style="{marginTop: '6px'}">-->
<!--        <a-col :span="4" align="center" style="border:1px solid #8B0000">Check Points</a-col>-->
<!--        <a-col :span="13" align="center" style="border:1px solid #8B0000">Test Method/Requirements</a-col>-->
<!--        <a-col :span="4" align="center" style="border:1px solid #8B0000">Finding Questions</a-col>-->
<!--&lt;!&ndash;        <a-col :span="2" align="center" style="border:1px solid #8B0000">Finding details</a-col>&ndash;&gt;-->
<!--&lt;!&ndash;        <a-col :span="2" align="center" style="border:1px solid #8B0000">Pictures</a-col>&ndash;&gt;-->
<!--        <a-col :span="1" align="center" style="border:1px solid #8B0000">Minor</a-col>-->
<!--        <a-col :span="1" align="center" style="border:1px solid #8B0000">Major</a-col>-->
<!--        <a-col :span="1" align="center" style="border:1px solid #8B0000">Critical</a-col>-->
<!--      </a-row>-->

      <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #A9A9A9">
        {{ $t('sampleInspectReportM.general') }}
      </a-row>

      <a-row>
        <a-table v-if="this.$i18n.locale=='zh-CN'"
                 :columns="columns"
                 :data-source="reportMain[17]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[17][index].checkPointsCn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[17][index].testMethodReqsCn }}
          </span>
        </a-table>
        <a-table v-if="this.$i18n.locale=='en-US'"
                 :columns="columns"
                 :data-source="reportMain[17]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[17][index].checkPointsEn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[17][index].testMethodReqsEn }}
          </span>
        </a-table>
      </a-row>

      <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #A9A9A9">
        {{ $t('sampleInspectReportM.accessoriesFunctional') }}
      </a-row>

      <a-row>
        <a-table v-if="this.$i18n.locale=='zh-CN'"
                 :columns="columns"
                 :data-source="reportMain[18]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[18][index].checkPointsCn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[18][index].testMethodReqsCn }}
          </span>
        </a-table>
        <a-table v-if="this.$i18n.locale=='en-US'"
                 :columns="columns"
                 :data-source="reportMain[18]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[18][index].checkPointsEn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[18][index].testMethodReqsEn }}
          </span>
        </a-table>
      </a-row>

      <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #A9A9A9">
        {{ $t('sampleInspectReportM.workmanship') }}
      </a-row>

      <a-row>
        <a-table v-if="this.$i18n.locale=='zh-CN'"
                 :columns="columns"
                 :data-source="reportMain[19]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[19][index].checkPointsCn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[19][index].testMethodReqsCn }}
          </span>
        </a-table>
        <a-table v-if="this.$i18n.locale=='en-US'"
                 :columns="columns"
                 :data-source="reportMain[19]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[19][index].checkPointsEn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[19][index].testMethodReqsEn }}
          </span>
        </a-table>
      </a-row>

      <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #A9A9A9">
        {{ $t('sampleInspectReportM.laboratoryTest') }}
      </a-row>

      <a-row>
        <a-table v-if="this.$i18n.locale=='zh-CN'"
                 :columns="columns"
                 :data-source="reportMain[20]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[20][index].checkPointsCn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[20][index].testMethodReqsCn }}
          </span>
        </a-table>
        <a-table v-if="this.$i18n.locale=='en-US'"
                 :columns="columns"
                 :data-source="reportMain[20]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[20][index].checkPointsEn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[20][index].testMethodReqsEn }}
          </span>
        </a-table>
      </a-row>

      <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #A9A9A9">
        {{ $t('sampleInspectReportM.otherSpecificTopic') }}
      </a-row>

      <a-row>
        <a-table v-if="this.$i18n.locale=='zh-CN'"
                 :columns="columns"
                 :data-source="reportMain[21]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[21][index].checkPointsCn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[21][index].testMethodReqsCn }}
          </span>
        </a-table>
        <a-table v-if="this.$i18n.locale=='en-US'"
                 :columns="columns"
                 :data-source="reportMain[21]"
                 bordered
                 :showHeader="false"
                 :pagination="false">
          <span slot="actionCheckPoints" slot-scope="text, record, index">
            {{ reportMain[21][index].checkPointsEn }}
          </span>
          <span slot="actionTestMethodReqs" slot-scope="text, record, index">
            {{ reportMain[21][index].testMethodReqsEn }}
          </span>
        </a-table>
      </a-row>


      <a-row :style="{marginTop: '12px'}">
        <a-col :span="15" style="border:1px solid #8B0000">
          <a-row>
            Commentaires / Others :
          </a-row>
          <a-row style="color:#FFFFFF ; background-color:#FFFFFF">
            <pre><h4></h4></pre>
            <pre><h4></h4></pre>
            <pre><h4></h4></pre>
            <pre><h4></h4></pre>
            <pre><h4></h4></pre>
            <pre><h4></h4></pre>
            <pre><h4></h4></pre>
            <pre><h4></h4></pre>
            <pre><h4></h4></pre>
            <pre><h4></h4></pre>
            <pre><h4></h4></pre>
          </a-row>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col :span="8">
          <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #8B0000">
            <div align="center">
              {{ $t('sampleInspectReportM.visualManual') }}
            </div>
          </a-row>
          <a-row>
            <a-table
              :columns="defectColumns"
              :data-source="reportMain[51]"
              bordered
              rowKey="actionType"
              :showHeader="false"
              :pagination="false">
              <span slot="actionType" slot-scope="text, record, index">
                {{ index == 0 ? totalDefectFound : maxDefectAccept}}
              </span>
            </a-table>
          </a-row>

          <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #8B0000; marginTop: 12px">
            <div align="center">
              {{ $t('sampleInspectReportM.funcNonDestructive') }}
            </div>
          </a-row>
          <a-row>
            <a-table
              :columns="defectColumns"
              :data-source="reportMain[52]"
              bordered
              rowKey="actionType"
              :showHeader="false"
              :pagination="false">
              <span slot="actionType" slot-scope="text, record, index">
                {{ index == 0 ? totalDefectFound : maxDefectAccept}}
              </span>
            </a-table>
          </a-row>

        </a-col>
      </a-row>

      <a-row>
        <a-col :span="6" style="border:1px solid #8B0000; marginTop: 12px">
          <h4 align="center">
            <a-row>SUPPLIER</a-row>
          </h4>
          <a-row>
            <a-col :span="6">NAME :</a-col>
            <a-col :span="10"></a-col>
            <a-col :span="8">SIGNATURE :</a-col>
          </a-row>
          <a-row style="color:#FFFFFF ; background-color:#FFFFFF">
            <pre><h4></h4></pre>
          </a-row>
          <a-row>
            <a-col>DATE :</a-col>
            <a-col></a-col>
            <a-col></a-col>
          </a-row>
          <a-row style="color:#FFFFFF ; background-color:#FFFFFF">
            <pre><h4></h4></pre>
          </a-row>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col :span="8" style="border:1px solid #8B0000; marginTop: 12px">
          <h4 align="center">
            <a-row>OXYLANE</a-row>
          </h4>
          <a-row>
            <a-col :span="8">NAME :</a-col>
            <a-col :span="8"></a-col>
            <a-col :span="8">SIGNATURE :</a-col>
          </a-row>
          <a-row style="color:#FFFFFF ; background-color:#FFFFFF">
            <pre><h4></h4></pre>
          </a-row>
          <a-row>
            <a-col>DATE :</a-col>
            <a-col></a-col>
            <a-col></a-col>
          </a-row>
          <a-row style="color:#FFFFFF ; background-color:#FFFFFF">
            <pre><h4></h4></pre>
          </a-row>
<!--          <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #8B0000; marginTop: 12px">-->
<!--            <div align="center">-->
<!--              Fonctionnal Non Destructive-->
<!--            </div>-->
<!--          </a-row>-->
<!--          <a-row>-->
<!--            <a-table-->
<!--              :columns="defectColumns"-->
<!--              :data-source="reportMain[21]"-->
<!--              bordered-->
<!--              :showHeader="false"-->
<!--              :pagination="false">-->
<!--            </a-table>-->
<!--          </a-row>-->
        </a-col>
        <a-col :span="1"></a-col>
        <a-col :span="8">
          <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #8B0000; marginTop: 12px">
            <div align="center">
              {{ $t('sampleInspectReportM.funcDestructive') }}
            </div>
          </a-row>
          <a-row>
            <a-table
              :columns="defectColumns"
              :data-source="reportMain[53]"
              bordered
              rowKey="actionType"
              :showHeader="false"
              :pagination="false">
              <span slot="actionType" slot-scope="text, record, index">
                {{ index == 0 ? totalDefectFound : maxDefectAccept}}
              </span>
            </a-table>
          </a-row>
        </a-col>
      </a-row>

<!--      <a-row>-->
<!--        <a-col :span="11" style="border:1px solid #8B0000; marginTop: 12px">-->
<!--          <h4 align="center">-->
<!--            <a-row>OXYLANE</a-row>-->
<!--          </h4>-->
<!--          <a-row>-->
<!--            <a-col :span="8">NAME :</a-col>-->
<!--            <a-col :span="8"></a-col>-->
<!--            <a-col :span="8">SIGNATURE :</a-col>-->
<!--          </a-row>-->
<!--          <a-row style="color:#FFFFFF ; background-color:#FFFFFF">-->
<!--            <pre><h4></h4></pre>-->
<!--          </a-row>-->
<!--          <a-row>-->
<!--            <a-col>DATE :</a-col>-->
<!--            <a-col></a-col>-->
<!--            <a-col></a-col>-->
<!--          </a-row>-->
<!--          <a-row style="color:#FFFFFF ; background-color:#FFFFFF">-->
<!--            <pre><h4></h4></pre>-->
<!--          </a-row>-->
<!--        </a-col>-->
<!--        <a-col :span="1"></a-col>-->
<!--        <a-col :span="12">-->
<!--          <a-row style="border:1px solid #8B0000; color: #FFFFFF; background-color: #8B0000; marginTop: 12px">-->
<!--            <div align="center">-->
<!--              Fonctionnal Destructive-->
<!--            </div>-->
<!--          </a-row>-->
<!--          <a-row>-->
<!--            <a-table-->
<!--              :columns="defectColumns"-->
<!--              :data-source="reportMain[22]"-->
<!--              bordered-->
<!--              :showHeader="false"-->
<!--              :pagination="false">-->
<!--            </a-table>-->
<!--          </a-row>-->
<!--        </a-col>-->
<!--      </a-row>-->

    </section>

  </a-modal>
</template>

<script>
  import HeadInfo from '@/components/tools/HeadInfo.vue'
  import BarMultid from '../../../components/chart/BarMultid'
  import SampleInspectReportMRptTitle from './SampleInspectReportMRptTitle'

  const columns = [
    {
      title: 'Check Points',
      dataIndex: 'actionCheckPoints',
      width: 200,
      fixed: true,
      scopedSlots: { customRender: 'actionCheckPoints' },
    },
    {
      title: 'Test Method/Requirements',
      dataIndex: 'actionTestMethodReqs',
      width: 650,
      fixed: true,
      scopedSlots: { customRender: 'actionTestMethodReqs' },
    },
    // {
    //   title: 'Check Points',
    //   dataIndex: 'checkPointsEn',
    //   width: 200,
    //   fixed: true
    // },
    // {
    //   title: 'Test Method/Requirements',
    //   dataIndex: 'testMethodReqsEn',
    //   width: 650,
    //   fixed: true
    // },
    {
      title: 'Finding Questions',
      dataIndex: 'findQuestion',
      align: 'center',
      width: 200,
      fixed: true
    },
    // {
    //   title: 'Finding details',
    //   dataIndex: 'findingDetails',
    //   width: 100,
    //   fixed: true
    // },
    // {
    //   title: 'Pictures',
    //   dataIndex: 'pictures',
    //   width: 100,
    //   fixed: true
    // },
    {
      title: 'Minor',
      dataIndex: 'minor',
      align: 'center',
      width: 50,
      fixed: true
    },
    {
      title: 'Major',
      dataIndex: 'major',
      align: 'center',
      width: 50,
      fixed: true
    },
    {
      title: 'Critical',
      dataIndex: 'critical',
      align: 'center',
      width: 50,
      fixed: true
    }
    // {
    //   title: '次要',
    //   dataIndex: 'action1',
    //   align: 'center',
    //   scopedSlots: { customRender: 'action1' },
    // },
    // {
    //   title: '主要',
    //   dataIndex: 'action2',
    //   align: 'center',
    //   scopedSlots: { customRender: 'action2' },
    // },
    // {
    //   title: '重要',
    //   dataIndex: 'action3',
    //   align: 'center',
    //   scopedSlots: { customRender: 'action3' },
    // },
  ]

  const defectColumns = [
    {
      title: 'Type',
      dataIndex: 'actionType',
      scopedSlots: { customRender: 'actionType' },
    },
    {
      title: 'Minor',
      dataIndex: 'minor',
      align: 'center'
    },
    {
      title: 'Major',
      dataIndex: 'major',
      align: 'center'
    },
    {
      title: 'Critical',
      dataIndex: 'critical',
      align: 'center'
    }
    // {
    //   title: '次要',
    //   dataIndex: 'actionA',
    //   align: 'center',
    //   scopedSlots: { customRender: 'actionA' },
    // },
    // {
    //   title: '主要',
    //   dataIndex: 'actionB',
    //   align: 'center',
    //   scopedSlots: { customRender: 'actionB' },
    // },
    // {
    //   title: '重要',
    //   dataIndex: 'actionC',
    //   align: 'center',
    //   scopedSlots: { customRender: 'actionC' },
    // },
  ]

  export default {
    name: 'WholeProcessReportModal',
    props: ['reportMain'],
    components: {
      SampleInspectReportMRptTitle,
      BarMultid,
      HeadInfo
    },
    data() {
      return {
        columns,
        defectColumns,
        visible: false,
        loading: true,
        confirmLoading: false,
        totalDefectFound: this.$t('sampleInspectReportM.totalDefectFound'),
        maxDefectAccept: this.$t('sampleInspectReportM.maxDefectAccept'),
      }
    },

    created() {
    },

    computed: {

      tableProps() {
        let _this = this
        return {
          // 列表项是否可选择
          // https://vue.ant.design/components/table-cn/#rowSelection
          rowSelection: {
            selectedRowKeys: _this.selectedRowKeys,
            onChange: (selectedRowKeys) => _this.selectedRowKeys = selectedRowKeys
          }
        }
      }
    },

    methods: {

      edit(record) {
        this.visible = true
      },

      close() {
        this.$emit('close')
        this.visible = false
      },

      handleCancel() {
        this.close()
      }

    }
  }
</script>

<style scoped>

</style>