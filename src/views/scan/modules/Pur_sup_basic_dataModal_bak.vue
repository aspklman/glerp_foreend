<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">

<!--      <a-spin :spinning="confirmLoading">-->
        <a-form :form="form">

<!--          <a-form-item-->
<!--            :labelCol="labelCol"-->
<!--            :wrapperCol="wrapperCol"-->
<!--            label="URL">-->
<!--            <a-input placeholder="请输入URL" v-decorator="['url', {}]" />-->
<!--          </a-form-item>-->
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="SKU">
            <a-input placeholder="请输入SKU" v-decorator="['sku', {}]" />
          </a-form-item>

<!--          <a-form-item-->
<!--            :labelCol="labelCol"-->
<!--            :wrapperCol="wrapperCol"-->
<!--            label="文件地址">-->
<!--            <a-input placeholder="请输入文件地址" v-decorator="['url', {}]" />-->
<!--          </a-form-item>-->

        </a-form>
<!--      </a-spin>-->

      <!-- 操作按钮区域 -->
      <div class="table-operator">
        <!--      <a-button type="primary" icon="download" @click="handleExportXls('文件列表')">导出</a-button>-->
        <a-upload
          name="file"
          :action="uploadAction"
          listType="picture-card"
          :fileList="fileList"
          :multiple="true"
          :headers="tokenHeader"
          :showUploadList="true"
          :beforeUpload="beforeUpload"
          @preview="handlePreview"
          @change="handleChange">
<!--          <a-button>-->
<!--            <a-icon type="upload"/>-->
<!--            文件上传-->
<!--          </a-button>-->
          <div v-if="fileList.length < 10">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelPreview">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>

<!--      &lt;!&ndash; table区域-begin &ndash;&gt;-->
<!--      <div>-->
<!--        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--          <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a-->
<!--          style="font-weight: 600">{{-->
<!--          selectedRowKeys.length }}</a>项-->
<!--          <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
<!--        </div>-->

<!--        <a-table-->
<!--          ref="table"-->
<!--          size="middle"-->
<!--          bordered-->
<!--          rowKey="id"-->
<!--          :columns="columns"-->
<!--          :dataSource="dataSource"-->
<!--          :pagination="ipagination"-->
<!--          :loading="loading"-->
<!--          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"-->
<!--          @change="handleTableChange">-->

<!--          <span slot="action" slot-scope="text, record">-->
<!--              <a @click="ossDelete(record.id)">删除</a>-->
<!--          </span>-->

<!--        </a-table>-->
<!--      </div>-->

    </a-spin>


  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'

  export default {
    name: "Pur_sup_basic_dataModal",
    mixins: [JeecgListMixin],
    data () {
      return {
        title:"操作",
        description: '文件列表',
        visible: false,
        model: {},
        // // 表头
        // columns: [
        //   {
        //     title: '#',
        //     dataIndex: '',
        //     key: 'rowIndex',
        //     width: 60,
        //     align: "center",
        //     customRender: function (t, r, index) {
        //       return parseInt(index) + 1;
        //     }
        //   },
        //   {
        //     title: '文件名称',
        //     align: "center",
        //     dataIndex: 'fileName'
        //   },
        //   {
        //     title: '文件地址',
        //     align: "center",
        //     dataIndex: 'url'
        //   },
        //   {
        //     title: '操作',
        //     dataIndex: 'action',
        //     align: "center",
        //     scopedSlots: {customRender: 'action'},
        //   }
        // ],

        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        previewVisible: false,
        previewImage: '',
        fileList: [],

        confirmLoading: false,
        form: this.$form.createForm(this),
        // validatorRules:{
        // factNo:{rules: [{ required: true, message: '请输入公司编号!' }]},
        // sku:{rules: [{ required: true, message: '请输入SKU!' }]},
        // },
        url: {
          upload: "/scan/pur_sup_basic_data/upload",
          add: "/scan/pur_sup_basic_data/add",
          edit: "/scan/pur_sup_basic_data/edit",
        },
      }
    },
    created () {
    },
    computed: {
      uploadAction() {
        return window._CONFIG['domianURL'] + this.url.upload;
      }
    },
    methods: {
      // handleUploadData() {
      //   let parentId = {parent: 7};
      //   return parentId; //将ID返回后端
      // },
      // beforeUpload: (file) => {
      //   let count = [];
      //   let files = [];
      //   // if(showUploadList) {
      //   //   files = this.state.files;
      //   // }
      //   const reader = new FileReader();
      //   reader.readAsDataURL(file);
      //   reader.onload = e => {
      //     file.thumbUrl = e.target.result;
      //     files.push(file)
      //     files.map((item, index) => {
      //       if (file.name === item.name) {
      //         count.push(index);
      //         if (count.length > 1) {
      //           message.error("文件已存在!");
      //           files.splice(index, 1);
      //           return;
      //         }
      //       }
      //     })
      //     this.setState({
      //       fileList: [...files]
      //     })
      //     this.props.onChange(this.state.fileList)
      //   };
      //   return false;
      // },
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
      // handleChange(info) {
      //   if (info.file.status === 'done') {
      //     if (info.file.response.success) {
      //       this.loadData()
      //       this.$message.success(`${info.file.name} 上传成功!`);
      //     } else {
      //       this.$message.error(`${info.file.name} 上传失败.`);
      //     }
      //   } else if (info.file.status === 'error') {
      //     this.$message.error(`${info.file.name} 上传失败.`);
      //   }
      // },
      ossDelete(id) {
        var that = this;
        that.$confirm({
          title: "确认删除",
          content: "是否删除选中文件?",
          onOk: function () {
            that.handleDelete(id)
          }
        });
      },

      upload () {
        // this.$emit('ok');
        this.edit({});
      },
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'factNo','sku','spu','ean','qualityInspectStd','classification','developSn','developLink','status','skuPurchaseNm','engNm','engNmSmt','bestListingSmt','bestListingEbay','netLength','netWidth','netHeight','grossLength','grossWidth','grossHeight','wlAttribute','customsCode','taxRate','refPrice','netWeight','grossWeight','storageArea','purchaseDevelopEmp','orderGoodsEmp','orderGoodsDirector','planner','remarks','keywords','capacitys','prodAttribute','prodAttributeInfo','prodInfo','compliancePicture','complianceAuditResult','riskLevel','noUploadSite','form','modelNo','prodInstructions','execStandard','photographer','photoProcesser','engEditor','effectFollower','userNo','modifyDt','sN','lotNo','id'))
		  //时间格式化
        });
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })
          }
        })
      },
      //关闭Modal主窗口
      handleCancel () {
        this.close()
      },
      //关闭文件预览窗口
      handleCancelPreview () {
        this.previewVisible = false
      },
      loadData(){

      },
      getDate(){
        // 当前时间
      },
      handlePreview (file) {
        this.previewImage = file.url || file.thumbUrl
        this.previewVisible = true
      },
      handleChange ({ fileList }) {
        this.fileList = fileList;
        console.log("上传文件1：" + fileList);
      }

    }
  }
</script>

<style lang="less" scoped>

</style>