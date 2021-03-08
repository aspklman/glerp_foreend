<template>
  <a-modal
    :title="$t('common.edit')"
    footer=""
    :width="800"
    :visible="visible"
    @cancel="handleCancel">

    <a-card :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-row>
          <a-col :span="24">
            <a-row>
              <a-col :span="24">
                <head-info :title="$t('stylem.styleNo')" :content="reportMain[100]"></head-info>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
    </a-card>

    <a-card :bordered="false" :body-style="{padding: '0'}" :style="{ marginTop: '18px' }">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <a-tab-pane :tab="$t('sampleInspectReportM.visualManual')" key="1">
            <a-row>
              <a-card :title="$t('sampleInspectReportM.general')" type="inner">
                <pre>
                  <a-table
                    rowKey="checkPointsNo"
                    :columns="this.$i18n.locale=='zh-CN'?columns:this.$i18n.locale=='en-US'?columnsEn:columns"
                    :data-source="reportMain[9]"
                    bordered
                    :pagination="false">
                    <a-switch :checked="record.styleMark==1"
                              slot="styleMarkAction"
                              @change="handleCheckPoint(record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, $event, 9, index)"
                              slot-scope="text, record, index">
                    </a-switch>
                  </a-table>
                </pre>
              </a-card>
            </a-row>

            <a-row :style="{ marginTop: '12px' }">
              <a-card :title="$t('sampleInspectReportM.accessoriesFunctional')" type="inner">
                <pre>
                  <a-table
                    rowKey="checkPointsNo"
                    :columns="this.$i18n.locale=='zh-CN'?columns:this.$i18n.locale=='en-US'?columnsEn:columns"
                    :data-source="reportMain[10]"
                    bordered
                    :pagination="false">
                    <a-switch :checked="record.styleMark==1"
                              slot="styleMarkAction"
                              @change="handleCheckPoint(record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, $event, 10, index)"
                              slot-scope="text, record, index" />
                  </a-table>
                </pre>
              </a-card>
            </a-row>

            <a-row :style="{ marginTop: '12px' }">
              <a-card :title="$t('sampleInspectReportM.workmanship')" type="inner">
                <pre>
                  <a-table
                    rowKey="checkPointsNo"
                    :columns="this.$i18n.locale=='zh-CN'?columns:this.$i18n.locale=='en-US'?columnsEn:columns"
                    :data-source="reportMain[11]"
                    bordered
                    :pagination="false">
                    <a-switch :checked="record.styleMark==1"
                              slot="styleMarkAction"
                              @change="handleCheckPoint(record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, $event, 11, index)"
                              slot-scope="text, record, index" />
                  </a-table>
                </pre>
              </a-card>
            </a-row>

            <a-row :style="{ marginTop: '12px' }">
              <a-card :title="$t('sampleInspectReportM.otherSpecificTopic')" type="inner">
                <pre>
                  <a-table
                    rowKey="checkPointsNo"
                    :columns="this.$i18n.locale=='zh-CN'?columns:this.$i18n.locale=='en-US'?columnsEn:columns"
                    :data-source="reportMain[12]"
                    bordered
                    :pagination="false">
                    <a-switch :checked="record.styleMark==1"
                              slot="styleMarkAction"
                              @change="handleCheckPoint(record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, $event, 12, index)"
                              slot-scope="text, record, index" />
                  </a-table>
                </pre>
              </a-card>
            </a-row>

          </a-tab-pane>

          <a-tab-pane :tab="$t('sampleInspectReportM.funcNonDestructive')" key="2">
            <a-row>
              <a-card :title="$t('sampleInspectReportM.packaging')" type="inner">
                <pre>
                  <a-table
                    rowKey="checkPointsNo"
                    :columns="this.$i18n.locale=='zh-CN'?columns:this.$i18n.locale=='en-US'?columnsEn:columns"
                    :data-source="reportMain[13]"
                    bordered
                    :pagination="false">
                    <a-switch :checked="record.styleMark==1"
                              slot="styleMarkAction"
                              @change="handleCheckPoint(record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, $event, 13, index)"
                              slot-scope="text, record, index" />
                  </a-table>
                </pre>
              </a-card>
            </a-row>

            <a-row :style="{ marginTop: '12px' }">
              <a-card :title="$t('sampleInspectReportM.general')" type="inner">
                <pre>
                  <a-table
                    rowKey="checkPointsNo"
                    :columns="this.$i18n.locale=='zh-CN'?columns:this.$i18n.locale=='en-US'?columnsEn:columns"
                    :data-source="reportMain[14]"
                    bordered
                    :pagination="false">
                    <a-switch :checked="record.styleMark==1"
                              slot="styleMarkAction"
                              @change="handleCheckPoint(record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, $event, 14, index)"
                              slot-scope="text, record, index" />
                  </a-table>
                </pre>
              </a-card>
            </a-row>

            <a-row :style="{ marginTop: '12px' }">
              <a-card :title="$t('sampleInspectReportM.accessoriesFunctional')" type="inner">
                <pre>
                  <a-table
                    rowKey="checkPointsNo"
                    :columns="this.$i18n.locale=='zh-CN'?columns:this.$i18n.locale=='en-US'?columnsEn:columns"
                    :data-source="reportMain[15]"
                    bordered
                    :pagination="false">
                    <a-switch :checked="record.styleMark==1"
                              slot="styleMarkAction"
                              @change="handleCheckPoint(record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, $event, 15, index)"
                              slot-scope="text, record, index" />
                  </a-table>
                </pre>
              </a-card>
            </a-row>

            <a-row :style="{ marginTop: '12px' }">
              <a-card :title="$t('sampleInspectReportM.otherSpecificTopic')" type="inner">
                <pre>
                  <a-table
                    rowKey="checkPointsNo"
                    :columns="this.$i18n.locale=='zh-CN'?columns:this.$i18n.locale=='en-US'?columnsEn:columns"
                    :data-source="reportMain[16]"
                    bordered
                    :pagination="false">
                    <a-switch :checked="record.styleMark==1"
                              slot="styleMarkAction"
                              @change="handleCheckPoint(record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, $event, 16, index)"
                              slot-scope="text, record, index" />
                  </a-table>
                </pre>
              </a-card>
            </a-row>

          </a-tab-pane>

          <a-tab-pane :tab="$t('sampleInspectReportM.funcDestructive')" key="3">
            <a-row>
              <a-card :title="$t('sampleInspectReportM.general')" type="inner">
                <pre>
                  <a-table
                    rowKey="checkPointsNo"
                    :columns="this.$i18n.locale=='zh-CN'?columns:this.$i18n.locale=='en-US'?columnsEn:columns"
                    :data-source="reportMain[17]"
                    bordered
                    :pagination="false">
                    <a-switch :checked="record.styleMark==1"
                              slot="styleMarkAction"
                              @change="handleCheckPoint(record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, $event, 17, index)"
                              slot-scope="text, record, index" />
                  </a-table>
                </pre>
              </a-card>
            </a-row>

            <a-row :style="{ marginTop: '12px' }">
              <a-card :title="$t('sampleInspectReportM.accessoriesFunctional')" type="inner">
                <pre>
                  <a-table
                    rowKey="checkPointsNo"
                    :columns="this.$i18n.locale=='zh-CN'?columns:this.$i18n.locale=='en-US'?columnsEn:columns"
                    :data-source="reportMain[18]"
                    bordered
                    :pagination="false">
                    <a-switch :checked="record.styleMark==1"
                              slot="styleMarkAction"
                              @change="handleCheckPoint(record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, $event, 18, index)"
                              slot-scope="text, record, index" />
                  </a-table>
                </pre>
              </a-card>
            </a-row>

            <a-row :style="{ marginTop: '12px' }">
              <a-card :title="$t('sampleInspectReportM.workmanship')" type="inner">
                <pre>
                  <a-table
                    rowKey="checkPointsNo"
                    :columns="this.$i18n.locale=='zh-CN'?columns:this.$i18n.locale=='en-US'?columnsEn:columns"
                    :data-source="reportMain[19]"
                    bordered
                    :pagination="false">
                    <a-switch :checked="record.styleMark==1"
                              slot="styleMarkAction"
                              @change="handleCheckPoint(record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, $event, 19, index)"
                              slot-scope="text, record, index" />
                  </a-table>
                </pre>
              </a-card>
            </a-row>

            <a-row :style="{ marginTop: '12px' }">
              <a-card :title="$t('sampleInspectReportM.laboratoryTest')" type="inner">
                <pre>
                  <a-table
                    rowKey="checkPointsNo"
                    :columns="this.$i18n.locale=='zh-CN'?columns:this.$i18n.locale=='en-US'?columnsEn:columns"
                    :data-source="reportMain[20]"
                    bordered
                    :pagination="false">
                    <a-switch :checked="record.styleMark==1"
                              slot="styleMarkAction"
                              @change="handleCheckPoint(record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, $event, 20, index)"
                              slot-scope="text, record, index" />
                  </a-table>
                </pre>
              </a-card>
            </a-row>

            <a-row :style="{ marginTop: '12px' }">
              <a-card :title="$t('sampleInspectReportM.otherSpecificTopic')" type="inner">
                <pre>
                  <a-table
                    rowKey="checkPointsNo"
                    :columns="this.$i18n.locale=='zh-CN'?columns:this.$i18n.locale=='en-US'?columnsEn:columns"
                    :data-source="reportMain[21]"
                    bordered
                    :pagination="false">
                    <a-switch :checked="record.styleMark==1"
                              slot="styleMarkAction"
                              @change="handleCheckPoint(record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, $event, 21, index)"
                              slot-scope="text, record, index" />
                  </a-table>
                </pre>
              </a-card>
            </a-row>

          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

    <a-row :style="{ marginTop: '24px' }"/>

  </a-modal>
