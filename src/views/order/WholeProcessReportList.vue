<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <!--          <p>点击我就消失了</p>-->

          <a-col :sm="12" :md="12" :lg="8">
            <a-form-item label="订单交期">
              <j-date
                v-model="queryParam.订单交期_begin"
                date-format="YYYYMMDD"
                style="width:45%"
                placeholder="请选择开始日期"></j-date>
              <span style="width: 10px;">~</span>
              <j-date
                v-model="queryParam.订单交期_end"
                date-format="YYYYMMDD"
                style="width:45%"
                placeholder="请选择结束日期"></j-date>
            </a-form-item>
          </a-col>

          <a-col :sm="12" :md="12" :lg="8">
            <a-form-item label="接单日期">
              <j-date
                v-model="queryParam.接单日期_begin"
                date-format="YYYYMMDD"
                style="width:45%"
                placeholder="请选择开始日期"></j-date>
              <span style="width: 10px;">~</span>
              <j-date
                v-model="queryParam.接单日期_end"
                date-format="YYYYMMDD"
                style="width:45%"
                placeholder="请选择结束日期"></j-date>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">

            <a-col :sm="12" :md="8">
              <a-form-item label="工厂订单">
                <a-input placeholder="请输入工厂订单" v-model="queryParam.factOdrNoIn"></a-input>
              </a-form-item>
            </a-col>
            <a-col :sm="12" :md="8">
              <a-form-item label="客户订单">
                <a-input placeholder="请输入客户订单" v-model="queryParam.客户订单"></a-input>
              </a-form-item>
            </a-col>

            <a-col :sm="12" :md="8">
              <a-form-item label="抵扣工厂订单">
                <a-input placeholder="请输入抵扣工厂订单" v-model="queryParam.抵扣工厂订单"></a-input>
              </a-form-item>
            </a-col>
            <!--            <a-col :md="6" :sm="8">-->
            <!--              <a-form-item label="型体编号">-->
            <!--                <a-input placeholder="请输入型体编号" v-model="queryParam.型体编号"></a-input>-->
            <!--              </a-form-item>-->
            <!--            </a-col>-->


            <a-col :sm="12" :md="8">
              <a-form-item label="满箱状态">
                <j-dict-select-tag
                  placeholder="请选择满箱状态"
                  v-model="queryParam.finishMark"
                  dictCode="sf_status_yn"/>
              </a-form-item>
            </a-col>

            <a-col :sm="12" :md="8">
              <a-form-item label="未提前2天满箱">
                <j-dict-select-tag
                  placeholder="请选择未提前2天满箱"
                  v-model="queryParam.finishNoTwoDays"
                  dictCode="sf_status_yn"/>
              </a-form-item>
            </a-col>

          </template>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!--    <div class="table-page-search-wrapper">-->
    <a-row :gutter="24" :style="{ marginBottom: '5px' }">
      <a-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" :xxl="4">
        <a-button type="primary" icon="download" @click="handleExportXls('全流程表')">导出</a-button>
      </a-col>
      <a-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" :xxl="20" :style="{ textAlign: 'right'}">
        <!--        <div>-->
        <a-radio-group :value="value" button-style="solid">
          <a-radio-button @click="queryOrder('finishNoTwoDays')" value="finishNoTwoDays">未提前2天满箱</a-radio-button>
          <a-radio-button @click="queryOrder('today')" value="today">今日</a-radio-button>
          <a-radio-button @click="queryOrder('oneWeek')" value="oneWeek">7天</a-radio-button>
          <a-radio-button @click="queryOrder('twoWeeks')" value="twoWeeks">14天</a-radio-button>
          <a-radio-button @click="queryOrder('month')" value="month">30天</a-radio-button>
          <a-radio-button @click="queryOrder('all')" value="all">全部</a-radio-button>
        </a-radio-group>
        <!--        </div>-->
      </a-col>
    </a-row>
    <!--    </div>-->


    <!-- 操作按钮区域 -->
    <!--        <div class="table-operator">-->
    <!--          <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
    <!--          <a-button type="primary" icon="download" @click="handleExportXls('全流程表')">导出</a-button>-->
    <!--          <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
    <!--            <a-button type="primary" icon="import">导入</a-button>-->
    <!--          </a-upload>-->
    <!--          <a-dropdown v-if="selectedRowKeys.length > 0">-->
    <!--            <a-menu slot="overlay">-->
    <!--              <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
    <!--            </a-menu>-->
    <!--            <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
    <!--          </a-dropdown>-->
    <!--        </div>-->

    <!-- table区域-begin -->
    <div>
      <!--            <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
      <!--              <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项-->
      <!--              <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
      <!--            </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="factOdrNoIn"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :customRow="onClickRow"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio', columnTitle: '选择行'}"
        @change="handleTableChange">
        <!--        <span-->
        <!--          :style="{color: dataSource[index].验货结果=='0'?'green':dataSource[index].验货结果=='1'?'red':dataSource[index].finishMark=='Y'?'blue':dataSource[index].finishMark=='N'?'GoldEnrod':'black'}"-->
        <!--          slot="actionRevOdrDate"-->
        <!--          slot-scope="text, record, index">-->
        <!--          {{dataSource[index].接单日期 }}-->
        <!--        </span>-->

        <!--        <span-->
        <!--          :style="{color: dataSource[index].验货结果=='0'?'green':dataSource[index].验货结果=='1'?'red':dataSource[index].finishMark=='Y'?'blue':dataSource[index].finishMark=='N'?'GoldEnrod':'black'}"-->
        <!--          slot="actionFactOdrNoOut"-->
        <!--          slot-scope="text, record, index">-->
        <!--          {{dataSource[index].抵扣工厂订单 }}-->
        <!--        </span>-->

        <span
          :style="{color: dataSource[index].验货结果=='0'?'green':dataSource[index].验货结果=='1'?'red':dataSource[index].finishMark=='Y'?'blue':dataSource[index].finishMark=='N'?'GoldEnrod':'black'}"
          slot="actionFactOdrNoIn"
          slot-scope="text, record, index">
          {{ dataSource[index].factOdrNoIn }} <br>
          {{ dataSource[index].型体编号 }} <br>
          {{ dataSource[index].颜色 }}
        </span>

        <span
          :style="{color: dataSource[index].验货结果=='0'?'green':dataSource[index].验货结果=='1'?'red':dataSource[index].finishMark=='Y'?'blue':dataSource[index].finishMark=='N'?'GoldEnrod':'black'}"
          slot="actionCustOdrNo"
          slot-scope="text, record, index">
          {{dataSource[index].客户订单 }}
        </span>

        <!--------订单交期-------->
        <span
          :style="{color: dataSource[index].验货结果=='0'?'green':dataSource[index].验货结果=='1'?'red':dataSource[index].finishMark=='Y'?'blue':dataSource[index].finishMark=='N'?'GoldEnrod':'black'}"
          slot="actionCustReqDate"
          slot-scope="text, record, index">
          {{ dataSource[index].订单交期.substring(0,4) + '/' + dataSource[index].订单交期.substring(4,6) + '/' +  dataSource[index].订单交期.substring(6,8) }}
        </span>

        <!--        <span-->
        <!--          :style="{color: dataSource[index].验货结果=='0'?'green':dataSource[index].验货结果=='1'?'red':dataSource[index].finishMark=='Y'?'blue':dataSource[index].finishMark=='N'?'GoldEnrod':'black'}"-->
        <!--          slot="actionArticNo"-->
        <!--          slot-scope="text, record, index">-->
        <!--          {{ dataSource[index].型体编号 }}-->
        <!--        </span>-->

        <!--        <span-->
        <!--          :style="{color: dataSource[index].inspectorDecision=='0'?'green':dataSource[index].inspectorDecision=='1'?'red':dataSource[index].finishMark=='Y'?'blue':dataSource[index].finishMark=='N'?'GoldEnrod':'black'}"-->
        <!--          slot="actionStyleNm"-->
        <!--          slot-scope="text, record, index">-->
        <!--          {{dataSource[index].型体名称 }}-->
        <!--        </span>-->

        <!--        <span-->
        <!--          :style="{color: dataSource[index].验货结果=='0'?'green':dataSource[index].验货结果=='1'?'red':dataSource[index].finishMark=='Y'?'blue':dataSource[index].finishMark=='N'?'GoldEnrod':'black'}"-->
        <!--          slot="actionStyleColor"-->
        <!--          slot-scope="text, record, index">-->
        <!--          {{dataSource[index].颜色 }}-->
        <!--        </span>-->

        <!--------订单类别-------->
        <span
          :style="{color: dataSource[index].验货结果=='0'?'green':dataSource[index].验货结果=='1'?'red':dataSource[index].finishMark=='Y'?'blue':dataSource[index].finishMark=='N'?'GoldEnrod':'black'}"
          slot="actionOdrKind"
          slot-scope="text, record, index">
          {{dataSource[index].订单类别 }}
        </span>
        <span
          :style="{color: dataSource[index].验货结果=='0'?'green':dataSource[index].验货结果=='1'?'red':dataSource[index].finishMark=='Y'?'blue':dataSource[index].finishMark=='N'?'GoldEnrod':'black'}"
          slot="actionCountry"
          slot-scope="text, record, index">
          {{dataSource[index].目的地 }}
        </span>

        <!--------订单数-------->
        <span
          slot="actionSizeQty"
          slot-scope="text, record, index">
          <a-popover trigger="click" placement="left">
            <template slot="content">
              <a-table size="small"
                       :columns="sizeColumns"
                       :pagination="false"
                       bordered
                       :dataSource="odrQty">
              </a-table>
            </template>
            <a
              :style="{color: dataSource[index].验货结果=='0'?'green':dataSource[index].验货结果=='1'?'red':dataSource[index].finishMark=='Y'?'blue':dataSource[index].finishMark=='N'?'GoldEnrod':'black'}"
              :title="sizeQtyMessage">{{ dataSource[index].订单数 }}</a>
          </a-popover>
        </span>


        <!--------满箱状态-------->
        <span
          :style="{color: dataSource[index].oweTqty<0?'red':'green'}"
          slot="actionFinishMark"
          slot-scope="text, record, index">
