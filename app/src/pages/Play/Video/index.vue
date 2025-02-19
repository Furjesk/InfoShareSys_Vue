<template>
  <div class="play-container">

    <!-- 页面左半部分 -->
    <div class="play-left">
      <div class="left-content">
        <div class="play-title">{{ cur_video.videoname }}</div>
        <div class="play-info">
          <div>
            <span><i class="iconfont icon-bofang info-icon-size"></i>{{ videoSet.watchnum }}</span>
            <span><i class="iconfont icon-danmu info-icon-size" style="font-size: 14px;"></i>弹幕数(功能未开放)</span>
            <span><i class="iconfont icon-shizhong info-icon-size"></i>{{ strToYMDHMS(videoSet.createtime) }}</span>
            <span v-if="videoSet.cannotforward == 1"><i class="iconfont icon-jinzhi info-icon-size"
                style="color:red;font-size: 18px;"></i>未经作者授权，禁止转载</span>
          </div>
          <div>
            <span style="color: #ffa058; margin: 0px;">
              <span style="font-size: 20px;">9.9</span>
              <span style="font-size: 13px;margin: 0px;">分</span>
            </span>
          </div>
        </div>
        <div class="video-container">
          <div class="video">
            <!-- 默认播第一集 -->
            <video ref="video" controls :src="cur_video.videourl"></video>
          </div>
          <div class="video-danmu">输入弹幕部分(该功能暂未开放)</div>
        </div>
        <div class="play-action">
          <span class="action-left">
            <i class="iconfont icon-dianzan" :class="isLike ? 'active-btn-color' : ''"
              @click="likeSet(videoSet.setid)">&nbsp;{{ videoSet.likenum }}</i>
            <i class="iconfont icon-tubi">&nbsp;{{ videoSet.coinnum }}</i>
            <i class="iconfont icon-shoucang">&nbsp;{{ videoSet.favoritenum }}</i>
            <i class="iconfont icon-zhuanfa">&nbsp;{{ videoSet.transmitnum }}</i>
            <span>
              <span style="color: #61668e; margin-right: 5px;">评分</span>
              <el-rate v-model="rate" class="iconfont" :icon-classes="iconClasses" void-icon-class="icon-face-meh"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']" @change="changeRate(videoSet.setid)">
              </el-rate>
            </span>
          </span>
          <span class="action-right">
            <i class="iconfont icon-tousu">&nbsp;稿件投诉</i>
          </span>
        </div>

        <!-- <div> -->
        <!-- 简介 -->
        <div class="play-brief">{{ videoSet.setbrief }}</div>
        <!-- 标签 -->
        <div class="play-label">
          <el-tag type="info" v-for="label in labelList" :key="label.labelid">{{ label.labelname }}</el-tag>
        </div>

        <!-- 评论部分 -->
        <Comment :commentList="commentList" :commentNum="videoSet.commentnum" type="videoset" :multiId="videoSet.setid"
          :UPId="videoSet.userid" @renewComment="renewCommentList" />
        <!-- </div> -->
      </div>
    </div>

    <!-- 页面右半部分 -->
    <div class="play-right">
      <div class="v_upinfo">
        <el-avatar class="u-face" :src="videoSet.imgurl"></el-avatar>
        <div class="up-info_right">
          <div class="name-area">
            <span class="user-name">{{ videoSet.username }} </span>
            <span class="send-msg">发消息超链接</span>
          </div>
          <div class="btn-panel">
            <el-button class="charge" type="primary" plain>充电</el-button>
            <el-button class="follow" type="primary" @click="followUP(videoSet.userid)">
              <span v-if="isFollow == 0">+ 关注</span>
              <span v-else-if="isFollow == 1">已关注</span>
              <span v-else-if="isFollow == 2">互相关注</span>
            </el-button>
          </div>
        </div>
      </div>

      <el-collapse class="danmaku-box">
        <el-collapse-item title="弹幕列表（功能未开放）" name="1">
          <div>时间 弹幕内容 发送时间</div>
          <div>00:17 弹幕1 3-18 16:55</div>
          <div>00:17 弹幕1 3-18 16:55</div>
          <div>00:17 弹幕1 3-18 16:55</div>
          <div>00:17 弹幕1 3-18 16:55</div>
          <div>00:17 弹幕1 3-18 16:55</div>
        </el-collapse-item>
      </el-collapse>

      <!-- 如果是视频集不止一个视频 -->
      <div class="base-video-sections-v1">
        <div class="video-sections-head">
          <div class="video-sections-head_first-line">
            <div class="first-line-left">{{ videoSet.setname }}({{ cur_index }}/{{ videoList.length }})</div>
            <div class="first-line-right">
              <span>自动连播</span>
              <el-switch v-model="isAutoPlay" active-color="#00aeec" inactive-color="#9499a0"
                style="width:30px"></el-switch>
            </div>
          </div>
          <div class="video-sections-head_second-line">
            <div class="second-line_left">
              <span>{{ videoSet.watchnum }}播放</span>
            </div>
            <el-button class="second-line_right" type="primary" plain>订阅合集（未开放）</el-button>
          </div>
          <div class="border-bottom-line"></div>
        </div>

        <div class="video-sections-content-list">
          <div class="video-episode-card" v-for="video in videoList" :key="video.videoid" @click="changeVideo(video)">
            <div class="video-episode-card__info-title" :class="cur_video.videoid == video.videoid ? 'current_play' : ''">
              <i class="iconfont icon-a-zhengzaizhibozhengzaibofang" style="margin-right: 5px;"
                v-show="cur_video.videoid == video.videoid"></i>{{ video.videoname }}
            </div>
            <div class="video-episode-card__info-duration">{{ video.videolong }}</div>
          </div>
        </div>
      </div>

      <!-- 如果是只有一个视频,则推荐推荐列表的视频 -->
      <div class="next-play">
        <span class="next-play-left">接下来播放</span>
        <div class="next-play-right">
          <span>自动连播</span>
          <el-switch v-model="isAutoPlay" active-color="#00aeec" inactive-color="#9499a0" style="width:30px"></el-switch>
        </div>
      </div>

      <div class="recommend-list-v1">
        <div class="rec-list">

          <div class="video-page-card-small" v-for="recSet in recommentSetList" :key="recSet.setid">
            <div class="pic-box" @click="gotoSetDetail(recSet.setid)">
              <img class="pic" v-lazy="recSet.setimg" alt="">
              <span class="duration">{{ recSet.setlong }}</span>
            </div>
            <div class="info">
              <div class="info-title" @click="gotoSetDetail(recSet.setid)">{{ recSet.setname }}</div>
              <div class="info-bottom">
                <div class="upname">{{ recSet.username }}</div>
                <div class="playinfo">
                  <span style="margin-right: 10px;"><i class="iconfont icon-bofang" style="margin-right: 5px;"></i>{{
                    recSet.watchnum }}</span>
                  <span>{{ recSet.likenum }} 点赞</span>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="rec-footer">展开/收起</div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { strToYMDHMS, strToYMDHM } from '@/utils/strToDate'
