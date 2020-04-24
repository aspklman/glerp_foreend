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
      <a-form :form="form">
      
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="厂区编号">-->
<!--          <a-input placeholder="请输入厂区编号" v-decorator="['factNo', {}]" />-->
<!--        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="SKU编号">
          <a-input placeholder="请输入SKU编号" v-decorator="['sku', {}]" />
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="图片文件名称">-->
<!--          <a-input placeholder="请输入图片文件名称" v-decorator="['pictureFileName', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="图片存储路径">-->
<!--          <a-input placeholder="请输入图片存储路径" v-decorator="['picturePath', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="SKU基础资料ID">-->
<!--          <a-input placeholder="请输入SKU基础资料ID" v-decorator="['basicDataId', {}]" />-->
<!--        </a-form-item>-->
		
      </a-form>

      <!-- 上传图片区域 -->
      <div class="table-operator">
        <!--      <a-button type="primary" icon="download" @click="handleExportXls('文件列表')">导出</a-button>-->
        <a-upload
          name="file"
          :action="uploadAction"
          listType="picture-card"
          :fileList="fileList"
          :data="formData"
          :multiple="true"
          :headers="tokenHeader"
          :showUploadList="true"
          :beforeUpload="beforeUpload"
          :customRequest="customRequest"
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

    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { axios } from '../../../utils/request'

  export default {
    name: "PurSupPictureModal",
    mixins: [JeecgListMixin],
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
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
        validatorRules:{
        },
        url: {
          upload: "/scan/purSupPicture/upload",
          add: "/scan/purSupPicture/add",
          edit: "/scan/purSupPicture/edit",
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
      onStart(file) {
        console.log('onStart', file, file.name);
      },
      onSuccess(ret, file) {
        console.log('onSuccess', ret, file.name);
      },
      onError(err) {
        console.log('onError', err);
      },
      onProgress({ percent }, file) {
        console.log('onProgress', `${percent}%`, file.name);
      },
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

      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'factNo','sku','pictureFileName','picturePath','basicDataId'))
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
            //时间格式化
            
            console.log(formData)
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
      handleCancel () {
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
      //用户选择图片文件时，图所选择的图片文件名加到此列表
      handleChange ({ fileList }) {
        this.fileList = fileList;

        // this.setState(() => ({ fileList: [{ ...fileList }, { url, uploading: false }] }))

        console.log("到这里了4");

      }

    }
  }
</script>

<style lang="less" scoped>

</style>