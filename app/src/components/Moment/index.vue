<template>
    <div>
        <div class="moment-item" v-for="moment in showList" :key="moment.momentid" :id="moment.momentid">
            <div class="moment-item__main">
                <div class="moment-item__left">
                    <div class="moment-item__face" @click="gotoUpMomentHome(moment.userid)">
                        <el-avatar :src="moment.imgurl"></el-avatar>
                    </div>
                </div>
                <div class="moment-item__right">
                    <div class="moment-more">
                        <el-button plain size="mini" :disabled="moment.status != 1">置顶</el-button>
                        <el-button plain size="mini" type="danger" @click="deleteMoment(moment.momentid)"
                            :disabled="moment.status == 3">删除</el-button>
                    </div>
                    <div class="moment-item-wrap">
                        <div class="moment-item__header">
                            <div class="moment-username">
                                <span class="username" @click="gotoUpMomentHome(moment.userid)">{{ moment.username }}</span>
                            </div>
                            <div class="moment-desc">{{ strToYMDHM(moment.createtime) }}</div>
                        </div>
                        <div class="moment-item__body">
                            <div class="moment-item__subject" v-if="moment.subjectname != null"><i
                                    class="iconfont icon-huatizhuti"></i>&nbsp;{{ moment.subjectname }}</div>
                            <div class="moment-item__text">{{ moment.content }}</div>
                            <div class="moment-item__imgs">
                                <el-image v-for="img in moment.momentimgList" :key="img.momimgid"
                                    style="width: 100px; height: 100px"
                                    :class="moment.momentimgList.length == 1 ? 'img_full' : ''" :src="img.momimgurl"
                                    fit="cover" :preview-src-list="[img.momimgurl]"></el-image>
                            </div>
                        </div>
                        <div class="moment-item__footer">
                            <div class="moment-item__action">
                                <i class="iconfont icon-zhuanfa"></i>
                                <span>&nbsp;{{ moment.transmitnum }}</span>
                            </div>
                            <div class="moment-item__action" @click="showComment(moment.momentid)">
                                <i class="iconfont icon-comment"></i>
                                <span>&nbsp;{{ moment.commentnum }}</span>
                            </div>
                            <div class="moment-item__action">
                                <i class="iconfont icon-dianzan2"></i>
                                <span>&nbsp;{{ moment.likenum }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 评论部分 -->
            <Comment :ref="moment.momentid" style="display:none;" :commentList="moment.momcommentList" :UPId="moment.userid"
                :commentNum="moment.commentnum" type="moment" :multiId="moment.momentid" @renewComment="renewCommentList" />

        </div>
    </div>
</template>

<script>
import { strToYMDHM } from '@/utils/strToDate';
export default {
    name: 'Moment',
    props: ['showList'],
    mounted() {
        // this.$nextTick(() => {
        //     // console.log(document.getElementById('2'));
        //     // const ele = document.getElementById('2')
        //     // ele.scrollIntoView(false);
        //     setTimeout(() => {
        //         console.log(document.getElementById('2'));
        //         const ele = document.getElementById('2')
        //         ele.scrollIntoView();
        //     });
        // })
        if (this.$route.hash != '') {
            //上面方法不管用，只能这样了。nexttick不会等v-for
            setTimeout(() => {
                const element = document.getElementById(this.$route.hash.substring(1))
                element.scrollIntoView({ behavior: "smooth", block: 'center' }); // 中部
                element.style.backgroundColor = "#cce2fa"
            }, 500);
            setTimeout(() => {
                const element = document.getElementById(this.$route.hash.substring(1))
                element.style.backgroundColor = "#fff"
                element.style.transition = "background-color 0.5s"
            }, 1500);
        }

    },
    methods: {
        //更新 评论列表【父组件需要提供的】
        renewCommentList() {
            // console.log("father");
            //发布成功，通知父组件更新评论列表
            this.$emit('renewComment')
        },
        //时间格式转换
        strToYMDHM(str) {
            return strToYMDHM(str)
        },
        //跳转到up动态主页
        gotoUpMomentHome(userid) {
            this.$router.push(`/homePage/${userid}`)
        },
        //删除动态
        deleteMoment(momentid) {
            this.$messageBox.confirm("确定要删除稿件吗？被删除的稿件将在‘已删除’保存30天，30天后永久删除", "确认信息")
                .then(async () => {
                    //点击确定，执行删除
                    let res = await this.$API.reqDeleteMomentByMomId({ momentId: momentid })
                    if (res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功~'
                        });
                        //重新获取动态列表，更新
                        this.reqReviewMomentListByUId()
                    } else {
                        this.$message.error('删除失败~');
                    }
                })
                .catch(action => {
                    //取消删除
                });
        },
        //评论显示与隐藏
        showComment(momentid) {
            if (this.$refs[momentid][0].$el.style.display == 'block') {
                this.$refs[momentid][0].$el.style.display = 'none'
            } else if (this.$refs[momentid][0].$el.style.display == 'none') {
                this.$refs[momentid][0].$el.style.display = 'block'
            }
        }
    },
}
</script>

<style lang="less" scoped>
.moment-item {
    margin-top: 30px;
    background-color: #fff;

    // border-bottom: 1px solid #9499A0;
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

                        // 下面这行有就是为了保持代码复用一致
                        // justify-content: space-between;
                        .username {
                            color: #fb7299;
                            font-size: 16px;
                            cursor: pointer;
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

                .moment-item__footer {
                    display: flex;
                    margin-top: 10px;

                    .moment-item__action {
                        margin-right: 60px;
                        color: #99a2aa;
                        font-size: 14px;
                        cursor: pointer;
                    }
                }
            }

        }
    }

    /** 评论部分 */

}
</style>