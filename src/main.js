import Vue from 'vue'
import App from './App.vue'
import Storage from 'vue-ls'
import router from './router'
import store from './store/'
import dataV from '@jiaminghi/data-view';     //(大屏使用-2021/9/16)

import { VueAxios } from "@/utils/request"

import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import 'ant-design-vue/dist/antd.less';  // or 'ant-design-vue/dist/antd.less'

import '@/permission' // permission control
import '@/utils/filter' // base filter
import Print from 'vue-print-nb-jeecg'
/*import '@babel/polyfill'*/
import VueApexCharts from 'vue-apexcharts'

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

// 按需引入vue-awesome图标    (大屏使用-2021/9/16)
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/chart-bar.js';
import 'vue-awesome/icons/chart-area.js';
import 'vue-awesome/icons/chart-pie.js';
import 'vue-awesome/icons/chart-line.js';
import 'vue-awesome/icons/align-left.js';

import {
  ACCESS_TOKEN,
  DEFAULT_COLOR,
  DEFAULT_THEME,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR_WEAK,
  SIDEBAR_TYPE,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_CONTENT_WIDTH_TYPE,
  DEFAULT_MULTI_PAGE
} from "@/store/mutation-types"
import config from '@/defaultSettings'

import JDictSelectTag from './components/dict/index.js'
import hasPermission from '@/utils/hasPermission'
import vueBus from '@/utils/vueBus';
import JeecgComponents from '@/components/jeecg/index'

//国际化第一步
import VueI18n from 'vue-i18n'
import LangENUS from '@/components/lang/en-US'
import LangZHCN from '@/components/lang/zh-CN'
import LangVIVN from '@/components/lang/vi-VN'

Vue.config.productionTip = false    //设置为 false 以阻止 vue 在启动时生成生产提示
Vue.use(Storage, config.storageOptions)
Vue.use(Antd)
Vue.use(VueAxios, router)
Vue.use(Viser)
Vue.use(hasPermission)
Vue.use(JDictSelectTag)
Vue.use(Print)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.use(preview)
Vue.use(vueBus);
Vue.use(JeecgComponents);
//国际化第二步
Vue.use(VueI18n)
Vue.use(dataV);   // (大屏使用-2021/9/16)

//国际化第三步
const i18n = new VueI18n({
  // locale: 'en-US',    //全局切换语言
  // locale: 'zh-CN',    //全局切换语言
  // locale: 'vi-VN',    //全局切换语言
  locale: Vue.ls.get('language', 'zh-CN'),
  messages: {
    'en-US': LangENUS,
    'zh-CN': LangZHCN,
    'vi-VN': LangVIVN,
  }
})

// 全局注册图标
Vue.component('icon', Icon);   // (大屏使用-2021/9/16)

// 适配flex
import '@/common/flexible.js';   // (大屏使用-2021/9/16)

// 引入全局css
import './assets/scss/style.scss';   // (大屏使用-2021/9/16)

//引入echart
import echarts from 'echarts'   // (大屏使用-2021/9/16)
Vue.prototype.$echarts = echarts   // (大屏使用-2021/9/16)

Vue.config.productionTip = false;   // (大屏使用-2021/9/16)

new Vue({
  router,
  store,
  i18n,   //国际化第四步
  mounted () {
    store.commit('SET_SIDEBAR_TYPE', Vue.ls.get(SIDEBAR_TYPE, true))
    store.commit('TOGGLE_THEME', Vue.ls.get(DEFAULT_THEME, config.navTheme))
    store.commit('TOGGLE_LAYOUT_MODE', Vue.ls.get(DEFAULT_LAYOUT_MODE, config.layout))
    store.commit('TOGGLE_FIXED_HEADER', Vue.ls.get(DEFAULT_FIXED_HEADER, config.fixedHeader))
    store.commit('TOGGLE_FIXED_SIDERBAR', Vue.ls.get(DEFAULT_FIXED_SIDEMENU, config.fixSiderbar))
    store.commit('TOGGLE_CONTENT_WIDTH', Vue.ls.get(DEFAULT_CONTENT_WIDTH_TYPE, config.contentWidth))
    store.commit('TOGGLE_FIXED_HEADER_HIDDEN', Vue.ls.get(DEFAULT_FIXED_HEADER_HIDDEN, config.autoHideHeader))
    store.commit('TOGGLE_WEAK', Vue.ls.get(DEFAULT_COLOR_WEAK, config.colorWeak))
    store.commit('TOGGLE_COLOR', Vue.ls.get(DEFAULT_COLOR, config.primaryColor))
    store.commit('SET_TOKEN', Vue.ls.get(ACCESS_TOKEN))
    store.commit('SET_MULTI_PAGE',Vue.ls.get(DEFAULT_MULTI_PAGE,true))
  },
  render: h => h(App)
}).$mount('#app')
