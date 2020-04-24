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
<!--              label="厂区编号">-->
<!--              <a-input placeholder="请输入厂区编号" v-decorator="['factNo', validatorRules.factNo ]"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="SKU编号">
              <a-input placeholder="请输入SKU编号" v-decorator="['sku', validatorRules.sku ]"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>

      <!-- 子表单区域 -->
      <a-tabs v-model="activeKey" @change="handleChangeTabs">
        <a-tab-pane tab="SKU图片" :key="refKeys[0]" :forceRender="true">
<!--          <a-upload-->
<!--            name="file"-->
<!--            :action="uploadAction"-->
<!--            listType="picture-card"-->
<!--            :multiple="true"-->
<!--            :fileList="fileList"-->
<!--            @preview="handlePreview"-->
<!--            @change="handleChange">-->
<!--            <div v-if="fileList.length < 16">-->
<!--              <a-icon type="plus" />-->
<!--              <div class="ant-upload-text">上传图片</div>-->
<!--            </div>-->
<!--          </a-upload>-->
<!--          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelModal">-->
<!--            <img alt="example" style="width: 100%" :src="previewImage" />-->
<!--          </a-modal>-->
          <j-editable-table
            :ref="refKeys[0]"
            :loading="sku_picture_dTable.loading"
            :columns="sku_picture_dTable.columns"
            :dataSource="sku_picture_dTable.dataSource"
            :maxHeight="300"
            :rowNumber="true"
            :rowSelection="true"
            :actionButton="true"/>
        </a-tab-pane>
      </a-tabs>

    </a-spin>
  </a-modal>
</template>

<script>

  import moment from 'moment'
  import pick from 'lodash.pick'
  import { FormTypes } from '@/utils/JEditableTableUtil'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'

  export default {
    name: 'Sku_picture_mModal',
    mixins: [JEditableTableMixin],
    data() {
      return {

        // visible: false,
        // model: {},
        // labelCol: {
        //   xs: { span: 24 },
        //   sm: { span: 5 },
        // },
        // wrapperCol: {
        //   xs: { span: 24 },
        //   sm: { span: 16 },
        // },
        // previewVisible: false,
        // previewImage: '',
        fileList: [
          // {
          //   uid: '-1',
          //   name: 'xxx.png',
          //   status: 'done',
          //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          // },
          // {
          //   uid:'-2',
          //   name:'pic1.png',
          //   status:'done',
          //   url:'https://www.gizbot.com/img/2016/11/whatsapp-error-lead-image-08-1478607387.jpg',
          // }
        ],
        // confirmLoading: false,
        // form: this.$form.createForm(this),


        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        factNo: { rules: [{ required: true, message: '请输入厂区编号!' }] },
        sku: { rules: [{ required: true, message: '请输入SKU编号!' }] },
      },
      refKeys: ['sku_picture_d', ],
        activeKey: 'sku_picture_d',
        // SKU图片明细表
        sku_picture_dTable: {
        loading: false,
          dataSource: [],
          columns: [
          // {
          //   title: '厂区编号',
          //   key: 'factNo',
          //   type: FormTypes.input,
          //   defaultValue: '',
          //   placeholder: '请输入${title}',
          //   validateRules: [{ required: true, message: '${title}不能为空' }],
          // },
          // {
          //   title: 'SKU编号',
          //   key: 'sku',
          //   type: FormTypes.input,
          //   defaultValue: '',
          //   placeholder: '请输入${title}',
          //   validateRules: [{ required: true, message: '${title}不能为空' }],
          // },
          // {
          //   title: '图片类型',
          //   key: 'pictureType',
          //   type: FormTypes.input,
          //   defaultValue: '',
          //   placeholder: '请输入${title}',
          //   width: "15%",
          // },
          {
            title: '图片存放路径',
            key: 'picturePath',
            type: FormTypes.input,
            defaultValue: '',
            placeholder: '请输入${title}',
          },
          // {
          //   title: 'SKU图片主id',
          //   key: 'skuPictureId',
          //   type: FormTypes.input,
          //   defaultValue: '',
          //   placeholder: '请输入${title}',
          // },
        ]
      },


        url: {
          add: "/scan/sku_picture_m/add",
          edit: "/scan/sku_picture_m/edit",
          // upload: "/scan/sku_picture_m/upload",
          sku_picture_d: {
            list: '/scan/sku_picture_m/querySku_picture_dByMainId'
          },
        }
      }
    },
    // computed: {
    //   uploadAction() {
    //     return window._CONFIG['domianURL'] + this.url.upload;
    //   }
    // },
    methods: {

      // add () {
      //   this.edit({});
      // },

      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'factNo', 'sku', ))
          // 时间格式化
        })
        // 加载子表数据
        if (this.model.id) {
          let params = { id: this.model.id }
          this.requestSubTableData(this.url.sku_picture_d.list, params, this.sku_picture_dTable)
        }
      },
 
      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let main = Object.assign(this.model, allValues.formValue)
        //时间格式化
        return {
          ...main, // 展开
          sku_picture_dList: allValues.tablesValue[0].values,
        }
      },
      handleCancel () {
        this.close()
      },
      handleCancelModal () {
        this.previewVisible = false
      },
      //点击图片上的【预览文件】按钮 -> 预览文件。
      handlePreview (file) {
        this.previewImage = file.url || file.thumbUrl
        this.previewVisible = true
      },
      // //点击【上传图片】上传文件
      // handleChange ({ fileList }) {
      //   this.fileList = fileList;
      //   console.log("上传文件8：" + fileList);
      // },
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
    }
  }
</script>

<style scoped>
</style>