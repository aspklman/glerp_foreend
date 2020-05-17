<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item :label="$t('profactm.proFact')">
              <!--              <a-select-->
              <!--                :placeholder="$t('common.pleaseSelect') + $t('profactm.proFact')"-->
              <!--                v-model="queryParam.proFact"-->
              <!--                defaultValue="U"-->
              <!--                @change="getBadNoQty" >-->
              <!--                <a-select-option value="U">U.新材鞋部</a-select-option>-->
              <!--                <a-select-option value="D">D.大罗沙鞋部</a-select-option>-->
              <!--              </a-select>-->
              <!--              <a-input v-model="queryParam.proFact" ></a-input>-->
              <!--              <j-dict-select-tag :placeholder="$t('common.pleaseSelect') + $t('profactm.proFact')"-->
              <!--                                 v-model="queryParam.proFact"-->
              <!--                                 @change="getBadNoQty"-->
              <!--                                 :dictCode="this.$i18n.locale=='vi-VN' ? 'pro_fact_vn' : 'pro_fact_cn'"/>-->
              <j-dict-select-tag v-if="this.$i18n.locale=='zh-CN'"
                                 :placeholder="$t('common.pleaseSelect') + $t('profactm.proFact')"
                                 v-model="queryParam.proFact"
                                 @change="getBadNoQty"
                                 dictCode="pro_fact_cn" />
              <j-dict-select-tag v-else-if="this.$i18n.locale=='en-US'"
                                 :placeholder="$t('common.pleaseSelect') + $t('profactm.proFact')"
                                 v-model="queryParam.proFact"
                                 @change="getBadNoQty"
                                 dictCode="pro_fact_en" />
              <j-dict-select-tag v-else-if="this.$i18n.locale=='vi-VN'"
                                 :placeholder="$t('common.pleaseSelect') + $t('profactm.proFact')"
                                 v-model="queryParam.proFact"
                                 @change="getBadNoQty"
                                 dictCode="pro_fact_vn" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item :label="$t('stylem.style')">
              <j-select-stylem v-model="queryParam.styleNo" @change="getBadNoQty"/>
              <!--              <a-input :placeholder="$t('common.pleaseInput') + $t('common.styleNo')" v-model="queryParam.styleNo" @change="getBadNoQty"></a-input>-->
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item :label="$t('sec.sec')">
              <j-select-sec v-model="queryParam.secNo" @change="getBadNoQty" />
              <!--                <a-input placeholder="请输入组别" v-model="queryParam.secNo"></a-input>-->
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item :label="$t('common.recDate')">
              <j-date
                :placeholder="$t('common.pleaseSelect') + $t('common.recDate')"
                v-model="queryParam.recDate"
                @change="getBadNoQty"/>
              <!--                <a-input placeholder="请输入日期" v-model="queryParam.recDate" value="2020-04-02"></a-input>-->
            </a-form-item>
          </a-col>

          <!--          <template v-if="toggleSearchStatus">-->

          <!--            &lt;!&ndash;        <a-col :md="6" :sm="8">&ndash;&gt;-->
          <!--            &lt;!&ndash;            <a-form-item label="原因编号">&ndash;&gt;-->
          <!--            &lt;!&ndash;              <a-input placeholder="请输入原因编号" v-model="queryParam.badNo"></a-input>&ndash;&gt;-->
          <!--            &lt;!&ndash;            </a-form-item>&ndash;&gt;-->
          <!--            &lt;!&ndash;          </a-col>&ndash;&gt;-->
          <!--            &lt;!&ndash;          <a-col :md="6" :sm="8">&ndash;&gt;-->
          <!--            &lt;!&ndash;            <a-form-item label="中文原因说明">&ndash;&gt;-->
          <!--            &lt;!&ndash;              <a-input placeholder="请输入中文原因说明" v-model="queryParam.badCause"></a-input>&ndash;&gt;-->
          <!--            &lt;!&ndash;            </a-form-item>&ndash;&gt;-->
          <!--            &lt;!&ndash;          </a-col>&ndash;&gt;-->
          <!--            &lt;!&ndash;          <a-col :md="6" :sm="8">&ndash;&gt;-->
          <!--            &lt;!&ndash;            <a-form-item label="异动人">&ndash;&gt;-->
          <!--            &lt;!&ndash;              <a-input placeholder="请输入异动人" v-model="queryParam.userNo"></a-input>&ndash;&gt;-->
          <!--            &lt;!&ndash;            </a-form-item>&ndash;&gt;-->
          <!--            &lt;!&ndash;          </a-col>&ndash;&gt;-->
          <!--          </template>-->
          <!--          <a-col :md="6" :sm="8">-->
          <!--            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">-->
          <!--&lt;!&ndash;              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>&ndash;&gt;-->
          <!--              &lt;!&ndash;              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>&ndash;&gt;-->
          <!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
          <!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
          <!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
          <!--              </a>-->
          <!--            </span>-->
          <!--          </a-col>-->

        </a-row>
      </a-form>
    </div>

    <!--    &lt;!&ndash; 操作按钮区域 &ndash;&gt;-->
    <!--    <div class="table-operator">-->
    <!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
    <!--      <a-button type="primary" icon="download" @click="handleExportXls('成型品质管理')">导出</a-button>-->
    <!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
    <!--        <a-button type="primary" icon="import">导入</a-button>-->
    <!--      </a-upload>-->
    <!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
    <!--        <a-menu slot="overlay">-->
    <!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
    <!--        </a-menu>-->
    <!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
    <!--      </a-dropdown>-->
    <!--    </div>-->

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <a-row type="flex" justify="space-between" style="margin-bottom: 5px;">
          <a-col :span="8" :gutter="7">
            <span>{{$t('badReason.rework')}}： {{rework}}</span>
            <!--            <i class="anticon anticon-info-circle ant-alert-icon"></i> 返修： <a style="font-weight: 600">{{rework}}</a>-->
          </a-col>
          <a-col :span="8" :gutter="7">
            <span>{{$t('badReason.gradeB')}}： {{gradeB}}</span>
            <!--            <i class="anticon anticon-info-circle ant-alert-icon"></i> B级： <a style="font-weight: 600">{{gradeB}}</a>-->
          </a-col>
          <a-col :span="8" :gutter="7">
            <span>{{$t('badReason.gradeC')}}： {{gradeC}}</span>
            <!--            <i class="anticon anticon-info-circle ant-alert-icon"></i> C级： <a style="font-weight: 600">{{gradeC}}</a>-->
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-between">
          <a-col :span="8" :gutter="7">
            <span>{{$t('badReason.forePart')}}： {{forepart}}</span>
            <!--            <i class="anticon anticon-info-circle ant-alert-icon"></i> 前段不良： <a style="font-weight: 600">{{forepart}}</a>-->
          </a-col>
          <a-col :span="8" :gutter="7">
            <span>{{$t('badReason.midPiece')}}： {{midpiece}}</span>
            <!--            <i class="anticon anticon-info-circle ant-alert-icon"></i> 中段不良： <a style="font-weight: 600">{{midpiece}}</a>-->
          </a-col>
          <a-col :span="8" :gutter="7">
            <span>{{$t('badReason.ttl')}}： {{ttl}}</span>
            <!--            <i class="anticon anticon-info-circle ant-alert-icon"></i> 合计： <a style="font-weight: 600">{{ttl}}</a>-->
          </a-col>
        </a-row>
        <!--        <div>-->
        <!--          <i class="anticon anticon-info-circle ant-alert-icon"></i> 返修： <a style="font-weight: 600">{{rework}}</a>-->
        <!--          <i class="anticon anticon-info-circle ant-alert-icon"></i> B级： <a style="font-weight: 600">{{gradeB}}</a>-->
        <!--          <i class="anticon anticon-info-circle ant-alert-icon"></i> C级： <a style="font-weight: 600">{{gradeC}}</a>-->
        <!--        </div>-->
        <!--        <div>-->
        <!--          <i class="anticon anticon-info-circle ant-alert-icon"></i> 前段不良： <a style="font-weight: 600">{{forepart}}</a>-->
        <!--          <i class="anticon anticon-info-circle ant-alert-icon"></i> 中段不良： <a style="font-weight: 600">{{midpiece}}</a>-->
        <!--          <i class="anticon anticon-info-circle ant-alert-icon"></i> 合计： <a style="font-weight: 600">{{ttl}}</a>-->
        <!--        </div>-->
      </div>
      <!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
      <!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项-->
      <!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
      <!--      </div>-->

      <a-list v-if="this.$i18n.locale=='zh-CN'"
              ref="table"
              size="small"
              rowKey="id"
              :columns="columns"
              :grid="{ gutter: 16, column: 2 }"
              :dataSource="dataSource"
              :pagination="false"
              :loading="loading">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-card :title="item.badCause">
            <span slot="extra">{{ badQty[index] }}</span>
            <a-button-group style="padding-left: 20px" slot="extra">
              <a-button type="primary"
                        @click="addQty(index, item.badLevel, item.badCause, item.badCauseEn, item.badCauseVn)">
                <a-icon type="plus-circle"/>
              </a-button>
              <a-button type="primary"
                        @click="reduceQty(index, item.badLevel, item.badCause, item.badCauseEn, item.badCauseVn)">
                <a-icon type="minus-circle"/>
              </a-button>
            </a-button-group>
          </a-card>
        </a-list-item>
      </a-list>
      <a-list v-else-if="this.$i18n.locale=='en-US'"
              ref="table"
              size="small"
              rowKey="id"
              :columns="columns"
              :grid="{ gutter: 16, column: 2 }"
              :dataSource="dataSource"
              :pagination="false"
              :loading="loading">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-card :title="item.badCauseEn">
            <span slot="extra">{{ badQty[index] }}</span>
            <a-button-group style="padding-left: 20px" slot="extra">
              <a-button type="primary"
                        @click="addQty(index, item.badLevel, item.badCause, item.badCauseEn, item.badCauseVn)">
                <a-icon type="plus-circle"/>
              </a-button>
              <a-button type="primary"
                        @click="reduceQty(index, item.badLevel, item.badCause, item.badCauseEn, item.badCauseVn)">
                <a-icon type="minus-circle"/>
              </a-button>
            </a-button-group>
          </a-card>
        </a-list-item>
      </a-list>
      <a-list v-else-if="this.$i18n.locale=='vi-VN'"
              ref="table"
              rowKey="id"
              :columns="columns"
              :grid="{ gutter: 16, column: 2 }"
              :dataSource="dataSource"
              :pagination="false"
              :loading="loading">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-card :title="item.badCauseVn">
            <span slot="extra">{{ badQty[index] }}</span>
            <a-button-group style="padding-left: 20px" slot="extra">
              <a-button type="primary"
                        @click="addQty(index, item.badLevel, item.badCause, item.badCauseEn, item.badCauseVn)">
                <a-icon type="plus-circle"/>
              </a-button>
              <a-button type="primary"
                        @click="reduceQty(index, item.badLevel, item.badCause, item.badCauseEn, item.badCauseVn)">
                <a-icon type="minus-circle"/>
              </a-button>
            </a-button-group>
          </a-card>
        </a-list-item>
      </a-list>

      <!--      <a-table-->
      <!--        ref="table"-->
      <!--        size="middle"-->
      <!--        bordered-->
      <!--        rowKey="id"-->
      <!--        :showHeader="false"-->
      <!--        :columns="columns"-->
      <!--        :dataSource="dataSource"-->
      <!--        :pagination="ipagination"-->
      <!--        :loading="loading"-->
      <!--        @change="handleTableChange">-->

      <!--        <span slot="action" slot-scope="text, record">-->
      <!--          <a @click="handleEdit(record)">编辑</a>-->

      <!--          <a-divider type="vertical"/>-->
      <!--          <a-dropdown>-->
      <!--            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>-->
      <!--            <a-menu slot="overlay">-->
      <!--              <a-menu-item>-->
      <!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
      <!--                  <a>删除</a>-->
      <!--                </a-popconfirm>-->
      <!--              </a-menu-item>-->
      <!--            </a-menu>-->
      <!--          </a-dropdown>-->
      <!--        </span>-->

      <!--      </a-table>-->
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <formQltyMgmt-modal ref="modalForm" @ok="modalFormOk"></formQltyMgmt-modal>
  </a-card>
