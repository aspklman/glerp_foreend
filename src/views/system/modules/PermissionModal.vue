<template>
  <a-drawer
    :title="title"
    :width="drawerWidth"
    @close="handleCancel"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
  >
    <div :style="{width: '100%',border: '1px solid #e9e9e9',padding: '10px 16px',background: '#fff',}">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item :label="this.$t('menu.menuType')" :labelCol="labelCol" :wrapperCol="wrapperCol" >
          <a-radio-group @change="onChangeMenuType" v-decorator="['menuType',{'initialValue':localMenuType}]">
            <a-radio :value="0">{{$t('menu.menuTypeFirstMenu')}}</a-radio>
            <a-radio :value="1">{{$t('menu.menuTypeSubMenu')}}</a-radio>
            <a-radio :value="2">{{$t('menu.menuTypeButtonAuthority')}}</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="menuLabel"
          hasFeedback >
          <a-input :placeholder="this.$t('common.pleaseInput') + this.$t('menu.name')" v-decorator="[ 'name', validatorRules.name]" :readOnly="disableSubmit"/>
        </a-form-item>


        <a-form-item
          v-show="localMenuType!=0"
          label="上级菜单"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :validate-status="validateStatus"
          :hasFeedback="true"
          :required="true">
          <span slot="help">{{ validateStatus=='error'?'请选择上级菜单':'&nbsp;&nbsp;' }}</span>
          <a-tree-select
            style="width:100%"
            :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
            :treeData="treeData"
            v-model="model.parentId"
            placeholder="请选择父级菜单"
            :disabled="disableSubmit"
            @change="handleParentIdChange">
          </a-tree-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="this.$t('menu.url')">
          <a-input :placeholder="this.$t('common.pleaseInput') + this.$t('menu.url')" v-decorator="[ 'url',validatorRules.url]" :readOnly="disableSubmit"/>
        </a-form-item>

        <a-form-item
          v-show="show"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="this.$t('menu.component')">
          <a-input :placeholder="this.$t('common.pleaseInput') + this.$t('menu.component')" v-decorator="[ 'component',validatorRules.component]" :readOnly="disableSubmit"/>
        </a-form-item>

        <a-form-item
          v-show="localMenuType==0"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="this.$t('menu.redirect')">
          <a-input :placeholder="this.$t('common.pleaseInput') + this.$t('menu.redirect')" v-decorator="[ 'redirect',{}]" :readOnly="disableSubmit"/>
        </a-form-item>

        <a-form-item
          v-show="!show"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权标识">
          <a-input placeholder="多个用逗号分隔, 如: user:list,user:create" v-decorator="[ 'perms', {}]" :readOnly="disableSubmit"/>
        </a-form-item>

        <a-form-item
          v-show="!show"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权策略">
          <j-dict-select-tag  v-decorator="['permsType', {}]" placeholder="请选择授权策略" :type="'radio'" :triggerChange="true" dictCode="global_perms_type"/>


        </a-form-item>
        <a-form-item
          v-show="!show"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态">
          <j-dict-select-tag  v-decorator="['status', {}]" placeholder="请选择状态" :type="'radio'" :triggerChange="true" dictCode="valid_status"/>

        </a-form-item>

        <a-form-item
          v-show="show"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="this.$t('menu.icon')">
          <a-input :placeholder="this.$t('common.pleaseSelect') + this.$t('menu.icon')" v-model="model.icon" :readOnly="disableSubmit">
            <a-icon slot="addonAfter" type="setting" @click="selectIcons" />
          </a-input>
        </a-form-item>

        <a-form-item
          v-show="show"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="this.$t('common.sort')">
          <a-input-number :placeholder="this.$t('common.pleaseInput') + this.$t('common.sort')" style="width: 200px" v-decorator="[ 'sortNo',validatorRules.sortNo]" :readOnly="disableSubmit"/>
        </a-form-item>

        <a-form-item
          v-show="show"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="this.$t('menu.routeSwitch')">
          <a-switch :checkedChildren="this.$t('common.yes')" :unCheckedChildren="this.$t('common.no')" v-model="routeSwitch"/>
        </a-form-item>

        <a-form-item
          v-show="show"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="this.$t('menu.menuHidden')">
          <a-switch :checkedChildren="this.$t('common.yes')" :unCheckedChildren="this.$t('common.no')" v-model="menuHidden"/>
        </a-form-item>

        <a-form-item
          v-show="show"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="this.$t('menu.isKeepalive')">
          <a-switch :checkedChildren="this.$t('common.yes')" :unCheckedChildren="this.$t('common.no')" v-model="isKeepalive"/>
        </a-form-item>


        <a-form-item
          v-show="show"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="this.$t('menu.alwaysShow')">
          <a-switch :checkedChildren="this.$t('common.yes')" :unCheckedChildren="this.$t('common.no')" v-model="alwaysShow"/>
        </a-form-item>


      </a-form>

      <!-- 选择图标 -->
      <icons @choose="handleIconChoose" @close="handleIconCancel" :iconChooseVisible="iconChooseVisible"></icons>
    </a-spin>
      <a-row :style="{textAlign:'right'}">
        <a-button :style="{marginRight: '8px'}" @click="handleCancel">
          {{$t('common.close')}}
        </a-button>
        <a-button :disabled="disableSubmit" @click="handleOk" type="primary">{{$t('common.submit')}}</a-button>
      </a-row>
    </div>
  </a-drawer>
</template>

