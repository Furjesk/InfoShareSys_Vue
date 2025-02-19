<template>
    <div class="detail-container">
        <!-- 返回顶部按钮 -->
        <el-button icon="el-icon-caret-top" type="primary" circle @click="ToTop()" class="to-top"></el-button>
        <!-- 楼层 -->
        <Floor :category2Name="$route.params.category2Name" :hot8List="hot8List" :recs8List="recs8List"
            :category2Id="$route.params.category2Id" :isJoin="isJoin" />
        <!-- 其他 -->
        <VideoDisplay v-if="otherList.length > 0" :videoSetList="otherList" />
    </div>
</template>

<script>
import { strToYMD } from '@/utils/strToDate'
import { mapGetters } from 'vuex';
export default {
    name: 'ChannelDetail',
    data() {
        return {
            isJoin: false,
            hot8List: [],
            allVideoSets: [],
            recs8List: [],
            otherList: []
        }
    },
    mounted() {
        this.getChannelDetail()
    },
    watch: {
        allVideoSets(newVal) {
            if (newVal.length > 8) {
                this.recs8List = newVal.slice(0, 8)
                this.otherList = newVal.slice(8, newVal.length)
            } else {
                this.recs8List = newVal
                this.otherList = []
            }
        }
    },
    computed: {
        ...mapGetters(['userid'])
    },
    methods: {
        strToYMD(str) {
            return strToYMD(str)
        },
        async getChannelDetail() {
            let params = {
                userid: this.userid,
                category2id: this.$route.params.category2Id
            }
            let res = await this.$API.reqChannelDetail(params)
            if (res.status == 200) {
                this.isJoin = res.data.isJoin
                this.hot8List = res.data.hot8List
                this.allVideoSets = res.data.allVideoSets
            } else {
                this.$message.error("获取详情数据失败")
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
        //回到顶部
        ToTop() {
            document.documentElement.scrollTop = 0;
        },
    },
}
</script>

<style lang="less" scoped>
.detail-container {
    padding: 0px 60px;

    .to-top {
        position: fixed;
        right: 60px;
        bottom: 100px;
    }

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
}
</style>