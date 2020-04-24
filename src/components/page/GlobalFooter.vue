<template>
  <div class="footer">
    <div class="links">
      <a href="http://www.guoligroup.com.cn/" target="_blank">{{this.$t('common.guoliTechCompany')}} {{this.$t('common.homePage')}}</a>
<!--      <a href="https://github.com/zhangdaiscott/jeecg-boot" target="_blank">-->
<!--        <a-icon type="github"/>-->
<!--      </a>-->
<!--      <a href="https://ant.design/">Ant Design</a>-->
<!--      <a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/">Vue Antd</a>-->
    </div>
    <div class="copyright">
      {{ this.$t('common.copyRight') }}
      <a-icon type="copyright"/>
      2020 <span>{{ this.$t('common.guoliTech') }} {{this.$t('common.allRightsReserved')}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LayoutFooter"
  }
</script>

<style lang="scss" scoped>
  .footer {
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;

    .links {
      margin-bottom: 8px;

      a {
        color: rgba(0, 0, 0, .45);

        &:hover {
          color: rgba(0, 0, 0, .65);
        }

        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
    .copyright {
      color: rgba(0, 0, 0, .45);
      font-size: 14px;
    }
  }
</style>