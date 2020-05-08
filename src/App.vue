<template>
  <a-locale-provider :locale="locale">
<!--  <a-locale-provider :locale="locales.vi_VN">-->
    <div class="locale-components" :key="(!!locale)">
      <div id="app">
        <router-view />
  <!--      <App />-->
      </div>
    </div>
  </a-locale-provider>
</template>
<script>
  import enUS from 'ant-design-vue/lib/locale-provider/en_US'
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
  import viVN from 'ant-design-vue/lib/locale-provider/vi_VN'
  // import vi_VN from 'ant-design-vue/dist/antd-with-locales.js'
  // import moment from 'moment';
  // import 'moment/locale/en-gb';
  // import 'moment/locale/zh-cn';
  // import 'moment/locale/vi';
  // moment.locale('en');
  // moment.locale('zh-cn');
  // moment.locale('vi');
  import enquireScreen from '@/utils/device'
  // const { LocaleProvider, locales } = window.antd;

  export default {
    data () {
      return {
        // locale: enUS,
        // locale: Vue.ls.get('language') == 'zh-CN' ? zhCN : viVN,
        locale: zhCN,
        // locale: viVN,
        // locale: {},
      }
    },
    created () {
      let that = this
      enquireScreen(deviceType => {
        // tablet
        if (deviceType === 0) {
          that.$store.commit('TOGGLE_DEVICE', 'mobile')
          that.$store.dispatch('setSidebar', false)
        }
        // mobile
        else if (deviceType === 1) {
          that.$store.commit('TOGGLE_DEVICE', 'mobile')
          that.$store.dispatch('setSidebar', false)
        }
        else {
          that.$store.commit('TOGGLE_DEVICE', 'desktop')
          that.$store.dispatch('setSidebar', true)
        }
      })


    },
  }
</script>
<style>
  #app {
    height: 100%;
  }
</style>