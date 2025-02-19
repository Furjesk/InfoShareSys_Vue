//路由配置信息
export default [
    {
        path: '/admin',
        component: () => import("@/pages/Admin"),
        meta: { myHeaderShow: false, headbgShow: false, footerShow: true },
        redirect: '/admin/videoReview',
        children: [
            {
                path: 'videoReview',
                component: () => import("@/pages/Admin/VideoReview"),
            },
            {
                path: 'momentReview',
                component: () => import("@/pages/Admin/MomentReview"),
            },
            {
                path: 'videoComplain',
                component: () => import("@/pages/Admin/VideoComplain"),
            },
            {
                path: 'momentComplain',
                component: () => import("@/pages/Admin/MomentComplain"),
            },
            {
                path: 'videoAppeal',
                component: () => import("@/pages/Admin/VideoAppeal"),
            },
            {
                path: 'momentAppeal',
                component: () => import("@/pages/Admin/MomentAppeal"),
            },
            {
                path: 'creditManage',
                component: () => import("@/pages/Admin/CreditManage"),
            },
            {
                path: 'blockManage',
                component: () => import("@/pages/Admin/BlockManage"),
            },
            {
                path: '*',
                redirect: '/admin/videoReview'
            }
        ],
    },
    {
        path: '/blankPage',
        component: () => import("@/pages/BlankPage"),
        meta: { myHeaderShow: false, headbgShow: false, footerShow: false }
    },
    {
        path: '/home',
        //把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效
        component: () => import("@/pages/Home"),
        meta: {
            myHeaderShow: true,
            headbgShow: true, //头部导航栏header的样式控制，是否显示背景图
            footerShow: true  //footer的样式控制
        }
    },
    {
        path: '/channel/:category1Id/:category1Name',
        component: () => import("@/pages/Channel"),
        meta: { myHeaderShow: true, headbgShow: true, footerShow: true }
    },
    {
        path: '/channelDetail/:category2Id/:category2Name',
        component: () => import("@/pages/ChannelDetail"),
        meta: { myHeaderShow: true, headbgShow: true, footerShow: true }
    },
    {
        path: '/homePage/:userId',
        component: () => import("@/pages/HomePage"),
        meta: { myHeaderShow: true, headbgShow: false, footerShow: true },
        redirect: '/homePage/:userId/upHome',
        children: [
            {
                path: 'upHome',
                component: () => import("@/pages/HomePage/UpHome"),
                meta: { myHeaderShow: true, headbgShow: false, footerShow: true }
            },
            {
                path: 'momentDisplay',
                component: () => import("@/pages/HomePage/MomentDisplay"),
                meta: { myHeaderShow: true, headbgShow: false, footerShow: true }
            },
            {
                path: 'videoSetDisplay',
                component: () => import("@/pages/HomePage/VideoSetDisplay"),
                meta: { myHeaderShow: true, headbgShow: false, footerShow: true }
            },
            {
                path: 'followDisplay',
                component: () => import("@/pages/HomePage/FollowDisplay"),
                meta: { myHeaderShow: true, headbgShow: false, footerShow: true }
            },
            {
                path: 'followerDisplay',
                component: () => import("@/pages/HomePage/FollowerDisplay"),
                meta: { myHeaderShow: true, headbgShow: false, footerShow: true }
            },
            {
                path: 'channelDisplay',
                component: () => import("@/pages/HomePage/ChannelDisplay"),
                meta: { myHeaderShow: true, headbgShow: false, footerShow: false }
            }
        ],
    },
    {
        path: '/history',
        component: () => import("@/pages/History"),
        meta: { myHeaderShow: true, headbgShow: true, footerShow: true }
    },
    {
        path: '/login',
        component: () => import("@/pages/Login"),
        meta: { myHeaderShow: true, headbgShow: true, footerShow: true }
    },
    {
        path: '/forgetPwd',
        component: () => import("@/pages/Login/ForgetPwd"),
        meta: { myHeaderShow: true, headbgShow: true, footerShow: true }
    },
    {
        path: '/register',
        component: () => import("@/pages/Register"),
        meta: { myHeaderShow: true, headbgShow: true, footerShow: true }
    },
    {
        path: '/search',
        // name: 'search',
        component: () => import("@/pages/Search"),
        meta: { myHeaderShow: true, eadbgShow: false, footerShow: true }
    },
    {
        path: '/play/:setId',
        name: 'play',
        component: () => import("@/pages/Play"),
        meta: { myHeaderShow: true, headbgShow: false, footerShow: true },
    },
    {
        path: '/manage',
        component: () => import("@/pages/Manage"),
        meta: { myHeaderShow: true, headbgShow: false, footerShow: false },
        redirect: '/manage/home',
        // 二级路由
        children: [
            {
                path: 'home',
                component: () => import("@/pages/Manage/Home"),
                meta: { myHeaderShow: true, headbgShow: false, footerShow: false },
            },
            {
                path: 'createChannel',
                component: () => import("@/pages/Manage/CreateChannel"),
                meta: { myHeaderShow: true, headbgShow: false, footerShow: false },
            },
            {
                path: 'upload',
                component: () => import("@/pages/Manage/Upload"),
                meta: { myHeaderShow: true, headbgShow: false, footerShow: false },
                redirect: '/manage/upload/uploadVideo',
                //三级路由
                children: [
                    {
                        path: 'uploadVideo',
                        component: () => import("@/pages/Manage/Upload/UploadVideo"),
                        meta: { myHeaderShow: true, headbgShow: false, footerShow: false },
                    },
                    {
                        path: 'uploadMoment',
                        component: () => import("@/pages/Manage/Upload/UploadMoment"),
                        meta: { myHeaderShow: true, headbgShow: false, footerShow: false },
                    }
                ]
            },
            {
                path: 'uploadManage',
                component: () => import("@/pages/Manage/UploadManage"),
                redirect: '/manage/uploadManage/videoManage',
                meta: { myHeaderShow: true, headbgShow: false, footerShow: false },
                //三级路由
                children: [
                    {
                        path: 'videoManage',
                        component: () => import("@/pages/Manage/UploadManage/VideoManage"),
                        meta: { myHeaderShow: true, headbgShow: false, footerShow: false },
                    },
                    {
                        path: 'momentManage',
                        component: () => import("@/pages/Manage/UploadManage/MomentManage"),
                        meta: { myHeaderShow: true, headbgShow: false, footerShow: false },
                    }
                ]
            },
            {
                path: 'chatGroupManage',
                component: () => import("@/pages/Manage/ChatGroupManage"),
                meta: { myHeaderShow: true, headbgShow: false, footerShow: false },
            },
            {
                path: 'appealManage',
                component: () => import("@/pages/Manage/AppealManage"),
                meta: { myHeaderShow: true, headbgShow: false, footerShow: false },
            },
            {
                path: 'incomeCenter',
                component: () => import("@/pages/Manage/IncomeCenter"),
                meta: { myHeaderShow: true, headbgShow: false, footerShow: false },
            },
            {
                path: 'commentManage',
                component: () => import("@/pages/Manage/CommentManage"),
                meta: { myHeaderShow: true, headbgShow: false, footerShow: false },
            },
            {
                path: 'barrageManage',
                component: () => import("@/pages/Manage/BarrageManage"),
                meta: { myHeaderShow: true, headbgShow: false, footerShow: false },
            },
            {
                path: 'rightsProtect',
                component: () => import("@/pages/Manage/RightsProtect"),
                meta: { myHeaderShow: true, headbgShow: false, footerShow: false },
            },
        ]
    },
    // 重定向
    {
        path: '*',
        redirect: '/home'
    }
]