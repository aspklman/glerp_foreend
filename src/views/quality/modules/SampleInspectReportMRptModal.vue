<template>
  <a-modal
    title="报告"
    footer=""
    :width="1200"
    :visible="visible"
    @cancel="handleCancel">

    <a-card :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <a-tab-pane tab="订单信息" key="1">
            <a-row>
              <a-col :span="24">
                <a-row>
                  <a-col :span="5">
                    <head-info title="客户订单" :content="reportMain[0]"></head-info>
                  </a-col>
                  <a-col :span="5">
                    <head-info title="型体编号" :content="reportMain[1]"></head-info>
                  </a-col>
                  <a-col :span="5">
                    <head-info title="验货日期" :content="reportMain[2]"></head-info>
                  </a-col>
                  <a-col :span="5">
                    <head-info title="验货次数" :content="reportMain[3].toString()"></head-info>
                  </a-col>
                  <a-col :span="4">
                    <head-info
                      class="decision"
                      title="验货结果">
                    </head-info>
                    <div align="center">
                      <img v-if="reportMain[57]=='0'" src="@/assets/accepted.png">
                      <img v-else-if="reportMain[57]=='1'" src="@/assets/rejected.png">
                      <img v-else src="">
                    </div>
                    <h2 :style="{ textAlign: 'center', color: reportMain[57]=='0'?'green':reportMain[57]=='1'?'red':'white' }">{{reportMain[57]=='0'?'接受':reportMain[57]=='1'?'拒绝':''}}</h2>
                  </a-col>
                </a-row>
                <a-row :style="{ marginTop: '24px' }">
                  <a-col :span="5">
                    <head-info title="订单数量" :content="reportMain[4].toString()"></head-info>
                  </a-col>
                  <a-col :span="5">
                    <head-info title="Pace编码" :content="reportMain[5]"></head-info>
                  </a-col>
                  <a-col :span="5">
                    <head-info title="模具名称和颜色" :content="reportMain[6]"></head-info>
                  </a-col>
                  <a-col :span="5">
                    <head-info title="订单类型" :content="reportMain[7]=='1'?'Mass Production':reportMain[7]=='2'?'Implantation order':''"></head-info>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

    <a-card :bordered="false" :body-style="{padding: '0'}" :style="{ marginTop: '18px' }">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <a-tab-pane tab="目视化/指南" key="1">
            <a-row>
              <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                <head-info title="取样数量" :content="reportMain[8].sampleQtyAqlTtl.toString()"></head-info>
              </a-col>
              <a-col :xl="9" :lg="12" :md="12" :sm="24" :xs="24">

              </a-col>
              <a-col :xl="9" :lg="12" :md="12" :sm="24" :xs="24">
                <pre>
                  <a-table
                    :columns="defectColumns"
                    :data-source="reportMain[20]"
                    bordered
                    :pagination="false">
                </a-table>
                </pre>
              </a-col>
            </a-row>

            <a-row>
              <a-card title="通用" type="inner">
                <pre>
                  <a-table
                    :columns="columns"
                    :data-source="reportMain[9]"
                    bordered
                    :pagination="false">
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[9][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 9)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 9)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[9][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 9)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 9)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[9][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 9)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 9)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                  </a-table>
                </pre>
              </a-card>
            </a-row>

            <a-row :style="{ marginTop: '12px' }">
              <a-card title="附件功能符合性" type="inner">
                <pre>
                  <a-table
                    :columns="columns"
                    :data-source="reportMain[10]"
                    bordered
                    :pagination="false">
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[10][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 10)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 10)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[10][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 10)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 10)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[10][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 10)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 10)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                  </a-table>
                </pre>
              </a-card>
            </a-row>

            <a-row :style="{ marginTop: '12px' }">
              <a-card title="工艺" type="inner">
                <pre>
                  <a-table
                    :columns="columns"
                    :data-source="reportMain[11]"
                    bordered
                    :pagination="false">
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[11][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 11)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 11)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[11][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 11)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 11)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[11][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 11)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 11)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                  </a-table>
                </pre>
              </a-card>
            </a-row>

            <a-row :style="{ marginTop: '12px' }">
              <a-card title="另外特殊的主题（针对PL和PE）" type="inner">
                <pre>
                  <a-table
                    :columns="columns"
                    :data-source="reportMain[12]"
                    bordered
                    :pagination="false">
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[12][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 12)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 12)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[12][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 12)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 12)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[12][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 12)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 12)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                  </a-table>
                </pre>
              </a-card>
            </a-row>

          </a-tab-pane>

          <a-tab-pane tab="无功能性破坏" key="2">
            <a-row>
              <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                <head-info title="取样数量" :content="reportMain[8].funcQtyAqlTtl.toString()"></head-info>
              </a-col>
              <a-col :xl="9" :lg="12" :md="12" :sm="24" :xs="24">

              </a-col>
              <a-col :xl="9" :lg="12" :md="12" :sm="24" :xs="24">
                <pre>
                  <a-table
                    :columns="defectColumns"
                    :data-source="reportMain[21]"
                    bordered
                    :pagination="false">
                </a-table>
                </pre>
              </a-col>
            </a-row>

            <a-row>
              <a-card title="包装" type="inner">
                <pre>
                  <a-table
                    :columns="columns"
                    :data-source="reportMain[13]"
                    bordered
                    :pagination="false">
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[13][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 13)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 13)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[13][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 13)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 13)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[13][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 13)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 13)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                  </a-table>
                </pre>
              </a-card>
            </a-row>

            <a-row :style="{ marginTop: '12px' }">
              <a-card title="通用" type="inner">
                <pre>
                  <a-table
                    :columns="columns"
                    :data-source="reportMain[14]"
                    bordered
                    :pagination="false">
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[14][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 14)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 14)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[14][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 14)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 14)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[14][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 14)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 14)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                  </a-table>
                </pre>
              </a-card>
            </a-row>

            <a-row :style="{ marginTop: '12px' }">
              <a-card title="附件功能符合性" type="inner">
                <pre>
                  <a-table
                    :columns="columns"
                    :data-source="reportMain[15]"
                    bordered
                    :pagination="false">
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[15][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 15)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 15)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[15][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 15)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 15)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[15][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 15)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 15)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                  </a-table>
                </pre>
              </a-card>
            </a-row>

          </a-tab-pane>

          <a-tab-pane tab="功能性破坏" key="3">
            <a-row>
              <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                <head-info title="取样数量" :content="reportMain[8].strQtyAql.toString()"></head-info>
              </a-col>
              <a-col :xl="9" :lg="12" :md="12" :sm="24" :xs="24">

              </a-col>
              <a-col :xl="9" :lg="12" :md="12" :sm="24" :xs="24">
                <pre>
                  <a-table
                    :columns="defectColumns"
                    :data-source="reportMain[22]"
                    bordered
                    :pagination="false">
                </a-table>
                </pre>
              </a-col>
            </a-row>

            <a-row>
              <a-card title="通用" type="inner">
                <pre>
                  <a-table
                    :columns="columns"
                    :data-source="reportMain[16]"
                    bordered
                    :pagination="false">
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[16][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 16)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 16)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[16][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 16)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 16)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[16][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 16)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 16)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                  </a-table>
                </pre>
              </a-card>
            </a-row>

            <a-row :style="{ marginTop: '12px' }">
              <a-card title="附件功能符合性" type="inner">
                <pre>
                  <a-table
                    :columns="columns"
                    :data-source="reportMain[17]"
                    bordered
                    :pagination="false">
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[17][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 17)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 17)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[17][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 17)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 17)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[17][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 17)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 17)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                  </a-table>
                </pre>
              </a-card>
            </a-row>

            <a-row :style="{ marginTop: '12px' }">
              <a-card title="实验室测试" type="inner">
                <pre>
                  <a-table
                    :columns="columns"
                    :data-source="reportMain[18]"
                    bordered
                    :pagination="false">
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[18][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 18)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 18)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[18][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 18)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 18)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[18][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 18)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 18)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                  </a-table>
                </pre>
              </a-card>
            </a-row>

            <a-row :style="{ marginTop: '12px' }">
              <a-card title="另外特殊的主题（针对PL和PE）" type="inner">
                <pre>
                  <a-table
                    :columns="columns"
                    :data-source="reportMain[19]"
                    bordered
                    :pagination="false">
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[19][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 19)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 19)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[19][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 19)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 19)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[19][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 19)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 19)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
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
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  // import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import HeadInfo from '@/components/tools/HeadInfo.vue'
  import BarMultid from '../../../components/chart/BarMultid'
  import { getAction } from '@/api/manage'
  // import JTreeTable from '@/components/jeecg/JTreeTable'

  const columns = [
      {
        title: '检查点',
        dataIndex: 'checkPointsCn',
        // width: 100,
        // fixed: true,
      },
      {
        title: '测试方法/要求',
        dataIndex: 'testMethodReqsCn',
        // width: 350,
        // fixed: true,
        // customRender:function (t,r,index) {
        //   return t.replace(/\n/g,'<br>');
        // }
      },
      // {
      //   title: '次要',
      //   dataIndex: 'minor',
      //   align: 'center',
      //   // width: 250,
      //   // fixed: true,
      // },
      // {
      //   title: '主要',
      //   dataIndex: 'major',
      //   align: 'center',
      //   // width: 250,
      //   // fixed: true,
      // },
      // {
      //   title: '重要',
      //   dataIndex: 'critical',
      //   align: 'center',
      //   // width: 250,
      //   // fixed: true,
      // },
      {
        title: '次要',
        dataIndex: 'action1',
        align: 'center',
        scopedSlots: { customRender: 'action1' },
      },
      {
        title: '主要',
        dataIndex: 'action2',
        align: 'center',
        scopedSlots: { customRender: 'action2' },
      },
      {
        title: '重要',
        dataIndex: 'action3',
        align: 'center',
        scopedSlots: { customRender: 'action3' },
      },
    ]

  const defectColumns = [
    {
      title: '项目',
      dataIndex: 'type',
    },
    {
      title: '次要',
      dataIndex: 'minor',
      align: 'center',
    },
    {
      title: '主要',
      dataIndex: 'major',
      align: 'center',
    },
    {
      title: '重要',
      dataIndex: 'critical',
      align: 'center',
    },
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
    name: "WholeProcessReportModal",
    props: ['reportMain'],
    // mixins: [JeecgListMixin],
    components: {
      // JTreeTable,
      BarMultid,
      HeadInfo,
    },
    data () {
      return {
        columns,
        defectColumns,
        // inspectStatusA: true,
        // inspectStatusB: true,
        // inspectStatusC: true,
        // inspectorDecision: '',    // '0':ACCEPTED; '1':REJECTED
        selectedRowKeys: [],
        // dataSource: [
        //   {id: 1, parentId: 0, name: '张三'},
        //   {id: 2, parentId: 0, name: '李四'}
        // ],

        // title:"操作",
        visible: false,
        // model: {},
        // labelCol: {
        //   xs: { span: 24 },
        //   sm: { span: 5 },
        // },
        // wrapperCol: {
        //   xs: { span: 24 },
        //   sm: { span: 16 },
        // },
        loading: true,
        confirmLoading: false,
        // pssr: 'GD1912-034'
        // form: this.$form.createForm(this),
        // validatorRules:{
        // },
        //
        url: {
        //   list: "/order/wholeProcessReport/list",
          add: "/order/wholeProcessReportM/add",
        //   edit: "/order/wholeProcessReport/edit",
        //   getInspectDetail: '/quality/sampleInspectStd/getInspectDetail',
          addMinor: "quality/sampleInspectReportM/addMinor",
          subtractMinor: "quality/sampleInspectReportM/subtractMinor",
          updateInspectorDecision: "quality/sampleInspectReportM/updateInspectorDecision",
        },
      }
    },
    created () {
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

      // // 点击增加按钮
      // addMinor(custOdrNo, versionNo, styleShorten, itemMainNo, itemMediumNo, checkPointsNo, checkPointsCn, defectType, updateField, index, items) {
      //   let pp = new Array(7)
      //   pp[0] = custOdrNo
      //   pp[1] = versionNo
      //   pp[2] = styleShorten
      //   pp[3] = itemMainNo
      //   pp[4] = itemMediumNo
      //   pp[5] = checkPointsNo
      //   pp[6] = updateField
      //   let pssr = pp.toString()
      //   if (updateField == 'minor') {
      //     this.$message.info(`${checkPointsCn} | ${defectType} +1`)
      //     if (this.reportMain[20][0].minor + (updateField=='minor'&&itemMainNo==2?1:0) > this.reportMain[20][1].minor ||
      //       this.reportMain[20][0].major + (updateField=='major'&&itemMainNo==2?1:0) > this.reportMain[20][1].major ||
      //       this.reportMain[20][0].critical + (updateField=='critical'&&itemMainNo==2?1:0) > this.reportMain[20][1].critical ||
      //       this.reportMain[21][0].minor + (updateField=='minor'&&itemMainNo==4?1:0) > this.reportMain[21][1].minor ||
      //       this.reportMain[21][0].major + (updateField=='major'&&itemMainNo==4?1:0) > this.reportMain[21][1].major ||
      //       this.reportMain[21][0].critical + (updateField=='critical'&&itemMainNo==4?1:0) > this.reportMain[21][1].critical ||
      //       this.reportMain[22][0].minor + (updateField=='minor'&&itemMainNo==6?1:0) > this.reportMain[22][1].minor ||
      //       this.reportMain[22][0].major + (updateField=='major'&&itemMainNo==6?1:0) > this.reportMain[22][1].major ||
      //       this.reportMain[22][0].critical + (updateField=='critical'&&itemMainNo==6?1:0) > this.reportMain[22][1].critical) {
      //       if (this.reportMain[57] == '1') {
      //         //Do nothing
      //       } else {
      //         this.reportMain[57] = '1'
      //         this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
      //       }
      //       this.$message.warn(`验货结果：拒绝`)
      //     } else {
      //       // this.$message.info(`${checkPointsCn} | ${defectType} +1`)
      //       if (this.reportMain[57] == '0') {
      //         //Do nothing
      //       } else {
      //         this.reportMain[57] = '0'
      //         this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
      //       }
      //     }
      //     this.reportMain[items][index].minor ++
      //     this.reportMain[itemMainNo / 2 + 19][0].minor ++
      //   } else if (updateField == 'major') {
      //     this.$message.info(`${checkPointsCn} | ${defectType} +1`)
      //     if (this.reportMain[20][0].minor + (updateField=='minor'&&itemMainNo==2?1:0) > this.reportMain[20][1].minor ||
      //       this.reportMain[20][0].major + (updateField=='major'&&itemMainNo==2?1:0) > this.reportMain[20][1].major ||
      //       this.reportMain[20][0].critical + (updateField=='critical'&&itemMainNo==2?1:0) > this.reportMain[20][1].critical ||
      //       this.reportMain[21][0].minor + (updateField=='minor'&&itemMainNo==4?1:0) > this.reportMain[21][1].minor ||
      //       this.reportMain[21][0].major + (updateField=='major'&&itemMainNo==4?1:0) > this.reportMain[21][1].major ||
      //       this.reportMain[21][0].critical + (updateField=='critical'&&itemMainNo==4?1:0) > this.reportMain[21][1].critical ||
      //       this.reportMain[22][0].minor + (updateField=='minor'&&itemMainNo==6?1:0) > this.reportMain[22][1].minor ||
      //       this.reportMain[22][0].major + (updateField=='major'&&itemMainNo==6?1:0) > this.reportMain[22][1].major ||
      //       this.reportMain[22][0].critical + (updateField=='critical'&&itemMainNo==6?1:0) > this.reportMain[22][1].critical) {
      //       if (this.reportMain[57] == '1') {
      //         //Do nothing
      //       } else {
      //         this.reportMain[57] = '1'
      //         this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
      //       }
      //       this.$message.warn(`验货结果：拒绝`)
      //     } else {
      //       // this.$message.info(`${checkPointsCn} | ${defectType} +1`)
      //       if (this.reportMain[57] == '0') {
      //         //Do nothing
      //       } else {
      //         this.reportMain[57] = '0'
      //         this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
      //       }
      //     }
      //     this.reportMain[items][index].major ++
      //     this.reportMain[itemMainNo / 2 + 19][0].major ++
      //   } else if (updateField == 'critical') {
      //     this.$message.info(`${checkPointsCn} | ${defectType} +1`)
      //     if (this.reportMain[20][0].minor + (updateField=='minor'&&itemMainNo==2?1:0) > this.reportMain[20][1].minor ||
      //       this.reportMain[20][0].major + (updateField=='major'&&itemMainNo==2?1:0) > this.reportMain[20][1].major ||
      //       this.reportMain[20][0].critical + (updateField=='critical'&&itemMainNo==2?1:0) > this.reportMain[20][1].critical ||
      //       this.reportMain[21][0].minor + (updateField=='minor'&&itemMainNo==4?1:0) > this.reportMain[21][1].minor ||
      //       this.reportMain[21][0].major + (updateField=='major'&&itemMainNo==4?1:0) > this.reportMain[21][1].major ||
      //       this.reportMain[21][0].critical + (updateField=='critical'&&itemMainNo==4?1:0) > this.reportMain[21][1].critical ||
      //       this.reportMain[22][0].minor + (updateField=='minor'&&itemMainNo==6?1:0) > this.reportMain[22][1].minor ||
      //       this.reportMain[22][0].major + (updateField=='major'&&itemMainNo==6?1:0) > this.reportMain[22][1].major ||
      //       this.reportMain[22][0].critical + (updateField=='critical'&&itemMainNo==6?1:0) > this.reportMain[22][1].critical) {
      //       if (this.reportMain[57] == '1') {
      //         //Do nothing
      //       } else {
      //         this.reportMain[57] = '1'
      //         this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
      //       }
      //       this.$message.warn(`验货结果：拒绝`)
      //     } else {
      //       // this.$message.info(`${checkPointsCn} | ${defectType} +1`)
      //       if (this.reportMain[57] == '0') {
      //         //Do nothing
      //       } else {
      //         this.reportMain[57] = '0'
      //         this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
      //       }
      //     }
      //     this.reportMain[items][index].critical ++
      //     this.reportMain[itemMainNo / 2 + 19][0].critical ++
      //   }
      //   getAction(this.url.addMinor, {pssr: pssr}).then((res) => {
      //     if (res.success) {
      //       console.log(`增加成功!`)
      //     }
      //     if (res.code === 510) {
      //       this.$message.warning(res.message)
      //     }
      //   })
      //   this.$forceUpdate()
      // },

      // // 点击减少按钮
      // subtractMinor(custOdrNo, versionNo, styleShorten, itemMainNo, itemMediumNo, checkPointsNo, checkPointsCn, defectType, updateField, index, items) {
      //   let pp = new Array(7)
      //   pp[0] = custOdrNo
      //   pp[1] = versionNo
      //   pp[2] = styleShorten
      //   pp[3] = itemMainNo
      //   pp[4] = itemMediumNo
      //   pp[5] = checkPointsNo
      //   pp[6] = updateField
      //   let pssr = pp.toString()
      //   if (updateField == 'minor') {
      //     // 提示“数量不能为负数”
      //     if (this.reportMain[items][index].minor - 1 < 0) {
      //       this.$message.warn(this.$t('stgscanMolding.noMinus') + '!')
      //       return
      //     }
      //     this.$message.info(`${checkPointsCn} | ${defectType} -1`)
      //     // 更新验货结果
      //     if (this.reportMain[20][0].minor - (updateField=='minor'&&itemMainNo==2?1:0) <= this.reportMain[20][1].minor &&
      //       this.reportMain[20][0].major - (updateField=='major'&&itemMainNo==2?1:0) <= this.reportMain[20][1].major &&
      //       this.reportMain[20][0].critical - (updateField=='critical'&&itemMainNo==2?1:0) <= this.reportMain[20][1].critical &&
      //       this.reportMain[21][0].minor - (updateField=='minor'&&itemMainNo==4?1:0) <= this.reportMain[21][1].minor &&
      //       this.reportMain[21][0].major - (updateField=='major'&&itemMainNo==4?1:0) <= this.reportMain[21][1].major &&
      //       this.reportMain[21][0].critical - (updateField=='critical'&&itemMainNo==4?1:0) <= this.reportMain[21][1].critical &&
      //       this.reportMain[22][0].minor - (updateField=='minor'&&itemMainNo==6?1:0) <= this.reportMain[22][1].minor &&
      //       this.reportMain[22][0].major - (updateField=='major'&&itemMainNo==6?1:0) <= this.reportMain[22][1].major &&
      //       this.reportMain[22][0].critical - (updateField=='critical'&&itemMainNo==6?1:0) <= this.reportMain[22][1].critical) {
      //       if (this.reportMain[57] == '0') {
      //         //Do nothing
      //       } else {
      //         this.reportMain[57] = '0'
      //         this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
      //       }
      //       this.$message.success(`验货结果：接受`)
      //     } else {
      //       if (this.reportMain[57] == '1') {
      //         //Do nothing
      //       } else {
      //         this.reportMain[57] = '1'
      //         this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
      //       }
      //     }
      //     this.reportMain[items][index].minor --
      //     this.reportMain[itemMainNo / 2 + 19][0].minor --
      //   } else if (updateField == 'major') {
      //     // 提示“数量不能为负数”
      //     if (this.reportMain[items][index].major - 1 < 0) {
      //       this.$message.warn(this.$t('stgscanMolding.noMinus') + '!')
      //       return
      //     }
      //     this.$message.info(`${checkPointsCn} | ${defectType} -1`)
      //     // 更新验货结果
      //     if (this.reportMain[20][0].minor - (updateField=='minor'&&itemMainNo==2?1:0) <= this.reportMain[20][1].minor &&
      //       this.reportMain[20][0].major - (updateField=='major'&&itemMainNo==2?1:0) <= this.reportMain[20][1].major &&
      //       this.reportMain[20][0].critical - (updateField=='critical'&&itemMainNo==2?1:0) <= this.reportMain[20][1].critical &&
      //       this.reportMain[21][0].minor - (updateField=='minor'&&itemMainNo==4?1:0) <= this.reportMain[21][1].minor &&
      //       this.reportMain[21][0].major - (updateField=='major'&&itemMainNo==4?1:0) <= this.reportMain[21][1].major &&
      //       this.reportMain[21][0].critical - (updateField=='critical'&&itemMainNo==4?1:0) <= this.reportMain[21][1].critical &&
      //       this.reportMain[22][0].minor - (updateField=='minor'&&itemMainNo==6?1:0) <= this.reportMain[22][1].minor &&
      //       this.reportMain[22][0].major - (updateField=='major'&&itemMainNo==6?1:0) <= this.reportMain[22][1].major &&
      //       this.reportMain[22][0].critical - (updateField=='critical'&&itemMainNo==6?1:0) <= this.reportMain[22][1].critical) {
      //       if (this.reportMain[57] == '0') {
      //         //Do nothing
      //       } else {
      //         this.reportMain[57] = '0'
      //         this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
      //       }
      //       this.$message.success(`验货结果：接受`)
      //     } else {
      //       if (this.reportMain[57] == '1') {
      //         //Do nothing
      //       } else {
      //         this.reportMain[57] = '1'
      //         this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
      //       }
      //     }
      //     this.reportMain[items][index].major --
      //     this.reportMain[itemMainNo / 2 + 19][0].major --
      //   } else if (updateField == 'critical') {
      //     // 提示“数量不能为负数”
      //     if (this.reportMain[items][index].critical - 1 < 0) {
      //       this.$message.warn(this.$t('stgscanMolding.noMinus') + '!')
      //       return
      //     }
      //     this.$message.info(`${checkPointsCn} | ${defectType} -1`)
      //     // 更新验货结果
      //     if (this.reportMain[20][0].minor - (updateField=='minor'&&itemMainNo==2?1:0) <= this.reportMain[20][1].minor &&
      //       this.reportMain[20][0].major - (updateField=='major'&&itemMainNo==2?1:0) <= this.reportMain[20][1].major &&
      //       this.reportMain[20][0].critical - (updateField=='critical'&&itemMainNo==2?1:0) <= this.reportMain[20][1].critical &&
      //       this.reportMain[21][0].minor - (updateField=='minor'&&itemMainNo==4?1:0) <= this.reportMain[21][1].minor &&
      //       this.reportMain[21][0].major - (updateField=='major'&&itemMainNo==4?1:0) <= this.reportMain[21][1].major &&
      //       this.reportMain[21][0].critical - (updateField=='critical'&&itemMainNo==4?1:0) <= this.reportMain[21][1].critical &&
      //       this.reportMain[22][0].minor - (updateField=='minor'&&itemMainNo==6?1:0) <= this.reportMain[22][1].minor &&
      //       this.reportMain[22][0].major - (updateField=='major'&&itemMainNo==6?1:0) <= this.reportMain[22][1].major &&
      //       this.reportMain[22][0].critical - (updateField=='critical'&&itemMainNo==6?1:0) <= this.reportMain[22][1].critical) {
      //       if (this.reportMain[57] == '0') {
      //         //Do nothing
      //       } else {
      //         this.reportMain[57] = '0'
      //         this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
      //       }
      //       this.$message.success(`验货结果：接受`)
      //     } else {
      //       if (this.reportMain[57] == '1') {
      //         //Do nothing
      //       } else {
      //         this.reportMain[57] = '1'
      //         this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
      //       }
      //     }
      //     this.reportMain[items][index].critical --
      //     this.reportMain[itemMainNo / 2 + 19][0].critical --
      //   }
      //   getAction(this.url.subtractMinor, {pssr: pssr}).then((res) => {
      //     if (res.success) {
      //       console.log(`减少成功!`)
      //     }
      //     if (res.code === 510) {
      //       this.$message.warning(res.message)
      //     }
      //   })
      //   this.$forceUpdate()
      // },

      // // 更新验货状态
      // updateInspectorDecision(custOdrNo, versionNo, styleShorten, inspectorDecision) {
      //   let pp = new Array(4)
      //   pp[0] = custOdrNo
      //   pp[1] = versionNo
      //   pp[2] = styleShorten
      //   pp[3] = inspectorDecision
      //   let pssr = pp.toString()
      //   getAction(this.url.updateInspectorDecision, {pssr: pssr}).then((res) => {
      //     if (res.success) {
      //       console.log(`更新成功!`)
      //     }
      //     if (res.code === 510) {
      //       this.$message.warning(res.message)
      //     }
      //   })
      //   this.$forceUpdate()
      // },

      // getInspectDetail(pssr) {
      //   getAction(this.url.getInspectDetail, {pssr: pssr}).then((res) => {
      //     if (res.success) {
      //       this.reportMain[10] = res.result;
      //     }
      //     if (res.code === 510) {
      //       this.$message.warning(res.message)
      //     }
      //   })
      // },

      // add () {
      //   this.edit({});
      // },
      edit (record) {
        // this.form.resetFields();
        // this.model = Object.assign({}, record);
        this.visible = true;
        // this.$nextTick(() => {
        //   this.form.setFieldsValue(pick(this.model,'factNo','proDept','customNo','接单日期','订单交期','抵扣工厂订单','工厂订单','客户订单','型体编号','型体名称','颜色','目的地','订单数'))
        //   //时间格式化
        // });
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
    //   handleOk () {
    //     const that = this;
    //     // 触发表单验证
    //     this.form.validateFields((err, values) => {
    //       if (!err) {
    //         that.confirmLoading = true;
    //         let httpurl = '';
    //         let method = '';
    //         if(!this.model.id){
    //           httpurl+=this.url.add;
    //           method = 'post';
    //         }else{
    //           httpurl+=this.url.edit;
    //           method = 'put';
    //         }
    //         let formData = Object.assign(this.model, values);
    //         //时间格式化
    //
    //         console.log(formData)
    //         httpAction(httpurl,formData,method).then((res)=>{
    //           if(res.success){
    //             that.$message.success(res.message);
    //             that.$emit('ok');
    //           }else{
    //             that.$message.warning(res.message);
    //           }
    //         }).finally(() => {
    //           that.confirmLoading = false;
    //           that.close();
    //         })
    //
    //
    //
    //       }
    //     })
    //   },
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style scoped>

</style>