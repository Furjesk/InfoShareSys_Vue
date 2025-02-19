<template>
    <div class="user-container">
        <div class="user-main">
            <div class="user-bg">
                <div class="user-brief">
                    <div class="brief-main">
                        <el-avatar :size="60" :src="userInfo.imgurl"></el-avatar>
                        <div class="right">
                            <div class="info">
                                <h2 class="username">{{ userInfo.username }}</h2>
                                <div class="brief">{{ userInfo.userbrief }}</div>
                            </div>
                            <div class="operation" v-if="!disabled">
                                <el-button plain size="small">
                                    <span v-if="userInfo.isFollow == 0">关注</span>
                                    <span v-else-if="userInfo.isFollow == 1">已关注</span>
                                    <span v-else-if="userInfo.isFollow == 2">相互关注</span>
                                </el-button>
                                <el-button plain size="small">发消息</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="user-nav">
                <el-menu :default-active="activeBar" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">
                        <template slot="title">首页</template>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <template slot="title">动态</template>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <template slot="title">视频</template>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <template slot="title">收藏</template>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <template slot="title">频道</template>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <template slot="title">关注{{ userInfo.follownum }}</template>
                    </el-menu-item>
                    <el-menu-item index="7">
                        <template slot="title">粉丝{{ userInfo.followernum }}</template>
                    </el-menu-item>
                </el-menu>
            </div>

            <!-- 这里可以封装成 路由组件 -->
            <router-view></router-view>

        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            activeBar: '1',
            userId: 0,
            userInfo: {}, //Up主
            disabled: false, //如果是自己的主页就禁用部分按钮
        }
    },
    mounted() {
        this.disabled = this.$route.params.userId == this.$store.getters.userid
        this.userId = this.$route.params.userId
        this.getUserInfo()
        // activeBar 
        if (this.$route.path.indexOf("upHome") != -1) {
            this.activeBar = '1'
        } else if (this.$route.path.indexOf("momentDisplay") != -1) {
            this.activeBar = '2'
        } else if (this.$route.path.indexOf("videoSetDisplay") != -1) {
            this.activeBar = '3'
        } else if (this.$route.path.indexOf("channelDisplay") != -1) {
            this.activeBar = '5'
        } else if (this.$route.path.indexOf("followDisplay") != -1) {
            this.activeBar = '6'
        } else if (this.$route.path.indexOf("followerDisplay") != -1) {
            this.activeBar = '7'
        }
    },
    watch: {
        $route(newVal) {
            this.disabled = this.$route.params.userId == this.$store.getters.userid
            this.userId = newVal.params.userId
            this.getUserInfo()
            // activeBar 
            if (this.$route.path.indexOf("upHome") != -1) {
                this.activeBar = '1'
            } else if (this.$route.path.indexOf("momentDisplay") != -1) {
                this.activeBar = '2'
            } else if (this.$route.path.indexOf("videoSetDisplay") != -1) {
                this.activeBar = '3'
            } else if (this.$route.path.indexOf("channelDisplay") != -1) {
                this.activeBar = '5'
            } else if (this.$route.path.indexOf("followDisplay") != -1) {
                this.activeBar = '6'
            } else if (this.$route.path.indexOf("followerDisplay") != -1) {
                this.activeBar = '7'
            }
        }
    },
    methods: {
        handleSelect(key) {
            switch (key) {
                case '1':
                    this.$router.push(`/homePage/${this.userId}/upHome`)
                    break;
                case '2':
                    this.$router.push(`/homePage/${this.userId}/momentDisplay`)
                    break;
                case '3':
                    this.$router.push(`/homePage/${this.userId}/videoSetDisplay`)
                    break;
                case '4':
                    // this.$router.push(`/homePage/${this.userId}/videoSetDisplay`)
                    break;
                case '5':
                    this.$router.push(`/homePage/${this.userId}/channelDisplay`)
                    break;
                case '6':
                    this.$router.push(`/homePage/${this.userId}/followDisplay`)
                    break;
                case '7':
                    this.$router.push(`/homePage/${this.userId}/followerDisplay`)
                    break;

                default:
                    break;
            }
        },
        async getUserInfo() {
            if (this.$route.params.userId == this.$store.getters.userid) {
                //如果是自己的主页
                this.userInfo = this.$store.state.user.userInfo
            } else {
                //如果是别人的主页，需要查数据库
                let params = {
                    userId: this.$store.getters.userid,
                    UPId: this.$route.params.userId
                }
                let res = await this.$API.reqUpUserInfo(params)
                if (res.status == 200) {
                    this.userInfo = res.data
                } else {
                    this.$message.error("获取UP用户信息失败")
                }
            }
        }
    },
}
</script>

<style lang="less" scoped>
.user-container {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #f4f5f7;

    .user-main {
        width: 1280px;

        .user-bg {
            background-image: url("/userbg.jpg");
            width: 100%;
            height: 190px;
            position: relative;

            .user-brief {
                position: absolute;
                bottom: 0px;
                left: 0px;
                width: 100%;
                height: 75px;
                background: linear-gradient(rgba(97, 112, 94, 0), rgba(0, 0, 0, 0.5));

                .brief-main {
                    // transform: translateX(20px);
                    padding: 0px 20px;
                    display: flex;

                    .el-avatar {
                        border: 2px solid #fff;
                    }

                    .right {
                        padding-top: 5px;
                        flex: 1;
                        display: flex;
                        width: 100%;
                        justify-content: space-between;

                        .info {
                            position: relative;
                            margin-left: 15px;
                            color: white;

                            .username {
                                font-size: 18px;
                            }
                        }

                        .operation {}
                    }
                }
            }
        }
    }
}
</style>