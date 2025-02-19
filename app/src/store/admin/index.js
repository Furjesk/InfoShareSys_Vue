//登录与注册仓库
import { reqManagerLogin } from "@/api"
import { getManagerrInfo,setManagerInfo,removeManagerInfo } from "@/utils/token"
const state = {
    code:'', //验证码【为了省钱，实际没有，等用户输入在后台验证】
    // token:getToken()||'',
    managerInfo:getManagerrInfo()||{},
}
const mutations = {
    //【为了省钱，实际没有，等用户输入在后台验证】
    // GETCODE(state,code){
    //     state.code = code
    // },
    MANAGERLOGIN(state,managerInfo){
        // state.token = userInfo.token
        state.managerInfo = managerInfo
    },
    // CLEAR(state){
    //     state.token=''
    //     state.userInfo = {}
    //     //本地存储清空
    //     // removeToken()
    // }
}
const actions = {
    //获取验证码
    // async getCode({commit},phone){
    //     let res = await reqGetCode(phone)
    //     //正常这下面就不用了，等用户输入验证码就行了。但为了【省钱】
    //     if(res.status==200){
    //         commit("GETCODE",res.data)
    //         return "ok"
    //     }else {
    //         return Promise.reject(new Error(res.message))
    //     }
    // },
    //注册
    // async userRegister({commit},user){
    //     let res = await reqUserRegister(user)
    //     if(res.status==200){
    //         return 'ok'
    //     }else {
    //         return Promise.reject(new Error(res.message))
    //     }
    // },
    //登录
    async managerLogin({commit},data){
        let res = await reqManagerLogin(data)
        if(res.status==200){
            commit("MANAGERLOGIN",res.data)
            //持久化存储token【直接存userInfo也行，不存储的话，浏览器一刷新就没了，看看能不能存到cookie里/session会话】
            // setToken(res.data.token)
            setManagerInfo(res.data)
            return 'ok'
        }else {
            return Promise.reject(new Error(res.message))
        }
    },
    //退出登录
    // async userLogout({commit}){
    //     commit("CLEAR")
    //     removeUserInfo()
    // },
}
const getters = {
    managerid(state) {
        return state.managerInfo.managerid || ''
    },
    managername(state) {
        return state.managerInfo.username || ''
    },
    managerFace(state) {
        return state.managerInfo.imgurl || ''
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}