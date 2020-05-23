<template>
  <van-tabbar :value="tabActive">
    <van-tabbar-item name="home" icon="home-o" to="/main/home">首页</van-tabbar-item>
    <van-tabbar-item name="wait" icon="friends-o" to="/main/wait">审批</van-tabbar-item>
    <van-tabbar-item name="apply" icon="user-o" to="/main/apply">流程</van-tabbar-item>
    <van-tabbar-item name="personalHome" icon="user-circle-o" to="/main/personalHome">个人中心</van-tabbar-item>
  </van-tabbar>
</template>

<script>
    export default {
        name: "MainPage",

        computed: {
            // 仅读取
            tabActive() {
                return this.$store.getters.pageActive
            }
        }
    }



</script>

<style scoped>

</style>