import { strToSeconds } from '@/utils/strToSeconds'
export default {
  name: "MyVideo",
  data() {
    return {
      //是否自动连播
      isAutoPlay: true,
      //当前播放的视频
      cur_video: {},
      //评分
      rate: null,
      iconClasses: ['icon-face-frown', 'icon-face-meh', 'icon-face-grin'],
      //离线or实时推荐的视频列表
      recommentSetList: [],
      //关注状态
      isFollow: 0
    }
  },
  mounted() {

    setTimeout(() => {
      if (this.watchLocation != null) {
        this.$refs.video.currentTime = strToSeconds(this.watchLocation)
        this.$message.success('已自动定位到上次观看位置')
      }
    }, 500)

  },
  methods: {
    //更新评论列表
    renewCommentList() {
      this.$router.push("/blankPage")
    },
    //时间格式
    strToYMDHM(str) {
      //调用工具类方法
      return strToYMDHM(str)
    },
    strToYMDHMS(str) {
      return strToYMDHMS(str)
    },
    //点击切换视频
    changeVideo(video) {
      this.cur_video = video
    },
    //点赞 视频集
    async likeSet(setid) {
      let params = {
        userId: this.userid,
        setId: setid
      }
      let res = await this.$API.reqLikeSet(params)
      if (res.status == 200) {
        // 刷新全部数据，其实只要刷新评论数据即可【待改进】
        this.$emit('renewSetInfo')
      }
    },
    //评分 视频集
    async changeRate(setid) {
      let params = {
        userId: this.userid,
        setId: setid,
        rate: this.rate
      }
      let res = await this.$API.reqRateSet(params)
      if (res.status == 200) {
        // 如果返回不是null，就更新。因为可能新视频没有计算模型，不能实时推荐
        if (res.data != null) {
          this.recommentSetList = res.data
        }

      } else {
        this.$messageBox.alert(res.message, '评分或实时推荐出错', {
          confirmButtonText: '确定'
        });
      }
    },
    //推荐视频列表点击跳转
    gotoSetDetail(setid) {
      this.$router.push({
        name: 'play',
        params: {
          setId: setid,
        }
      })
      //路由视图组件引用了相同组件时，当路由参会变化时，会导致该组件无法更新，所以强制刷新页面
      this.$router.go(0)
    },
    //关注当前UP
    async followUP(userid) {
      let params = {
        followId: userid, //被关注者
        followerId: this.userid, //粉丝，当前登录用户
        status: this.isFollow == 0 ? 1 : 0
      }
      let res = await this.$API.reqFollowUP(params)
      if (res.status == 200) {
        // this.isFollow = this.isFollow == 0 ? 1 : 0
        let res2 = await this.$API.reqUpUserInfo({ userId: this.userid, UPId: userid })
        this.isFollow = res2.data.isFollow
        if (this.isFollow == 1 || this.isFollow == 2) {
          this.$message.success('关注成功');
        } else {
          this.$message.success('取消关注成功');
        }
        //更新仓库中的userInfo
        this.$store.dispatch("updateUserInfo", this.userid)
      } else {
        this.$message.error('关注操作失败');
      }
    }
  },
  computed: {
    ...mapGetters(['commentList', 'labelList', 'videoList', 'videoSet', 'recSetList', 'isLike', 'setRate', 'followStatus', 'watchLocation', 'userid']),
    cur_index() {
      if (this.cur_video != {}) {
        return this.videoList.map((item) => item.videoid).indexOf(this.cur_video.videoid) + 1
      } else {
        return 1
      }
    }
  },
  watch: {
    //默认进来播放第一个视频
    videoList(newval) {
      this.cur_video = newval[0]
    },
    //评分数据，页面双向绑定改不了getters拿来的数据，所以用setRate“中转一下”
    setRate(newVal) {
      this.rate = newVal
    },
    //离线推荐列表，原因同上，中转一下
    recSetList(newVal) {
      this.recommentSetList = newVal
    },
    // 关注状态，中转一下
    followStatus(newVal) {
      this.isFollow = newVal
    },
    $route(newVal) {
      let params = {
        userId: this.userid,
        setId: this.videoSet.setid,
        location: this.$refs.video.currentTime
      }
      this.$API.reqSaveSetHistory(params)
    }
  },
  beforeDestroy() {
    let params = {
      userId: this.userid,
      setId: this.videoSet.setid,
      location: this.$refs.video.currentTime
    }
    this.$API.reqSaveSetHistory(params)
  },

};
</script>

