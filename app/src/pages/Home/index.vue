<template>
  <div class="home-container">
    <!-- tab栏区域 -->
    <Category/>
    <!-- 第一部分内容 -->
    <!-- <MyFirstPart /> -->
    <!-- 各种内容 -->
    <!-- <MyOtherPart/> -->

    <!-- 热门视频 -->
    <div class="tip">热门视频<i class="iconfont icon-remen" style="color: #F07775;"></i></div>
    <div class="recommend">
      <div class="grid-container">

        <!-- 轮播图 -->
        <el-carousel class="grid-item grid-first-line-item carousel" trigger="click" :autoplay="true">
          <el-carousel-item v-for="set in top10SetList.slice(0, 4)" :key="set.setid">
            <div style="height: 100%;" @click="gotoSetDetails(set.setid)">
              <img class="video-card-img carousel-img" :src="set.setimg">
              <!-- <div class="carousel-info"> -->
              <div class="carousel-title">
                <span>{{ set.setname }}</span>
              </div>
              <!-- </div> -->
            </div>
          </el-carousel-item>
        </el-carousel>

        <!-- 轮播图右侧 -->
        <div class="grid-item grid-first-line-item" v-for="set in top10SetList.slice(4, 10)" :key="set.setid">
          <div class="video-card-face" @click="gotoSetDetails(set.setid)">
            <img class="video-card-img" :src="set.setimg">
            <span class="img-bottom">
              <span class="img-bottom-line">
                <span>
                  <span><i class="iconfont icon-bofang"></i>{{ set.watchnum }}&nbsp;&nbsp;&nbsp;</span>
                  <span><i class="iconfont icon-dianzan2"></i>{{ set.likenum }}</span>
                </span>
                <span class="duration">{{ set.setlong }}</span>
              </span>
            </span>
          </div>
          <div class="video-card-info">
            <div class="video-title" @click="gotoSetDetails(set.setid)">{{ set.setname }}</div>
            <div class="up-info" @click="gotoUpHome(set.userid)">
              <span><i class="iconfont icon-UPzhu" style="padding-right: 2px;"></i>{{ set.username }}</span>
              <span style="padding: 0px 5px;">·</span>
              <span>{{ strToYMD(set.createtime) }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- 推荐视频部分 -->
    <div class="tip">猜你喜欢<i class="iconfont icon-xihuan" style="color: #e58fac;"></i></div>
    <VideoDisplay :videoSetList="recommendSetList"/>

    <!-- 最新10个视频 -->
    <div class="tip">最新发布<i class="iconfont icon-zuixin" style="color: #5cbdee; font-size: 30px;"></i></div>
    <VideoDisplay :videoSetList="recent10SetList"/>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { strToYMD } from '@/utils/strToDate'
export default {
  name: "Home",
  data() {
    return {
      //首页推荐videoSet列表
      recommendSetList: [],
      //热门视频
      top10SetList: [],
      //最新视频
      recent10SetList: [],
      // //轮播图列表4个
      // carouselList: [],
      // //轮播图右边6个
      // carousel_rList: [],
      // //剩余推荐视频集
      // restRMDList: [],
    }
  },
  // computed发生在created和mounted之间
  computed: {
    ...mapGetters(['userid'])
  },
  mounted() {
    //获取首页推荐videoSet列表
    this.getRMDSetList()
  },
  methods: {
    strToYMD(str){
      return strToYMD(str)
    },
    //获取首页推荐videoSet列表
    async getRMDSetList() {
      let res = await this.$API.reqHomeSetList(this.userid)
      if (res.status == 200) {
        this.top10SetList = res.data.top10SetList
        this.recent10SetList = res.data.recent10SetList
        this.recommendSetList = res.data.recommendSetList
      }
      else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    //跳转到videoSet详情页（观看页面）
    gotoSetDetails(setid) {
      this.$router.push({
        name: 'play',
        params: {
          setId: setid,
        }
      })
    },
    //跳转至up主页
    gotoUpHome(userid) {
      this.$router.push(`/homePage/${userid}`)
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  padding: 0px 60px;
  .tip {
    font-size: 22px;
    margin-top: 10px;
    i {
      font-size: 25px;
      margin-left: 5px;
    }
  }
}

.recommend {
  margin-top: 10px;

  .grid-container {
    display: grid;
    grid-gap: 20px;
    //规定网格布局中的列数（和宽度），5列宽度自动
    grid-template-columns: 263.84px 263.84px 263.84px 263.84px 263.84px;

    .carousel {
      position: relative;
      grid-column-end: span 2;
      grid-row-end: span 2;
      background-color: #949994;
      // max-height: 90% !important;
      max-height: 350px;
      min-height: 300px;
      border-radius: 6px;
      ::v-deep .el-carousel__container  {
        height: 100%;
      }

      .carousel-img {
        border-radius: 0px !important;
        height: 100% !important;
        width: 100%;
      }

      .carousel-title {
        position: absolute;
        bottom: 0px;
        width: 100%;
        padding: 30px 0px 35px 0px;
        font-size: 18px;
        color: white;
        // background-color: rgba(0, 0, 0, 0.2);
        background-image: linear-gradient(rgba(97, 112, 94, 0.1), rgba(0, 0, 0, 0.5));

        span {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          min-height: 25px;
          padding: 0px 30px;
        }
      }
    }

    .grid-first-line-item {
      padding-top: 0px !important;
    }

    .grid-item {
      padding-top: 30px;

      // height: 220px;
      .video-card-face {
        position: relative;
        height: 148px;
        cursor: pointer;

        .video-card-img {
          // width: 263px;
          height: 148px;
          width: 100%;
          // height: 50%;
          border-radius: 6px;
        }

        .img-bottom {
          position: absolute;
          height: 25px;
          font-size: 13px;
          left: 0px;
          bottom: 0px;
          color: white;
          width: 100%;
          background-image: linear-gradient(rgba(97, 112, 94, 0.1), rgba(0, 0, 0, 0.5));
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;

          .img-bottom-line {
            padding: 0px 10px;
            display: flex;
            justify-content: space-between;
          }
        }

      }

      .video-card-info {
        .video-title {
          cursor: pointer;
          font-size: 15px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .up-info {
          cursor: pointer;
          font-size: 13px;
          color: #9499a0;
        }
      }
    }
  }
}
</style>