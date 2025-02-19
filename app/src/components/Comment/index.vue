<template>
    <div class="comment">
        <div class="reply-header">
            <span class="nav-title-text">评论</span>
            <span class="total-reply">{{ commentNum }}</span>
            <span class="hot-sort" style="font-size: 13px;">最新</span>
            <span>&nbsp;|&nbsp;</span>
            <span class="time-sort" style="font-size: 13px;">最热</span>
        </div>
        <!-- 评论框 -->
        <div class="reply-wrap">
            <div class="main-reply-box">
                <el-avatar class="reply-box-avatar" :src="userFace"></el-avatar>
                <el-input class="reply-box-warp" v-model="content" placeholder="尊重是评论打动人心的入场券"></el-input>
                <el-button class="reply-box-send" type="primary" plain @click="sendComment()">发布</el-button>
            </div>
            <!-- 评论列表 -->
            <div class="reply-list">
                <div class="reply-item" v-for="comment in  commentList " :key="comment.commentid">
                    <div class="root-reply-container">
                        <el-avatar class="root-reply-avatar" :src="comment.imgurl"></el-avatar>
                        <div class="content-warp">
                            <div class="user-info">{{ comment.username }}<i v-if="UPId == comment.userid"
                                    class="iconfont icon-UPzhu" style="padding-left: 5px;color: #ff6699;"></i></div>
                            <div class="root-reply">
                                <div class="reply-content-container">{{ comment.content }}</div>
                                <div class="reply-info">
                                    <span>{{ strToYMDHM(comment.createtime) }}</span>
                                    <span><i class="iconfont icon-dianzan2"></i>{{ comment.likenum }}</span>
                                    <span class="reply-btn" @click="showReplyDrawer(comment)">回复</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="sub-reply-list">
                        <div class="sub-reply-item"
                            v-for="(subComment, index) in comment.subcommentlist == null ? comment.subcommentlist : comment.subcommentlist.slice(0, 3)"
                            :key="subComment.commentid">
                            <div class="sub-reply-container">
                                <el-avatar class="sub-reply-avatar" :src="subComment.imgurl"></el-avatar>
                                <div class="sub-area">
                                    <div class="sub-reply">
                                        <span class="sub-user-info" style="font-size: 13px;"
                                            v-if="subComment.commentlevel == 2">{{
                                                subComment.username }}<i v-if="UPId == subComment.userid"
                                                class="iconfont icon-UPzhu"
                                                style="padding-left: 5px;color: #ff6699;"></i></span>
                                        <span class="sub-user-info" style="font-size: 13px;" v-else>{{ subComment.username
                                        }}<i v-if="UPId == subComment.userid" class="iconfont icon-UPzhu"
                                                style="padding-left: 5px;color: #ff6699;"></i>&nbsp;&nbsp;回复&nbsp;&nbsp;{{
                                                    subComment.fatherusername }}<i v-if="UPId == subComment.fatheruserid"
                                                class="iconfont icon-UPzhu"
                                                style="padding-left: 5px;color: #ff6699;"></i></span>
                                        <span class="sub-reply-content">{{ subComment.content }}</span>
                                    </div>
                                    <div class="sub-reply-info">
                                        <span>{{ strToYMDHM(subComment.createtime) }}</span>
                                        <span><i class="iconfont icon-dianzan2"></i>{{ subComment.likenum }}</span>
                                        <span class="reply-btn" @click="showReplyDrawer(subComment)">回复</span>
                                    </div>
                                </div>
                            </div>
                            <div class="view-more" v-if="index == 2 && comment.subcommentlist.length > 3">
                                <span>共{{ comment.subcommentlist.length }}条回复，</span>
                                <span class="view-more-btn" @click="moreComment(comment.commentid)">点击查看</span>
                            </div>
                        </div>

                        <div :ref="comment.commentid" style="display: none;">
                            <div class="sub-reply-item"
                                v-for="(subComment, index) in  comment.subcommentlist == null ? comment.subcommentlist : comment.subcommentlist.slice(3, comment.subcommentlist.length) "
                                :key="subComment.commentid">
                                <div class="sub-reply-container">
                                    <el-avatar class="sub-reply-avatar" :src="subComment.imgurl"></el-avatar>
                                    <div class="sub-area">
                                        <div class="sub-reply">
                                            <span class="sub-user-info" style="font-size: 13px;"
                                                v-if="subComment.commentlevel == 2">{{
                                                    subComment.username }}<i v-if="UPId == subComment.userid"
                                                    class="iconfont icon-UPzhu"
                                                    style="padding-left: 5px;color: #ff6699;"></i></span>
                                            <span class="sub-user-info" style="font-size: 13px;" v-else>{{
                                                subComment.username
                                            }}<i v-if="UPId == subComment.userid" class="iconfont icon-UPzhu"
                                                    style="padding-left: 5px;color: #ff6699;"></i>&nbsp;&nbsp;回复&nbsp;&nbsp;{{
                                                        subComment.fatherusername }}<i v-if="UPId == subComment.fatheruserid"
                                                    class="iconfont icon-UPzhu"
                                                    style="padding-left: 5px;color: #ff6699;"></i></span>
                                            <span class="sub-reply-content">{{ subComment.content }}</span>
                                        </div>
                                        <div class="sub-reply-info">
                                            <span>{{ strToYMDHM(subComment.createtime) }}</span>
                                            <span><i class="iconfont icon-dianzan2"></i>{{ subComment.likenum }}</span>
                                            <span class="reply-btn" @click="showReplyDrawer(subComment)">回复</span>
                                        </div>
                                    </div>
                                </div>
                                <span v-if="index == comment.subcommentlist.length - 4" class="collapse-btn"
                                    @click="hiddenMore(comment.commentid)">收起</span>
                            </div>
                        </div>

                    </div>

                    <div class="bottom-line"></div>
                </div>
            </div>
        </div>
        <!-- 回复抽屉 -->
        <el-drawer :title="drawerTitle" :visible.sync="showDrawer" direction="btt">
            <div class="main-reply-box">
                <el-avatar class="reply-box-avatar" :src="userFace"></el-avatar>
                <el-input class="reply-box-warp" v-model="replyContent" placeholder="尊重是评论打动人心的入场券"></el-input>
                <el-button class="reply-box-send" type="primary" plain @click="sendReply">发布</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { strToYMDHM } from '@/utils/strToDate'
