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
                            :disabled="disabled || checkSetList.length==0">批量通过</el-button>
                        <el-button type="danger" plain @click="denyBatch" size="medium"
                            :disabled="disabled || checkSetList.length==0">批量退回</el-button>
                    </div>
                </div>
                <div v-for="(review,index) in showSetList" :key="review.reviewid">

                    <div class="article-card" :class="[checkSetList.includes(review.reviewid) ? 'blue-bg' : '',index==0?'border-top':'']">
                        <label>
                            <input type="checkbox" :value="review.reviewid" v-model="checkSetList">
                            <div class="cover-wrap">
                                <img :src="review.setimg" alt="">
                                <div class="duration">{{ review.setlong }}</div>
                            </div>
                            <div class="meta-wrap">
                                <div class="meta-title">
                                    <span class="title">{{ review.setname }}</span>
                                    <div class="preview">
                                        <el-button type="primary" plain size="small" @click="gotoSetDetails(review.setid)">视频预览</el-button>
                                    </div>
                                </div>
                                <div class="meta-bottom">
                                    <div class="meta-createtime">{{ strToYMDHM(review.createtime) }}</div>
                                    <div class="meta-status">{{ toStr(review.status) }}</div>
                                    <div class="meta-operations">
                                        <el-button type="success" plain @click="passOne(review.reviewid)" size="small"
                                            :disabled="review.status != 0">通过</el-button>
                                        <el-button type="danger" plain @click="denyOne(review.reviewid)" size="small"
                                            :disabled="review.status != 0">退回</el-button>
                                    </div>
                                </div>
                            </div>
                        </label>
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
export default {
    name: "VideoReview",
    data() {
        return {
            //显示的列表
            showSetList: [],
            //全部审核视频集列表
            reviewSetList: [],
            //待审核视频集列表
            waitSetList: [],
            //通过视频集列表
            passSetList: [],
            //退回视频集列表
            denySetList: [],
            //按钮禁用
            disabled: false,

            //选中的reviewid
            checkSetList: [],
            //是否全选
            isCheckAll: false,
            //默认显示什么列表
            radio: '待审核',
        }
    },
    mounted() {
        this.reqReviewSetListByMId();
    },
    watch: {
        checkSetList(newVale) {
            if (newVale.length == this.reviewSetList.length)
                this.isCheckAll = true
            else
                this.isCheckAll = false
        },
        radio(newVal) {
            if (newVal == '待审核') {
                this.showSetList = this.waitSetList;
                this.disabled = false
            }
            else if (newVal == '已通过') {
                this.showSetList = this.passSetList
                this.disabled = true
            }
            else if (newVal == '已退回') {
                this.showSetList = this.denySetList
                this.disabled = true
            }
            else {
                this.showSetList = this.reviewSetList
                this.disabled = true
            }
        }
    },
    methods: {
        //跳转到videoSet详情页（观看页面）
        gotoSetDetails(setid) {
            this.$router.push({
                name: 'play',
                params: {
                    setId: setid,
                }
            })
        },
        //时间格式转换
        strToYMDHM(str) {
            return strToYMDHM(str)
        },
        //获取待审核列表，通过managerid
        async reqReviewSetListByMId() {
            let res = await this.$API.reqReviewSetListByMId(1)
            if (res.status == 200) {
                //全部列表
                this.reviewSetList = res.data
                //划分列表
                this.waitSetList = []
                this.passSetList = []
                this.denySetList = []
                res.data.forEach(review => {
                    if (review.status == 0)
                        this.waitSetList.push(review)
                    else if (review.status == 1)
                        this.passSetList.push(review)
                    else if (review.status == 2)
                        this.denySetList.push(review)
                });
                this.showSetList = this.waitSetList;
            } else {
                this.$messageBox.confirm(res.message)
            }
        },
        //全选开关回调
        changeCheckAll(val) {
            if (val) {
                this.checkSetList = []
                this.reviewSetList.forEach(review => {
                    this.checkSetList.push(review.reviewid)
                });
            } else {
                this.checkSetList = []
            }
        },
        //通过一个审核
        async passOne(reviewId) {
            let reviewIdList = [];
            reviewIdList.push(reviewId)

            let params = {
                operation: 'pass',
                reviewIdList: reviewIdList
            }
            let res = await this.$API.reqVideoSetOperation(params)
            if (res.status == 200) {
                //重新获取待审核列表，更新
                this.reqReviewSetListByMId()
                // this.$router.push("/blankPage") //这里不知道为什么就会使页面回到顶部，弃用
            }
            else {
                this.$messageBox.confirm(res.message)
            }
        },
        //退回一个审核
        async denyOne(reviewId) {
            let reviewIdList = [];
            reviewIdList.push(reviewId)

            let params = {
                operation: 'deny',
                reviewIdList: reviewIdList
            }
            let res = await this.$API.reqVideoSetOperation(params)
            if (res.status == 200) {
                this.reqReviewSetListByMId()
            }
            else {
                this.$messageBox.confirm(res.message)
            }
        },
        //批量通过
        async passBatch() {
            let params = {
                operation: 'pass',
                reviewIdList: this.checkSetList
            }
            let res = await this.$API.reqVideoSetOperation(params)
            if (res.status == 200) {
                this.reqReviewSetListByMId()
            }
            else {
                this.$messageBox.confirm(res.message)
            }
        },
        //批量退回
        async denyBatch() {
            let params = {
                operation: 'deny',
                reviewIdList: this.checkSetList
            }
            let res = await this.$API.reqVideoSetOperation(params)
            if (res.status == 200) {
                this.reqReviewSetListByMId()
            }
            else {
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
        }
    },
}
</script>

<style lang="less" scoped>
.border-top {
    border-top: 1px solid #9499a0;
}
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

        .article-card {
            // display: flex;
            // flex-direction: row;
            width: 100%;
            padding: 10px;
            border-bottom: 1px solid #9499a0;


            label {
                display: flex;
                flex-direction: row;

                input {
                    margin-right: 10px;
                }
            }

            .cover-wrap {
                position: relative;
                width: 154px;
                height: 96px;
                border-radius: 5px;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                }

                .duration {
                    position: absolute;
                    bottom: 0px;
                    right: 0px;
                    background-color: rgba(0, 0, 0, 0.4);
                    color: white;
                    font-size: 12px;
                    padding: 0px 4px;
                    height: 20px;
                    line-height: 20px;
                    border-top-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }
            }

            .meta-wrap {
                flex: 1;
                // width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-left: 10px;

                .meta-title {
                    // width: 100%;
                    display: flex;

                    .title {
                        width: 70%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        word-break: break-all;
                    }

                    .preview {
                        width: 30%;
                        display: flex;
                        justify-content: center;
                    }
                }

                .meta-bottom {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    color: #9499a0;
                    font-size: 13px;

                    .meta-createtime {
                        display: flex;
                        align-items: flex-end;
                        // color: #9499a0;
                        // font-size: 13px;
                    }

                    .meta-status {
                        display: flex;
                        align-items: flex-end;
                        // color: #9499a0;
                        // font-size: 13px;
                    }

                    .meta-operations {
                        width: 30%;
                        display: flex;
                        justify-content: space-evenly;
                    }
                }
            }
        }
    }
}
</style>