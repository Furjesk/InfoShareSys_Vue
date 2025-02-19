<template>
    <div>
        <VideoDisplay :videoSetList="videoSetList" />
    </div>
</template>

<script>
export default {
    name: 'VideoSetDisplay',
    data() {
        return {
            videoSetList: [],
        }
    },
    mounted() {
        this.getVideoSetList()
    },
    methods: {
        //获取用户动态
        async getVideoSetList() {
            let res = await this.$API.reqUserVideoSet(this.$route.params.userId)
            if(res.status == 200) {
                this.videoSetList = res.data
            } else {
                this.$message.error("获取动态失败")
            }
        }
    },
}
</script>

<style></style>