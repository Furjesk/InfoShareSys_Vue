<template>
    <div class="search-container">
        <!-- 搜索框 -->
        <div class="search-line">
            <el-input placeholder="请输入搜索内容" prefix-icon="el-icon-search" v-model="searchInput" clearable></el-input>
            <el-button type="primary" @click="searchByKeyword()">搜索</el-button>
        </div>
        <!-- 选项卡 -->
        <el-tabs v-model="activeTabName" @tab-click="handleClickTab">
            <el-tab-pane name="video">
                <span slot="label">视频 {{ displaySetList.length }}</span>
                <div class="filter-line">
                    <span :class="myData[0] == '1-1' ? 'filter-selected' : ''" my-data="1-1"
                        @click="clickFilter($event)">综合排序</span>
                    <span :class="myData[0] == '1-2' ? 'filter-selected' : ''" my-data="1-2"
                        @click="clickFilter($event)">最多观看</span>
                    <span :class="myData[0] == '1-3' ? 'filter-selected' : ''" my-data="1-3"
                        @click="clickFilter($event)">最新发布</span>
                    <span :class="myData[0] == '1-4' ? 'filter-selected' : ''" my-data="1-4"
                        @click="clickFilter($event)">最多点赞</span>
                    <span :class="myData[0] == '1-5' ? 'filter-selected' : ''" my-data="1-5"
                        @click="clickFilter($event)">最多收藏</span>
                </div>
                <div class="filter-line">
                    <span :class="myData[1] == '2-1' ? 'filter-selected' : ''" my-data="2-1"
                        @click="clickFilter($event)">全部时长</span>
                    <span :class="myData[1] == '2-2' ? 'filter-selected' : ''" my-data="2-2"
                        @click="clickFilter($event)">10分钟以下</span>
                    <span :class="myData[1] == '2-3' ? 'filter-selected' : ''" my-data="2-3"
                        @click="clickFilter($event)">10-30分钟</span>
                    <span :class="myData[1] == '2-4' ? 'filter-selected' : ''" my-data="2-4"
                        @click="clickFilter($event)">30-60分钟</span>
                    <span :class="myData[1] == '2-5' ? 'filter-selected' : ''" my-data="2-5"
                        @click="clickFilter($event)">60分钟以上</span>
                </div>
                <div class="filter-line">
                    <span :class="myData[2] == '3-1' ? 'filter-selected' : ''" my-data="3-1"
                        @click="clickFilter($event)">全部分区</span>
                    <span v-for="category1 in category1List" :key="category1.category1id"
                        :class="myData[2] == category1.category1id ? 'filter-selected' : ''"
                        :my-data="category1.category1id" @click="clickFilter($event)">{{ category1.category1name }}</span>
                </div>
                <!-- 全局组件 -->
                <VideoDisplay :videoSetList="displaySetList" />
            </el-tab-pane>

            <el-tab-pane name="fanju">
                <span slot="label">番剧 0</span>
                番剧
            </el-tab-pane>
            <el-tab-pane name="movie">
                <span slot="label">影视 0</span>
                影视
            </el-tab-pane>
            <el-tab-pane name="column">
                <span slot="label">专栏 0</span>
                专栏
            </el-tab-pane>

            <el-tab-pane name="moment">
                <span slot="label">动态 {{ displayMomentList.length }}</span>
                <div class="grid-container">

                    <div class="grid-item" v-for="moment in momentList" :key="moment.momentid">
                        <div class="moment-left">
                            <img v-if="moment.momentimgList != null" :src="moment.momentimgList[0].momimgurl" @click="gotoMomentDetail(moment.userid,moment.momentid)"/>
                        </div>
                        <div class="moment-right">
                            <div>
                                <div class="subjectname" v-if="moment.subjectname != null">
                                    <span><i class="iconfont icon-huatizhuti" style="padding-right: 5px;"></i>{{
                                        moment.subjectname }}
                                    </span>
                                </div>
                                <div class="content" @click="gotoMomentDetail(moment.userid,moment.momentid)">{{ moment.content }}</div>
                            </div>
                            <div class="info">
                                <span class="username" @click="gotoUPHome(moment.userid)"><i class="iconfont icon-UPzhu" style="padding-right: 2px;"></i>{{
                                    moment.username }}</span>
                                <span style="padding: 0px 5px;">·</span>
                                <span class="createtime">{{ strToYMDHM(moment.createtime) }}</span>
                            </div>
                        </div>
                    </div> <!-- grid-item -->

                </div>
            </el-tab-pane>

            <el-tab-pane name="user">
                <span slot="label">用户 {{ displayUserList.length }}</span>
                用户
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { strToYMDHM } from '@/utils/strToDate'
export default {
    name: "Search",
    data() {
        return {
            //默认选中第一个标签页
            activeTabName: "video",
            //搜索框内容
            searchInput: '',

            //过滤按钮样式
            myData: ['1-1', '2-1', '3-1'],

            //综合视频集列表、综合用户列表、综合动态列表
            videoSetList: [],
            userList: [],
            momentList: [],

            //最终展示的列表，可根据用户点击分类事件修改
            displaySetList: [],
            displayUserList: [],
            displayMomentList: [],

            //一级分类列表
            category1List: []
        }
    },
    mounted() {
        this.searchInput = this.$route.query.keyword
        this.searchByKeyword()
        this.getCategory1List()
    },
    methods: {
        strToYMDHM(str) {
            return strToYMDHM(str)
        },
        //过滤按钮回调，修改myData分类index
        clickFilter(event) {
            let value = event.target.attributes[1].value
            if (value.indexOf('-') != -1) {
                if (value.substring(0, 1) == '1') {
                    // this.myData[0] = value 不是响应式的
                    this.$set(this.myData, 0, value)
                    switch (value) {
                        case '1-1':
                            this.displaySetList = this.videoSetList;
                            break;
                        case '1-2':
                            //最多观看，未实现
                            this.displaySetList = this.videoSetList;
                            break;
                        case '1-3':
                            //最新发布，sort改变原数组，而=是浅拷贝，会改变原数组，因此用concat实现深拷贝（连接两个数组，不改变原数组）
                            this.displaySetList = this.videoSetList.concat();
                            this.displaySetList.sort((a, b) => Date.parse(b.createtime) - Date.parse(a.createtime));
                            break;
                        case '1-4':
                            //最多点赞
                            this.displaySetList = this.videoSetList.concat();
                            this.displaySetList.sort((a, b) => b.likenum - a.likenum);
                            break;
                        case '1-5':
                            //最多收藏
                            this.displaySetList = this.videoSetList.concat();
                            this.displaySetList.sort((a, b) => b.favoritenum - a.favoritenum);
                            break;

                        default:
                            break;
                    }
                }
                else if (value.substring(0, 1) == '2') {
                    this.$set(this.myData, 1, value)
                    switch (value) {
                        case '2-1':
                            this.displaySetList = this.videoSetList
                            break;
                        case '2-2':
                            //filter不改变原数组
                            this.displaySetList = this.videoSetList.filter(set => set.setlong.split(':')[1] < 10)
                            break;
                        case '2-3':
                            this.displaySetList = this.videoSetList.filter(set => set.setlong.split(':')[1] >= 10 && set.setlong.split(':')[1] < 30)
                            break;
                        case '2-4':
                            this.displaySetList = this.videoSetList.filter(set => set.setlong.split(':')[1] >= 30 && set.setlong.split(':')[1] < 60)
                            break;
                        case '2-5':
                            this.displaySetList = this.videoSetList.filter(set => set.setlong.split(':')[0] > 0)
                            break;
                        default:
                            break;
                    }
                }
                else {
                    // 3-1是全部分区
                    this.$set(this.myData, 2, value)
                    this.displaySetList = this.videoSetList
                }
            } else {
                //没有-，说明是第三行分类按钮，直接替换【视频才有分类】
                this.$set(this.myData, 2, value)
                //2=='2'是true；2==='2'是false
                this.displaySetList = this.videoSetList.filter(set => set.category1id == value)
            }
        },

        //tab导航栏点击回调
        handleClickTab(tab, event) {
            console.log(tab, event);
        },
        //搜索
        async searchByKeyword() {
            let res = await this.$API.reqListByKeyword(this.searchInput)
            if (res.status == 200) {
                this.videoSetList = res.data.videoSetList;
                this.userList = res.data.userList;
                this.momentList = res.data.momentList
                this.displaySetList = res.data.videoSetList;
                this.displayUserList = res.data.userList;
                this.displayMomentList = res.data.momentList;
            }
        },
        //获取一级分类列表
        async getCategory1List() {
            if (this.$store.state.category.category1List.length == 0) {
                await this.$store.dispatch("getCategory1List");
            }
            this.category1List = this.$store.state.category.category1List
        },
        //跳转UP主页
        gotoUPHome(userid) {
            this.$router.push(`/homePage/${userid}`)
        },
        //跳转至UP主页的指定动态处
        gotoMomentDetail(userid,momentid) {
            this.$router.push(`/homePage/${userid}/momentDisplay/#${momentid}`)
        }
    },
}
</script>