<script>
  import {addPermission,editPermission,queryTreeList} from '@/api/api'
  import Icons from './icon/Icons'
  import pick from 'lodash.pick'


  export default {
    name: "PermissionModal",
    components: {Icons},
    data () {
      return {
        drawerWidth:700,
        treeData:[],
        treeValue: '0-0-4',
        title:"操作",
        visible: false,
        disableSubmit:false,
        model: {},
        localMenuType:0,
        alwaysShow:false,//表单元素-聚合路由
        menuHidden:false,//表单元素-隐藏路由
        routeSwitch:true, //是否路由菜单
        isKeepalive:true, //是否缓存路由
        show:true,//根据菜单类型，动态显示隐藏表单元素
        menuLabel:this.$t('menu.name'),
        isRequrie:true,  // 是否需要验证
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),

        iconChooseVisible: false,
        validateStatus:""
      }
    },
    computed:{
      validatorRules:function() {
        return {
          name:{rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('menu.name') + '!' }]},
          component:{rules: [{ required: this.show, message: this.$t('common.pleaseInput') + this.$t('menu.component') + '!' }]},
          url:{rules: [{ required: this.show, message: this.$t('common.pleaseInput') + this.$t('menu.url') + '!' }]},
          permsType:{rules: [{ required: true, message: this.$t('common.pleaseInput') + this.$t('menu.permsType') + '!' }]},
          sortNo:{rules: [{initialValue:1.0,validator: this.validateNumber}]},
        }
      }
    },
    created () {
      this.initDictConfig();
    },
    methods: {
      loadTree(){
        var that = this;
        queryTreeList().then((res)=>{
          if(res.success){
            console.log('----queryTreeList---')
            console.log(res)
            that.treeData = [];
            let treeList = res.result.treeList
            for(let a=0;a<treeList.length;a++){
              let temp = treeList[a];
              temp.isLeaf = temp.leaf;
              that.treeData.push(temp);
            }
          }
        });
      },
      add () {
        // 默认值
        this.edit({status:'1',permsType:'1',route:true});
      },
      edit (record) {
        this.resetScreenSize(); // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
        this.form.resetFields();
        this.model = Object.assign({}, record);
        //--------------------------------------------------------------------------------------------------
        //根据菜单类型，动态展示页面字段
        console.log(record)
        this.alwaysShow = !record.alwaysShow?false:true;
        this.menuHidden = !record.hidden?false:true;

        if(record.route!=null){
          this.routeSwitch = record.route?true:false;
        }
        
        if(record.keepAlive!=null){
          this.isKeepalive = record.keepAlive?true:false;
        }else{
          this.isKeepalive = false; // 升级兼容 如果没有（后台没有传过来、或者是新建）默认为false
        }



        //console.log('record.menuType', record.menuType);
        this.show = record.menuType==2?false:true;
        this.menuLabel = record.menuType==2?this.$t('menu.menuTypeButtonAuthority'):this.$t('menu.name');

        if(this.model.parentId){
          this.localMenuType = 1;
        }else{
          this.localMenuType = 0;
        }
        //----------------------------------------------------------------------------------------------

        this.visible = true;
        this.loadTree();
        let fieldsVal = pick(this.model,'name','perms','permsType','component','url','sortNo','menuType','status');
        this.$nextTick(() => {
          this.form.setFieldsValue(fieldsVal)
        });
      },
      close () {
        this.$emit('close');
        this.disableSubmit = false;
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            this.model.alwaysShow = this.alwaysShow;
            this.model.hidden = this.menuHidden;
            this.model.route = this.routeSwitch;
            this.model.keepAlive = this.isKeepalive;
            let formData = Object.assign(this.model, values);
            if ((formData.menuType == 1 || formData.menuType == 2) && !formData.parentId) {
              that.validateStatus = 'error';
              that.$message.error("请检查你填的类型以及信息是否正确！");
              return;
            } else {
              that.validateStatus = 'success';
            }
            that.confirmLoading = true;
            console.log(formData);
            let obj;
            if (!this.model.id) {
              obj = addPermission(formData);
            } else {
              obj = editPermission(formData);
            }
            obj.then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
              } else {
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            });
          }
        })
      },
      handleCancel () {
        this.close()
      },
      validateNumber(rule, value, callback){
        if(!value || new RegExp(/^[0-9]*[1-9][0-9]*$/).test(value)){
          callback();
        }else{
          callback("请输入正整数!");
        }
      },
      onChangeMenuType(e) {
        //console.log('localMenuType checked', e.target.value)
        this.localMenuType=e.target.value
        if(e.target.value == 2){
          this.show = false;
          this.menuLabel = this.$t('menu.menuTypeButtonAuthority');
        }else{
          this.show = true;
          this.menuLabel = this.$t('menu.name');
        }
        this.$nextTick(() => {
          this.form.validateFields(['url','component'], { force: true });
        });
      },
      selectIcons(){
        this.iconChooseVisible = true
      },
      handleIconCancel () {
        this.iconChooseVisible = false
      },
      handleIconChoose (value) {
        console.log(value)
        this.model.icon = value
        this.form.icon = value
        this.iconChooseVisible = false
      },
      // 根据屏幕变化,设置抽屉尺寸
      resetScreenSize(){
        let screenWidth = document.body.clientWidth;
        if(screenWidth < 500){
          this.drawerWidth = screenWidth;
        }else{
          this.drawerWidth = 700;
        }
      },
      initDictConfig() {
      },
      handleParentIdChange(value){
        if(!value){
          this.validateStatus="error"
        }else{
          this.validateStatus="success"
        }
      }
    }
  }
</script>

<style scoped>

</style>