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
                <div v-for="(review, index) in showSetList" :key="review.reviewid">

                    <div class="article-card" :class="index == 0 ? 'border-top' : ''">
                        <div class="cover-wrap" @click="gotoSetDetails(review.setid)">
                            <img :src="review.setimg" alt="">
                            <div class="duration">{{ review.setlong }}</div>
                        </div>
                        <div class="meta-wrap">
                            <div class="meta-title">
                                <span class="title" @click="gotoSetDetails(review.setid)">{{ review.setname }}</span>
                            </div>
                            <div class="meta-bottom">
                                <div class="meta-createtime">{{ strToYMDHM(review.createtime) }}</div>
                                <div class="meta-status">{{ toStr(review.status) }}</div>
                                <div class="meta-operations">
                                    <el-button type="primary" plain @click="EditVideoSet(review.setid)" size="small"
                                        :disabled="review.status == 0">编辑</el-button>
                                    <el-button type="primary" plain size="small"
                                        :disabled="review.status == 0">数据</el-button>
                                    <el-button type="danger" plain @click="deleteVideoSet(review.setid)" size="small"
                                        :disabled="review.status == 3">删除</el-button>
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
    name: "VideoManage",
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
            //已删除视频集列表
            deleteSetList: [],

            //默认显示什么列表
            radio: '已通过',
        }
    },
    computed: {
        ...mapGetters(['userid'])
    },
    mounted() {
        this.reqReviewSetListByUId();
    },
    watch: {
        radio(newVal) {
            if (newVal == '待审核') {
                this.showSetList = this.waitSetList;
            }
            else if (newVal == '已通过') {
                this.showSetList = this.passSetList
            }
            else if (newVal == '已退回') {
                this.showSetList = this.denySetList
            }
            else if (newVal == '已删除') {
                this.showSetList = this.deleteSetList
            }
            else {
                this.showSetList = this.reviewSetList
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
        //获取待审核列表，通过userid
        async reqReviewSetListByUId() {
            let res = await this.$API.reqReviewSetListByUId(this.userid)
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
                    else if (review.status == 3)
                        this.deleteSetList.push(review)
                });
                this.showSetList = this.passSetList;
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
        //删除视频
        deleteVideoSet(setid) {
            this.$messageBox.confirm("确定要删除稿件吗？被删除的稿件将在‘已删除’保存30天，30天后永久删除", "确认信息")
                .then(async () => {
                    //点击确定，执行删除
                    let res = await this.$API.reqDeleteVideoSetBySetId({setId:setid})
                    if (res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功~'
                        });
                        //重新获取视频列表，更新
                        this.reqReviewSetListByUId()
                    } else {
                        this.$message.error('删除失败~');
                    }
                })
                .catch(action => {
                    //取消删除
                });
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

        .article-card {
            display: flex;
            flex-direction: row;
            width: 100%;
            padding: 10px;
            border-bottom: 1px solid #9499a0;

            .cover-wrap {
                position: relative;
                width: 154px;
                height: 96px;
                border-radius: 5px;
                cursor: pointer;

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
                    width: 70%;
                    display: flex;


                    .title {
                        max-width: 70%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        word-break: break-all;
                        cursor: pointer;
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