<style lang="less" scoped>
.search-container {
    position: relative;

    .search-line {
        display: flex;
        width: 40%;
        margin-left: 50%;
        transform: translateX(-50%);
        margin-top: 30px;
    }

    .el-tabs {
        font-size: 16px;
        margin: 30px 60px;
    }
}

//筛选按钮
.filter-line {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    span {
        padding: 0px 15px;
        margin-right: 10px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        cursor: pointer;
    }

    span:hover {
        color: #3ab3ed;
    }

    .filter-selected {
        background-color: #dff6fd;
        color: #3ab3ed;
        border-radius: 5px;
    }
}

/**动态，临时 */
.grid-container {
    display: grid;
    grid-gap: 20px;
    //规定网格布局中的列数（和宽度），5列宽度自动
    // grid-template-columns: 263.84px 263.84px 263.84px 263.84px 263.84px;
    grid-template-columns: 688px 688px;

    .grid-item {
        display: flex;
        min-height: 96px;

        .moment-left {

            // border-radius: 5px;
            img {
                width: 154px;
                height: 96px;
                border-radius: 5px;
                object-fit: cover;
            }
        }

        .moment-right {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            position: relative;
            justify-content: space-between;

            .subjectname {
                span {
                    color: #008ac5;
                    font-size: 14px;
                    cursor: pointer;
                }
            }

            .content {
                margin-top: 5px;
                cursor: pointer;

                position: relative;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                word-break: break-all;
            }

            .info {
                // position: absolute;
                // bottom: 0px;
                color: #9499A0;
                font-size: 13px;

                .username {
                    cursor: pointer;
                }

                .createtime {}
            }
        }
    }
}
</style>