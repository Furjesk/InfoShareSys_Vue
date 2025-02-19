<template>
  <el-container>
    <el-main>

      <div class="article-list_wrap">
        <div class="first-line">
          <!-- 全选开关 -->
          <div class="first-line-checkall">
            <span>全选</span>
            <el-switch v-model="isCheckAll" @change="changeCheckAll" active-color="#13ce66"
              inactive-color="#dcdfe6"></el-switch>
          </div>
          <div class="first-line-showType">
            <el-radio-group v-model="radio" size="medium">
              <el-radio-button label="待审核"></el-radio-button>
              <el-radio-button label="已通过"></el-radio-button>
              <el-radio-button label="已退回"></el-radio-button>
              <el-radio-button label="全部"></el-radio-button>
            </el-radio-group>
          </div>
          <!-- 批量操作 -->
          <div class="first-line-operation">
            <el-button type="success" plain @click="passBatch" size="medium"
              :disabled="disabled || checkMomList.length == 0">批量通过</el-button>
            <el-button type="danger" plain @click="denyBatch" size="medium"
              :disabled="disabled || checkMomList.length == 0">批量退回</el-button>
          </div>
        </div>

        <div class="moment-item" v-for="moment in showList" :key="moment.momentid">

          <div class="item-card"
            :class="checkMomList.includes(moment.momentid) ? 'blue-bg' : ''">
            <input type="checkbox" :value="moment.momentid" v-model="checkMomList">
            <div class="moment-item__main">
              <div class="moment-item__left">
                <div class="moment-item__face" @click="gotoUpMomentHome(moment.userid)">
                  <el-avatar :src="moment.imgurl"></el-avatar>
                </div>
              </div>
              <div class="moment-item__right">
                <div class="moment-more">
                  <el-button plain size="mini" @click="passOne(moment.momentid)" :disabled="moment.status != 0">通过</el-button>
                  <el-button plain size="mini" type="danger" @click="denyOne(moment.momentid)" :disabled="moment.status != 0">退回</el-button>
                </div>
                <div class="moment-item-wrap">
                  <div class="moment-item__header">
                    <div class="moment-username">
                      <span class="username" @click="gotoUpMomentHome(moment.userid)">{{ moment.username }}</span>
                      <span class="status">{{ toStr(moment.status) }}</span>
                    </div>
                    <div class="moment-desc">{{ strToYMDHM(moment.createtime) }}</div>
                  </div>
                  <div class="moment-item__body">
                    <div class="moment-item__subject" v-if="moment.subjectname != null"><i
                        class="iconfont icon-huatizhuti"></i>&nbsp;{{ moment.subjectname }}</div>
                    <div class="moment-item__text">{{ moment.content }}</div>
                    <div class="moment-item__imgs">
                      <el-image v-for="img in moment.momentimgList" :key="img.momimgid"
                        style="width: 100px; height: 100px" :class="moment.momentimgList.length == 1 ? 'img_full' : ''"
                        :src="img.momimgurl" fit="cover" :preview-src-list="[img.momimgurl]"></el-image>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </el-main>
    <el-footer>
      <MyFooter />
    </el-footer>
  </el-container>
</template>

