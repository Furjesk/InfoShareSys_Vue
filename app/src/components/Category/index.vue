<template>
    <div class="category-container">
        <div class="category-main">
            <div class="category-left">
                <div class="left-item"><i class="iconfont icon-dongtai1" style="color: #59ca73;"></i><span>动态</span></div>
                <div class="left-item"><i class="iconfont icon-remen" style="color: #F07775;"></i><span>热门</span></div>
                <div class="left-item"><i class="iconfont icon-pindao" style="color: #00aeec;"></i><span>频道</span></div>
            </div>
            <div class="category-middle">
                <div class="category1-item" v-for="category1 in category1List" :key="category1.category1id"
                    @click="gotoChannel(category1.category1id, category1.category1name)">{{ category1.category1name }}</div>
            </div>
            <div class="category-right">
                <div class="right-item">话题</div>
                <div class="right-item">活动</div>
                <div class="right-item">直播</div>
                <div class="right-item">课堂</div>
                <div class="right-item">社区中心</div>
                <div class="right-item">新歌热榜</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Category",
    data() {
        return {
            category1List: [],
        }
    },
    mounted() {
        this.getCategory1List()
    },
    methods: {
        async getCategory1List() {
            if (this.$store.state.category.category1List.length == 0) {
                await this.$store.dispatch("getCategory1List");
            }
            this.category1List = this.$store.state.category.category1List
        },
        gotoChannel(category1id, category1name) {
            this.$router.push(`/channel/${category1id}/${category1name}`)
        }
    },
}
</script>

<style lang="less" scoped>
.category-container {
    padding: 20px 0px;
    min-width: 1390px;

    .category-main {
        display: flex;

        .category-left {
            flex: 1;
            display: flex;
            justify-content: space-between;
            margin-right: 40px;

            .left-item {
                font: 14px "PingFang SC";
                color: #18191C;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                i {
                    font-size: 30px;
                    border-radius: 50%;
                }
            }
        }

        .category-middle {
            flex: 4;
            display: grid;
            grid-gap: 10px;
            //规定网格布局中的列数（和宽度），5列宽度自动
            grid-template-columns: repeat(11, 1fr);
            padding-right: 30px;
            border-right: 1px solid #e3e5e7;

            .category1-item {
                background-color: #f6f7f8;
                border-radius: 5px;
                border: 1px solid #f1f2f3;
                // width: 73px;
                height: 26px;
                display: flex;
                justify-content: center;
                align-items: center;
                font: 14px "PingFang SC";
                color: #61666D;
                cursor: pointer;
            }

            .category1-item:hover {
                background-color: #e1e3e5;
                border: 1px solid #eeeff0;
            }
        }

        .category-right {
            flex: 1;
            display: grid;
            grid-auto-flow: column;
            grid-template-rows: repeat(2, 1fr);
            row-gap: 10px;

            .right-item {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                font: 14px "PingFang SC";
                color: #61666D;
                cursor: pointer;
            }
        }
    }
}
</style>