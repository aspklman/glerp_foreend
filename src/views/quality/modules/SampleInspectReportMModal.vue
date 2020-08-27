<template>
  <a-modal
    title="验货"
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
                    rowKey="type"
                    :columns="defectColumns"
                    :data-source="reportMain[20]"
                    bordered
                    :pagination="false">
<!--                  <span slot="actionA" slot-scope="text, record, index">-->
                    <!--                    <span>{{ // this.tabA[index].minor }}</span>-->
                    <!--                    <span>{{ reportMain[20][index].minor }}</span>-->
                    <!--                  </span>-->
                    <!--                  <span slot="actionB" slot-scope="text, record, index">-->
                    <!--                    <span>{{ reportMain[20][index].major }}</span>-->
                    <!--                  </span>-->
                    <!--                  <span slot="actionC" slot-scope="text, record, index">-->
                    <!--                    <span>{{ reportMain[20][index].critical }}</span>-->
                    <!--                  </span>-->
                </a-table>
                </pre>

                <!--                <bar-multid-->
                <!--                  title="缺陷数量" :dataSource="reportMain[20]" :fields="fields"/>-->
              </a-col>
            </a-row>

            <a-row>
              <a-card title="通用" type="inner">
                <pre>
                  <a-table
                    rowKey="checkPointsNo"
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
                    rowKey="checkPointsNo"
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
                    rowKey="checkPointsNo"
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
                    rowKey="checkPointsNo"
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
                    rowKey="type"
                    :columns="defectColumns"
                    :data-source="reportMain[21]"
                    bordered
                    :pagination="false">
<!--                  <span slot="actionA" slot-scope="text, record, index">-->
                    <!--                    <span>{{ reportMain[21][index].minor }}</span>-->
                    <!--                  </span>-->
                    <!--                  <span slot="actionB" slot-scope="text, record, index">-->
                    <!--                    <span>{{ reportMain[21][index].major }}</span>-->
                    <!--                  </span>-->
                    <!--                  <span slot="actionC" slot-scope="text, record, index">-->
                    <!--                    <span>{{ reportMain[21][index].critical }}</span>-->
                    <!--                  </span>-->
                </a-table>
                </pre>

                <!--                <bar-multid-->
                <!--                  title="缺陷数量" :dataSource="reportMain[21]" :fields="fields"/>-->
              </a-col>
            </a-row>

            <a-row>
              <a-card title="包装" type="inner">
                <pre>
                  <a-table
                    rowKey="checkPointsNo"
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
                    rowKey="checkPointsNo"
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
                    rowKey="checkPointsNo"
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
                    rowKey="type"
                    :columns="defectColumns"
                    :data-source="reportMain[22]"
                    bordered
                    :pagination="false">
<!--                  <span slot="actionA" slot-scope="text, record, index">-->
                    <!--                    <span>{{ reportMain[22][index].minor }}</span>-->
                    <!--                  </span>-->
                    <!--                  <span slot="actionB" slot-scope="text, record, index">-->
                    <!--                    <span>{{ reportMain[22][index].major }}</span>-->
                    <!--                  </span>-->
                    <!--                  <span slot="actionC" slot-scope="text, record, index">-->
                    <!--                    <span>{{ reportMain[22][index].critical }}</span>-->
                    <!--                  </span>-->
                </a-table>
                </pre>

                <!--                <bar-multid-->
                <!--                  title="缺陷数量" :dataSource="reportMain[22]" :fields="fields"/>-->
              </a-col>
            </a-row>

            <a-row>
              <a-card title="通用" type="inner">
                <pre>
                  <a-table
                    rowKey="checkPointsNo"
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
                    rowKey="checkPointsNo"
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
                    rowKey="checkPointsNo"
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
                    rowKey="checkPointsNo"
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

<!--    <j-tree-table-->
<!--      :url="url"-->
<!--      topValue="0"-->
<!--      queryKey="id"-->
<!--      :columns="columns"-->
<!--      :tableProps="tableProps" />-->


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
        //   add: "/order/wholeProcessReport/add",
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

      // 点击增加按钮
      addMinor(custOdrNo, versionNo, styleShorten, itemMainNo, itemMediumNo, checkPointsNo, checkPointsCn, defectType, updateField, index, items) {
        let pp = new Array(7)
        pp[0] = custOdrNo
        pp[1] = versionNo
        pp[2] = styleShorten
        pp[3] = itemMainNo
        pp[4] = itemMediumNo
        pp[5] = checkPointsNo
        pp[6] = updateField
        let pssr = pp.toString()
        if (updateField == 'minor') {
          this.$message.info(`${checkPointsCn} | ${defectType} +1`)
          if (this.reportMain[20][0].minor + (updateField=='minor'&&itemMainNo==2?1:0) > this.reportMain[20][1].minor ||
            this.reportMain[20][0].major + (updateField=='major'&&itemMainNo==2?1:0) > this.reportMain[20][1].major ||
            this.reportMain[20][0].critical + (updateField=='critical'&&itemMainNo==2?1:0) > this.reportMain[20][1].critical ||
            this.reportMain[21][0].minor + (updateField=='minor'&&itemMainNo==4?1:0) > this.reportMain[21][1].minor ||
            this.reportMain[21][0].major + (updateField=='major'&&itemMainNo==4?1:0) > this.reportMain[21][1].major ||
            this.reportMain[21][0].critical + (updateField=='critical'&&itemMainNo==4?1:0) > this.reportMain[21][1].critical ||
            this.reportMain[22][0].minor + (updateField=='minor'&&itemMainNo==6?1:0) > this.reportMain[22][1].minor ||
            this.reportMain[22][0].major + (updateField=='major'&&itemMainNo==6?1:0) > this.reportMain[22][1].major ||
            this.reportMain[22][0].critical + (updateField=='critical'&&itemMainNo==6?1:0) > this.reportMain[22][1].critical) {
            if (this.reportMain[57] == '1') {
              //Do nothing
            } else {
              this.reportMain[57] = '1'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
            }
            this.$message.warn(`验货结果：拒绝`)
          } else {
            // this.$message.info(`${checkPointsCn} | ${defectType} +1`)
            if (this.reportMain[57] == '0') {
              //Do nothing
            } else {
              this.reportMain[57] = '0'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
            }
          }
          this.reportMain[items][index].minor ++
          this.reportMain[itemMainNo / 2 + 19][0].minor ++
        } else if (updateField == 'major') {
          this.$message.info(`${checkPointsCn} | ${defectType} +1`)
          if (this.reportMain[20][0].minor + (updateField=='minor'&&itemMainNo==2?1:0) > this.reportMain[20][1].minor ||
            this.reportMain[20][0].major + (updateField=='major'&&itemMainNo==2?1:0) > this.reportMain[20][1].major ||
            this.reportMain[20][0].critical + (updateField=='critical'&&itemMainNo==2?1:0) > this.reportMain[20][1].critical ||
            this.reportMain[21][0].minor + (updateField=='minor'&&itemMainNo==4?1:0) > this.reportMain[21][1].minor ||
            this.reportMain[21][0].major + (updateField=='major'&&itemMainNo==4?1:0) > this.reportMain[21][1].major ||
            this.reportMain[21][0].critical + (updateField=='critical'&&itemMainNo==4?1:0) > this.reportMain[21][1].critical ||
            this.reportMain[22][0].minor + (updateField=='minor'&&itemMainNo==6?1:0) > this.reportMain[22][1].minor ||
            this.reportMain[22][0].major + (updateField=='major'&&itemMainNo==6?1:0) > this.reportMain[22][1].major ||
            this.reportMain[22][0].critical + (updateField=='critical'&&itemMainNo==6?1:0) > this.reportMain[22][1].critical) {
            if (this.reportMain[57] == '1') {
              //Do nothing
            } else {
              this.reportMain[57] = '1'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
            }
            this.$message.warn(`验货结果：拒绝`)
          } else {
            // this.$message.info(`${checkPointsCn} | ${defectType} +1`)
            if (this.reportMain[57] == '0') {
              //Do nothing
            } else {
              this.reportMain[57] = '0'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
            }
          }
          this.reportMain[items][index].major ++
          this.reportMain[itemMainNo / 2 + 19][0].major ++
        } else if (updateField == 'critical') {
          this.$message.info(`${checkPointsCn} | ${defectType} +1`)
          if (this.reportMain[20][0].minor + (updateField=='minor'&&itemMainNo==2?1:0) > this.reportMain[20][1].minor ||
            this.reportMain[20][0].major + (updateField=='major'&&itemMainNo==2?1:0) > this.reportMain[20][1].major ||
            this.reportMain[20][0].critical + (updateField=='critical'&&itemMainNo==2?1:0) > this.reportMain[20][1].critical ||
            this.reportMain[21][0].minor + (updateField=='minor'&&itemMainNo==4?1:0) > this.reportMain[21][1].minor ||
            this.reportMain[21][0].major + (updateField=='major'&&itemMainNo==4?1:0) > this.reportMain[21][1].major ||
            this.reportMain[21][0].critical + (updateField=='critical'&&itemMainNo==4?1:0) > this.reportMain[21][1].critical ||
            this.reportMain[22][0].minor + (updateField=='minor'&&itemMainNo==6?1:0) > this.reportMain[22][1].minor ||
            this.reportMain[22][0].major + (updateField=='major'&&itemMainNo==6?1:0) > this.reportMain[22][1].major ||
            this.reportMain[22][0].critical + (updateField=='critical'&&itemMainNo==6?1:0) > this.reportMain[22][1].critical) {
            if (this.reportMain[57] == '1') {
              //Do nothing
            } else {
              this.reportMain[57] = '1'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
            }
            this.$message.warn(`验货结果：拒绝`)
          } else {
            // this.$message.info(`${checkPointsCn} | ${defectType} +1`)
            if (this.reportMain[57] == '0') {
              //Do nothing
            } else {
              this.reportMain[57] = '0'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
            }
          }
          this.reportMain[items][index].critical ++
          this.reportMain[itemMainNo / 2 + 19][0].critical ++
        }
        getAction(this.url.addMinor, {pssr: pssr}).then((res) => {
          if (res.success) {
            console.log(`增加成功!`)
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
        this.$forceUpdate()
      },

      // 点击减少按钮
      subtractMinor(custOdrNo, versionNo, styleShorten, itemMainNo, itemMediumNo, checkPointsNo, checkPointsCn, defectType, updateField, index, items) {
        let pp = new Array(7)
        pp[0] = custOdrNo
        pp[1] = versionNo
        pp[2] = styleShorten
        pp[3] = itemMainNo
        pp[4] = itemMediumNo
        pp[5] = checkPointsNo
        pp[6] = updateField
        let pssr = pp.toString()
        if (updateField == 'minor') {
          // 提示“数量不能为负数”
          if (this.reportMain[items][index].minor - 1 < 0) {
            this.$message.warn(this.$t('stgscanMolding.noMinus') + '!')
            return
          }
          this.$message.info(`${checkPointsCn} | ${defectType} -1`)
          // 更新验货结果
          if (this.reportMain[20][0].minor - (updateField=='minor'&&itemMainNo==2?1:0) <= this.reportMain[20][1].minor &&
            this.reportMain[20][0].major - (updateField=='major'&&itemMainNo==2?1:0) <= this.reportMain[20][1].major &&
            this.reportMain[20][0].critical - (updateField=='critical'&&itemMainNo==2?1:0) <= this.reportMain[20][1].critical &&
            this.reportMain[21][0].minor - (updateField=='minor'&&itemMainNo==4?1:0) <= this.reportMain[21][1].minor &&
            this.reportMain[21][0].major - (updateField=='major'&&itemMainNo==4?1:0) <= this.reportMain[21][1].major &&
            this.reportMain[21][0].critical - (updateField=='critical'&&itemMainNo==4?1:0) <= this.reportMain[21][1].critical &&
            this.reportMain[22][0].minor - (updateField=='minor'&&itemMainNo==6?1:0) <= this.reportMain[22][1].minor &&
            this.reportMain[22][0].major - (updateField=='major'&&itemMainNo==6?1:0) <= this.reportMain[22][1].major &&
            this.reportMain[22][0].critical - (updateField=='critical'&&itemMainNo==6?1:0) <= this.reportMain[22][1].critical) {
            if (this.reportMain[57] == '0') {
              //Do nothing
            } else {
              this.reportMain[57] = '0'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
            }
            this.$message.success(`验货结果：接受`)
          } else {
            if (this.reportMain[57] == '1') {
              //Do nothing
            } else {
              this.reportMain[57] = '1'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
            }
          }
          this.reportMain[items][index].minor --
          this.reportMain[itemMainNo / 2 + 19][0].minor --
        } else if (updateField == 'major') {
          // 提示“数量不能为负数”
          if (this.reportMain[items][index].major - 1 < 0) {
            this.$message.warn(this.$t('stgscanMolding.noMinus') + '!')
            return
          }
          this.$message.info(`${checkPointsCn} | ${defectType} -1`)
          // 更新验货结果
          if (this.reportMain[20][0].minor - (updateField=='minor'&&itemMainNo==2?1:0) <= this.reportMain[20][1].minor &&
            this.reportMain[20][0].major - (updateField=='major'&&itemMainNo==2?1:0) <= this.reportMain[20][1].major &&
            this.reportMain[20][0].critical - (updateField=='critical'&&itemMainNo==2?1:0) <= this.reportMain[20][1].critical &&
            this.reportMain[21][0].minor - (updateField=='minor'&&itemMainNo==4?1:0) <= this.reportMain[21][1].minor &&
            this.reportMain[21][0].major - (updateField=='major'&&itemMainNo==4?1:0) <= this.reportMain[21][1].major &&
            this.reportMain[21][0].critical - (updateField=='critical'&&itemMainNo==4?1:0) <= this.reportMain[21][1].critical &&
            this.reportMain[22][0].minor - (updateField=='minor'&&itemMainNo==6?1:0) <= this.reportMain[22][1].minor &&
            this.reportMain[22][0].major - (updateField=='major'&&itemMainNo==6?1:0) <= this.reportMain[22][1].major &&
            this.reportMain[22][0].critical - (updateField=='critical'&&itemMainNo==6?1:0) <= this.reportMain[22][1].critical) {
            if (this.reportMain[57] == '0') {
              //Do nothing
            } else {
              this.reportMain[57] = '0'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
            }
            this.$message.success(`验货结果：接受`)
          } else {
            if (this.reportMain[57] == '1') {
              //Do nothing
            } else {
              this.reportMain[57] = '1'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
            }
          }
          this.reportMain[items][index].major --
          this.reportMain[itemMainNo / 2 + 19][0].major --
        } else if (updateField == 'critical') {
          // 提示“数量不能为负数”
          if (this.reportMain[items][index].critical - 1 < 0) {
            this.$message.warn(this.$t('stgscanMolding.noMinus') + '!')
            return
          }
          this.$message.info(`${checkPointsCn} | ${defectType} -1`)
          // 更新验货结果
          if (this.reportMain[20][0].minor - (updateField=='minor'&&itemMainNo==2?1:0) <= this.reportMain[20][1].minor &&
            this.reportMain[20][0].major - (updateField=='major'&&itemMainNo==2?1:0) <= this.reportMain[20][1].major &&
            this.reportMain[20][0].critical - (updateField=='critical'&&itemMainNo==2?1:0) <= this.reportMain[20][1].critical &&
            this.reportMain[21][0].minor - (updateField=='minor'&&itemMainNo==4?1:0) <= this.reportMain[21][1].minor &&
            this.reportMain[21][0].major - (updateField=='major'&&itemMainNo==4?1:0) <= this.reportMain[21][1].major &&
            this.reportMain[21][0].critical - (updateField=='critical'&&itemMainNo==4?1:0) <= this.reportMain[21][1].critical &&
            this.reportMain[22][0].minor - (updateField=='minor'&&itemMainNo==6?1:0) <= this.reportMain[22][1].minor &&
            this.reportMain[22][0].major - (updateField=='major'&&itemMainNo==6?1:0) <= this.reportMain[22][1].major &&
            this.reportMain[22][0].critical - (updateField=='critical'&&itemMainNo==6?1:0) <= this.reportMain[22][1].critical) {
            if (this.reportMain[57] == '0') {
              //Do nothing
            } else {
              this.reportMain[57] = '0'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
            }
            this.$message.success(`验货结果：接受`)
          } else {
            if (this.reportMain[57] == '1') {
              //Do nothing
            } else {
              this.reportMain[57] = '1'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[57])
            }
          }
          this.reportMain[items][index].critical --
          this.reportMain[itemMainNo / 2 + 19][0].critical --
        }
        getAction(this.url.subtractMinor, {pssr: pssr}).then((res) => {
          if (res.success) {
            console.log(`减少成功!`)
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
        this.$forceUpdate()
      },

      // 更新验货状态
      updateInspectorDecision(custOdrNo, versionNo, styleShorten, inspectorDecision) {
        let pp = new Array(4)
        pp[0] = custOdrNo
        pp[1] = versionNo
        pp[2] = styleShorten
        pp[3] = inspectorDecision
        let pssr = pp.toString()
        getAction(this.url.updateInspectorDecision, {pssr: pssr}).then((res) => {
          if (res.success) {
            console.log(`更新成功!`)
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
        this.$forceUpdate()
      },

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
  head-info {
    content {
      color: red;
    }
  }
</style>






<!--<template>-->
<!--  <a-modal-->
<!--    :title="title"-->
<!--    :width="1200"-->
<!--    :visible="visible"-->
<!--    :maskClosable="false"-->
<!--    :confirmLoading="confirmLoading"-->
<!--    @ok="handleOk"-->
<!--    @cancel="handleCancel">-->
<!--    <a-spin :spinning="confirmLoading">-->

<!--      <div>-->
<!--        <a-row :style="{ marginTop: '18px' }">-->
<!--          <a-col :span="24">-->
<!--            &lt;!&ndash;        <a-card :loading="loading" :bordered="false" title="半成品" :style="{ marginTop: '24px' }">&ndash;&gt;-->
<!--            <a-row>-->
<!--              <a-col :span="7">-->
<!--                <head-info title="工厂订单" :content="emptyContent"></head-info>-->
<!--              </a-col>-->
<!--              <a-col :span="5">-->
<!--                <head-info title="客户订单" :content="emptyContent"></head-info>-->
<!--              </a-col>-->
<!--              <a-col :span="4">-->
<!--                <head-info title="型体编号" :content="emptyContent"></head-info>-->
<!--              </a-col>-->
<!--              <a-col :span="8">-->
<!--                <head-info title="型体名称" :content="emptyContent"></head-info>-->
<!--              </a-col>-->

<!--            </a-row>-->
<!--            <a-row :style="{ marginTop: '24px' }">-->
<!--              <a-col :span="4">-->
<!--                <head-info title="订单总箱数" :content="emptyContent"></head-info>-->
<!--              </a-col>-->
<!--              <a-col :span="4">-->
<!--                <head-info title="订单总双数" :content="emptyContent"></head-info>-->
<!--              </a-col>-->
<!--              <a-col :span="4">-->
<!--                <head-info title="AQL标准箱数" :content="emptyContent"></head-info>-->
<!--              </a-col>-->
<!--              <a-col :span="4">-->
<!--                <head-info title="AQL标准双数" :content="emptyContent"></head-info>-->
<!--              </a-col>-->
<!--              <a-col :span="4">-->
<!--                <head-info title="功能性检测双数" :content="emptyContent"></head-info>-->
<!--              </a-col>-->
<!--              <a-col :span="4">-->
<!--                <head-info title="结构性检测双数" :content="emptyContent"></head-info>-->
<!--              </a-col>-->
<!--            </a-row>-->
<!--            &lt;!&ndash;        </a-card>&ndash;&gt;-->
<!--          </a-col>-->
<!--        </a-row>-->

<!--      </div>-->

<!--      <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">-->
<!--        <div class="salesCard">-->
<!--          <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"-->
<!--                  @change="changeTab">-->
<!--            <a-tab-pane loading="true" tab="目视化/指南" key="1">-->
<!--              <a-row>-->
<!--                <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">-->
<!--                  <head-info title="取样数量" content="80"></head-info>-->
<!--                </a-col>-->
<!--                <a-col :xl="18" :lg="12" :md="12" :sm="24" :xs="24">-->
<!--                  <bar-multid-->
<!--                    title="缺陷数量" />-->
<!--                </a-col>-->
<!--              </a-row>-->
<!--            </a-tab-pane>-->
<!--            <a-tab-pane tab="无功能性破坏" key="2">-->
<!--              <a-row>-->
<!--                <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">-->
<!--                  <head-info title="取样数量" content="8"></head-info>-->
<!--                </a-col>-->
<!--                <a-col :xl="18" :lg="12" :md="12" :sm="24" :xs="24">-->
<!--                  <bar-multid-->
<!--                    title="缺陷数量" />-->
<!--                </a-col>-->
<!--              </a-row>-->
<!--            </a-tab-pane>-->
<!--            <a-tab-pane tab="功能性破坏" key="3">-->
<!--              <a-row>-->
<!--                <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">-->
<!--                  <head-info title="取样数量" content="1"></head-info>-->
<!--                </a-col>-->
<!--                <a-col :xl="18" :lg="12" :md="12" :sm="24" :xs="24">-->
<!--                  <bar-multid-->
<!--                    title="缺陷数量" />-->
<!--                </a-col>-->
<!--              </a-row>-->
<!--            </a-tab-pane>-->
<!--          </a-tabs>-->
<!--        </div>-->
<!--      </a-card>-->

<!--      <a-row :style="{ marginTop: '24px' }"/>-->

<!--      <div>-->
<!--        <j-tree-table :dataSource="dataSource" :columns="columns"/>-->
<!--      </div>-->


<!--&lt;!&ndash;      <a-table&ndash;&gt;-->
<!--&lt;!&ndash;        ref="table"&ndash;&gt;-->
<!--&lt;!&ndash;        size="middle"&ndash;&gt;-->
<!--&lt;!&ndash;        bordered&ndash;&gt;-->
<!--&lt;!&ndash;        rowKey="size_no"&ndash;&gt;-->
<!--&lt;!&ndash;        :columns="columns"&ndash;&gt;-->
<!--&lt;!&ndash;        :dataSource="dataSource"&ndash;&gt;-->
<!--&lt;!&ndash;        :pagination="false">&ndash;&gt;-->
<!--&lt;!&ndash;      </a-table>&ndash;&gt;-->


<!--&lt;!&ndash;      &lt;!&ndash; 主表单区域 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;      <a-form :form="form">&ndash;&gt;-->
<!--&lt;!&ndash;        <a-row>&ndash;&gt;-->
<!--&lt;!&ndash;          <a-col :span="12" :gutter="8">&ndash;&gt;-->
<!--&lt;!&ndash;            <a-form-item&ndash;&gt;-->
<!--&lt;!&ndash;              :labelCol="labelCol"&ndash;&gt;-->
<!--&lt;!&ndash;              :wrapperCol="wrapperCol"&ndash;&gt;-->
<!--&lt;!&ndash;              label="厂区编号">&ndash;&gt;-->
<!--&lt;!&ndash;              <a-input placeholder="请输入厂区编号" v-decorator="['factNo', {}]"/>&ndash;&gt;-->
<!--&lt;!&ndash;            </a-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          </a-col>&ndash;&gt;-->
<!--&lt;!&ndash;          <a-col :span="12" :gutter="8">&ndash;&gt;-->
<!--&lt;!&ndash;            <a-form-item&ndash;&gt;-->
<!--&lt;!&ndash;              :labelCol="labelCol"&ndash;&gt;-->
<!--&lt;!&ndash;              :wrapperCol="wrapperCol"&ndash;&gt;-->
<!--&lt;!&ndash;              label="客户订单编号">&ndash;&gt;-->
<!--&lt;!&ndash;              <a-input placeholder="请输入客户订单编号" v-decorator="['custOdrNo', {}]"/>&ndash;&gt;-->
<!--&lt;!&ndash;            </a-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          </a-col>&ndash;&gt;-->
<!--&lt;!&ndash;        </a-row>&ndash;&gt;-->
<!--&lt;!&ndash;        <a-row>&ndash;&gt;-->
<!--&lt;!&ndash;          <a-col :span="12" :gutter="8">&ndash;&gt;-->
<!--&lt;!&ndash;            <a-form-item&ndash;&gt;-->
<!--&lt;!&ndash;              :labelCol="labelCol"&ndash;&gt;-->
<!--&lt;!&ndash;              :wrapperCol="wrapperCol"&ndash;&gt;-->
<!--&lt;!&ndash;              label="版本编号">&ndash;&gt;-->
<!--&lt;!&ndash;              <a-input placeholder="请输入版本编号" v-decorator="['versionNo', {}]"/>&ndash;&gt;-->
<!--&lt;!&ndash;            </a-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          </a-col>&ndash;&gt;-->
<!--&lt;!&ndash;          <a-col :span="12" :gutter="8">&ndash;&gt;-->
<!--&lt;!&ndash;            <a-form-item&ndash;&gt;-->
<!--&lt;!&ndash;              :labelCol="labelCol"&ndash;&gt;-->
<!--&lt;!&ndash;              :wrapperCol="wrapperCol"&ndash;&gt;-->
<!--&lt;!&ndash;              label="型体编号">&ndash;&gt;-->
<!--&lt;!&ndash;              <a-input placeholder="请输入型体编号" v-decorator="['styleShorten', {}]"/>&ndash;&gt;-->
<!--&lt;!&ndash;            </a-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          </a-col>&ndash;&gt;-->
<!--&lt;!&ndash;        </a-row>&ndash;&gt;-->
<!--&lt;!&ndash;        <a-row>&ndash;&gt;-->
<!--&lt;!&ndash;          <a-col :span="12" :gutter="8">&ndash;&gt;-->
<!--&lt;!&ndash;            <a-form-item&ndash;&gt;-->
<!--&lt;!&ndash;              :labelCol="labelCol"&ndash;&gt;-->
<!--&lt;!&ndash;              :wrapperCol="wrapperCol"&ndash;&gt;-->
<!--&lt;!&ndash;              label="Pace编码">&ndash;&gt;-->
<!--&lt;!&ndash;              <a-input placeholder="请输入Pace编码" v-decorator="['paceCode', {}]"/>&ndash;&gt;-->
<!--&lt;!&ndash;            </a-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          </a-col>&ndash;&gt;-->
<!--&lt;!&ndash;          <a-col :span="12" :gutter="8">&ndash;&gt;-->
<!--&lt;!&ndash;            <a-form-item&ndash;&gt;-->
<!--&lt;!&ndash;              :labelCol="labelCol"&ndash;&gt;-->
<!--&lt;!&ndash;              :wrapperCol="wrapperCol"&ndash;&gt;-->
<!--&lt;!&ndash;              label="模具名称和颜色">&ndash;&gt;-->
<!--&lt;!&ndash;              <a-input placeholder="请输入模具名称和颜色" v-decorator="['modelColour', {}]"/>&ndash;&gt;-->
<!--&lt;!&ndash;            </a-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          </a-col>&ndash;&gt;-->
<!--&lt;!&ndash;        </a-row>&ndash;&gt;-->
<!--&lt;!&ndash;        <a-row>&ndash;&gt;-->
<!--&lt;!&ndash;          <a-col :span="12" :gutter="8">&ndash;&gt;-->
<!--&lt;!&ndash;            <a-form-item&ndash;&gt;-->
<!--&lt;!&ndash;              :labelCol="labelCol"&ndash;&gt;-->
<!--&lt;!&ndash;              :wrapperCol="wrapperCol"&ndash;&gt;-->
<!--&lt;!&ndash;              label="订单类型">&ndash;&gt;-->
<!--&lt;!&ndash;              <a-input placeholder="请输入订单类型" v-decorator="['orderType', {}]"/>&ndash;&gt;-->
<!--&lt;!&ndash;            </a-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          </a-col>&ndash;&gt;-->
<!--&lt;!&ndash;          <a-col :span="12" :gutter="8">&ndash;&gt;-->
<!--&lt;!&ndash;            <a-form-item&ndash;&gt;-->
<!--&lt;!&ndash;              :labelCol="labelCol"&ndash;&gt;-->
<!--&lt;!&ndash;              :wrapperCol="wrapperCol"&ndash;&gt;-->
<!--&lt;!&ndash;              label="验货日期">&ndash;&gt;-->
<!--&lt;!&ndash;              <a-date-picker&ndash;&gt;-->
<!--&lt;!&ndash;                placeholder="请输入验货日期"&ndash;&gt;-->
<!--&lt;!&ndash;                style="width:100%"&ndash;&gt;-->
<!--&lt;!&ndash;                v-decorator="[ 'inspectDate', {}]"/>&ndash;&gt;-->
<!--&lt;!&ndash;            </a-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          </a-col>&ndash;&gt;-->
<!--&lt;!&ndash;        </a-row>&ndash;&gt;-->
<!--&lt;!&ndash;        <a-row>&ndash;&gt;-->
<!--&lt;!&ndash;          <a-col :span="12" :gutter="8">&ndash;&gt;-->
<!--&lt;!&ndash;            <a-form-item&ndash;&gt;-->
<!--&lt;!&ndash;              :labelCol="labelCol"&ndash;&gt;-->
<!--&lt;!&ndash;              :wrapperCol="wrapperCol"&ndash;&gt;-->
<!--&lt;!&ndash;              label="验货结果">&ndash;&gt;-->
<!--&lt;!&ndash;              <a-input placeholder="请输入验货结果" v-decorator="['inspectorDecision', {}]"/>&ndash;&gt;-->
<!--&lt;!&ndash;            </a-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          </a-col>&ndash;&gt;-->
<!--&lt;!&ndash;        </a-row>&ndash;&gt;-->
<!--&lt;!&ndash;      </a-form>&ndash;&gt;-->

<!--&lt;!&ndash;      &lt;!&ndash; 子表单区域 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;      <a-tabs v-model="activeKey" @change="handleChangeTabs">&ndash;&gt;-->
<!--&lt;!&ndash;        <a-tab-pane tab="验货报告子表" :key="refKeys[0]" :forceRender="true">&ndash;&gt;-->
<!--&lt;!&ndash;          <j-editable-table&ndash;&gt;-->
<!--&lt;!&ndash;            :ref="refKeys[0]"&ndash;&gt;-->
<!--&lt;!&ndash;            :loading="sampleInspectReportDTable.loading"&ndash;&gt;-->
<!--&lt;!&ndash;            :columns="sampleInspectReportDTable.columns"&ndash;&gt;-->
<!--&lt;!&ndash;            :dataSource="sampleInspectReportDTable.dataSource"&ndash;&gt;-->
<!--&lt;!&ndash;            :maxHeight="300"&ndash;&gt;-->
<!--&lt;!&ndash;            :rowNumber="true"&ndash;&gt;-->
<!--&lt;!&ndash;            :rowSelection="true"&ndash;&gt;-->
<!--&lt;!&ndash;            :actionButton="true"/>&ndash;&gt;-->
<!--&lt;!&ndash;        </a-tab-pane>&ndash;&gt;-->
<!--&lt;!&ndash;      </a-tabs>&ndash;&gt;-->

<!--    </a-spin>-->
<!--  </a-modal>-->
<!--</template>-->

<!--<script>-->

<!--  import moment from 'moment'-->
<!--  import pick from 'lodash.pick'-->
<!--  import { FormTypes } from '@/utils/JEditableTableUtil'-->
<!--  import { JeecgListMixin } from '@/mixins/JeecgListMixin'-->
<!--  import HeadInfo from '@/components/tools/HeadInfo.vue'-->
<!--  import BarMultid from '../../../components/chart/BarMultid'-->
<!--  import JTreeTable from '../../../components/jeecg/JTreeTable'-->

<!--  export default {-->
<!--    name: 'SampleInspectReportMModal',-->
<!--    mixins: [JeecgListMixin],-->
<!--    components: {-->
<!--      JTreeTable,-->
<!--      BarMultid,-->
<!--      HeadInfo-->
<!--    },-->
<!--    data() {-->
<!--      return {-->

<!--        columns: [-->
<!--          {-->
<!--            title: '客户',-->
<!--            dataIndex: 'customNo'-->
<!--          },-->
<!--          {-->
<!--            title: '订单数',-->
<!--            dataIndex: 'odrQty'-->
<!--          },-->
<!--        ],-->
<!--        dataSource: [{"customNo": "迪卡侬", "odrQty": "11385"}, {customNo: "卡洛驰", "odrQty": "7466"}],-->

<!--        emptyContent: '空的',-->
<!--        // 新增时子表默认添加几行空数据-->
<!--        addDefaultRowNum: 1,-->
<!--        validatorRules: {-->
<!--        },-->
<!--        refKeys: ['sampleInspectReportD', ],-->
<!--        activeKey: 'sampleInspectReportD',-->
<!--        // 验货报告子表-->
<!--        sampleInspectReportDTable: {-->
<!--          loading: false,-->
<!--          dataSource: [],-->
<!--          // columns: [-->
<!--          //   {-->
<!--          //     title: '厂区编号',-->
<!--          //     key: 'factNo',-->
<!--          //     type: FormTypes.input,-->
<!--          //     defaultValue: '',-->
<!--          //     placeholder: '请输入${title}',-->
<!--          //   },-->
<!--          //   {-->
<!--          //     title: '客户订单编号',-->
<!--          //     key: 'custOdrNo',-->
<!--          //     type: FormTypes.input,-->
<!--          //     defaultValue: '',-->
<!--          //     placeholder: '请输入${title}',-->
<!--          //   },-->
<!--          //   {-->
<!--          //     title: '版本编号',-->
<!--          //     key: 'versionNo',-->
<!--          //     type: FormTypes.input,-->
<!--          //     defaultValue: '',-->
<!--          //     placeholder: '请输入${title}',-->
<!--          //   },-->
<!--          //   {-->
<!--          //     title: '型体编号',-->
<!--          //     key: 'styleShorten',-->
<!--          //     type: FormTypes.input,-->
<!--          //     defaultValue: '',-->
<!--          //     placeholder: '请输入${title}',-->
<!--          //   },-->
<!--          //   {-->
<!--          //     title: '主分类编号',-->
<!--          //     key: 'itemMainNo',-->
<!--          //     type: FormTypes.input,-->
<!--          //     defaultValue: '',-->
<!--          //     placeholder: '请输入${title}',-->
<!--          //   },-->
<!--          //   {-->
<!--          //     title: '中分类编号',-->
<!--          //     key: 'itemMediumNo',-->
<!--          //     type: FormTypes.input,-->
<!--          //     defaultValue: '',-->
<!--          //     placeholder: '请输入${title}',-->
<!--          //   },-->
<!--          //   {-->
<!--          //     title: '检查点编号',-->
<!--          //     key: 'checkPointsNo',-->
<!--          //     type: FormTypes.input,-->
<!--          //     defaultValue: '',-->
<!--          //     placeholder: '请输入${title}',-->
<!--          //   },-->
<!--          //   {-->
<!--          //     title: '次要',-->
<!--          //     key: 'minor',-->
<!--          //     type: FormTypes.input,-->
<!--          //     defaultValue: '',-->
<!--          //     placeholder: '请输入${title}',-->
<!--          //   },-->
<!--          //   {-->
<!--          //     title: '主要',-->
<!--          //     key: 'major',-->
<!--          //     type: FormTypes.input,-->
<!--          //     defaultValue: '',-->
<!--          //     placeholder: '请输入${title}',-->
<!--          //   },-->
<!--          //   {-->
<!--          //     title: '重要',-->
<!--          //     key: 'critical',-->
<!--          //     type: FormTypes.input,-->
<!--          //     defaultValue: '',-->
<!--          //     placeholder: '请输入${title}',-->
<!--          //   },-->
<!--          //   {-->
<!--          //     title: '次要可用状态',-->
<!--          //     key: 'minorEnable',-->
<!--          //     type: FormTypes.input,-->
<!--          //     defaultValue: '',-->
<!--          //     placeholder: '请输入${title}',-->
<!--          //   },-->
<!--          //   {-->
<!--          //     title: '主要可用状态',-->
<!--          //     key: 'majorEnable',-->
<!--          //     type: FormTypes.input,-->
<!--          //     defaultValue: '',-->
<!--          //     placeholder: '请输入${title}',-->
<!--          //   },-->
<!--          //   {-->
<!--          //     title: '重要可用状态',-->
<!--          //     key: 'criticalEnable',-->
<!--          //     type: FormTypes.input,-->
<!--          //     defaultValue: '',-->
<!--          //     placeholder: '请输入${title}',-->
<!--          //   },-->
<!--          //   {-->
<!--          //     title: '验货报告主表ID',-->
<!--          //     key: 'mainId',-->
<!--          //     type: FormTypes.input,-->
<!--          //     defaultValue: '',-->
<!--          //     placeholder: '请输入${title}',-->
<!--          //   },-->
<!--          // ]-->
<!--        },-->
<!--        url: {-->
<!--          list: "/quality/sampleInspectReportM/list",-->
<!--          add: "/quality/sampleInspectReportM/add",-->
<!--          edit: "/quality/sampleInspectReportM/edit",-->
<!--          sampleInspectReportD: {-->
<!--            list: '/quality/sampleInspectReportM/querySampleInspectReportDByMainId'-->
<!--          },-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    methods: {-->

<!--      /** 调用完edit()方法之后会自动调用此方法 */-->
<!--      editAfter() {-->
<!--        this.$nextTick(() => {-->
<!--          this.form.setFieldsValue(pick(this.model, 'factNo', 'custOdrNo', 'versionNo', 'styleShorten', 'paceCode', 'modelColour', 'orderType', 'inspectDate', 'inspectorDecision', ))-->
<!--          // 时间格式化-->
<!--          this.form.setFieldsValue({ inspectDate: this.model.inspectDate ? moment(this.model.inspectDate) : null })-->
<!--        })-->
<!--        // 加载子表数据-->
<!--        if (this.model.id) {-->
<!--          let params = { id: this.model.id }-->
<!--          this.requestSubTableData(this.url.sampleInspectReportD.list, params, this.sampleInspectReportDTable)-->
<!--        }-->
<!--      },-->

<!--      /** 整理成formData */-->
<!--      classifyIntoFormData(allValues) {-->
<!--        let main = Object.assign(this.model, allValues.formValue)-->
<!--        //时间格式化-->
<!--        main.inspectDate = main.inspectDate ? main.inspectDate.format() : null;-->
<!--        return {-->
<!--          ...main, // 展开-->
<!--          sampleInspectReportDList: allValues.tablesValue[0].values,-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style scoped>-->
<!--</style>-->