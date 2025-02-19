<template>
    <div class="history-container">

        <div class="search-line">
            <el-input placeholder="搜索历史记录" v-model="keyword" clearable @clear="showAll()" @change="handleSearch()">
            </el-input>
            <el-button icon="el-icon-search" @click="handleSearch()"></el-button>
            <el-button type="primary" plain class="clearAll" @click="clearAllHistory()">清空历史</el-button>
        </div>

        <el-timeline>

            <el-timeline-item :timestamp="strToYMDHM(item.watchtime)" placement="top" color="#ff74a5"
                v-for="item in history" :key="item.setid">
                <div class="his-item">
                    <div class="his-left">
                        <img :src="item.setimg" />
                        <el-progress :show-text="false"
                            :percentage="computePercentage(item.watchlocation, item.setlong)"></el-progress>
                    </div>
                    <div class="his-right">
                        <div class="right-setname">{{ item.setname }}</div>
                        <div class="right-btn"><i class="el-icon-delete" @click="deleteHistory(item.setid,item.userid)"></i></div>
                        <div class="right-info">
                            <div class="watch-location">看到{{ item.watchlocation }}/{{ item.setlong }}</div>
                            <img :src="item.imgurl">
                            <div class="username">{{ item.username }}</div>
                            <div class="category1Id">{{ item.category1name }}</div>
                        </div>
                    </div>
                </div>
            </el-timeline-item>

        </el-timeline>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { strToYMDHM } from '@/utils/strToDate';
import { strToSeconds } from '@/utils/strToSeconds';
export default {
    name: 'History',
    data() {
        return {
            //全部历史
            totalHistory: [],
            //筛选后展示的历史
            history: [],
            keyword: ''
        }
    },
    mounted() {
        this.getHistory()
    },
    computed: {
        ...mapGetters(['userid'])
    },
    methods: {
        strToYMDHM(str) {
            return strToYMDHM(str)
        },
        computePercentage(watch, total) {
            watch = strToSeconds(watch)
            total = strToSeconds(total)
            return (watch / total) * 100
        },
        async getHistory() {
            let res = await this.$API.reqHistory(this.userid)
            if (res.status == 200) {
                this.totalHistory = res.data
                this.history = res.data
            } else {
                alert(res.message)
            }
        },
        handleSearch(){
            //搜索历史记录
            if(this.keyword == '')
                this.history = this.totalHistory
            else 
                this.history = this.totalHistory.filter(set => set.setname.indexOf(this.keyword) != -1)
        },
        showAll(){
            this.history = this.totalHistory
        },
        //删除历史记录
        async deleteHistory(setid,userid){
            let params = {
                userid,
                setid
            }
            let res = await this.$API.reqDeleteHistory(params)
            if(res.status == 200) {
                this.$message.success("删除成功")
                this.getHistory()
            }else {
                alert(res.message)
            }
        },
        async clearAllHistory(){
            let res = await this.$API.reqDeleteAllHistory({userid:this.userid})
            if(res.status == 200) {
                this.$message.success("删除成功")
                this.totalHistory = []
                this.history = []
            }else {
                alert(res.message)
            }
        }
    },
}
</script>

<style lang="less" scoped>
.history-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    .search-line {
        width: 1000px;
        display: flex;
        justify-content: flex-end;


        .el-input {
            width: 200px;
        }
        .clearAll {
            margin-left: 30px;
        }
    }

    .his-item {
        display: flex;

        .his-left {
            position: relative;
            margin-right: 30px;

            img {
                width: 160px;
                height: 100px;
                border-radius: 5px;
            }
        }

        .his-right {
            width: 765px;
            height: 100px;
            border-bottom: 1px solid #e5e9ef;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .right-setname {
                width: 400px;
                color: #222;
                cursor: pointer;
                padding-top: 5.5px;

                font-weight: 700;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .right-btn {
                display: flex;
                justify-content: flex-end;

                i {
                    cursor: pointer;
                    font-size: 18px;
                }
            }

            .right-info {
                display: flex;
                margin-bottom: 10px;

                .watch-location {
                    width: 300px;
                    color: #99a2aa;
                    font-size: 12px;
                    line-height: 20px;
                }

                img {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    cursor: pointer;
                    margin-right: 10px;
                }

                .username {
                    color: #6d757a;
                    padding-right: 10px;
                    font-size: 12px;
                    cursor: pointer;
                    line-height: 20px;
                }

                .category1Id {
                    color: #99a2aa;
                    font-size: 12px;
                    padding-left: 10px;
                    border-left: 1px solid #e5e9ef;
                    line-height: 20px;
                }
            }
        }
    }
}
</style>