//登录与注册仓库
import { reqUserLogin,reqGetCode,reqUserRegister,reqUserInfo } from "@/api"
import { setToken,getToken,removeToken,setUserInfo,getUserInfo,removeUserInfo } from "@/utils/token"
const state = {
    code:'', //验证码【为了省钱，实际没有，等用户输入在后台验证】
    token:getToken()||'',
    userInfo:getUserInfo()||{},
}
const mutations = {

    USERLOGIN(state,userInfo){
        state.token = userInfo.token
        state.userInfo = userInfo
    },
    CLEAR(state){
        state.token=''
        state.userInfo = {}
        //本地存储清空
        // removeToken()
    },
    UPDATEUSERINFO(state,userInfo) {
        state.userInfo = userInfo
    }
}
const actions = {
    //获取验证码
    async getCode({commit},phone){
        let res = await reqGetCode(phone)
        //正常这下面就不用了，等用户输入验证码就行了。但为了【省钱】
        if(res.status==200){
            // commit("GETCODE",res.data)
            return "ok"
        }else {
            return Promise.reject(new Error(res.message))
        }
    },
    //注册
    async userRegister({commit},user){
        let res = await reqUserRegister(user)
        if(res.status==200){
            return 'ok'
        }else {
            return Promise.reject(new Error(res.message))
        }
    },
    //登录
    async userLogin({commit},data){
        let res = await reqUserLogin(data)
        if(res.status==200){
            commit("USERLOGIN",res.data)
            //持久化存储token【直接存userInfo也行，不存储的话，浏览器一刷新就没了，看看能不能存到cookie里/session会话】
            // setToken(res.data.token)
            setUserInfo(res.data)
            return 'ok'
        }else {
            return Promise.reject(new Error(res.message))
        }
    },
    //退出登录
    async userLogout({commit}){
        commit("CLEAR")
        removeUserInfo()
    },
    //关注or取关，更新userInfo
    async updateUserInfo({commit},userId){
        let res = await reqUserInfo(userId)
        if(res.status==200){
            commit("UPDATEUSERINFO",res.data)
            //持久化存储token【直接存userInfo也行，不存储的话，浏览器一刷新就没了，看看能不能存到cookie里/session会话】
            // setToken(res.data.token)
            setUserInfo(res.data)
            return 'ok'
        }else {
            return Promise.reject(new Error(res.message))
        }
    },
}
const getters = {
    userid(state) {
        return state.userInfo.userid || ''
    },
    username(state) {
        return state.userInfo.username || ''
    },
    userFace(state) {
        return state.userInfo.imgurl || ''
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}