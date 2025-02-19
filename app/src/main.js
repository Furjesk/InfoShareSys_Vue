import Vue from 'vue'
import App from './App.vue'

//引入路由
import router from '@/router'

//element UI
import { Form, FormItem, Input, Button, Container, Aside, Header, Main, Carousel, CarouselItem, Tag, Message, Avatar, Drawer,
  Collapse, CollapseItem, Menu, MenuItem, Submenu, Upload, Radio, Checkbox, CheckboxGroup,CheckboxButton, Cascader, Switch,
  MessageBox, Badge, Tabs, TabPane, Footer, MenuItemGroup, RadioGroup, RadioButton, Dialog, Image, Select, Option, Rate, Popover,
  Timeline, TimelineItem, Progress} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Upload)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(CheckboxButton)
Vue.use(Cascader)
Vue.use(Tag)
Vue.use(Avatar)
Vue.use(Switch)
Vue.use(Drawer)
Vue.use(Badge)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Footer)
Vue.use(MenuItemGroup)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Dialog)
Vue.use(Image)
Vue.use(Select)
Vue.use(Option)
Vue.use(Rate)
Vue.use(Popover)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Progress)


import MyHeader from '@/components/Header'
import MyFooter from '@/components/Footer'
import VideoDisplay from '@/components/VideoDisplay'
import Comment from '@/components/Comment'
import Category from '@/components/Category'
import Moment from '@/components/Moment'
import Floor from '@/components/Floor'
// 注册为全局组件
Vue.component(MyHeader.name,MyHeader)
Vue.component(MyFooter.name,MyFooter)
Vue.component(VideoDisplay.name,VideoDisplay)
Vue.component(Comment.name,Comment)
Vue.component(Category.name,Category)
Vue.component(Moment.name,Moment)
Vue.component(Floor.name,Floor)

//引入表单验证规则
import '@/plugins/validate'

//引入仓库
import store from '@/store'
//统一引入全部接口函数
// import * as API from '@/api'

//引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
import lazyImg from '@/assets/images/lazy_default.jpg'
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认图片
  loading: lazyImg
})

Vue.config.productionTip = false

//统一引入全部接口函数
import * as API from '@/api'

new Vue({
  render: h => h(App),

  //注册路由：KV一致省略V
  router,
  //注册仓库，组件身上会多个$store属性
  store,
  //全局事件总线
  beforeCreate() {
    // Vue.prototype.$bus = this; //this即VM
    Vue.prototype.$API = API;
    Vue.prototype.$message = Message,
    Vue.prototype.$messageBox = MessageBox
  }

}).$mount('#app')
