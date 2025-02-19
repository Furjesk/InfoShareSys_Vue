<template>
    <div class="my-channel">
        <el-container>
            <el-aside width="200px">
                <div class="top">
                    <div class="title">
                        <span>{{ $route.params.userId == $store.getters.userid ? '我' : 'TA' }}加入的频道</span>
                    </div>
                    <el-input placeholder="搜索频道" v-model="keyword">
                        <i slot="suffix" class="el-input__icon el-icon-search search-btn"></i>
                    </el-input>
                </div>
                <div class="occupy"></div>
                <div class="channel-list">
                    <div class="channel-item" v-for="item in channelList" :key="item.category2id"
                        @click="jumpToFloor(item.category2id)">{{ item.category2name }}
                    </div>
                </div>
            </el-aside>
            <el-main>
                <Floor v-for="(item, key) in allTop8Map" :key="key" :category2Name="item.category2Name"
                    :hot8List="item.category2Top8" :recs8List="item.category2Top8" :category2Id="key" :id="key" />
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'ChannelDisplay',
    data() {
        return {
            keyword: '',
            channelList: [],
            allTop8Map: {}
        }
    },
    mounted() {
        //获取频道信息
        this.getJoinChannelInfo()
    },
    methods: {
        //获取频道信息
        async getJoinChannelInfo() {
            let res = await this.$API.reqJoinChannelInfo(this.$route.params.userId)
            if (res.status == 200) {
                this.channelList = res.data.channelList
                this.allTop8Map = res.data.allTop8Map
            } else {
                this.$message.error("获取频道信息失败")
            }
        },
        jumpToFloor(category2id) {
            const element = document.getElementById(category2id)
            element.scrollIntoView({ behavior: "smooth", block: 'center' }); // 中部
            element.style.backgroundColor = "#cce2fa"
            setTimeout(() => {
                element.style.backgroundColor = "#fff"
                element.style.transition = "background-color 0.5s"
            }, 1000);
        }
    },
}
</script>

<style lang="less" scoped>
.my-channel {
    .el-container {

        .el-aside {
            background-color: #fff;
            height: 440px;
            padding: 0px 20px 20px 20px;

            .top {
                position: fixed;
                z-index: 1;
                background-color: #fff;
                padding-top: 20px;

                .title {
                    margin-bottom: 10px;
                }

                .el-input {
                    width: 160px;

                    .search-btn {
                        cursor: pointer;
                    }
                }
            }

            .channel-list {
                margin-top: 90px;

                .channel-item {
                    height: 40px;
                    line-height: 40px;
                    cursor: pointer;
                    transition: .3s;

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

                .channel-item:hover {
                    background-color: #efefef;
                }
            }

        }

        .el-main {
            height: 440px;
        }
    }
}
</style>