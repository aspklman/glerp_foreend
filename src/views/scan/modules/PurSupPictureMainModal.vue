<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <!-- 主表单区域 -->
      <a-form :form="form">
        <a-row>
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="公司编号">-->
<!--              <a-input placeholder="请输入公司编号" v-decorator="['factNo', validatorRules.factNo ]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="SKU">
              <a-input placeholder="请输入SKU" v-decorator="['sku', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :hidden="true"
              label="SKU基础资料ID">
              <a-input placeholder="请输入SKU基础资料ID" v-decorator="['id', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="7" :gutter="8">

          </a-col>
        </a-row>
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="SPU">-->
<!--              <a-input placeholder="请输入SPU" v-decorator="['spu', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="EAN">-->
<!--              <a-input placeholder="请输入EAN" v-decorator="['ean', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="质检标准">-->
<!--              <a-input placeholder="请输入质检标准" v-decorator="['qualityInspectStd', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="所属分类类目">-->
<!--              <a-input placeholder="请输入所属分类类目" v-decorator="['classification', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="开发序列号">-->
<!--              <a-input placeholder="请输入开发序列号" v-decorator="['developSn', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="开发链接">-->
<!--              <a-input placeholder="请输入开发链接" v-decorator="['developLink', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="状态">-->
<!--              <a-input placeholder="请输入状态" v-decorator="['status', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="SKU采购名称">-->
<!--              <a-input placeholder="请输入SKU采购名称" v-decorator="['skuPurchaseNm', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="英文名称">-->
<!--              <a-input placeholder="请输入英文名称" v-decorator="['engNm', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="速卖通英文名称">-->
<!--              <a-input placeholder="请输入速卖通英文名称" v-decorator="['engNmSmt', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="速卖通最佳LISTING">-->
<!--              <a-input placeholder="请输入速卖通最佳LISTING" v-decorator="['bestListingSmt', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="EBAY最佳LISTING">-->
<!--              <a-input placeholder="请输入EBAY最佳LISTING" v-decorator="['bestListingEbay', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="长(自带包装)">-->
<!--              <a-input placeholder="请输入长(自带包装)" v-decorator="['netLength', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="宽(自带包装)">-->
<!--              <a-input placeholder="请输入宽(自带包装)" v-decorator="['netWidth', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="高(自带包装)">-->
<!--              <a-input placeholder="请输入高(自带包装)" v-decorator="['netHeight', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="长(打包后)">-->
<!--              <a-input placeholder="请输入长(打包后)" v-decorator="['grossLength', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="宽(打包后)">-->
<!--              <a-input placeholder="请输入宽(打包后)" v-decorator="['grossWidth', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="高(打包后)">-->
<!--              <a-input placeholder="请输入高(打包后)" v-decorator="['grossHeight', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="SKU物流属性">-->
<!--              <a-input placeholder="请输入SKU物流属性" v-decorator="['wlAttribute', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="海关编码">-->
<!--              <a-input placeholder="请输入海关编码" v-decorator="['customsCode', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="税率">-->
<!--              <a-input placeholder="请输入税率" v-decorator="['taxRate', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="参考价">-->
<!--              <a-input placeholder="请输入参考价" v-decorator="['refPrice', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="重量(自带包装)">-->
<!--              <a-input placeholder="请输入重量(自带包装)" v-decorator="['netWeight', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="重量(打包后)">-->
<!--              <a-input placeholder="请输入重量(打包后)" v-decorator="['grossWeight', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="储位">-->
<!--              <a-input placeholder="请输入储位" v-decorator="['storageArea', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="采购开发">-->
<!--              <a-input placeholder="请输入采购开发" v-decorator="['purchaseDevelopEmp', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="订货员">-->
<!--              <a-input placeholder="请输入订货员" v-decorator="['orderGoodsEmp', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="订货主管">-->
<!--              <a-input placeholder="请输入订货主管" v-decorator="['orderGoodsDirector', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="计划员">-->
<!--              <a-input placeholder="请输入计划员" v-decorator="['planner', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="备注">-->
<!--              <a-input placeholder="请输入备注" v-decorator="['remarks', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="关键词">-->
<!--              <a-input placeholder="请输入关键词" v-decorator="['keywords', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="容量(液体或电池类产品)">-->
<!--              <a-input placeholder="请输入容量(液体或电池类产品)" v-decorator="['capacitys', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="产品属性">-->
<!--              <a-input placeholder="请输入产品属性" v-decorator="['prodAttribute', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="产品多属性信息">-->
<!--              <a-input placeholder="请输入产品多属性信息" v-decorator="['prodAttributeInfo', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="产品信息">-->
<!--              <a-input placeholder="请输入产品信息" v-decorator="['prodInfo', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="合规图">-->
<!--              <a-input placeholder="请输入合规图" v-decorator="['compliancePicture', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="合规审核结果">-->
<!--              <a-input placeholder="请输入合规审核结果" v-decorator="['complianceAuditResult', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="风险等级">-->
<!--              <a-input placeholder="请输入风险等级" v-decorator="['riskLevel', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="不可上架平台站点">-->
<!--              <a-input placeholder="请输入不可上架平台站点" v-decorator="['noUploadSite', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="制式">-->
<!--              <a-input placeholder="请输入制式" v-decorator="['form', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="型号">-->
<!--              <a-input placeholder="请输入型号" v-decorator="['modelNo', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="产品说明书">-->
<!--              <a-input placeholder="请输入产品说明书" v-decorator="['prodInstructions', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="执行标准">-->
<!--              <a-input placeholder="请输入执行标准" v-decorator="['execStandard', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="摄影师">-->
<!--              <a-input placeholder="请输入摄影师" v-decorator="['photographer', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="图片美工">-->
<!--              <a-input placeholder="请输入图片美工" v-decorator="['photoProcesser', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="英文编辑">-->
<!--              <a-input placeholder="请输入英文编辑" v-decorator="['engEditor', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="效果跟进员">-->
<!--              <a-input placeholder="请输入效果跟进员" v-decorator="['effectFollower', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="序号">-->
<!--              <a-input placeholder="请输入序号" v-decorator="['sN', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row>-->
<!--          <a-col :span="12" :gutter="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="批号">-->
<!--              <a-input placeholder="请输入批号" v-decorator="['lotNo', {}]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
      </a-form>

      <!-- 上传图片区域 -->
      <div class="table-operator">
        <!--      <a-button type="primary" icon="download" @click="handleExportXls('文件列表')">导出</a-button>-->
        <a-upload
          name="file"
          :action="uploadAction"
          listType="picture-card"
          :fileList="fileList"
          :remove="handleRemove"

          :multiple="true"

          :showUploadList="true"
          :beforeUpload="beforeUpload"
          :customRequest="customRequest"
          @preview="handlePreview"
          @change="handleChange">
          <div v-if="fileList.length < 10">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelPreview">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>

