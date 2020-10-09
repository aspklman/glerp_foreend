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
                    <head-info title="工厂型体编号" :content="reportMain[1]"></head-info>
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
                      <img v-if="reportMain[90]=='0'" src="@/assets/accepted.png">
                      <img v-else-if="reportMain[90]=='1'" src="@/assets/rejected.png">
                      <img v-else src="">
                    </div>
                    <h2 :style="{ textAlign: 'center', color: reportMain[90]=='0'?'green':reportMain[90]=='1'?'red':'white' }">{{reportMain[90]=='0'?'接受':reportMain[90]=='1'?'拒绝':''}}</h2>
                  </a-col>
                </a-row>
                <a-row :style="{ marginTop: '24px' }">
                  <a-col :span="5">
                    <head-info title="订单数量" :content="reportMain[4].toString()"></head-info>
                  </a-col>
                  <a-col :span="5">
                    <head-info title="客户型体编号" :content="reportMain[5]"></head-info>
                  </a-col>
                  <a-col :span="5">
                    <head-info title="客户型体名称" :content="reportMain[6]"></head-info>
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
                <head-info title="取样数量" :content="reportMain[8].sampleQtyAqlTtl"></head-info>
              </a-col>
              <a-col :xl="9" :lg="12" :md="12" :sm="24" :xs="24">

              </a-col>
              <a-col :xl="9" :lg="12" :md="12" :sm="24" :xs="24">
                <pre>
                  <a-table
                    rowKey="type"
                    :columns="defectColumns"
                    :data-source="reportMain[51]"
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
                    <a-button-group slot="action11" slot-scope="text, record, index">
                      <span :style="{ color: 'red'}">{{ reportMain[9][index].findQuestion }}</span>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-input @change="handleQuestion"></a-input>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-button type="primary"
                                @click="addQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 9, index)">
                        提交
                      </a-button>
                      <a-button type="primary"
                                @click="subtractQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 9, index)">
                        删除
                      </a-button>
                    </a-button-group>
                    <a-button-group slot="action1" slot-scope="text, record, index">
                      <span>{{ reportMain[9][index].minor }}</span>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 9)">
                        <a-icon type="plus-circle"/>
                      </a-button>
                      <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 9)">
                        <a-icon type="minus-circle"/>
                      </a-button>
                    </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[9][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 9)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 9)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[9][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 9)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
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
                    <a-button-group slot="action11" slot-scope="text, record, index">
                      <span :style="{ color: 'red'}">{{ reportMain[10][index].findQuestion }}</span>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-input @change="handleQuestion"></a-input>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-button type="primary"
                                @click="addQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 10, index)">
                        提交
                      </a-button>
                      <a-button type="primary"
                                @click="subtractQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 10, index)">
                        删除
                      </a-button>
                    </a-button-group>
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[10][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 10)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 10)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[10][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 10)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 10)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[10][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 10)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
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
                    <a-button-group slot="action11" slot-scope="text, record, index">
                      <span :style="{ color: 'red'}">{{ reportMain[11][index].findQuestion }}</span>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-input @change="handleQuestion"></a-input>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-button type="primary"
                                @click="addQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 11, index)">
                        提交
                      </a-button>
                      <a-button type="primary"
                                @click="subtractQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 11, index)">
                        删除
                      </a-button>
                    </a-button-group>
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[11][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 11)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 11)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[11][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 11)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 11)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[11][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 11)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
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
                    <a-button-group slot="action11" slot-scope="text, record, index">
                      <span :style="{ color: 'red'}">{{ reportMain[12][index].findQuestion }}</span>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-input @change="handleQuestion"></a-input>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-button type="primary"
                                @click="addQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 12, index)">
                        提交
                      </a-button>
                      <a-button type="primary"
                                @click="subtractQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 12, index)">
                        删除
                      </a-button>
                    </a-button-group>
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[12][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 12)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 12)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[12][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 12)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 12)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[12][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 12)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
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
                <head-info title="取样数量" :content="reportMain[8].funcQtyAqlTtl"></head-info>
              </a-col>
              <a-col :xl="9" :lg="12" :md="12" :sm="24" :xs="24">

              </a-col>
              <a-col :xl="9" :lg="12" :md="12" :sm="24" :xs="24">
                <pre>
                  <a-table
                    rowKey="type"
                    :columns="defectColumns"
                    :data-source="reportMain[52]"
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
                    <a-button-group slot="action11" slot-scope="text, record, index">
                      <span :style="{ color: 'red'}">{{ reportMain[13][index].findQuestion }}</span>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-input @change="handleQuestion"></a-input>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-button type="primary"
                                @click="addQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 13, index)">
                        提交
                      </a-button>
                      <a-button type="primary"
                                @click="subtractQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 13, index)">
                        删除
                      </a-button>
                    </a-button-group>
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[13][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 13)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 13)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[13][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 13)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 13)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[13][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 13)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
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
                    <a-button-group slot="action11" slot-scope="text, record, index">
                      <span :style="{ color: 'red'}">{{ reportMain[14][index].findQuestion }}</span>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-input @change="handleQuestion"></a-input>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-button type="primary"
                                @click="addQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 14, index)">
                        提交
                      </a-button>
                      <a-button type="primary"
                                @click="subtractQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 14, index)">
                        删除
                      </a-button>
                    </a-button-group>
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[14][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 14)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 14)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[14][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 14)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 14)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[14][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 14)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
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
                    <a-button-group slot="action11" slot-scope="text, record, index">
                      <span :style="{ color: 'red'}">{{ reportMain[15][index].findQuestion }}</span>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-input @change="handleQuestion"></a-input>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-button type="primary"
                                @click="addQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 15, index)">
                        提交
                      </a-button>
                      <a-button type="primary"
                                @click="subtractQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 15, index)">
                        删除
                      </a-button>
                    </a-button-group>
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[15][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 15)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 15)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[15][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 15)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 15)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[15][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 15)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 15)">
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
                    :data-source="reportMain[16]"
                    bordered
                    :pagination="false">
                    <a-button-group slot="action11" slot-scope="text, record, index">
                      <span :style="{ color: 'red'}">{{ reportMain[16][index].findQuestion }}</span>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-input @change="handleQuestion"></a-input>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-button type="primary"
                                @click="addQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 16, index)">
                        提交
                      </a-button>
                      <a-button type="primary"
                                @click="subtractQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 16, index)">
                        删除
                      </a-button>
                    </a-button-group>
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[16][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 16)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 16)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[16][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 16)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 16)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[16][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 16)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 16)">
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
                <head-info title="取样数量" :content="reportMain[8].strQtyAql"></head-info>
              </a-col>
              <a-col :xl="9" :lg="12" :md="12" :sm="24" :xs="24">

              </a-col>
              <a-col :xl="9" :lg="12" :md="12" :sm="24" :xs="24">
                <pre>
                  <a-table
                    rowKey="type"
                    :columns="defectColumns"
                    :data-source="reportMain[53]"
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
              </a-col>
            </a-row>

            <a-row>
              <a-card title="通用" type="inner">
                <pre>
                  <a-table
                    rowKey="checkPointsNo"
                    :columns="columns"
                    :data-source="reportMain[17]"
                    bordered
                    :pagination="false">
                    <a-button-group slot="action11" slot-scope="text, record, index">
                      <span :style="{ color: 'red'}">{{ reportMain[17][index].findQuestion }}</span>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-input @change="handleQuestion"></a-input>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-button type="primary"
                                @click="addQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 17, index)">
                        提交
                      </a-button>
                      <a-button type="primary"
                                @click="subtractQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 17, index)">
                        删除
                      </a-button>
                    </a-button-group>
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[17][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 17)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 17)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[17][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 17)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 17)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[17][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 17)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 17)">
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
                    :data-source="reportMain[18]"
                    bordered
                    :pagination="false">
                    <a-button-group slot="action11" slot-scope="text, record, index">
                      <span :style="{ color: 'red'}">{{ reportMain[18][index].findQuestion }}</span>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-input @change="handleQuestion"></a-input>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-button type="primary"
                                @click="addQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 18, index)">
                        提交
                      </a-button>
                      <a-button type="primary"
                                @click="subtractQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 18, index)">
                        删除
                      </a-button>
                    </a-button-group>
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[18][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 18)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 18)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[18][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 18)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 18)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[18][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 18)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 18)">
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
                    :data-source="reportMain[19]"
                    bordered
                    :pagination="false">
                    <a-button-group slot="action11" slot-scope="text, record, index">
                      <span :style="{ color: 'red'}">{{ reportMain[19][index].findQuestion }}</span>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-input @change="handleQuestion"></a-input>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-button type="primary"
                                @click="addQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 19, index)">
                        提交
                      </a-button>
                      <a-button type="primary"
                                @click="subtractQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 19, index)">
                        删除
                      </a-button>
                    </a-button-group>
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[19][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 19)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 19)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[19][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 19)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 19)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[19][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 19)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 19)">
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
                    :data-source="reportMain[20]"
                    bordered
                    :pagination="false">
                    <a-button-group slot="action11" slot-scope="text, record, index">
                      <span :style="{ color: 'red'}">{{ reportMain[20][index].findQuestion }}</span>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-input @change="handleQuestion"></a-input>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-button type="primary"
                                @click="addQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 20, index)">
                        提交
                      </a-button>
                      <a-button type="primary"
                                @click="subtractQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 20, index)">
                        删除
                      </a-button>
                    </a-button-group>
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[20][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 20)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 20)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[20][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 20)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 20)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[20][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 20)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 20)">
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
                    :data-source="reportMain[21]"
                    bordered
                    :pagination="false">
                    <a-button-group slot="action11" slot-scope="text, record, index">
                      <span :style="{ color: 'red'}">{{ reportMain[21][index].findQuestion }}</span>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-input @change="handleQuestion"></a-input>
                      <a-row :style="{ marginTop: '6px' }" />
                      <a-button type="primary"
                                @click="addQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 21, index)">
                        提交
                      </a-button>
                      <a-button type="primary"
                                @click="subtractQuestion(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, 21, index)">
                        删除
                      </a-button>
                    </a-button-group>
                      <a-button-group slot="action1" slot-scope="text, record, index">
                        <span>{{ reportMain[21][index].minor }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 21)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].minorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '次要', 'minor', index, 21)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action2" slot-scope="text, record, index">
                      <span>{{ reportMain[21][index].major }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 21)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].majorEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '主要', 'major', index, 21)">
                          <a-icon type="minus-circle"/>
                        </a-button>
                      </a-button-group>
                    <a-button-group slot="action3" slot-scope="text, record, index">
                      <span>{{ reportMain[21][index].critical }}</span>
                        <a-row :style="{ marginTop: '6px' }" />
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="addMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 21)">
                          <a-icon type="plus-circle"/>
                        </a-button>
                        <a-button type="primary" :disabled="reportMain[9][index].criticalEnable=='F'"
                                  @click="subtractMinor(reportMain[0], reportMain[3], reportMain[1], record.itemMainNo, record.itemMediumNo, record.checkPointsNo, record.checkPointsCn, '重要', 'critical', index, 21)">
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
  import HeadInfo from '@/components/tools/HeadInfo.vue'
  import BarMultid from '../../../components/chart/BarMultid'
  import { getAction } from '@/api/manage'

  const columns = [
      {
        title: '检查点',
        dataIndex: 'checkPointsCn',
      },
      {
        title: '测试方法/要求',
        dataIndex: 'testMethodReqsCn',
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
        title: '发现问题',
        dataIndex: 'action11',
        align: 'center',
        scopedSlots: { customRender: 'action11' },
      },
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
    components: {
      BarMultid,
      HeadInfo,
    },
    data () {
      return {
        findQuestion: '',
        columns,
        defectColumns,
        selectedRowKeys: [],
        visible: false,
        loading: true,
        confirmLoading: false,
        url: {
          addMinor: "quality/sampleInspectReportM/addMinor",
          subtractMinor: "quality/sampleInspectReportM/subtractMinor",
          updateInspectorDecision: "quality/sampleInspectReportM/updateInspectorDecision",
          addQuestion: "quality/sampleInspectReportM/addQuestion",
          subtractQuestion: "quality/sampleInspectReportM/subtractQuestion",
        },
      }
    },
    created () {
    },

    computed: {

      // tableProps() {
      //   let _this = this
      //   return {
      //     // 列表项是否可选择
      //     // https://vue.ant.design/components/table-cn/#rowSelection
      //     rowSelection: {
      //       selectedRowKeys: _this.selectedRowKeys,
      //       onChange: (selectedRowKeys) => _this.selectedRowKeys = selectedRowKeys
      //     }
      //   }
      // }
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
          if (this.reportMain[51][0].minor + (updateField=='minor'&&itemMainNo==2?1:0) > this.reportMain[51][1].minor ||
            this.reportMain[51][0].major + (updateField=='major'&&itemMainNo==2?1:0) > this.reportMain[51][1].major ||
            this.reportMain[51][0].critical + (updateField=='critical'&&itemMainNo==2?1:0) > this.reportMain[51][1].critical ||
            this.reportMain[52][0].minor + (updateField=='minor'&&itemMainNo==4?1:0) > this.reportMain[52][1].minor ||
            this.reportMain[52][0].major + (updateField=='major'&&itemMainNo==4?1:0) > this.reportMain[52][1].major ||
            this.reportMain[52][0].critical + (updateField=='critical'&&itemMainNo==4?1:0) > this.reportMain[52][1].critical ||
            this.reportMain[53][0].minor + (updateField=='minor'&&itemMainNo==6?1:0) > this.reportMain[53][1].minor ||
            this.reportMain[53][0].major + (updateField=='major'&&itemMainNo==6?1:0) > this.reportMain[53][1].major ||
            this.reportMain[53][0].critical + (updateField=='critical'&&itemMainNo==6?1:0) > this.reportMain[53][1].critical) {
            if (this.reportMain[90] == '1') {
              //Do nothing
            } else {
              this.reportMain[90] = '1'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[90])
            }
            this.$message.warn(`验货结果：拒绝`)
          } else {
            // this.$message.info(`${checkPointsCn} | ${defectType} +1`)
            if (this.reportMain[90] == '0') {
              //Do nothing
            } else {
              this.reportMain[90] = '0'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[90])
            }
          }
          this.reportMain[items][index].minor ++
          this.reportMain[itemMainNo / 2 + 50][0].minor ++
        } else if (updateField == 'major') {
          this.$message.info(`${checkPointsCn} | ${defectType} +1`)
          if (this.reportMain[51][0].minor + (updateField=='minor'&&itemMainNo==2?1:0) > this.reportMain[51][1].minor ||
            this.reportMain[51][0].major + (updateField=='major'&&itemMainNo==2?1:0) > this.reportMain[51][1].major ||
            this.reportMain[51][0].critical + (updateField=='critical'&&itemMainNo==2?1:0) > this.reportMain[51][1].critical ||
            this.reportMain[52][0].minor + (updateField=='minor'&&itemMainNo==4?1:0) > this.reportMain[52][1].minor ||
            this.reportMain[52][0].major + (updateField=='major'&&itemMainNo==4?1:0) > this.reportMain[52][1].major ||
            this.reportMain[52][0].critical + (updateField=='critical'&&itemMainNo==4?1:0) > this.reportMain[52][1].critical ||
            this.reportMain[53][0].minor + (updateField=='minor'&&itemMainNo==6?1:0) > this.reportMain[53][1].minor ||
            this.reportMain[53][0].major + (updateField=='major'&&itemMainNo==6?1:0) > this.reportMain[53][1].major ||
            this.reportMain[53][0].critical + (updateField=='critical'&&itemMainNo==6?1:0) > this.reportMain[53][1].critical) {
            if (this.reportMain[90] == '1') {
              //Do nothing
            } else {
              this.reportMain[90] = '1'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[90])
            }
            this.$message.warn(`验货结果：拒绝`)
          } else {
            // this.$message.info(`${checkPointsCn} | ${defectType} +1`)
            if (this.reportMain[90] == '0') {
              //Do nothing
            } else {
              this.reportMain[90] = '0'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[90])
            }
          }
          this.reportMain[items][index].major ++
          this.reportMain[itemMainNo / 2 + 50][0].major ++
        } else if (updateField == 'critical') {
          this.$message.info(`${checkPointsCn} | ${defectType} +1`)
          if (this.reportMain[51][0].minor + (updateField=='minor'&&itemMainNo==2?1:0) > this.reportMain[51][1].minor ||
            this.reportMain[51][0].major + (updateField=='major'&&itemMainNo==2?1:0) > this.reportMain[51][1].major ||
            this.reportMain[51][0].critical + (updateField=='critical'&&itemMainNo==2?1:0) > this.reportMain[51][1].critical ||
            this.reportMain[52][0].minor + (updateField=='minor'&&itemMainNo==4?1:0) > this.reportMain[52][1].minor ||
            this.reportMain[52][0].major + (updateField=='major'&&itemMainNo==4?1:0) > this.reportMain[52][1].major ||
            this.reportMain[52][0].critical + (updateField=='critical'&&itemMainNo==4?1:0) > this.reportMain[52][1].critical ||
            this.reportMain[53][0].minor + (updateField=='minor'&&itemMainNo==6?1:0) > this.reportMain[53][1].minor ||
            this.reportMain[53][0].major + (updateField=='major'&&itemMainNo==6?1:0) > this.reportMain[53][1].major ||
            this.reportMain[53][0].critical + (updateField=='critical'&&itemMainNo==6?1:0) > this.reportMain[53][1].critical) {
            if (this.reportMain[90] == '1') {
              //Do nothing
            } else {
              this.reportMain[90] = '1'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[90])
            }
            this.$message.warn(`验货结果：拒绝`)
          } else {
            // this.$message.info(`${checkPointsCn} | ${defectType} +1`)
            if (this.reportMain[90] == '0') {
              //Do nothing
            } else {
              this.reportMain[90] = '0'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[90])
            }
          }
          this.reportMain[items][index].critical ++
          this.reportMain[itemMainNo / 2 + 50][0].critical ++
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
          if (this.reportMain[51][0].minor - (updateField=='minor'&&itemMainNo==2?1:0) <= this.reportMain[51][1].minor &&
            this.reportMain[51][0].major - (updateField=='major'&&itemMainNo==2?1:0) <= this.reportMain[51][1].major &&
            this.reportMain[51][0].critical - (updateField=='critical'&&itemMainNo==2?1:0) <= this.reportMain[51][1].critical &&
            this.reportMain[52][0].minor - (updateField=='minor'&&itemMainNo==4?1:0) <= this.reportMain[52][1].minor &&
            this.reportMain[52][0].major - (updateField=='major'&&itemMainNo==4?1:0) <= this.reportMain[52][1].major &&
            this.reportMain[52][0].critical - (updateField=='critical'&&itemMainNo==4?1:0) <= this.reportMain[52][1].critical &&
            this.reportMain[53][0].minor - (updateField=='minor'&&itemMainNo==6?1:0) <= this.reportMain[53][1].minor &&
            this.reportMain[53][0].major - (updateField=='major'&&itemMainNo==6?1:0) <= this.reportMain[53][1].major &&
            this.reportMain[53][0].critical - (updateField=='critical'&&itemMainNo==6?1:0) <= this.reportMain[53][1].critical) {
            if (this.reportMain[90] == '0') {
              //Do nothing
            } else {
              this.reportMain[90] = '0'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[90])
            }
            this.$message.success(`验货结果：接受`)
          } else {
            if (this.reportMain[90] == '1') {
              //Do nothing
            } else {
              this.reportMain[90] = '1'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[90])
            }
          }
          this.reportMain[items][index].minor --
          this.reportMain[itemMainNo / 2 + 50][0].minor --
        } else if (updateField == 'major') {
          // 提示“数量不能为负数”
          if (this.reportMain[items][index].major - 1 < 0) {
            this.$message.warn(this.$t('stgscanMolding.noMinus') + '!')
            return
          }
          this.$message.info(`${checkPointsCn} | ${defectType} -1`)
          // 更新验货结果
          if (this.reportMain[51][0].minor - (updateField=='minor'&&itemMainNo==2?1:0) <= this.reportMain[51][1].minor &&
            this.reportMain[51][0].major - (updateField=='major'&&itemMainNo==2?1:0) <= this.reportMain[51][1].major &&
            this.reportMain[51][0].critical - (updateField=='critical'&&itemMainNo==2?1:0) <= this.reportMain[51][1].critical &&
            this.reportMain[52][0].minor - (updateField=='minor'&&itemMainNo==4?1:0) <= this.reportMain[52][1].minor &&
            this.reportMain[52][0].major - (updateField=='major'&&itemMainNo==4?1:0) <= this.reportMain[52][1].major &&
            this.reportMain[52][0].critical - (updateField=='critical'&&itemMainNo==4?1:0) <= this.reportMain[52][1].critical &&
            this.reportMain[53][0].minor - (updateField=='minor'&&itemMainNo==6?1:0) <= this.reportMain[53][1].minor &&
            this.reportMain[53][0].major - (updateField=='major'&&itemMainNo==6?1:0) <= this.reportMain[53][1].major &&
            this.reportMain[53][0].critical - (updateField=='critical'&&itemMainNo==6?1:0) <= this.reportMain[53][1].critical) {
            if (this.reportMain[90] == '0') {
              //Do nothing
            } else {
              this.reportMain[90] = '0'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[90])
            }
            this.$message.success(`验货结果：接受`)
          } else {
            if (this.reportMain[90] == '1') {
              //Do nothing
            } else {
              this.reportMain[90] = '1'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[90])
            }
          }
          this.reportMain[items][index].major --
          this.reportMain[itemMainNo / 2 + 50][0].major --
        } else if (updateField == 'critical') {
          // 提示“数量不能为负数”
          if (this.reportMain[items][index].critical - 1 < 0) {
            this.$message.warn(this.$t('stgscanMolding.noMinus') + '!')
            return
          }
          this.$message.info(`${checkPointsCn} | ${defectType} -1`)
          // 更新验货结果
          if (this.reportMain[51][0].minor - (updateField=='minor'&&itemMainNo==2?1:0) <= this.reportMain[51][1].minor &&
            this.reportMain[51][0].major - (updateField=='major'&&itemMainNo==2?1:0) <= this.reportMain[51][1].major &&
            this.reportMain[51][0].critical - (updateField=='critical'&&itemMainNo==2?1:0) <= this.reportMain[51][1].critical &&
            this.reportMain[52][0].minor - (updateField=='minor'&&itemMainNo==4?1:0) <= this.reportMain[52][1].minor &&
            this.reportMain[52][0].major - (updateField=='major'&&itemMainNo==4?1:0) <= this.reportMain[52][1].major &&
            this.reportMain[52][0].critical - (updateField=='critical'&&itemMainNo==4?1:0) <= this.reportMain[52][1].critical &&
            this.reportMain[53][0].minor - (updateField=='minor'&&itemMainNo==6?1:0) <= this.reportMain[53][1].minor &&
            this.reportMain[53][0].major - (updateField=='major'&&itemMainNo==6?1:0) <= this.reportMain[53][1].major &&
            this.reportMain[53][0].critical - (updateField=='critical'&&itemMainNo==6?1:0) <= this.reportMain[53][1].critical) {
            if (this.reportMain[90] == '0') {
              //Do nothing
            } else {
              this.reportMain[90] = '0'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[90])
            }
            this.$message.success(`验货结果：接受`)
          } else {
            if (this.reportMain[90] == '1') {
              //Do nothing
            } else {
              this.reportMain[90] = '1'
              this.updateInspectorDecision(custOdrNo, versionNo, styleShorten, this.reportMain[90])
            }
          }
          this.reportMain[items][index].critical --
          this.reportMain[itemMainNo / 2 + 50][0].critical --
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

      handleQuestion(e) {
        this.findQuestion = e.target.value
      },

      // 提交问题
      addQuestion(custOdrNo, versionNo, styleShorten, itemMainNo, itemMediumNo, checkPointsNo, items, index) {
        let pp = new Array(7)
        pp[0] = custOdrNo
        pp[1] = versionNo
        pp[2] = styleShorten
        pp[3] = itemMainNo
        pp[4] = itemMediumNo
        pp[5] = checkPointsNo
        pp[6] = this.findQuestion.trim()
        if (this.findQuestion.trim() == '') {
          this.$message.warning('提交内容不能为空！')
          return
        }
        let pssr = pp.toString()
        this.reportMain[items][index].findQuestion = this.findQuestion
        this.findQuestion = ''
        console.log(`问题点：${this.findQuestion}`)
        getAction(this.url.addQuestion, {pssr: pssr}).then((res) => {
          if (res.success) {
            this.$message.success('提交成功')
            console.log(`提交成功!`)
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
        this.$forceUpdate()
      },

      // 删除问题
      subtractQuestion(custOdrNo, versionNo, styleShorten, itemMainNo, itemMediumNo, checkPointsNo, items, index) {
        let pp = new Array(6)
        pp[0] = custOdrNo
        pp[1] = versionNo
        pp[2] = styleShorten
        pp[3] = itemMainNo
        pp[4] = itemMediumNo
        pp[5] = checkPointsNo
        let pssr = pp.toString()
        this.reportMain[items][index].findQuestion = ''
        // document.getElementById('tel').value = ""
        console.log(`问题点：${this.reportMain[items][index].findQuestion}`)
        getAction(this.url.subtractQuestion, {pssr: pssr}).then((res) => {
          if (res.success) {
            this.$message.success(res.message)
            console.log(`删除成功!`)
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
        })
        this.$forceUpdate()
      },

      edit (record) {
        this.visible = true;
      },

      close () {
        this.$emit('close');
        this.visible = false;
      },

      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style scoped>

</style>