<!--          {{ dataSource[index].finishMark }}-->
          <div>
            {{ dataSource[index].finishMark=='N'?dataSource[index].oweTqty:undefined }}
          </div>

          <a-popover trigger="click" placement="left">
            <template slot="content">
              <a-table size="small"
                       :columns="sizeColumns1"
                       :pagination="false"
                       bordered
                       :dataSource="locArea">
              </a-table>
            </template>
            <a align="center" :title="areaMessage">
              <img width="24" height="24" v-if="dataSource[index].finishMark=='Y'" src="@/assets/boxFull.png">
              <img width="30" height="24" v-else-if="dataSource[index].finishMark=='N'" src="@/assets/boxEmpty.png">
              <img width="24" height="24" v-else src="@/assets/unknown.png">
            </a>
          </a-popover>


          <div align="center">
            {{ dataSource[index].满箱日期==undefined?'':dataSource[index].满箱日期 }}
          </div>
        </span>

        <!--------验货结果-------->
        <span
          :style="{color: dataSource[index].验货结果=='0'?'green':dataSource[index].验货结果=='1'?'red':dataSource[index].finishMark=='Y'?'blue':dataSource[index].finishMark=='N'?'GoldEnrod':'black'}"
          slot="actionInspectorDecision"
          slot-scope="text, record, index">
            <a-row>
              <a-col :xl="8">
                <a @click="handleStd(record)" :title="inspectStdMessage">
                  <img width="20" height="20" src="@/assets/standard.png">
                </a>
              </a-col>
              <a-col :xl="8" v-show="dataSource[index].验货结果=='0'||dataSource[index].验货结果=='1'">
                <a @click="handleReportMList(record)" :title="inspectReportMessage">
                  <img width="24" height="24" v-if="dataSource[index].验货结果=='0'" src="@/assets/accepted.png">
                  <img width="24" height="24" v-else-if="dataSource[index].验货结果=='1'" src="@/assets/rejected.png">
                </a>
              </a-col>
              <a-col :xl="8" v-show="dataSource[index].验货结果==undefined">
                <a @click="handleReportMAdd1(record, index)" :title="addReportMessage">
                  <img width="20" height="20" src="@/assets/add.png">
                </a>
              </a-col>
              <a-col :xl="8" v-show="dataSource[index].验货结果=='1'">
                <a @click="handleReportMRework1(record)" :title="add1ReportMessage">
                  <img width="20" height="20" src="@/assets/add1.png">
                </a>
              </a-col>
              <a-col :xl="8" v-show="dataSource[index].验货结果=='9'">
                <a @click="handleReportMList(record)" :title="toBeInspectMessage">
                  <img width="24" height="24" src="@/assets/toBeInspect.png">
                </a>
              </a-col>
              <!--              <a-col v-show="dataSource[index].验货结果=='0'||dataSource[index].验货结果=='1'" :span="12" :style="{textAlign: 'left'}">-->
              <!--                <a @click="handleReportMList(record)">-->
              <!--                  <img width="24" height="24" v-if="dataSource[index].验货结果=='0'||dataSource[index].验货结果=='1'"-->
              <!--                       src="@/assets/report.png">-->
              <!--                </a>-->
              <!--              </a-col>-->
            </a-row>
          <a-row>
            {{ dataSource[index].验货结果=='0'||dataSource[index].验货结果=='1'?dataSource[index].inspectDate:undefined }}
          </a-row>
        </span>

        <!--------出货状态-------->
        <span
          :style="{color: 'green'}"
          slot="actionShippedMark"
          slot-scope="text, record, index">
