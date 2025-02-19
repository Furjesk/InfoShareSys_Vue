<template>
  <el-container>
    <el-main>

      <div class="article-list_wrap">
        <div class="first-line">
          <div class="first-line-showType">
            <el-radio-group v-model="radio" size="medium">
              <el-radio-button label="已通过"></el-radio-button>
              <el-radio-button label="待审核"></el-radio-button>
              <el-radio-button label="已退回"></el-radio-button>
              <el-radio-button label="已删除"></el-radio-button>
              <el-radio-button label="全部"></el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <!-- 封装动态展示组件 -->
        <Moment :showList="showList" @renewComment="renewCommentList" style="margin-top: 30px;"/>

      </div>
    </el-main>
    <el-footer>
      <MyFooter />
    </el-footer>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "MomentManage",
  data() {
    return {
      //显示的列表
      showList: [],
      //全部审核视频集列表
      reviewList: [],
      //待审核视频集列表
      waitList: [],
      //通过视频集列表
      passList: [],
      //退回视频集列表
      denyList: [],
      //已删除视频集列表
      deleteList: [],

      //默认显示什么列表
      radio: '已通过',
    }
  },
  computed: {
    ...mapGetters(['userid'])
  },
  mounted() {
    this.reqReviewMomentListByUId();
  },
  watch: {
    radio(newVal) {
      if (newVal == '待审核') {
        this.showList = this.waitList;
      }
      else if (newVal == '已通过') {
        this.showList = this.passList
      }
      else if (newVal == '已退回') {
        this.showList = this.denyList
      }
      else if (newVal == '已删除') {
        this.showList = this.deleteList
      }
      else {
        this.showList = this.reviewList
      }
    },
  },
  methods: {

    //更新 评论列表
    async renewCommentList() {
      // console.log("grandfather");
      await this.reqReviewMomentListByUId()
      if (this.radio == '待审核') {
        this.showList = this.waitList;
      }
      else if (this.radio == '已通过') {
        this.showList = this.passList
      }
      else if (this.radio == '已退回') {
        this.showList = this.denyList
      }
      else if (this.radio == '已删除') {
        this.showList = this.deleteList
      }
      else {
        this.showList = this.reviewList
      }
    },

    //获取待审核列表，通过userid
    async reqReviewMomentListByUId() {
      let res = await this.$API.reqReviewMomentListByUId(this.userid)
      if (res.status == 200) {
        //全部列表
        this.reviewList = res.data
        //划分列表
        this.waitList = []
        this.passList = []
        this.denyList = []
        res.data.forEach(review => {
          if (review.status == 0)
            this.waitList.push(review)
          else if (review.status == 1)
            this.passList.push(review)
          else if (review.status == 2)
            this.denyList.push(review)
          else if (review.status == 3)
            this.deleteList.push(review)
        });
        this.showList = this.passList;
      } else {
        this.$messageBox.confirm(res.message)
      }
    },
    //状态转换【未实现】
    toStr(status) {
      if (status == 0)
        return '待审核'
      else if (status == 1)
        return '已通过'
      else if (status == 2)
        return '已退回'
      else if (status == 3)
        return '已删除'
    },

    //编辑视频
    EditVideoSet(setid) {

    }
  },
}
</script>

<style lang="less" scoped>
.border-top {
  border-top: 1px solid #9499a0;
}

.el-main {
  .article-list_wrap {
    padding: 0px 60px 20px;

    .first-line {
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;


      .first-line-showType {
        display: flex;
        align-items: flex-end;
      }
    }

    // .moment-item {
    //   margin-top: 30px;

    //   // border-bottom: 1px solid #9499A0;
    //   .moment-item__main {
    //     display: flex;

    //     .moment-item__left {
    //       .moment-item__face {
    //         cursor: pointer;
    //       }
    //     }

    //     .moment-item__right {
    //       position: relative;
    //       margin-left: 10px;
    //       width: 650px;

    //       .moment-more {
    //         position: absolute;
    //         right: 10px;
    //         top: 10px;

    //         ::v-deep .el-menu-item {
    //           width: 50px;
    //           overflow: hidden;
    //         }
    //       }

    //       .moment-item-wrap {
    //         width: 520px;

    //         .moment-item__header {
    //           height: 40px;
    //           display: flex;
    //           flex-direction: column;
    //           justify-content: space-between;

    //           .moment-username {
    //             // 下面这行有就是为了保持代码复用一致
    //             // justify-content: space-between;
    //             .username {
    //               color: #fb7299;
    //               font-size: 16px;
    //               cursor: pointer;
    //             }
    //           }

    //           .moment-desc {
    //             color: #99a2aa;
    //             font-size: 12px;
    //           }

    //         }

    //         .moment-item__body {
    //           margin-top: 10px;

    //           .moment-item__subject {
    //             color: #008ac5;
    //             font-size: 14px;
    //             cursor: pointer;
    //           }

    //           .moment-item__text {
    //             font-size: 14px;
    //             margin-top: 5px;
    //           }

    //           .moment-item__imgs {
    //             max-width: 330px;
    //             margin-top: 10px;

    //             .el-image {
    //               margin-right: 4px;
    //               border-radius: 4px;
    //             }

    //             .img_full {
    //               width: auto !important;
    //               height: auto !important;
    //             }
    //           }
    //         }

    //         .moment-item__footer {
    //           display: flex;
    //           margin-top: 10px;

    //           .moment-item__action {
    //             margin-right: 60px;
    //             color: #99a2aa;
    //             font-size: 14px;
    //             cursor: pointer;
    //           }
    //         }
    //       }

    //     }
    //   }

    //   /** 评论部分 */

    // }
  }
}
</style>