<style lang="less" scoped>
.play-container {
  display: flex;
  position: relative;

  /**左半部分 */
  .play-left {
    // float: left;
    flex: 6;
    margin-left: 12.5%;

    .left-content {
      // justify-content: end;
      width: 780px;
      margin-right: 30px;

      .play-title {
        font-size: 20px;
        margin-top: 20px;
      }

      .play-info {
        font-size: 13px;
        color: #9499A0;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;

        span {
          margin: 0px 12px 0px 0px;

          .info-icon-size {
            margin: 0px 4px 0px 0px;
          }
        }

      }

      .video-container {
        margin-top: 20px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        box-shadow: 0px 1px 2px #e3e5e7;

        .video {}

        .video-danmu {
          color: #61666d;
          font-size: 13px;
          height: 44px;
          line-height: 44px;
          margin-left: 10px;
        }
      }

      .play-action {
        border-bottom: 1px solid #e3e5e7;
        height: 44px;
        line-height: 44px;
        padding: 0px 10px;
        display: flex;
        justify-content: space-between;

        .action-left {

          i {
            margin-right: 40px;
            cursor: pointer;
          }

          .active-btn-color {
            color: #00aeec;
          }

          .el-rate {
            display: inline;
          }
        }

        .action-right {
          // float: right;

          i {
            margin-left: 40px;
            cursor: pointer;
          }
        }

      }

      .play-brief {
        font-size: 15px;
        line-height: 1.5em;
        padding: 20px 10px;
      }

      .play-label {
        padding-bottom: 15px;
        border-bottom: 1px solid #e3e5e7;

        .el-tag {
          margin-right: 10px;
          border-radius: 16px;
        }
      }

    }
  }

  /**右半部分 */
  .play-right {
    // float: left;
    flex: 4;
    margin-right: 12.5%;

    .v_upinfo {
      width: 100%;
      margin-top: 20px;
      display: flex;

      .u-face {
        // flex: 1;
        width: 48px;
        height: 48px;
      }

      .up-info_right {
        // flex: 5;
        width: 290px;
        padding-left: 12px;

        .name-area {
          .user-name {
            font-size: 15px;
            color: #FB7299;
          }

          .send-msg {
            font-size: 13px;
            color: #61666d;
          }
        }

        .btn-panel {
          margin-top: 5px;
          display: flex;

          .charge {
            flex: 1;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .follow {
            flex: 4;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }

    .danmaku-box {
      margin-top: 15px;
    }

    .base-video-sections-v1 {
      background-color: #f1f2f3;
      border-radius: 8px;
      margin-top: 15px;

      .video-sections-head {
        .video-sections-head_first-line {
          display: flex;
          justify-content: space-between;
          padding: 15px 15px 0px 15px;

          .first-line-left {}

          .first-line-right {
            color: #9499A0;
            font-size: 13px;

            .el-switch {
              margin-left: 5px;
            }
          }
        }

        .video-sections-head_second-line {
          display: flex;
          justify-content: space-between;
          padding: 15px;

          .second-line_left {
            color: #9499A0;
            font-size: 14px;

          }

          .second-line_right {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 24px;

          }
        }

        .border-bottom-line {
          border-bottom: 1px solid #e3e5e7;
          margin: 0px 15px;
        }
      }

      .video-sections-content-list {
        padding: 15px 15px 0px 15px;

        .video-episode-card {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          padding-bottom: 15px;

          .video-episode-card__info-title {
            cursor: pointer;
          }

          .current_play {
            color: #00aeec;
          }

          .video-episode-card__info-duration {
            color: #9499A0;
          }
        }
      }

    }

    .next-play {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;

      .next-play-left {
        font-size: 15px;
      }

      .next-play-right {
        font-size: 13px;
        color: #9499A0;

        .el-switch {
          margin-left: 5px;
        }
      }
    }

    .recommend-list-v1 {
      margin-top: 15px;

      .rec-list {

        .video-page-card-small {
          margin-bottom: 10px;
          display: flex;

          .pic-box {
            position: relative;
            width: 141px;
            height: 80px;
            display: flex;
            cursor: pointer;

            .pic {
              position: relative;
              width: 141px;
              height: 80px;
              border-radius: 5px;
            }

            .duration {
              position: absolute;
              height: 20px;
              line-height: 20px;
              font-size: 13px;
              padding: 0px 4px;
              right: 5px;
              bottom: 5px;
              color: white;
              background-color: rgba(0, 0, 0, 0.4);
              border-radius: 2px;
            }
          }

          .info {
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .info-title {
              font-size: 15px;
              cursor: pointer;
            }

            .info-title:hover {
              color: #00aeec;
            }

            .info-bottom {
              font-size: 13px;
              color: #9499A0;
            }
          }
        }
      }

      .rec-footer {
        background-color: #f1f2f3;
        border-radius: 5px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        font-size: 12px;
      }
    }
  }
}

.video-container {
  // width: 780px;
  height: 490px;

  .video {
    // width: 780px;
    height: 446px;

    video {
      width: 100%;
      height: 100%;
    }
  }
}
</style>