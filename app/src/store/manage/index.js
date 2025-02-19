//登录与注册仓库
import { reqCategoryList } from "@/api"
const state = {
    //分类列表
    originCategoryList: [],
}
const mutations = {
    GETCATEGORYLIST(state, originList) {
        state.originCategoryList = originList
    },

}
const actions = {
    //获取验证码
    async getCategoryList({ commit }) {
        let res = await reqCategoryList()
        if (res.status == 200) {
            commit("GETCATEGORYLIST", res.data)
            return "ok"
        } else {
            return Promise.reject(new Error(res.message))
        }
    },
}
//用于将state中的数据进行加工
const getters = {
    
    categoryList(state) {
        var list = [], subList = [];
        var item = {}, subItem = {};
        //将数据映射一下，后端返回的数据key字段名和前端不匹配
        state.originCategoryList.forEach(element => {

            subList = [];
            element.category2List.forEach(e => {
                subItem = {
                    value: e.category2id,
                    label: e.category2name,
                    brief: e.category2brief
                };
                subList.push(subItem);
            });

            item = {
                value: element.category1id,
                label: element.category1name,
                children: subList
            };
            list.push(item);
        });
        return list
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}