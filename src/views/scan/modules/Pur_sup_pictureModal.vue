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
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="厂区编号">
          <a-input placeholder="请输入厂区编号" v-decorator="['factNo', validatorRules.factNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="SKU">
          <a-input placeholder="请输入SKU" v-decorator="['sku', validatorRules.sku ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="图片序号">
          <a-input placeholder="请输入图片序号" v-decorator="['pictureSn', validatorRules.pictureSn ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="图片类型">
          <a-input placeholder="请输入图片类型" v-decorator="['pictureType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存放路径">
          <a-input placeholder="请输入存放路径" v-decorator="['picturePath', {}]" />
        </a-form-item>
        <a-col style="margin-top: 20px" :span="24">
          <span>打印图片:</span>
          <br/>
          <a-upload
            action="uploadAction"
            listType="picture-card"
            :fileList="fileList"
            @preview="handlePreview"
            @change="handleChange">
            <div v-if="fileList.length < 3">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelPreview">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-col>
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="异动人">-->
<!--          <a-input placeholder="请输入异动人" v-decorator="['userNo', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="异动时间">-->
<!--          <a-input placeholder="请输入异动时间" v-decorator="['modifyDt', {}]" />-->
<!--        </a-form-item>-->
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'

  export default {
    name: "Pur_sup_pictureModal",
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
        fileList: [
          {
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            uid:'-2',
            name:'pic1.png',
            status:'done',
            url:'https://www.gizbot.com/img/2016/11/whatsapp-error-lead-image-08-1478607387.jpg',
          }
        ],
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          factNo:{rules: [{ required: true, message: '请输入厂区编号!' }]},
          sku:{rules: [{ required: true, message: '请输入SKU!' }]},
          pictureSn:{rules: [{ required: true, message: '请输入图片序号!' }]},
        },
        url: {
          add: "/scan/pur_sup_picture/add",
          edit: "/scan/pur_sup_picture/edit",
          upload: "/scan/pur_sup_picture/upload",
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
          this.form.setFieldsValue(pick(this.model,'factNo','sku','pictureSn','pictureType','picturePath','userNo','modifyDt'))
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
      handleUpload () {
        this.$emit('ok');
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
        console.log("上传文件：" + fileList);
      }
    }
  }
</script>

<style lang="less" scoped>

</style>