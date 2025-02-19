<template>
  <div>
    <!-- 导航栏区域 -->
    <el-menu :default-active="activeIndex" active-text-color="#409EFF" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">视频管理</el-menu-item>
      <el-menu-item index="2">动态管理</el-menu-item>
    </el-menu>

    <!-- 三级路由组件 -->
    <!-- 上传区域 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "UploadManage",
  computed: {
    activeIndex() {
      return this.$route.path == "/manage/uploadManage/momentManage" ? "2" : "1"
    }
  },
  methods: {
    handleSelect(index) {
      // uploadarea
      switch (index) {
        case '1': this.$router.push("/manage/uploadManage/videoManage"); break;
        case '2': this.$router.push("/manage/uploadManage/momentManage"); break;
      }
    },

  },
}
</script>

<style></style>