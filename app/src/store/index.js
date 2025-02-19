import Vue from "vue";
import Vuex from 'vuex'
//需要使用插件一次
Vue.use(Vuex)

//引入小仓库
//登录注册仓库
import user from "./user";
import manage from "./manage";
import play from "./play";
import admin from "./admin";
import category from "./category";

//对外暴露Store类的一个实例
export default new Vuex.Store({
    //实现Vuex仓库模块化开发
    modules:{
        user,
        manage,
        play,
        admin,
        category,
    }
})