</template>

<script>
  import FormQltyMgmtModal from './modules/FormQltyMgmtModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import JSelectStylem from '@/components/jeecgbiz/JSelectStylem'
  import JSelectSec from '@/components/jeecgbiz/JSelectSec'
  import JDate from '@/components/jeecg/JDate'
  import { getAction, postAction, deleteAction } from '../../api/manage'

  export default {
    name: 'FormQltyMgmtList',
    mixins: [JeecgListMixin],
    components: {
      FormQltyMgmtModal,
      JDictSelectTag,
      JSelectStylem,
      JSelectSec,
      JDate,
      getAction,
      postAction,
      deleteAction
    },
    data() {
      return {
        rework: 0,
        gradeB: 0,
        gradeC: 0,
        forepart: 0,
        midpiece: 0,
        ttl: 0,             //不良数合计
        badLevel: [],       //不良等级
        badQty: [],         //不良数量
        badLevelQty: [],    //从后台获取到的【不良等级】与【不良数】
        colValue: [],       //用户选择的搜索条件值(厂别、型体、组别、日期)
        description: '成型品质管理管理页面',
        validatorRules: {
          recDate: {
            rules: [{ required: true, message: '请选择日期' }],
            // initialValue: '2020-04-02'
            initialValue: ((new Date()).getFullYear().toString()) + (((new Date()).getMonth() + 1 < 10) ? ('0' + ((new Date()).getMonth() + 1).toString()) : (((new Date()).getMonth() + 1).toString())) + (((new Date()).getDate() < 10) ? ('0' + (new Date()).getDate().toString()) : ((new Date()).getDate().toString()))
          }
        },
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
          {
            title: '厂别',
            align: 'center',
            dataIndex: 'proFact'
          },
          {
            title: '不良等级',
            align: 'center',
            dataIndex: 'badLevel'
          },
          {
            title: '原因编号',
            align: 'center',
            dataIndex: 'badNo'
          },
          {
            title: '中文原因说明',
            align: 'center',
            dataIndex: 'badCause'
          },
          {
            title: '英文原因说明',
            align: 'center',
            dataIndex: 'badCauseEn'
          },
          {
            title: '越文原因说明',
            align: 'center',
            dataIndex: 'badCauseVn'
          },
          {
            title: '日期',
            align: 'center',
            dataIndex: 'recDate'
          }
          // {
          //   title: '不良数量',
          //   align: 'center',
          //   dataIndex: 'badQty',
          // },
          // {
          //      title: '异动时间',
          //      align:"center",
          //      dataIndex: 'modifyDt'
          //     },
          // {
          //      title: '英文原因说明',
          //      align:"center",
          //      dataIndex: 'badCauseEn'
          //     },
          //    {
          //      title: '操作',
          //      dataIndex: 'action',
          //      align:"center",
          //      scopedSlots: { customRender: 'action' },
          //    }
        ],
        url: {
          list: '/scan/formQltyMgmt/list',
          getBadNoQty: '/scan/formQltyMgmt/getBadNoQty',
          insertBadNoQty: '/scan/formQltyMgmt/insertBadNoQty',
          deleteBadNoQty: '/scan/formQltyMgmt/deleteBadNoQty',
          delete: '/scan/formQltyMgmt/delete',
          deleteBatch: '/scan/formQltyMgmt/deleteBatch',
          exportXlsUrl: 'scan/formQltyMgmt/exportXls',
          importExcelUrl: 'scan/formQltyMgmt/importExcel'
        }
      }
    },

    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      },

      //根据查询参数获取不良名称及不良数
      getBadNoQty() {
        let that=this
        if (!this.url.getBadNoQty) {
          this.$message.error('请设置url.getBadNoQty属性!')
          return
        }
        let p = this.getQueryParams()     //查询条件
        let pp = new Array(4)             //存储用户选择的查询条件值：【厂别】、【型体】、【组别】、【日期】
        Object.keys(p).forEach(function(key) {
          if (key == 'proFact') {
            pp[0] = p[key]
          } else if (key == 'styleNo') {
            pp[1] = p[key].trim()
          } else if (key == 'secNo') {
            pp[2] = p[key]
          } else if (key == 'recDate') {
            pp[3] = p[key].slice(0, 4) + p[key].slice(5, 7) + p[key].slice(8)
          }
        })
        // //当用户选择了所有查询条件时，才执行后台数据查询
        // for (let i = 1; i < pp.length; i++) {
        //   if (pp[i] == null || pp[i] == undefined || pp[i] == '') {
        //     // 4个查询条件中有任何一个值为null，则将所有不良数设置为null
        //     for (let j = 0; j < this.badQty.length; j++) {
        //       this.badQty[j] = null
        //     }
        //     return
        //   }
        // }
        this.colValue = pp
        let pssr = pp.toString()
        getAction(this.url.getBadNoQty, { pssr: pssr }).then((res) => {
          if (res.success) {
            this.rework = 0
            this.gradeB = 0
            this.gradeC = 0
            this.forepart = 0
            this.midpiece = 0
            this.ttl = 0
            let levelQty = res.result.toString()          //获取查询结果，包含【不良等级】、【不良数量】
            this.badLevelQty = levelQty.split(',')
            for (let i = 0; i < this.badLevelQty.length; i++) {
              let levelQtyTemp = this.badLevelQty[i]
              let tmp = levelQtyTemp.split('-')
              this.badLevel[i] = tmp[0]                   //不良等级
              this.badQty[i] = parseFloat(tmp[1])         //不良数量
              if (this.badLevel[i] == '返修') {
                this.rework = this.rework + this.badQty[i]
              } else if (this.badLevel[i] == '前段不良') {
                this.forepart = this.forepart + this.badQty[i]
              } else if (this.badLevel[i] == '中段不良') {
                this.midpiece = this.midpiece + this.badQty[i]
              } else if (this.badLevel[i] == 'B级') {
                this.gradeB = this.gradeB + this.badQty[i]
              } else if (this.badLevel[i] == 'C级') {
                this.gradeC = this.gradeC + this.badQty[i]
              }
              this.ttl += this.badQty[i]
            }
            this.$forceUpdate()
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
          this.loadData()
          this.loading = false
        })
      },
    },

    methods: {


      // 点击"+"号增加不良数量
      addQty(index, badLevel, badCause, badCauseEn, badCauseVn) {
        let qty = this.badQty[index]          // 当前点击项之不良数
        //未显示数量，返回
        if (qty == undefined) {
          return
        }
        //返修：增加1
        // 前段不良、中段不良、B级、C级：增加0.5
        let offsetValue = 0
        if (badLevel == '返修') {
          offsetValue = 1
        } else {
          offsetValue = 0.5
        }
        this.badQty[index] = qty + offsetValue      //增加点击项不良数
        if (badLevel == '返修') {                   //增加返修
          this.rework += offsetValue
        } else {                                    //增加前段不良、中段不良、B级、C级
          if (badLevel == '前段不良') {
            this.forepart += offsetValue
          } else if (badLevel == '中段不良') {
            this.midpiece += offsetValue
          } else if (badLevel == 'B级') {
            this.gradeB += offsetValue
          } else if (badLevel == 'C级') {
            this.gradeC += offsetValue
          }
        }
        this.ttl += offsetValue                     //增加合计
        // 提示信息国际化
        if (this.$i18n.locale == 'zh-CN') {
          this.$message.success(`${badCause} +${offsetValue}`)
        } else if (this.$i18n.locale == 'en-US') {
          this.$message.success(`${badCauseEn} +${offsetValue}`)
        } else if (this.$i18n.locale == 'vi-VN') {
          this.$message.success(`${badCauseVn} +${offsetValue}`)
        }
        let insertParams = this.colValue
        insertParams[4] = badLevel
        insertParams[5] = badCause
        insertParams[6] = offsetValue
        let pssrbba = insertParams.toString()
        //后台插入不良数据
        getAction(this.url.insertBadNoQty, { pssrbba: pssrbba }).then((res) => {
          if (res.success) {
            console.log('插入成功！')
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
          this.loadData()
          this.loading = false
        })
        //强制刷新数组
        this.$forceUpdate()
      },

      // 点击"-"号减少不良数量
      reduceQty(index, badLevel, badCause, badCauseEn, badCauseVn) {
        let qty = this.badQty[index]    // 当前点击项之不良数
        //未显示数量，返回
        if (qty == undefined) {
          return
        }
        // 返修：减少1
        // 前段不良、中段不良、B级、C级：减少0.5
        let offsetValue = 0
        if (badLevel == '返修') {
          offsetValue = 1
        } else {
          offsetValue = 0.5
        }
        // 提示“数量不能为负数”
        if (qty - offsetValue < 0) {
          this.$message.warn(this.$t('stgscanMolding.noMinus') + '!')
          return
        }
        this.badQty[index] = qty - offsetValue            //减少点击项不良数
        if (badLevel == '返修') {                         //减少返修
          this.rework -= offsetValue
        } else {                                          //减少前段不良、中段不良、B级、C级
          if (badLevel == '前段不良') {
            this.forepart -= offsetValue
          } else if (badLevel == '中段不良') {
            this.midpiece -= offsetValue
          } else if (badLevel == 'B级') {
            this.gradeB -= offsetValue
          } else if (badLevel == 'C级') {
            this.gradeC -= offsetValue
          }
        }
        this.ttl -= offsetValue                 //减少合计
        // 提示信息国际化
        if (this.$i18n.locale == 'zh-CN') {
          this.$message.success(`${badCause} -${offsetValue}`)
        } else if (this.$i18n.locale == 'en-US') {
          this.$message.success(`${badCauseEn} -${offsetValue}`)
        } else if (this.$i18n.locale == 'vi-VN') {
          this.$message.success(`${badCauseVn} -${offsetValue}`)
        }
        let deleteParams = this.colValue
        deleteParams[4] = badCause
        let pssrb = deleteParams.toString()
        //后台删除不良数据
        getAction(this.url.deleteBadNoQty, { pssrb: pssrb }).then((res) => {
          if (res.success) {
            console.log('删除成功！')
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
          this.loadData()
          this.loading = false
        })
        this.$forceUpdate()
      }
    },

    mounted() {
      this.ipagination.pageSize = 30
      this.loadData()
    }

  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>