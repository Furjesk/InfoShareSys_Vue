<template>
  <div class="container">
    <el-container style="height: 690px">
      <!-- 侧边栏 -->
      <el-aside>
        <el-menu @select="handleChange" unique-opened>
          <el-menu-item index="1"><i class="el-icon-s-home"></i>首页</el-menu-item>
          <el-menu-item index="2"><i class="iconfont icon-xiaozu"></i>建圈</el-menu-item>
          <el-menu-item index="3"><i class="el-icon-upload"></i>投稿</el-menu-item>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-video-camera"></i>内容管理</template>
            <el-menu-item index="4-1">稿件管理</el-menu-item>
            <el-menu-item index="4-2">圈子管理</el-menu-item>
            <el-menu-item index="4-3">申诉管理</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-s-finance"></i>收益管理</template>
            <el-menu-item index="5-1">收益中心</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-chat-line-round"></i>互动管理</template>
            <el-menu-item index="6-1">评论管理</el-menu-item>
            <el-menu-item index="6-2">弹幕管理</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-s-flag"></i>创作权益</template>
            <el-menu-item index="7-1">版权保护</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 主题区域 -->
      <el-main>
        <!-- 二级路由组件 -->
        <router-view></router-view>

      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Manage",
  data() {
    return {
      //侧边栏默认打开谁
      activeNames: ["1"],
    };
  },
  methods: {
    handleChange(val) {
      //val是一个数组，按展开的先后次序，记录当前展开的侧边栏name（唯一标识），折叠则删去
      //二级路由
      switch(val){
        case "1": this.$router.push("/manage/home"); break;
        case "2": this.$router.push("/manage/createChannel"); break;
        case "3": this.$router.push("/manage/upload/uploadVideo"); break;
        case "4-1": this.$router.push("/manage/uploadManage"); break;
        case "4-2": this.$router.push("/manage/chatGroupManage"); break;
        case "4-3": this.$router.push("/manage/appealManage"); break;
        case "5-1": this.$router.push("/manage/incomeCenter"); break;
        case "6-1": this.$router.push("/manage/commentManage"); break;
        case "6-2": this.$router.push("/manage/barrageManage"); break;
        case "7-1": this.$router.push("/manage/rightsProtect"); break;
      }
    },

  },
};
</script>

<style lang="less" scoped>
/* 整体样式 */
.container {
  // height: 100% !important;
  background-color: #f1eded;

  .el-aside {
    background-color: #fff;
    width: 200px !important;
  }

  .el-main {
    background-color:#fff;
    margin: 20px 80px;
    border-radius: 10px;
  }
}

.icon-xiaozu {
  font-size: 18px;
  margin: 0px 8px 0px 4px;
}
</style>