<!--          {{dataSource[index].出货状况 }}-->
          <div align="center">
            <img width="24" height="18" v-if="dataSource[index].出货状况=='Y'" src="@/assets/shipped.png">
            <img width="24" height="24" v-else-if="dataSource[index].出货状况=='N'" src="@/assets/shippedNo.png">
            <img width="24" height="24" v-else src="@/assets/unknown.png">
          </div>
          <div align="center">
            {{ dataSource[index].出货日期==undefined?'':dataSource[index].出货日期 }}
          </div>
        </span>
        <!--                <span slot="action" slot-scope="text, record">-->
        <!--                  <a @click="handleEdit(record)">编辑</a>-->

        <!--                  <a-divider type="vertical" />-->
        <!--                  <a-dropdown>-->
        <!--                    <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
        <!--                    <a-menu slot="overlay">-->
        <!--                      <a-menu-item>-->
        <!--                        <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
        <!--                          <a>删除</a>-->
        <!--                        </a-popconfirm>-->
        <!--                      </a-menu-item>-->
        <!--                    </a-menu>-->
        <!--                  </a-dropdown>-->
        <!--                </span>-->

      </a-table>

      <!--      <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"-->
      <!--              @change="changeTab">-->
      <!--        <a-tab-pane loading="true" tab="SIZE数量" key="1">-->
      <!--          <a-row>-->
      <!--            &lt;!&ndash;          <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">&ndash;&gt;-->
      <!--            <bar-->
      <!--              :dataSource="custOdrQty"-->
      <!--              yaxisText="SIZE数量"-->
      <!--              :height="height"/>-->
      <!--            &lt;!&ndash;          </a-col>&ndash;&gt;-->
      <!--          </a-row>-->
      <!--        </a-tab-pane>-->
      <!--      </a-tabs>-->

      <!--      <a-row>-->
      <!--        <a-col :span="24">-->
      <!--          <a-card :loading="loading" :bordered="false" title="SIZE数量" :style="{ marginTop: '24px' }">-->
      <!--            <a-row>-->
      <!--              <bar-->
      <!--                :dataSource="odrQty"-->
      <!--                yaxisText="SIZE数量"-->
      <!--                :height="height"/>-->
      <!--            </a-row>-->
      <!--          </a-card>-->
      <!--        </a-col>-->
      <!--      </a-row>-->

      <a-row>
        <a-col :span="24">
          <a-card :loading="loading" :bordered="false" title="半成品" :style="{ marginTop: '24px' }">
            <a-row>
              <a-col :span="6">
                <head-info title="IP派工时间" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="射出机台" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="射出最迟需上线时间" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="射出完成时间" content=""></head-info>
              </a-col>
            </a-row>
            <a-row :style="{ marginTop: '24px' }">
              <a-col :span="6">
                <head-info title="半成品入库满箱时间" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="转印最迟上线时间" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="转印完成" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <!--                                <head-info title="满箱入库时间" content="2020/08/08"></head-info>-->
              </a-col>
            </a-row>
            <a-row :style="{ marginTop: '24px' }">
              <a-col :span="6">
                <head-info title="针车最迟上线时间" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="针车完成" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <!--                <head-info title="可验货时间" content="2020/08/08"></head-info>-->
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-card :loading="loading" :bordered="false" title="成品" :style="{ marginTop: '24px' }">
            <a-row>
              <a-col :span="6">
                <head-info title="鞋部派工时间" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="合贴最迟上线时间" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="在线全检结果" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="合贴(成型扫描完成时间)" content=""></head-info>
              </a-col>
            </a-row>
            <a-row :style="{ marginTop: '24px' }">
              <a-col :span="6">
                <head-info title="组装最迟上线时间" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <head-info title="组装完成时间" content=""></head-info>
              </a-col>
              <a-col :span="6">
                <!--                <head-info title="转印完成" content="2020/07/20"></head-info>-->
              </a-col>
              <a-col :span="6">
                <!--                                <head-info title="满箱入库时间" content="2020/08/08"></head-info>-->
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>

      <!--      <a-row>-->
      <!--        <a-col :span="24">-->
      <!--          <a-card :loading="loading" :bordered="false" title="仓库与验货" :style="{ marginTop: '24px' }">-->
      <!--            <a-row>-->
      <!--              <a-col :span="6">-->
      <!--                <head-info title="入库欠数" :content="stockData==null ? '' : stockData.owe_qty"></head-info>-->
      <!--              </a-col>-->
      <!--              &lt;!&ndash;              <a-col :span="2">&ndash;&gt;-->
      <!--              &lt;!&ndash;                <a-spin class='circle-cust'>&ndash;&gt;-->
      <!--              &lt;!&ndash;                  <a-icon slot="indicator" type="environment" style="font-size: 24px"  />&ndash;&gt;-->
      <!--              &lt;!&ndash;                </a-spin>&ndash;&gt;-->
      <!--              &lt;!&ndash;              </a-col>&ndash;&gt;-->
      <!--              <a-col :span="6">-->
      <!--                <head-info title="满箱入库时间" :content="stockData==null ? null : stockData.in_date"></head-info>-->
      <!--              </a-col>-->
      <!--              &lt;!&ndash;              <a-col :span="2">&ndash;&gt;-->
      <!--              &lt;!&ndash;                <a-spin class='circle-cust'>&ndash;&gt;-->
      <!--              &lt;!&ndash;                  <a-icon slot="indicator" type="team" style="font-size: 24px"  />&ndash;&gt;-->
      <!--              &lt;!&ndash;                </a-spin>&ndash;&gt;-->
      <!--              &lt;!&ndash;              </a-col>&ndash;&gt;-->
      <!--              <a-col :span="6">-->
      <!--                <head-info title="可验货时间" :content="stockData==null ? null : stockData.in_date"></head-info>-->
      <!--              </a-col>-->
      <!--              &lt;!&ndash;              <a-col :span="2">&ndash;&gt;-->
      <!--              &lt;!&ndash;                <a-spin class='circle-cust'>&ndash;&gt;-->
      <!--              &lt;!&ndash;                  <a-icon slot="indicator" type="rise" style="font-size: 24px"  />&ndash;&gt;-->
      <!--              &lt;!&ndash;                </a-spin>&ndash;&gt;-->
      <!--              &lt;!&ndash;              </a-col>&ndash;&gt;-->
      <!--              <a-col :span="6">-->
      <!--                <head-info title="验货报告" :content="inspectReport"></head-info>-->
      <!--              </a-col>-->
      <!--              &lt;!&ndash;              <a-col :span="2">&ndash;&gt;-->
      <!--              &lt;!&ndash;                <a-spin class='circle-cust'>&ndash;&gt;-->
      <!--              &lt;!&ndash;                  <a-icon slot="indicator" type="environment" style="font-size: 24px"  />&ndash;&gt;-->
      <!--              &lt;!&ndash;                </a-spin>&ndash;&gt;-->
      <!--              &lt;!&ndash;              </a-col>&ndash;&gt;-->
      <!--            </a-row>-->
      <!--            <a-row :style="{ marginTop: '24px' }">-->
      <!--              <a-col :span="6">-->
      <!--                <head-info title="验货结果"></head-info>-->
      <!--                <div align="center">-->
      <!--                  <img v-if="inspectData.inspector_decision=='0'" src="@/assets/accepted.png">-->
      <!--                  <img v-else-if="inspectData.inspector_decision=='1'" src="@/assets/rejected.png">-->
      <!--                  <img v-else src="">-->
      <!--                </div>-->
      <!--                <h2-->
      <!--                  :style="{ textAlign: 'center', color: inspectData.inspector_decision=='0'?'green':inspectData.inspector_decision=='1'?'red':'white' }">-->
      <!--                  {{inspectData.inspector_decision=='0'?'接受':inspectData.inspector_decision=='1'?'拒绝':''}}</h2>-->
      <!--              </a-col>-->
      <!--              &lt;!&ndash;              <a-col :span="2">&ndash;&gt;-->
      <!--              &lt;!&ndash;                <a-spin class='circle-cust'>&ndash;&gt;-->
      <!--              &lt;!&ndash;                  <a-icon slot="indicator" type="team" style="font-size: 24px"  />&ndash;&gt;-->
      <!--              &lt;!&ndash;                </a-spin>&ndash;&gt;-->
      <!--              &lt;!&ndash;              </a-col>&ndash;&gt;-->
      <!--              <a-col :span="6">-->
      <!--                <head-info title="翻箱次数"-->
      <!--                           :content="inspectData == null ? '' : inspectData.rework_count >= '0' ? inspectData.rework_count : ''"></head-info>-->
      <!--              </a-col>-->
      <!--              &lt;!&ndash;              <a-col :span="2">&ndash;&gt;-->
      <!--              &lt;!&ndash;                <a-spin class='circle-cust'>&ndash;&gt;-->
      <!--              &lt;!&ndash;                  <a-icon slot="indicator" type="rise" style="font-size: 24px"  />&ndash;&gt;-->
      <!--              &lt;!&ndash;                </a-spin>&ndash;&gt;-->
      <!--              &lt;!&ndash;              </a-col>&ndash;&gt;-->
      <!--              <a-col :span="6">-->
      <!--                <head-info title="出货状态"-->
      <!--                           :content="stockData==null ? null : stockData.shp_status=='Y'?'已出货':'未出货'"></head-info>-->
      <!--              </a-col>-->
      <!--              &lt;!&ndash;              <a-col :span="2">&ndash;&gt;-->
      <!--              &lt;!&ndash;                <a-spin class='circle-cust'>&ndash;&gt;-->
      <!--              &lt;!&ndash;                  <a-icon slot="indicator" type="environment" style="font-size: 24px"  />&ndash;&gt;-->
      <!--              &lt;!&ndash;                </a-spin>&ndash;&gt;-->
      <!--              &lt;!&ndash;              </a-col>&ndash;&gt;-->
      <!--            </a-row>-->
      <!--            &lt;!&ndash;            <a-row>&ndash;&gt;-->
      <!--            &lt;!&ndash;              <a-col :span="6">&ndash;&gt;-->
      <!--            &lt;!&ndash;&lt;!&ndash;                <head-info title="满箱入库时间" content="2020/08/08"></head-info>&ndash;&gt;&ndash;&gt;-->
      <!--            &lt;!&ndash;              </a-col>&ndash;&gt;-->
      <!--            &lt;!&ndash;              <a-col :span="2">&ndash;&gt;-->
      <!--            &lt;!&ndash;                <a-spin class='circle-cust'>&ndash;&gt;-->
      <!--            &lt;!&ndash;&lt;!&ndash;                  <a-icon slot="indicator" type="team" style="font-size: 24px"  />&ndash;&gt;&ndash;&gt;-->
      <!--            &lt;!&ndash;                </a-spin>&ndash;&gt;-->
      <!--            &lt;!&ndash;              </a-col>&ndash;&gt;-->
      <!--            &lt;!&ndash;              <a-col :span="6">&ndash;&gt;-->
      <!--            &lt;!&ndash;&lt;!&ndash;                <head-info title="可验货时间" content="2020/08/08"></head-info>&ndash;&gt;&ndash;&gt;-->
      <!--            &lt;!&ndash;              </a-col>&ndash;&gt;-->
      <!--            &lt;!&ndash;              <a-col :span="2">&ndash;&gt;-->
      <!--            &lt;!&ndash;                <a-spin class='circle-cust'>&ndash;&gt;-->
      <!--            &lt;!&ndash;&lt;!&ndash;                  <a-icon slot="indicator" type="rise" style="font-size: 24px"  />&ndash;&gt;&ndash;&gt;-->
      <!--            &lt;!&ndash;                </a-spin>&ndash;&gt;-->
      <!--            &lt;!&ndash;              </a-col>&ndash;&gt;-->
      <!--            &lt;!&ndash;            </a-row>&ndash;&gt;-->
      <!--            &lt;!&ndash;            <line-chart-multid :fields="visitFields" :dataSource="visitInfo"></line-chart-multid>&ndash;&gt;-->
      <!--          </a-card>-->
      <!--        </a-col>-->
      <!--      </a-row>-->

    </div>

    <!-- 新增 -->
    <sampleInspectReportMAdd1-modal ref="reportMAdd1Modal" @refreshPage="refreshPage" :custOdrNo="custOdrNo"/>

    <!-- 翻箱 -->
    <sampleInspectReportMRework1-modal ref="reportMRework1Modal" @refreshPage="refreshPage" :custOdrNo="custOdrNo"/>

    <!-- table区域-end -->


    <!--    &lt;!&ndash; 表单区域 &ndash;&gt;-->
    <!--    <wholeProcessReport-modal ref="modalForm" @ok="modalFormOk"></wholeProcessReport-modal>-->
  </a-card>


