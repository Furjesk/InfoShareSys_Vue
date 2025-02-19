<template>
  <el-container :class="$route.meta.headbgShow ? '' : 'container-mini'">
    <div class="banner" :class="$route.meta.headbgShow ? '' : 'img-hidden'">
      <!-- <img src="./images/b-banner.jpg" alt="" /> -->
      <img src="./images/headerBg.png" alt="" />
    </div>
    <el-header :class="$route.meta.headbgShow ? '' : 'head-bg-white'">
      <!-- 头部导航模块 -->
      <!-- <nav-bar :hotsearch="hotData"></nav-bar> -->


      <div class="nav" :class="$route.meta.headbgShow ? '' : 'nav-font-black'">
        <ul class="header-left">
          <li><router-link to="/home"><img src="/logo.png"></router-link></li>
          <li><router-link to="/home">首页</router-link></li>
          <li @click="$router.push(`/homePage/${userInfo.userid}/channelDisplay`)">
            <i class="iconfont icon-xiaozu"></i>
            <span>圈子</span>
            <!-- <el-popover placement="bottom" width="200" trigger="hover">
              <div slot="reference">
                <i class="iconfont icon-xiaozu"></i>
                <span>圈子</span>
              </div>
              <div class="channel-hover">
                <div>我加入的频道</div>
              </div>
            </el-popover> -->
          </li>
        </ul>
        <ul class="search-wrap">
          <li v-show="searchInputShow">
            <el-input placeholder="请输入内容" v-model="searchInput" clearable></el-input>
            <el-button icon="el-icon-search" @click="handleSearch()"></el-button>
          </li>
        </ul>
        <ul class="header-right">
          <!-- 没登录 -->
          <li v-if="!userInfo.userid">
            <router-link to="/login" class="login-btn">登录</router-link>
          </li>
          <!-- 已登录 -->
          <li v-else>
            <el-popover placement="bottom" width="200" trigger="hover">
              <el-avatar :src="userInfo.imgurl == null ? '/setImg.png' : userInfo.imgurl" slot="reference"
                @click="vis = !vis"></el-avatar>
              <div class="float-window">
                <div class="float-username">
                  <span class="btn">{{ userInfo.username }}</span>
                </div>
                <div class="line float-info">
                  <div class="info-item btn">
                    <span class="element" @click="$router.push(`/homePage/${userInfo.userid}/followDisplay`)">关注</span>
                    <span class="num">{{ userInfo.follownum }}</span>
                  </div>
                  <div class="info-item btn" @click="$router.push(`/homePage/${userInfo.userid}/followerDisplay`)">
                    <span class="element">粉丝</span>
                    <span class="num">{{ userInfo.followernum }}</span>
                  </div>
                  <div class="info-item btn">
                    <span class="element">信誉</span>
                    <span class="num">3</span>
                  </div>
                </div>
                <div class="line"><span class="btn"
                    @click="$router.push(`/homePage/${userInfo.userid}/videoSetDisplay`)"><i
                      class="iconfont icon-user"></i>个人中心</span></div>
                <div class="line"><span class="btn" @click="$router.push('/manage/uploadManage/videoManage')"><i
                      class="iconfont icon-gaojian-zhaiyao"></i>投稿管理</span></div>
                <div class="line"><span class="btn" @click="logout"><i class="iconfont icon-tuichu"></i>退出登录</span></div>
              </div>
            </el-popover>
          </li>
          <li>
            <el-badge :value="200" :max="99" class="nav-right-item">
              <i class="iconfont icon-xiaoxi"></i>
              <span>评论</span>
            </el-badge>
          </li>
          <li>
            <el-badge :value="200" :max="99" class="nav-right-item">
              <i class="iconfont icon-dongtai"></i>
              <span>动态</span>
            </el-badge>
          </li>
          <li>
            <router-link to="/history" class="nav-right-item">
              <i class="iconfont icon-shizhong"></i>
              <span>历史</span>
            </router-link>
          </li>
          <li>
            <router-link to="/manage/home" class="nav-right-item">
              <i class="iconfont icon-dengpao"></i>
              <span>创作中心</span>
            </router-link>
          </li>
          <li>
            <router-link to="/manage/upload/uploadVideo" class="nav-right-item">
              <i class="iconfont icon-shangchuan"></i>
              <span>发布</span>
            </router-link>
          </li>
        </ul>
      </div>
    </el-header>
  </el-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
  name: "MyHeader",
  data() {
    return {
      searchInput: '',
    }
  },
  methods: {
    logout() {
      //发请求通知服务器，清除一些数据，token
      //清除项目中的数据，token，userInfo
      this.$messageBox.confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        try {
          //退出成功，回到首页
          this.$store.dispatch("userLogout");
          this.$router.push("/login");
        } catch (error) {
          alert(error.message);
        }
      }).catch(() => { });
    },
    //跳转搜索页面
    handleSearch() {
      if (this.searchInput.trim() != '') {
        this.$router.push({
          // name: 'search',
          path: '/search',
          query: {
            keyword: this.searchInput
          },
        })
        this.searchInput = ''
      } else {
        this.searchInput = ''
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => {
        return state.user.userInfo
      }
    }),
    searchInputShow() {
      return this.$route.path.indexOf("search") == -1
    }
  },
};
</script>

