<template>
    <div class="user-container">
        <div class="search-user">搜索框</div>
        <div class="user-item" v-for="user in followList" :key="user.userid">
            <el-avatar :size="60" :src="user.imgurl" @click="gotoUpHome(user.userid)"></el-avatar>
            <div class="info">
                <div class="info-main">
                    <div class="username">
                        <span @click="gotoUpHome(user.userid)">{{ user.username }}</span>
                    </div>
                    <div class="brief">{{ user.userbrief || 'UP还没有个性签名哟' }}</div>
                </div>
                <div class="operation">
                    <el-button plain size="mini" @click="followAction(user.userid, user.isFollow)">
                        <span v-if="user.isFollow == 0">+ 关注</span>
                        <span v-else-if="user.isFollow == 1">已关注</span>
                        <span v-else-if="user.isFollow == 2">互相关注</span>
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "FollowDisplay",
    data() {
        return {
            followList: [],
        }
    },
    computed: {
        ...mapGetters(['userid'])
    },
    mounted() {
        this.getFollowList()
    },
    methods: {
        async getFollowList() {
            let params = {
                userId: this.userid,  //当前登录用户，不是UP主
                UPId: this.$route.params.userId
            }
            let res = await this.$API.reqFollowList(params)
            if (res.status == 200) {
                this.followList = res.data
            } else {
                this.$message.error('获取关注列表失败')
            }
        },
        //关注or取消关注，都是针对当前用户！
        async followAction(followid, isFollow) {
            let params = {
                followId: followid,
                followerId: this.userid, //当前登录用户，不是UP主
                status: isFollow == 0 ? 1 : 0
            }
            let res = await this.$API.reqFollowUP(params)
            if (res.status == 200) {
                //重新获取关注列表
                await this.getFollowList()
                //更新仓库中的userInfo
                this.$store.dispatch("updateUserInfo", this.userid)
                if (isFollow == 1 || isFollow == 2)
                    this.$message.success("取消关注成功")
                else
                    this.$message.success("关注成功")
            } else {
                this.$message.error('关注操作失败');
            }
        },
        gotoUpHome(userid) {
            this.$router.push(`/homePage/${userid}`)
        }
    },
}
</script>

<style lang="less" scoped>
.user-container {
    width: 100%;
    display: block;
    background-color: #fff;

    .search-user {}

    .user-item {
        display: flex;
        padding: 20px 20px;
        width: 1fr;

        .el-avatar {
            cursor: pointer;
        }

        .info {
            position: relative;
            flex: 1;
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding-left: 25px;

            .info-main {
                max-width: 80%;
                padding-top: 5px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .username {
                    color: #FB7299;
                    font: 16px "PingFang SC";

                    span {
                        cursor: pointer;
                    }
                }

                .brief {
                    color: #6D757A;
                    font: 12px "PingFang SC";

                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    word-break: break-all;
                }
            }

            .operation {
                // position: absolute;
                // right: 0px;
            }
        }
    }
}
</style>