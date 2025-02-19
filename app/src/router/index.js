import Vue from 'vue'
import VueRouter from 'vue-router'

//引入路由配置信息
import routes from "./routes";
//引入store
import store from '@/store';

//先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push;
/**
 * 
 * @param {*} location 告诉原来的push方法往哪跳转，传什么参
 * @param {*} resolve 成功的回调
 * @param {*} reject 失败的回调
 */
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call与apply都可以调佣函数一次，篡改函数上下文（this是VueRouter的实例）一次
        //不同点：call传参用逗号隔开，apply传参用数组
        originPush.call(this, location, resolve, reject);
    } else {//没传成功失败回调，我自己加一个
        originPush.call(this, location, () => { }, () => { })
    }
}

//使用路由
Vue.use(VueRouter);

//配置路由
let router = new VueRouter({
    routes,
})

//全局路由守卫
router.beforeEach(async (to, from, next) => {
    // let token = store.state.user.token
    let userid = store.state.user.userInfo.userid
    let managerid = store.state.admin.managerInfo.managerid
    let toPath = to.path // /home

    if (toPath.indexOf('admin') != -1) {
        //去的是理员页面
        if (managerid) {
            //管理员已登录
            next()
        } else {
            //管理员未登录
            if (toPath.indexOf('login') == -1 && toPath.indexOf('register') == -1) {
                //未登录且去的不是登录注册页
                //未登录时想去的地址信息，存在地址栏中query
                next('/login?redirect=' + toPath)
            } else {
                next()
            }
        }
    } else {
        //去的是用户页面
        if (userid) {
            //用户已登录
            next()
        } else {
            //用户未登录
            if (toPath.indexOf('login') == -1 && toPath.indexOf('register') == -1 && toPath.indexOf('forgetPwd') == -1) {
                //未登录且去的不是登录、注册、找回密码页
                //未登录时想去的地址信息，存在地址栏中query
                next('/login?redirect=' + toPath)
            } else {
                next()
            }
        }

    }
})

export default router