export default {
    name: "Comment",
    data() {
        return {
            //评论内容
            content: '',
            //是否查看更多评论
            showMoreComment: false,
            //是否显示查看按钮
            showMoreBtn: true,
            //抽屉显示与否
            showDrawer: false,
            //抽屉标题
            drawerTitle: '回复 @',
            //回复评论内容
            replyContent: '',
            //回复对象
            replyComment: {}
        }
    },
    computed: {
        ...mapGetters(['userFace', 'userid'])
    },
    //multiId是setId或者momentId；根据type区分；UPId是视频或者动态的UP主
    props: ['commentList', 'commentNum', 'type', 'multiId', 'UPId'],
    methods: {
        //时间格式
        strToYMDHM(str) {
            return strToYMDHM(str)
        },
        //发布顶级评论
        async sendComment() {
            let setComment = {
                userid: this.userid,
                createtime: new Date(),
                content: this.content,
                commentlevel: 1,
                // isup: this.userid == this.UPId ? 1 : 0
            }
            let res;
            if (this.type == 'videoset') {
                setComment.setid = this.multiId
                res = await this.$API.reqSendComment(setComment)
            } else if (this.type == 'moment') {
                setComment.momentid = this.multiId
                res = await this.$API.reqSendMomComment(setComment)
            }
            // let res = await this.$API.reqSendComment(setComment)
            if (res.status != 200) {
                this.$messageBox.alert(res.message, '发布状态', {
                    confirmButtonText: '确定'
                });
            } else {
                //发布成功，通知父组件更新评论列表
                this.$emit('renewComment')
            }
        },
        //显示回复评论框
        showReplyDrawer(comment) {
            this.showDrawer = true
            this.drawerTitle = '回复 @' + comment.username
            this.replyComment = comment
        },
        //发布回复评论
        async sendReply() {
            let setComment = {
                userid: this.userid,
                createtime: new Date(),
                content: this.replyContent,
                fatherid: this.replyComment.commentid,
                commentlevel: this.replyComment.commentlevel + 1,
                topcommentid: this.replyComment.topcommentid == null ? this.replyComment.commentid : this.replyComment.topcommentid,
                // isup: this.userid == this.UPId ? 1 : 0
            }
            let res;
            if (this.type == 'videoset') {
                setComment.setid = this.multiId
                res = await this.$API.reqSendComment(setComment)
            } else if (this.type == 'moment') {
                setComment.momentid = this.multiId
                res = await this.$API.reqSendMomComment(setComment)
            }
            // let res = await this.$API.reqSendComment(setComment)
            if (res.status != 200) {
                this.$messageBox.alert(res.message, '发布状态', {
                    confirmButtonText: '确定'
                });
            } else {
                // this.$router.push("/blankPage")
                this.$emit('renewComment')
            }
        },
        //查看更多评论
        moreComment(commentid, $event) {
            this.$refs[commentid][0].style.display = 'block'
        },
        //收起更多评论
        hiddenMore(commentid) {
            this.$refs[commentid][0].style.display = 'none'
        }
    },
}
</script>

