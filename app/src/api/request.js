//对于axios二次封装
import axios from "axios"
//引入进度条插件start/done
import nprogress from "nprogress";
//引入进度条样式
import 'nprogress/nprogress.css'

//利用axios对象的create方法创建一个axios实例
//request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发送请求时，路径中会出现/api
    baseURL:'/api',
    //当请求超时的时间5s
    timeout:5000,
})
//请求拦截器
requests.interceptors.request.use((config)=>{
    // if(store.state.detail.uuid_token){
    //     config.headers.userTempId = store.state.detail.uuid_token
    // }
    // //带上token
    // if(store.state.user.token){
    //     config.headers.token = store.state.user.token
    // }
    // config.headers['Page-Title'] = encodeURIComponent(router.history.current.meta.title)
    // config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    //进度条开始
    nprogress.start();
    //config是配置对象，有个属性很重要，header请求头
    return config;
})
//响应拦截器
requests.interceptors.response.use((res)=>{
    //进度条结束
    nprogress.done();
    return res.data;
},(error)=>{
    //响应失败回调函数
    return Promise.reject(new Error('响应拦截器拦截到错误'))
})

//对外暴露
export default requests