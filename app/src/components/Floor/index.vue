<template>
    <!-- 楼层 -->
    <div class="floor">
        <div class="floor-left">
            <div class="first-line">
                <div class="category2name">{{ category2Name }}</div>
                <div class="btn">
                    <el-button plain size="small" v-if="$route.path.indexOf('channelDetail') == -1"
                        :disabled="recs8List.length < 8" icon="el-icon-refresh">换一换</el-button>
                    <el-button plain size="small" v-if="$route.path.indexOf('channelDetail') == -1"
                        @click="gotoChannelDetail()">查看更多<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                    <el-button plain type="primary" v-if="$route.path.indexOf('channelDetail') != -1" @click="joinChannel()"
                        :icon="is_join ? '' : 'el-icon-plus'" size="small">
                        <span v-if="!is_join">加入频道</span>
                        <span v-else>已加入频道</span>
                    </el-button>
                </div>
            </div>
            <div v-if="recs8List.length == 0" class="nothing-div">
                <img src="/nothing.png">
            </div>
            <div v-else class="item-grid">

                <div class="item" v-for="set in recs8List" :key="set.setid">
                    <div class="video-card-face" @click="gotoSetDetails(set.setid)">
                        <img class="video-card-img" :src="set.setimg">
                        <span class="img-bottom">
                            <span class="img-bottom-line">
                                <span>
                                    <span><i class="iconfont icon-bofang"></i>{{ set.watchnum
                                    }}&nbsp;&nbsp;&nbsp;</span>
                                    <span><i class="iconfont icon-dianzan2"></i>{{ set.likenum }}</span>
                                </span>
                                <span class="duration">{{ set.setlong }}</span>
                            </span>
                        </span>
                    </div>
                    <div class="video-card-info">
                        <div class="video-title" @click="gotoSetDetails(set.setid)">{{ set.setname }}</div>
                        <div class="up-info">
                            <span class="username" @click="gotoUpHome(set.userid)"><i class="iconfont icon-UPzhu"></i>{{
                                set.username }}</span>
                            <span>&nbsp;·&nbsp;{{ strToYMD(set.createtime) }}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="floor-right">
            <div class="rank-title">热门</div>
            <div class="rank-list">
                <div class="rank-item" v-for="(set, index) in hot8List" :key="set.setid" @click="gotoSetDetails(set.setid)">
                    <span class="rank-num" :class="index < 3 ? 'red-color' : ''">{{ index + 1 }}</span>
                    <div class="rank-name">{{ set.setname }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { strToYMD } from '@/utils/strToDate'
import { mapGetters } from 'vuex';
export default {
    name: 'Floor',
    data() {
        return {
            is_join: false,
        }
    },
    // props: ['category2Name','hot8List','recs8List','category2Id'],
    props: {
        category2Name: {
            required: true,
        },
        hot8List: {
            required: true,
        },
        recs8List: {
            required: true,
        },
        category2Id: {
            required: true,
        },
        isJoin: {
            required: false,
        }
    },
    watch: {
        isJoin(newVal) {
            this.is_join = newVal
        }
    },
    computed: {
        ...mapGetters(['userid'])
    },
    methods: {
        strToYMD(str) {
            return strToYMD(str)
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
        //去二级分类页/查看更多
        gotoChannelDetail() {
            this.$router.push(`/channelDetail/${this.category2Id}/${this.category2Name}`)
        },
        //加入或取消加入频道
        async joinChannel() {

            if (this.is_join) {
                //取消加入
                this.$messageBox.confirm('确定要退出频道吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let params = {
                        userid: this.userid,
                        category2id: this.category2Id,
                        action: 0 //0表示取消，1表示加入
                    }
                    let res = await this.$API.reqJoinChannel(params)
                    if (res.status == 200) {
                        this.is_join = !this.is_join
                        this.$message.success("操作成功")
                    } else {
                        this.$message.error("操作失败")
                    }
                }).catch(() => { return });
            } else { //加入
                let params = {
                    userid: this.userid,
                    category2id: this.category2Id,
                    action: 1 //0表示取消，1表示加入
                }
                let res = await this.$API.reqJoinChannel(params)
                if (res.status == 200) {
                    this.is_join = !this.is_join
                    this.$message.success("操作成功")
                } else {
                    this.$message.error("操作失败")
                }
            }


        }
    },
}
</script>

<style lang="less" scoped>
.floor {
    display: grid;
    grid-gap: 20px 20px;
    grid-template-columns: repeat(5, 1fr);
    margin-top: 30px;

    .floor-left {
        grid-column: span 4;

        .first-line {
            display: flex;
            justify-content: space-between;

            .category2name {
                font-size: 20px;
            }
        }

        .nothing-div {
            display: flex;
            justify-content: center;

            img {
                height: 150px;
            }
        }

        .item-grid {
            display: grid;
            grid-gap: 20px 20px;
            grid-template-columns: repeat(4, 1fr);

            .item {
                padding-top: 30px;
                // max-width: 264px;

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
                        .username {
                            cursor: pointer;
                        }

                        font-size: 13px;
                        color: #9499a0;
                    }
                }
            }
        }
    }

    .floor-right {
        .rank-title {
            font-size: 20px;
        }

        .rank-list {

            .rank-item {
                display: flex;
                padding: 10px 0px;
                cursor: pointer;

                .rank-num {
                    margin-right: 10px;
                    font-weight: 600;
                    font-style: italic;
                }

                .red-color {
                    color: #ff473d;
                }

                .rank-name {
                    display: -webkit-box;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                    text-overflow: -o-ellipsis-lastline;
                    text-overflow: ellipsis;
                    word-break: break-word !important;
                    word-break: break-all;
                    line-break: anywhere;
                    -webkit-line-clamp: 1;
                }
            }
        }
    }
}
</style>