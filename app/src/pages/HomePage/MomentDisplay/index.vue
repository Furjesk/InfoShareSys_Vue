<template>
    <div class="user-content">
        <div class="content-main">
            <Moment :showList="showList" @renewComment="renewCommentList" />
        </div>
        <div class="content-info">123123</div>
    </div>
</template>

<script>
export default {
    name: 'MomentDisplay',
    data() {
        return {
            showList: []
        }
    },
    mounted() {
        this.getUserMoment()
    },
    methods: {
        //更新 评论列表
        async renewCommentList() {
            await this.getUserMoment()
        },
        //获取用户动态
        async getUserMoment() {
            let res = await this.$API.reqUserMoment(this.$route.params.userId)
            if(res.status == 200) {
                this.showList = res.data
            } else {
                this.$message.error("获取动态失败")
            }
        }
    },
}
</script>

<style lang="less" scoped>
.user-content {
    display: flex;

    .content-main {
        background-color: #fff;
        flex: 5;
        padding: 10px;
    }

    .content-info {
        flex: 2;
    }
}
</style>