<style lang="less" scoped>
.comment {
    .reply-header {
        height: 30px;
        line-height: 30px;
        margin: 20px 0px;

        .nav-title-text {
            font-size: 20px;
            font-weight: 500;
        }

        .total-reply {
            margin: 0px 36px 0px 6px;
            font-size: 13px;
            color: #9499a0;
        }

        .hot-sort {
            color: #b871e3;
        }

        .time-sort {
            color: #b871e3;
        }
    }

    .reply-wrap {
        // 这个拿到外边去了，因为其他地方也用到
        // .main-reply-box {
        //   display: flex;
        //   flex-direction: row;

        //   .reply-box-avatar {
        //     margin: 0px 15px;

        //   }

        //   .reply-box-warp {
        //     position: relative;
        //     flex: 1;
        //   }

        //   .reply-box-send {
        //     margin-left: 10px;
        //   }
        // }

        .reply-list {
            margin-top: 14px;

            .reply-item {
                padding: 22px 0px 0px 0px;

                .root-reply-container {
                    display: flex;

                    .root-reply-avatar {
                        margin: 0px 15px;
                        // display: block;
                        // width: 40px !important;
                        // height: 40px !important;
                    }

                    .content-warp {
                        position: relative;
                        flex: 1;

                        .user-info {
                            height: 30px;
                            line-height: 30px;
                            font-size: 13px;
                            color: #61666d;
                        }

                        .root-reply {
                            padding: 2px 0px;

                            .reply-content-container {
                                font-size: 15px;
                                line-height: 1.5em;
                                margin: 6px 0px;

                            }

                            .reply-info {
                                font-size: 13px;
                                color: #9499a0;
                                margin: 6px 0px;

                                span {
                                    padding-right: 20px;
                                }
                            }
                        }
                    }
                }

                .sub-reply-list {
                    padding: 0px 0px 0px 60px;

                    .sub-reply-item {
                        padding: 8px 0px;

                        .sub-reply-container {
                            display: flex;

                            .sub-reply-avatar {
                                margin: 0px 10px;
                                width: 24px;
                                height: 24px;
                            }

                            .sub-area {
                                flex: 1;

                                .sub-reply {
                                    margin: 0px 0px 6px 0px;

                                    .sub-user-info {
                                        font-size: 13px !important;
                                        color: #61666d;
                                    }

                                    .sub-reply-content {
                                        line-height: 1.5em;
                                        font-size: 15px;
                                        margin-left: 10px;
                                    }
                                }

                                .sub-reply-info {
                                    margin: 6px 0px;
                                    font-size: 13px;
                                    color: #9499A0;

                                    span {
                                        padding-right: 20px;
                                    }
                                }
                            }


                        }

                        .collapse-btn {
                            padding: 10px 0px 10px 10px;
                            font-size: 13px;
                            color: #9499A0;
                            cursor: pointer;
                        }

                        .collapse-btn:hover {
                            color: #00b3ef;
                        }

                        .view-more {
                            padding: 10px 0px 10px 10px;
                            font-size: 13px;
                            color: #9499A0;

                            .view-more-btn {
                                cursor: pointer;
                            }

                            .view-more-btn:hover {
                                color: #00b3ef;
                            }
                        }
                    }
                }

                .bottom-line {
                    margin-left: 60px;
                    border-bottom: 1px solid #e3e5e7;
                    // margin-top: 14px;
                }
            }
        }
    }
}

/** 评论部分续--回复按钮 */
.reply-btn {
    font-size: 13px;
    color: #9499A0;
    cursor: pointer;
}

.reply-btn:hover {
    color: #00b3ef;
}

/** 评论部分续--发布&回复框 */
.main-reply-box {
    display: flex;
    flex-direction: row;

    .reply-box-avatar {
        margin: 0px 15px;

    }

    .reply-box-warp {
        position: relative;
        flex: 1;
    }

    .reply-box-send {
        margin-left: 10px;
    }
}

::v-deep .el-drawer__body {
    padding: 0px 60px 0px 0px;
}

/**评论部分增 */
.comment {
    width: 700px;
}</style>