</template>

<script>
  import HeadInfo from '@/components/tools/HeadInfo.vue'
  import BarMultid from '../../../components/chart/BarMultid'
  import { getAction } from '@/api/manage'

  const columns = [
    {
      title: '选择',
      dataIndex: 'styleMark',
      align: 'center',
      scopedSlots: { customRender: 'styleMarkAction' }
    },
    {
      title: '检查点',
      dataIndex: 'checkPointsCn',
      align: 'center'
    },
    {
      title: '测试方法/要求',
      dataIndex: 'testMethodReqsCn'
    }
  ]

  const columnsEn = [
    {
      title: 'Select',
      dataIndex: 'styleMark',
      align: 'center',
      scopedSlots: { customRender: 'styleMarkAction' }
    },
    {
      title: 'Check Points',
      dataIndex: 'checkPointsEn',
      align: 'center'
    },
    {
      title: 'Test Method/Requirements',
      dataIndex: 'testMethodReqsEn'
    }
  ]

  export default {
    name: 'SampleInspectStyleModal',
    props: ['reportMain'],
    components: {
      BarMultid,
      HeadInfo
    },
    data() {
      return {
        columns,
        columnsEn,
        selectedRowKeys: [],
        visible: false,
        loading: true,
        confirmLoading: false,
        url: {
          addTraceabilityCode: 'quality/sampleInspectStyle/addTraceabilityCode',
          subtractTraceabilityCode: 'quality/sampleInspectStyle/subtractTraceabilityCode',
          addCheckPoint: 'quality/sampleInspectStyle/addCheckPoint',
          subtractCheckPoint: 'quality/sampleInspectStyle/subtractCheckPoint',
          updateInspectorDecision: 'quality/sampleInspectStyle/updateInspectorDecision',
          addQuestion: 'quality/sampleInspectStyle/addQuestion',
          subtractQuestion: 'quality/sampleInspectStyle/subtractQuestion'
        }
      }
    },

    created() {
    },

    methods: {

      // 处理（增加、删除）检查点
      handleCheckPoint(itemMainNo, itemMediumNo, checkPointsNo, checkPointsCn, checked, items, index) {
        let pp = new Array(4)
        pp[0] = this.reportMain[100]
        pp[1] = itemMainNo
        pp[2] = itemMediumNo
        pp[3] = checkPointsNo
        let pssr = pp.toString()
        let checkedStatus = ''
        let url = ''
        if (checked) {
          this.reportMain[items][index].styleMark = 1
          checkedStatus = '已选择：'
          url = this.url.addCheckPoint
          this.$message.success(`${checkedStatus}${checkPointsCn}`)
        } else {
          this.reportMain[items][index].styleMark = 0
          checkedStatus = '已取消：'
          url = this.url.subtractCheckPoint
          this.$message.warn(`${checkedStatus}${checkPointsCn}`)
        }
        console.log(`${this.reportMain[100]}|${itemMainNo}|${itemMediumNo}|${checkPointsNo}`)
        getAction(url, { pssr: pssr }).then((res) => {
          if (res.success) {

          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
        this.$forceUpdate()
      },

      handleQuestion(e) {
        this.findQuestion = e.target.value
      },

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