</template>

<script>

  // $(document).ready(function(){
  //   $("p").click(function(){
  //     $(this).hide();
  //   });
  // });

  import WholeProcessReportModal from './modules/WholeProcessReportModal'
  import { GuoliListMixin } from '@/mixins/GuoliListMixin'
  import JDate from '@/components/jeecg/JDate'

  import ChartCard from '@/components/ChartCard'
  import ACol from 'ant-design-vue/es/grid/Col'
  import ATooltip from 'ant-design-vue/es/tooltip/Tooltip'
  import MiniArea from '@/components/chart/MiniArea'
  import MiniBar from '@/components/chart/MiniBar'
  import MiniProgress from '@/components/chart/MiniProgress'
  import RankList from '@/components/chart/RankList'
  import Bar from '@/components/chart/Bar'
  import Pie from '@/components/chart/Pie'
  import LineChartMultid from '@/components/chart/LineChartMultid'
  import HeadInfo from '@/components/tools/HeadInfo.vue'

  import Trend from '@/components/Trend'
  import AreaChartTy from '../../components/chart/AreaChartTy'
  import Radar from '../../components/chart/Radar'
  import Liquid from '../../components/chart/Liquid'
  import DashChartDemo from '../../components/chart/DashChartDemo'
  import IndexBar from '../../components/chart/IndexBar'
  import BarAndLine from '../../components/chart/BarAndLine'
  import BarMultid from '../../components/chart/BarMultid'
  import { getAction, postAction, deleteAction } from '../../api/manage'
  import { dateFormat } from '../../components/_util/dateFormat'

  import SampleInspectReportMAdd1Modal from '@/views/quality/modules/SampleInspectReportMAdd1Modal'
  import SampleInspectReportMRework1Modal from '@/views/quality/modules/SampleInspectReportMRework1Modal'
  import SampleInspectReportMList from '@/views/quality/SampleInspectReportMList'
  import SampleInspectStdList from '@/views/quality/SampleInspectStdList'


  import { getLoginfo, getVisitInfo } from '@/api/api'

  const sizeColumns = [
    {
      title: 'SIZE',
      dataIndex: 'x'
    },
    {
      title: '数量',
      dataIndex: 'y'
    }

  ]

  const sizeColumns1 = [
    {
      title: 'SIZE',
      dataIndex: 'x'
    },
    {
      title: '数量(存放地点)',
      dataIndex: 'y'
    }

  ]

  export default {
    name: 'WholeProcessReportList',
    mixins: [GuoliListMixin],
    components: {
      WholeProcessReportModal,
      BarAndLine,
      BarMultid,
      DashChartDemo,
      IndexBar,
      Liquid,
      Radar,
      Pie,
      AreaChartTy,
      ATooltip,
      ACol,
      ChartCard,
      MiniArea,
      MiniBar,
      MiniProgress,
      RankList,
      Bar,
      Trend,
      LineChartMultid,
      HeadInfo,
      getAction,
      postAction,
      deleteAction,
      JDate,
      SampleInspectReportMAdd1Modal,
      SampleInspectReportMRework1Modal,
      SampleInspectReportMList,
      SampleInspectStdList
    },
    data() {
      return {
        sizeColumns,
        sizeColumns1,
        value: 'today',
        description: '全流程表管理页面',
        custOdrQty: [
          { x: '19', y: 888 },
          { x: '21', y: 999 },
          { x: '23', y: 666 },
          { x: '25', y: 555 },
          { x: '27', y: 111 },
          { x: '29', y: 666 },
          { x: '31', y: 888 },
          { x: '33', y: 1000 }
        ],
        height: 180,
        odrQty: [],
        locArea: [],
        stockData: [],
        inspectReport: '',
        inspectData: [],
        factOdrNo: '',
        custOdrNo: '',
        sizeQtyMessage: '点击查看SIZE数量',
        areaMessage: '点击查看存放地点',
        inspectStdMessage: '点击查看验货抽检标准',
        inspectReportMessage: '点击查看验货报告',
        addReportMessage: '点击新增验货报告',
        add1ReportMessage: '点击新增翻箱验货报告',
        toBeInspectMessage: '点击开始验货',
        rowIndex: 0,
        // 表头
        columns: [
          // {
          //   title: '#',
          //   dataIndex: '',
          //   key:'rowIndex',
          //   width:60,
          //   align:"center",
          //   customRender:function (t,r,index) {
          //     return parseInt(index)+1;
          //   }
          //  },
          // {
          //      title: 'factNo',
          //      align:"center",
          //      dataIndex: 'factNo'
          //     },
          // {
          //      title: 'proDept',
          //      align:"center",
          //      dataIndex: 'proDept'
          //     },
          // {
          //      title: 'customNo',
          //      align:"center",
          //      dataIndex: 'customNo'
          //     },
          // {
          //   title: '接单日期',
          //   align: 'center',
          //   dataIndex: '接单日期',
          //   dataIndex: 'actionRevOdrDate',
          //   scopedSlots: { customRender: 'actionRevOdrDate' },
          // },
          // {
          //   title: '抵扣工厂订单',
          //   align: 'center',
          //   // dataIndex: '抵扣工厂订单',
          //   dataIndex: 'actionFactOdrNoOut',
          //   scopedSlots: { customRender: 'actionFactOdrNoOut' },
          // },
          {
            title: '工厂订单',
            align: 'center',
            // dataIndex: 'factOdrNoIn',
            dataIndex: 'actionFactOdrNoIn',
            scopedSlots: { customRender: 'actionFactOdrNoIn' }
          },
          {
            title: '客户订单',
            align: 'center',
            // dataIndex: '客户订单',
            dataIndex: 'actionCustOdrNo',
            scopedSlots: { customRender: 'actionCustOdrNo' }
          },
          {
            title: '订单交期',
            align: 'center',
            // dataIndex: '订单交期',
            dataIndex: 'actionCustReqDate',
            scopedSlots: { customRender: 'actionCustReqDate' }
          },
          // {
          //   title: '型体编号',
          //   align: 'center',
          //   // dataIndex: '型体编号',
          //   dataIndex: 'actionArticNo',
          //   scopedSlots: { customRender: 'actionArticNo' }
          // },
          // {
          //   title: '型体名称',
          //   align: 'center',
          //   // dataIndex: '型体名称',
          //   dataIndex: 'actionStyleNm',
          //   scopedSlots: { customRender: 'actionStyleNm' },
          // },
          // {
          //   title: '颜色',
          //   align: 'center',
          //   // dataIndex: '颜色',
          //   dataIndex: 'actionStyleColor',
          //   scopedSlots: { customRender: 'actionStyleColor' }
          // },
          {
            title: '订单类别',
            align: 'center',
            // dataIndex: '订单类别',
            dataIndex: 'actionOdrKind',
            scopedSlots: { customRender: 'actionOdrKind' }
          },
          {
            title: '目的地',
            align: 'center',
            // dataIndex: '目的地',
            dataIndex: 'actionCountry',
            scopedSlots: { customRender: 'actionCountry' }
          },
          {
            title: '订单数',
            align: 'center',
            // dataIndex: '订单数',
            dataIndex: 'actionSizeQty',
            scopedSlots: { customRender: 'actionSizeQty' }
          },
          {
            title: '满箱状态',
            align: 'center',
            // dataIndex: 'finishMark',
            dataIndex: 'actionFinishMark',
            scopedSlots: { customRender: 'actionFinishMark' }
            // filters: [
            //   {
            //     text: '已满箱',
            //     value: 'Y',
            //   },
            //   {
            //     text: '未满箱',
            //     value: 'N',
            //   },
            // ],
            // // filterMultiple: false,
            // // filteredValue: filteredInfo.finishMark || null,
            // onFilter: (value, record) => {
            //   return record.finishMark.includes(value)
            // }
          },
          {
            title: '验货结果',
            align: 'center',
            // dataIndex: '验货结果',
            dataIndex: 'actionInspectorDecision',
            scopedSlots: { customRender: 'actionInspectorDecision' }
          },
          {
            title: '出货状态',
            align: 'center',
            // dataIndex: '出货状态',
            dataIndex: 'actionShippedMark',
            scopedSlots: { customRender: 'actionShippedMark' }

          }
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align:"center",
          //   scopedSlots: { customRender: 'action' },
          // }
        ],
        url: {
          list: '/order/wholeProcessReport/list',
          delete: '/order/wholeProcessReport/delete',
          deleteBatch: '/order/wholeProcessReport/deleteBatch',
          exportXlsUrl: 'order/wholeProcessReport/exportXls',
          importExcelUrl: 'order/wholeProcessReport/importExcel',
          getSizeQty: '/order/wholeProcessReport/getSizeQty',
          getLocArea: '/order/wholeProcessReport/getLocArea',
          getStockData: '/order/wholeProcessReport/getStockData',
          getInspectReport: '/order/wholeProcessReport/getInspectReport',
          insertReportM: '/quality/sampleInspectReportM/insertReportM',
          insertReportD: '/quality/sampleInspectReportM/insertReportD'
        }
      }
    },

    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }

    },
    methods: {

      refreshPage() {
        // this.queryOrder(this.value)
        console.log(`当前行1：${this.rowIndex}`)
        this.dataSource[this.rowIndex].验货结果 = '9'
        console.log(`当前行2：${this.dataSource[this.rowIndex].验货结果}`)
        this.$forceUpdate()
      },

      reportMListOk() {
      },

      handleReportMAdd1: function(record, index) {
        if (record.oweTqty < 0) {
          this.$message.warn('订单未满箱，不能新增验货报告！')
          return
        }
        this.custOdrNo = record.客户订单
        this.$refs.reportMAdd1Modal.add()
      },

      handleReportMRework1: function(record) {
        this.custOdrNo = record.客户订单
        console.log(`客户订单：${this.custOdrNo}`)
        this.$refs.reportMRework1Modal.add()
      },

      // handleRportMRpt: function(record) {
      //   this.custOdrNo = record.客户订单;
      //   this.$router.push({ name: 'quality-SampleInspectReportM', params: {custOdrNo: this.custOdrNo}})
      // },

      handleReportMList: function(record) {
        this.custOdrNo = record.客户订单
        this.$router.push({ name: 'quality-SampleInspectReportM', params: { custOdrNo: this.custOdrNo } })
      },

      handleStd: function(record) {
        this.factOdrNo = record.factOdrNoIn
        this.$router.push({ name: 'quality-SampleInspectStd', params: { factOdrNo: this.factOdrNo } })
      },

      onClickRow(record, index) {
        return {
          on: {
            click: () => {
              let keys = []
              keys.push(record.factOdrNoIn)
              this.selectedRowKeys = keys
              this.rowIndex = index
              this.getSizeQty(this.selectedRowKeys)
              this.getLocArea(this.selectedRowKeys)
              this.getStockData(this.selectedRowKeys)
              this.getInspectReport(record.客户订单)
            }
          }
        }
      },

      // 将【工厂订单】传给后端，获取【SIZE】、【数量】
      getSizeQty(currentKey) {
        let pssr = currentKey.toString().trim()
        getAction(this.url.getSizeQty, { pssr: pssr }).then((res) => {
          if (res.success) {
            this.odrQty = JSON.parse(JSON.stringify(res.result).replace(/size_no/g, 'x').replace(/odr_qty/g, 'y'))
            // console.log(`工厂订单：${this.odrQty}`)
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
          // this.loadData()
          this.loading = false
        })
      },

      // 将【工厂订单】传给后端，获取【SIZE】、【存放区域】
      getLocArea(currentKey) {
        let pssr = currentKey.toString().trim()
        getAction(this.url.getLocArea, { pssr: pssr }).then((res) => {
          if (res.success) {
            this.locArea = JSON.parse(JSON.stringify(res.result).replace(/size_no/g, 'x').replace(/loc_area/g, 'y'))
            // console.log(`工厂订单：${this.locArea}`)
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
          // this.loadData()
          this.loading = false
        })
      },

      // 将【工厂订单】传给后端，获取【入库欠数】、【满箱入库时间】/【可验货时间】、【出货状态】
      getStockData(currentKey) {
        let pssr = currentKey.toString().trim()
        getAction(this.url.getStockData, { pssr: pssr }).then((res) => {
          if (res.success) {
            // this.stockData = JSON.parse(JSON.stringify(res.result));
            this.stockData = res.result
            console.log(`入库欠数：${this.stockData.owe_qty}`)
            console.log(`满箱入库时间：${this.stockData.in_date}`)
            console.log(`出货状态：${this.stockData.shp_status}`)
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
          // this.loadData()
          this.loading = false
        })
      },

      // 将【工厂订单】传给后端，获取【验货报告】、【验货结果】、【翻箱次数】
      getInspectReport(currentKey) {
        let pssr = currentKey.toString().trim()
        getAction(this.url.getInspectReport, { pssr: pssr }).then((res) => {
          if (res.success) {
            console.log(`验货报告：${res.result}`)
            if (res.result == null) {
              this.inspectReport = '无'
              this.inspectData = []
            } else {
              this.inspectReport = '有'
              this.inspectData = res.result
              console.log(`验货结果：${this.inspectData.inspector_decision}`)
              console.log(`翻箱次数：${this.inspectData.rework_count}`)
            }
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
          // this.loadData()
          this.loading = false
        })
        this.$forceUpdate()
      },

      queryOrder(dates) {
        this.value = dates
        this.queryParam.接单日期_begin = ''
        this.queryParam.接单日期_end = ''
        this.queryParam.factOdrNoIn = ''
        this.queryParam.接单日期 = ''
        this.queryParam.抵扣工厂订单 = ''
        this.queryParam.finishMark = ''
        let startDate = new Date()
        let endDate = new Date()
        if (dates == 'finishNoTwoDays') {
          this.queryParam.订单交期_begin = ''
          this.queryParam.订单交期_end = ''
          this.queryParam.finishNoTwoDays = 'Y'
          this.searchQuery()
        } else if (dates == 'today') {
          startDate = dateFormat('yyyyMMdd', startDate)
          this.queryParam.订单交期_begin = startDate
          this.queryParam.订单交期_end = startDate
          this.queryParam.finishNoTwoDays = ''
          this.searchQuery()
        } else if (dates == 'oneWeek') {
          startDate = dateFormat('yyyyMMdd', startDate)
          this.queryParam.订单交期_begin = startDate
          endDate.setDate(endDate.getDate() + 7)
          endDate = dateFormat('yyyyMMdd', endDate)
          this.queryParam.订单交期_end = endDate
          this.queryParam.finishNoTwoDays = ''
          this.searchQuery()
        } else if (dates == 'twoWeeks') {
          startDate = dateFormat('yyyyMMdd', startDate)
          this.queryParam.订单交期_begin = startDate
          endDate.setDate(endDate.getDate() + 14)
          endDate = dateFormat('yyyyMMdd', endDate)
          this.queryParam.订单交期_end = endDate
          this.queryParam.finishNoTwoDays = ''
          this.searchQuery()
        } else if (dates == 'month') {
          startDate = dateFormat('yyyyMMdd', startDate)
          this.queryParam.订单交期_begin = startDate
          endDate.setMonth(endDate.getMonth() + 1)
          endDate = dateFormat('yyyyMMdd', endDate)
          this.queryParam.订单交期_end = endDate
          this.queryParam.finishNoTwoDays = ''
          this.searchQuery()
        } else if (dates == 'all') {
          // startDate = dateFormat('yyyyMMdd', startDate);
          this.queryParam.订单交期_begin = ''
          // endDate.setMonth(endDate.getMonth() + 1);
          // endDate = dateFormat('yyyyMMdd', endDate);
          this.queryParam.订单交期_end = ''
          this.queryParam.finishNoTwoDays = ''
          this.searchQuery()
        }
      },

      searchReset() {
        this.value = 'all'
        this.queryParam = {}
        this.searchQuery()
      }

    },

    created() {
      this.queryOrder('today')
      this.loadData()
    }

  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>