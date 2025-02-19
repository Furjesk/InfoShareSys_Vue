<template>
  <div>
    <!-- <MyHeader v-show="$route.meta.headerShow"></MyHeader> -->
    <!-- <MyMiniHeader></MyMiniHeader> -->
    <MyHeader v-show="$route.meta.myHeaderShow"></MyHeader>
    <!-- 路由组件出口地方 -->
    <router-view></router-view>
    <MyFooter v-show="$route.meta.footerShow" />
    
  </div>
</template>

<script>
export default {
  mounted() {
    document.title = "信息共享平台";
  }
}
</script>