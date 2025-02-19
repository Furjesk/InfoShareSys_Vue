//对外暴露一个函数
export const setToken = (token)=>{
    localStorage.setItem('TOKEN',token)
}
export const getToken = ()=>{
    return localStorage.getItem('TOKEN')
}
//清除本地token
export const removeToken = ()=>{
    localStorage.removeItem('TOKEN')
}

/**
 * 用户信息管理
 * @param {*} userInfo 
 */
export const setUserInfo = (userInfo)=>{
    //JS对象转为JSON字符串
    sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
}
export const getUserInfo = ()=>{
    //JSON字符串转为JS对象
    return JSON.parse(sessionStorage.getItem("userInfo"))
}
export const removeUserInfo = ()=>{
    sessionStorage.removeItem('userInfo')
}

/**
 * 管理员信息管理
 */
export const setManagerInfo = (managerInfo)=>{
    //JS对象转为JSON字符串
    sessionStorage.setItem('managerInfo',JSON.stringify(managerInfo))
}
export const getManagerrInfo = ()=>{
    //JSON字符串转为JS对象
    return JSON.parse(sessionStorage.getItem("managerInfo"))
}
export const removeManagerInfo = ()=>{
    sessionStorage.removeItem('managerInfo')
}