<!--      &lt;!&ndash; 子表单区域 &ndash;&gt;-->
<!--      <a-tabs v-model="activeKey" @change="handleChangeTabs">-->
<!--        <a-tab-pane tab="图片明细" :key="refKeys[0]" :forceRender="true">-->
<!--          <j-editable-table-->
<!--            :ref="refKeys[0]"-->
<!--            :loading="purSupPictureDetailTable.loading"-->
<!--            :columns="purSupPictureDetailTable.columns"-->
<!--            :dataSource="purSupPictureDetailTable.dataSource"-->
<!--            :maxHeight="300"-->
<!--            :rowNumber="true"/>-->
<!--        </a-tab-pane>-->
<!--      </a-tabs>-->

    </a-spin>
  </a-modal>
</template>

<script>

  import moment from 'moment'
  import pick from 'lodash.pick'
  import { FormTypes } from '@/utils/JEditableTableUtil'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  // import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { axios } from '../../../utils/request'

  export default {
    name: 'PurSupPictureMainModal',
    mixins: [JEditableTableMixin],
    data() {
      return {
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        // validatorRules: {
        //   factNo: { rules: [{ required: true, message: '请输入公司编号!' }] },
        //   sku: { rules: [{ required: true, message: '请输入SKU!' }] },
        // },
        refKeys: ['purSupPictureDetail', ],
        activeKey: 'purSupPictureDetail',
        // 子表-SKU图片表
        purSupPictureDetailTable: {
          loading: false,
          dataSource: [],
          columns: [
            // {
            //   title: '厂区编号',
            //   key: 'factNo',
            //   type: FormTypes.input,
            //   defaultValue: '',
            //   placeholder: '请输入${title}',
            // },
            // {
            //   title: 'SKU编号',
            //   key: 'sku',
            //   type: FormTypes.input,
            //   defaultValue: '',
            //   placeholder: '请输入${title}',
            // },
            {
              title: '图片文件名称',
              key: 'pictureFileName',
              // type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              width: 500,
            },
            {
              title: '图片存储路径',
              key: 'picturePath',
              // type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            // {
            //   title: 'SKU基础资料ID',
            //   key: 'basicDataId',
            //   type: FormTypes.input,
            //   defaultValue: '',
            //   placeholder: '请输入${title}',
            // },
          ]
        },

        // formData: {},
        previewVisible: false,
        previewImage: '',
        fileList: [],

        url: {
          upload: "/scan/purSupPictureMain/upload",
          remove: "/scan/purSupPictureMain/remove",
          add: "/scan/purSupPictureMain/add",
          edit: "/scan/purSupPictureMain/edit",
          purSupPictureDetail: {
            list: '/scan/purSupPictureMain/queryPurSupPictureDetailByMainId'
          },
        }
      }
    },

    computed: {
      uploadAction() {
        return window._CONFIG['domianURL'] + this.url.upload;
      },
    },

    methods: {

      beforeUpload(file) {
        var fileType = file.type;
        if (fileType === 'image') {
          if (fileType.indexOf('image') < 0) {
            this.$message.warning('请上传图片');
            return false;
          }
        } else if (fileType === 'file') {
          if (fileType.indexOf('image') >= 0) {
            this.$message.warning('请上传文件');
            return false;
          }
        }
        return true;
      },

      // onStart(file) {
      //   console.log('onStart', file, file.name);
      // },
      // onSuccess(ret, file) {
      //   console.log('onSuccess', ret, file.name);
      // },
      // onError(err) {
      //   console.log('onError', err);
      // },
      // onProgress({ percent }, file) {
      //   console.log('onProgress', `${percent}%`, file.name);
      // },
      customRequest({
                      action,
                      data,
                      file,
                      filename,
                      headers,
                      onError,
                      onProgress,
                      onSuccess,
                      withCredentials,
                    }) {
        // EXAMPLE: post form-data with 'axios'
        const formData = new FormData();
        formData.append('file', file)
        formData.append('sku', this.form.getFieldValue('sku'));
        formData.append('basicdataid', this.form.getFieldValue('id'))
        // this.formData = formData;
        axios
          .post(action, formData, {
            withCredentials,
            headers,
            onUploadProgress: ({ total, loaded }) => {
              onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file);
            },
          })
          .then(({ data: response }) => {
            onSuccess(response, file);
          })
          .catch(onError);

        return {
          abort() {
            console.log('upload progress is aborted.');
          },
        };
      },
 
      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'factNo', 'sku', 'id', 'spu', 'ean', 'qualityInspectStd', 'classification', 'developSn', 'developLink', 'status', 'skuPurchaseNm', 'engNm', 'engNmSmt', 'bestListingSmt', 'bestListingEbay', 'netLength', 'netWidth', 'netHeight', 'grossLength', 'grossWidth', 'grossHeight', 'wlAttribute', 'customsCode', 'taxRate', 'refPrice', 'netWeight', 'grossWeight', 'storageArea', 'purchaseDevelopEmp', 'orderGoodsEmp', 'orderGoodsDirector', 'planner', 'remarks', 'keywords', 'capacitys', 'prodAttribute', 'prodAttributeInfo', 'prodInfo', 'compliancePicture', 'complianceAuditResult', 'riskLevel', 'noUploadSite', 'form', 'modelNo', 'prodInstructions', 'execStandard', 'photographer', 'photoProcesser', 'engEditor', 'effectFollower', 'sN', 'lotNo', ))
          // 时间格式化
        })
        // 加载子表数据
        if (this.model.id) {
          let params = { id: this.model.id }
          this.requestSubTableData(this.url.purSupPictureDetail.list, params, this.purSupPictureDetailTable)
        }
      },
 
      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let main = Object.assign(this.model, allValues.formValue)
        //时间格式化
        return {
          ...main, // 展开
          purSupPictureDetailList: allValues.tablesValue[0].values,
        }
      },

      //点击"确定"时,仅关闭窗口,不做其它操作
      handleOk () {
        this.close()
      },
      //关闭图片预览窗口
      handleCancelPreview () {
        this.previewVisible = false
      },
      //预览图片
      handlePreview (file) {
        this.previewImage = file.url || file.thumbUrl
        this.previewVisible = true
      },
      // ossDelete(id) {
      //   var that = this;
      //   that.$confirm({
      //     title: "确认删除",
      //     content: "是否删除选中文件?",
      //     onOk: function () {
      //       that.handleDelete(id)
      //     }
      //   });
      // },
      //移除图片
      // handleRemove (file) {
      //   return window._CONFIG['domianURL'] + this.url.remove;
      // },
      // 没错，删除某个已上传的文件的时候，就是调用的这里
      handleRemove (file, withCredentials, headers, ) {
        const index = this.fileList.indexOf(file)
        const newFileList = this.fileList.slice()
        newFileList.splice(index, 1)
        this.fileList = newFileList
        console.log('移除后文件个数: ' + this.fileList.length)
        console.log('移除文件名称: ' + file.name);
        axios
          .post(window._CONFIG['domianURL'] + this.url.remove, file.name, {
            withCredentials,
            headers,
            // onUploadProgress: ({ total, loaded }) => {
            //   onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file);
            // },
          })
          .then(({ data: response }) => {
            onSuccess(response, file);
          })
          .catch(onError);
      },
      //用户选择图片文件时，图所选择的图片文件名加到此列表
      handleChange ({ fileList }) {
        this.fileList = fileList;
        console.log('添加后文件个数: ' + this.fileList.length);
      }

    }
  }
</script>

<style scoped>
</style>