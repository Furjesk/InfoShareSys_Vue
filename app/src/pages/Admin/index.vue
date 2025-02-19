<template>
    <div>
        <el-container>

            <el-header>
                <div>logo</div>
                <!-- 没登录 -->
                <div v-if="!managername">
                    <router-link to="/login" class="login-btn">登录</router-link>
                </div>
                <!-- 已登录 -->
                <div v-else class="header-managerinfo">
                    <el-avatar :src="managerFace"></el-avatar>
                    <span href="" class="header-managername">{{ managername }}</span>
                </div>
            </el-header>

            <el-container style="height: 690px;">

                <!-- 侧边栏 -->
                <el-aside width="200px" style="background-color: #545c64">
                    <el-menu :default-openeds="['1', '2', '3', '4']" @select="selectMenu" background-color="#545c64"
                        text-color="#fff" active-text-color="#ffd04b">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>稿件审核</template>
                            <el-menu-item index="1-1">视频审核</el-menu-item>
                            <el-menu-item index="1-2">动态审核</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-warning"></i>投诉管理</template>
                            <el-menu-item index="2-1">视频投诉</el-menu-item>
                            <el-menu-item index="2-2">动态投诉</el-menu-item>
                            <!-- <el-menu-item index="2-3">评论投诉</el-menu-item> -->
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title"><i class="el-icon-question"></i>申诉受理</template>
                            <el-menu-item index="3-1">视频申诉</el-menu-item>
                            <el-menu-item index="3-2">动态申诉</el-menu-item>
                            <!-- <el-menu-item index="3-3">评论申诉</el-menu-item> -->
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title"><i class="el-icon-user"></i>用户管理</template>
                            <el-menu-item index="4-1">信誉管理</el-menu-item>
                            <el-menu-item index="4-2">封禁管理</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>

                <!-- 二级路由出口 -->
                <router-view></router-view>


            </el-container>

        </el-container>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {

    computed: {
        ...mapGetters(['managername','managerFace'])
    },

    methods: {

        //侧边栏
        selectMenu(index, indexPath) {
            switch (index) {
                case '1-1':
                    this.$router.push("/admin/videoReview")
                    break;
                case '1-2':
                    this.$router.push("/admin/momentReview")
                    break;
                case '2-1':
                    this.$router.push("/admin/videoComplain")
                    break;
                case '2-2':
                    this.$router.push("/admin/momentComplain")
                    break;
                case '3-1':
                    this.$router.push("/admin/videoAppeal")
                    break;
                case '3-2':
                    this.$router.push("/admin/momentAppeal")
                    break;
                case '4-1':
                    this.$router.push("/admin/creditManage")
                    break;
                case '4-2':
                    this.$router.push("/admin/blockManage")
                    break;
                default:
                    break;
            }
        },

    },
}
</script>

<style lang="less" scoped>
.el-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: 0px 1px 5px #e3e5e7;
    align-items: center;
    .header-managerinfo{
        display: flex;
        align-items: center;
        .header-managername{
            margin-left: 5px;
        }
    }
}

.el-aside {

    // height: 690px;
    ::v-deep .el-submenu__title {
        width: 200px;
    }
}
</style>