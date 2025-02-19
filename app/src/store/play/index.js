//登录与注册仓库
import { reqSetInfo } from "@/api"
const state = {
    videoSetInfo:{}
}
const mutations = {
    GETVIDEOSETINFO(state,info){
        state.videoSetInfo = info
    },

}
const actions = {
    async getVideoSetInfo({commit},params){
        let res = await reqSetInfo(params)
        //正常这下面就不用了，等用户输入验证码就行了。但为了【省钱】
        if(res.status==200){
            commit("GETVIDEOSETINFO",res.data)
            return "ok"
        }else {
            console.log("store get fail");
            return Promise.reject(new Error(res.message))
        }
    },

}
const getters = {
    commentList(state) {
        return state.videoSetInfo.commentList
    },
    labelList(state) {
        return state.videoSetInfo.labelList
    },
    videoList(state) {
        return state.videoSetInfo.videoList
    },
    recSetList(state) {
        return state.videoSetInfo.recommendSetList
    },
    videoSet(state) {
        return state.videoSetInfo.videoSet
    },
    isLike(state) {
        return state.videoSetInfo.isLike
    },
    setRate(state) {
        return state.videoSetInfo.rate
    },
    followStatus(state) {
        return state.videoSetInfo.followStatus
    },
    watchLocation(state) {
        return state.videoSetInfo.watchLocation
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}