<script>
import { strToYMDHM } from '@/utils/strToDate';
import { mapGetters } from 'vuex';
export default {
  name: "MomentReview",
  data() {
    return {
      //显示的列表
      showList: [],
      //全部审核动态列表
      reviewList: [],
      //待审核动态列表
      waitList: [],
      //通过动态列表
      passList: [],
      //退回动态列表
      denyList: [],
      //已删除动态列表
      deleteList: [],

      //按钮禁用
      disabled: false,

      //选中的momid
      checkMomList: [],
      //是否全选
      isCheckAll: false,
      //默认显示什么列表
      radio: '待审核',
    }
  },
  mounted() {
    this.reqReviewMomtListByMId(); //获取审核动态列表
  },
  computed: {
    ...mapGetters(['managerid'])
  },
  watch: {
    checkMomList(newVale) {
      if (newVale.length == this.reviewList.length)
        this.isCheckAll = true
      else
        this.isCheckAll = false
    },
    radio(newVal) {
      if (newVal == '待审核') {
        this.showList = this.waitList;
        this.disabled = false
      }
      else if (newVal == '已通过') {
        this.showList = this.passList
        this.disabled = true
      }
      else if (newVal == '已退回') {
        this.showList = this.denyList
        this.disabled = true
      }
      else if (newVal == '已删除') {
        this.showList = this.deleteList
        this.disabled = true
      }
      else {
        this.showList = this.reviewList
        this.disabled = true
      }
    },
  },
  methods: {
    //跳转到up动态主页
    gotoUpMomentHome(userid) {
      this.$messageBox.confirm("跳转至up的动态主页", "待实现")
    },
    //时间格式转换
    strToYMDHM(str) {
      return strToYMDHM(str)
    },
    //获取待审核列表，通过managerId
    async reqReviewMomtListByMId() {
      let res = await this.$API.reqReviewMomtListByMId(this.managerid)
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
        this.showList = this.waitList; //默认显示待审核
      } else {
        this.$messageBox.confirm(res.message)
      }
    },
    //状态转换
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

    //全选开关回调
    changeCheckAll(val) {
      if (val) {
        this.checkMomList = []
        this.reviewList.forEach(moment => {
          this.checkMomList.push(moment.momentid)
        });
      } else {
        this.checkMomList = []
      }
    },
    //通过一个审核
    async passOne(momentId) {
      let momentIdList = [];
      momentIdList.push(momentId)

      let params = {
        operation: 'pass',
        momentIdList: momentIdList
      }
      let res = await this.$API.reqMomentOperation(params)
      if (res.status == 200) {
        //重新获取待审核列表，更新
        this.reqReviewMomtListByMId()
        // this.$router.push("/blankPage") //这里不知道为什么就会使页面回到顶部，弃用
      }
      else {
        this.$messageBox.confirm(res.message)
      }
    },
    //退回一个审核
    async denyOne(momentId) {
      let momentIdList = [];
      momentIdList.push(momentId)

      let params = {
        operation: 'deny',
        momentIdList: momentIdList
      }
      let res = await this.$API.reqMomentOperation(params)
      if (res.status == 200) {
        this.reqReviewMomtListByMId()
      }
      else {
        this.$messageBox.confirm(res.message)
      }
    },
    //批量通过
    async passBatch() {
      let params = {
        operation: 'pass',
        momentIdList: this.checkMomList
      }
      let res = await this.$API.reqMomentOperation(params)
      if (res.status == 200) {
        this.reqReviewMomtListByMId()
      }
      else {
        this.$messageBox.confirm(res.message)
      }
    },
    //批量退回
    async denyBatch() {
      let params = {
        operation: 'deny',
        momentIdList: this.checkMomList
      }
      let res = await this.$API.reqMomentOperation(params)
      if (res.status == 200) {
        this.reqReviewMomtListByMId()
      }
      else {
        this.$messageBox.confirm(res.message)
      }
    },

  },
}
</script>

<style lang="less" scoped>

.blue-bg {
  background-color: #cce2fa;
}

.el-main {
  .article-list_wrap {
    padding: 0px 60px 20px;

    .first-line {
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;

      .first-line-checkall {
        display: flex;
        align-items: flex-end;

        .el-switch {
          margin-left: 10px;
        }
      }

      .first-line-showType {
        display: flex;
        align-items: flex-end;
      }

      .first-line-operation {
        width: 25%;
        display: flex;
        justify-content: space-evenly;
      }


    }

    .moment-item {
      margin-top: 30px;
      

      .item-card {
        width: 100%;
        padding: 10px;
        border-bottom: 1px solid #9499a0;
        display: flex;

        .moment-item__main {
          display: flex;

          .moment-item__left {
            .moment-item__face {
              cursor: pointer;
            }
          }

          .moment-item__right {
            position: relative;
            margin-left: 10px;
            width: 650px;

            .moment-more {
              position: absolute;
              right: 10px;
              top: 10px;

              ::v-deep .el-menu-item {
                width: 50px;
                overflow: hidden;
              }
            }

            .moment-item-wrap {
              width: 520px;

              .moment-item__header {
                height: 40px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .moment-username {
                  display: flex;
                  justify-content: space-between;

                  .username {
                    color: #fb7299;
                    font-size: 16px;
                    cursor: pointer;
                  }

                  .status {
                    color: #9499a9;
                    font-size: 13px;
                    padding-right: 20px;
                  }
                }

                .moment-desc {
                  color: #99a2aa;
                  font-size: 12px;
                }

              }

              .moment-item__body {
                margin-top: 10px;

                .moment-item__subject {
                  color: #008ac5;
                  font-size: 14px;
                  cursor: pointer;
                }

                .moment-item__text {
                  font-size: 14px;
                  margin-top: 5px;
                }

                .moment-item__imgs {
                  max-width: 330px;
                  margin-top: 10px;

                  .el-image {
                    margin-right: 4px;
                    border-radius: 4px;
                  }

                  .img_full {
                    width: auto !important;
                    height: auto !important;
                  }
                }
              }

            }

          }
        }

      }

    }
  }
}
</style>