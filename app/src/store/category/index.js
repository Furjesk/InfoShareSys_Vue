//登录与注册仓库
import { reqCategory1List } from "@/api"
const state = {
    //分类列表
    category1List: [],
}
const mutations = {
    GETCATEGORY1LIST(state, category1List) {
        state.category1List = category1List
    }
}
const actions = {

    //获取一级分类列表
    async getCategory1List({ commit }) {
        let res = await reqCategory1List()
        if (res.status == 200) {
            commit("GETCATEGORY1LIST", res.data)
            return "ok"
        } else {
            return Promise.reject(new Error(res.message))
        }
    },
}
//用于将state中的数据进行加工
const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}