<style lang="less" scoped>
/* 动态样式部分 */
.container-mini {
  height: 60px !important;
}

.img-hidden {
  display: none;
}

.head-bg-white {
  box-shadow: 0 2px 10px rgb(211, 204, 204); //下边框阴影
  // background-color: #fff !important;
  // background-image: none !important;
}

.nav-font-black {
  // color: black !important;
}

/* 静态样式部分 */
.el-container {
  // 高度样式分两种显示，根据meta和页面滚动选择！！
  height: 155px;
  // height: 60px;

  // width: 100%;
  .el-header {
    z-index: 10;
    width: 100%;
    position: fixed;

    // 下面的样式分两种显示，根据meta和页面滚动选择！！

    // position: relative;
    /* 背景渐变 */
    background-image: linear-gradient(rgba(0, 0, 0, 0.5),
        rgba(97, 112, 94, 0.1));

    // background-color: #fff;
    // box-shadow: 0 2px 10px rgb(211, 204, 204);
  }
}

.banner {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 9.5vw;
  min-height: 155px;
  overflow: hidden;
}

.banner img {
  height: 100%;
}

.nav {
  // position: absolute;
  width: 100%;
  height: 50px;

  //颜色根据meta和页面滚动选择！！
  // color: black;
  color: white;
  display: flex;

  ul {
    // float: left;
    // width: 33.3%;
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    li {
      margin-top: 15px;
      font-size: 16px;
      cursor: pointer;

      // font-weight: bold;
      a {
        color: white;
      }
    }
  }
}

.nav {
  .header-left {
    img {
      width: 38px;
    }
  }

  .search-wrap {
    li {
      display: flex;
      opacity: 0.9;

      // height: 100%;
      .el-input {
        height: 40px;
      }

      .el-button {
        height: 40px;
      }
    }
  }

  .header-right {
    li {
      .login-btn {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
      }

      .nav-right-item {
        display: flex;
        flex-direction: column;
        text-align: center;
      }
    }
  }
}

// .nav li:hover {
//   background-color: orange;
//   /* transition: 0.5s; */
// }

.el-avatar {
  // box-shadow: 2px 2px 5px white;
  border: 2px solid white;
}

/**头像悬停框 */
.float-window {
  padding: 10px;

  .float-username {
    // width: 100%;
    color: #ff6699;
    font-weight: 600;
    font-size: 16px;
    display: flex;
    justify-content: center;
  }

  .float-info {
    display: flex;
    justify-content: space-between;

    .info-item {
      width: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .element {
        font-size: 13px;
        color: #9499A0;
      }

      .num {
        font-size: 16px;
        font-weight: 600;
      }
    }
  }

  .line {
    margin-top: 15px;

    i {
      margin-right: 5px;
    }
  }

  .btn {
    cursor: pointer;
  }
}

/**圈子/频道悬停框 */
.channel-hover {
  padding: 10px;
}
</style>