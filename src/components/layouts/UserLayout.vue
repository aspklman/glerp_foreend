<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <div class="top">
<!--        <div>-->
<!--          <img src="~@/assets/logo.png" class="logo" alt="logo">-->
<!--        </div>-->
        <div class="header">
          <a href="/">
            <img width="160" height="200" src="~@/assets/logo.png" class="logo" alt="logo">
            <br>
<!--            <span class="title"> {{this.$t('common.guoliTechCompany')}} </span>-->
            <span class="title"> 爱派客EAM系统 </span>
            <br>
          </a>
        </div>

        <div class="desc">
<!--          {{this.$t('common.stockCode')}}：300716-->
        </div>
      </div>

      <route-view></route-view>

      <div class="footer">
        <div class="links">
<!--          <a href="http://jeecg-boot.mydoc.io" target="_blank">帮助</a>-->
<!--          <a href="https://github.com/zhangdaiscott/jeecg-boot" target="_blank">隐私</a>-->
<!--          <a href="https://github.com/zhangdaiscott/jeecg-boot" target="_blank">条款</a>-->
        </div>
        <div class="copyright">
          {{ this.$t('common.copyRight') }} &copy; 2023 <a href="http://www.apexshoe.com/" target="_blank"> {{this.$t('common.guoliTech')}} </a> {{this.$t('common.make')}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RouteView from "@/components/layouts/RouteView"
  import { mixinDevice } from '@/utils/mixin.js'

  export default {
    name: "UserLayout",
    components: { RouteView },
    mixins: [mixinDevice],
    data () {
      return {}
    },
    mounted () {
      document.body.classList.add('userLayout')
    },
    beforeDestroy () {
      document.body.classList.remove('userLayout')
    },
  }
</script>

<style lang="scss" scoped>
  #userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      width: 100%;
      min-height: 100%;
      background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
      background-size: 100%;
      padding: 110px 0 144px;
      position: relative;

      a {
        text-decoration: none;
      }

      .top {
        text-align: center;

        .header {
          /*height: 44px;*/
          height: 88px;
          /*line-height: 44px;*/
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            /*height: 32px;*/
            height: 110px;
            vertical-align: middle;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 26px;
            /*font-size: 22px;*/
            color: rgba(0, 0, 0, .85);
            font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 18px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
  }
</style>