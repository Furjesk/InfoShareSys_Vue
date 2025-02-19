<template>
    <!-- 视频集网格布局展示组件 -->
    <div class="recommend">
        <div class="grid-container">

            <div class="grid-item" v-for="set in videoSetList" :key="set.setid">
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
                    <div class="up-info">
                        <span class="username" @click="gotoUpHome(set.userid)"><i class="iconfont icon-UPzhu"></i>{{ set.username }}</span>
                        <span>&nbsp;·&nbsp;{{ strToYMD(set.createtime) }}</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { strToYMD } from '@/utils/strToDate'
export default {
    name: "VideoDisplay",
    props: ['videoSetList'],
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
        }
    },
}
</script>

<style lang="less" scoped>
.recommend {
    // padding: 0px 60px;

    .grid-container {
        display: grid;
        grid-gap: 20px;
        //规定网格布局中的列数（和宽度），5列宽度自动
        // grid-template-columns: 263.84px 263.84px 263.84px 263.84px 263.84px;
        grid-template-columns: repeat(5, 1fr);

        .carousel {
            position: relative;
            grid-column-end: span 2;
            grid-row-end: span 2;
            background-color: #949994;
            max-height: 90% !important;

            .carousel-img {
                border-radius: 0px !important;
                height: 100% !important;
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
</style>