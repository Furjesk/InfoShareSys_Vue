<template>
    <div class="channel-container">
        <!-- 分类 -->
        <Category />
        <!-- 频道内容 -->
        <div class="channel-main">

            <!-- 返回顶部按钮 -->
            <el-button icon="el-icon-caret-top" type="primary" circle @click="ToTop()" class="to-top"></el-button>

            <div class="category2-list">
                <div class="category1name">{{ $route.params.category1Name }}</div>
                <el-button round plain size="small" class="category2-item" v-for="item in category2List"
                    :key="item.category2id" @click="jumpTo(item.category2id)">{{ item.category2name }}</el-button>
            </div>
            <!-- 轮播图，不做了 -->
            <!-- <el-carousel :interval="3000" type="card" height="270px">
                <el-carousel-item v-for="item in 6" :key="item" style="background-color: aqua;border-radius: 10px;">
                    <h3 class="medium">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel> -->

            <!-- 楼层组件 -->
            <Floor v-for="(value, key) in floorMap" :key="key" :id="key" :category2Name="value.category2name" :hot8List="value.hot8" :recs8List="value.recs8" :category2Id="key" />

        </div>
    </div>
</template>

<script>
export default {
    name: 'Channel',
    data() {
        return {
            category2List: [],
            //楼层数据
            floorMap: []
        }
    },
    mounted() {
        this.getCategory2ListBy1id()
        this.getFloorByCategory1id()
    },
    watch: {
        $route(newVal) {
            this.$router.push(`/channel/${newVal.params.category1Id}/${newVal.params.category1Name}`)
            this.getCategory2ListBy1id()
            this.getFloorByCategory1id()
        }
    },
    methods: {
        //获取二级分类列表
        async getCategory2ListBy1id() {
            let res = await this.$API.reqCategory2ListBy1id(this.$route.params.category1Id)
            if (res.status == 200) {
                this.category2List = res.data
            } else {
                this.$message.error("二级分类列表获取失败")
            }
        },
        //获取楼层数据
        async getFloorByCategory1id() {
            let params = {
                userid: this.userid, //用于推荐【未使用】
                category1id: this.$route.params.category1Id
            }
            let res = await this.$API.reqFloorByCategory1id(params)
            if (res.status == 200) {
                this.floorMap = res.data
            } else {
                this.$message.error("楼层数据获取失败")
            }
        },
        //定位至指定分类楼层
        jumpTo(category2id) {
            const element = document.getElementById(category2id)
            element.scrollIntoView({ behavior: "smooth", block: 'center' }); // 中部
            element.style.backgroundColor = "#cce2fa"
            setTimeout(() => {
                element.style.backgroundColor = "#fff"
                element.style.transition = "background-color 0.5s"
            }, 1000);
        },
        //回到顶部
        ToTop() {
            document.documentElement.scrollTop = 0;
        },
    },
}
</script>

<style lang="less" scoped>
.channel-container {
    padding: 0px 60px;

    .channel-main {
        .to-top {
            position: fixed;
            right: 60px;
            bottom: 100px;
        }
        .category2-list {
            display: flex;
            flex-wrap: wrap;
            padding: 10px 0px;

            .category1name {
                font-weight: 400;
                font-size: 22px;
                margin-right: 20px;
            }

            .category2-item {
                font-size: 13px;
                margin-right: 5px;
            }

            .category2-item:hover {
                color: #00aeec;
            }
        }
    }
}
</style>