//API接口统一管理
import requests from "./request";
// import mockRequests from './mockRequest';
// import requestBili from './requestBili';
// import qs from 'qs';


// //获取首页数据
// export const reqHomeSet = ()=>mockRequests({url:'/home/getAllSet',method:'get'})
// //获取b站数据
// export const reqBiliAllList = ()=>requestBili({url:'/index/ding.json',method:'post'})

/**
 * 登录注册
 */
//登录
export const reqUserLogin = (user) =>requests({url:'/user/login',data:user,method:'post'})
//获得找回密码的验证码
export const reqGetForgetCode = (account) =>requests({url:`/user/getForgetCode/${account}`,method:'get'})
//修改密码
export const reqChangePwd = (user) =>requests({url:'/user/changePwd',data:user,method:'post'})
//获得注册验证码
export const reqGetCode = (phone) =>requests({url:`/user/getCode/${phone}`,method:'get'})
//注册
export const reqUserRegister = (user)=>requests({url:'/user/register',data:user,method:'post'})

/**
 * 首页
 */
//获取首页分类数据
export const reqCategory1List = ()=>requests({url:'/home/getCategory1List',method:'get'})
//根据userid 获取首页 热门和推荐 视频列表
export const reqHomeSetList = (userId)=>requests({url:`/home/getHomeSetList/${userId}`,method:'get'})

/**
 * 搜索页面
 */
//根据keyword 模糊查询
export const reqListByKeyword = (keyword)=>requests({url:`/search/searchByKeyword?keyword=${keyword}`,method:'get'})

/**
 * 用户稿件管理页面
 */
//动态评论
export const reqSendMomComment = (comment)=>requests({url:'/manage/sendMomComment',data:comment,method:'post'})
//通过userid获取视频集列表
export const reqReviewSetListByUId = (userId)=>requests({url:`/manage/getReviewSetListByUId?userId=${userId}`,method:'get'})
//通过userid获取动态列表
export const reqReviewMomentListByUId = (userId)=>requests({url:`/manage/getReviewMomentListByUId?userId=${userId}`,method:'get'})
//删除视频
export const reqDeleteVideoSetBySetId = (data)=>requests({url:'/manage/deleteVideoSetBySetId',data,method:'post'})
//删除动态
export const reqDeleteMomentByMomId = (data)=>requests({url:'/manage/deleteMomentByMomId',data,method:'post'})
//检测频道是否存在
export const reqHasCategory2 = (data)=>requests({url:'/manage/hasCategory2',data,method:'post'})
//新建频道
export const reqCreateChannel = (data)=>requests({url:'/manage/createChannel',data,method:'post'})

/**
 * 上传页面API
 */
//获取分类列表数据
export const reqCategoryList = ()=>requests({url:'/upload/getCategoryList',method:'get'})
//根据分类2id 获取标签列表数据【可优化：后端根据 视频内容 来推荐一些标签，这个太难了，可选】
export const reqLabelListByC2Id = (c2Id)=>requests({url:`/upload/getLabelListByC2Id/${c2Id}`,method:'get'})
//上传动态
export const reqUploadMoment = (data)=>requests({url:'/upload/upload-moment',data,method:'post',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}})
//上传视频
export const reqUploadVideos = (data)=>requests({url:'/upload/upload-video',data,method:'post',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}})
//获取话题列表
export const reqSubjectList = ()=>requests({url:'/upload/getSubjectList',method:'get'})

/**
 * 视频播放页面API
 */
//根据setid、userid 获取所有相关信息，后端通过map封装【get不能携带请求体data，用post】
// export const reqSetInfo = (setId)=>requests({url:`/play/getSetInfoBySetId/${setId}`,method:'get'})
export const reqSetInfo = (data)=>requests({url:'/play/getSetInfoBySetId',data,method:'post'})
//视频评论
export const reqSendComment = (setComment)=>requests({url:'/play/sendSetComment',data:setComment,method:'post'})
//点赞视频
export const reqLikeSet = (data)=>requests({url:'/play/likeSet',data,method:'post'})
//评分视频 评分后 获取实时推荐列表
export const reqRateSet = (data)=>requests({url:'/play/rateSet',data,method:'post'})
//关注UP
export const reqFollowUP = (data)=>requests({url:'/play/followUP',data,method:'post'})
//重新获取userInfo
export const reqUserInfo = (userId)=>requests({url:`/user/getUserInfo/${userId}`,method:'get'})
//历史播放记录
export const reqSaveSetHistory = (data)=>requests({url:'/play/getSaveSetHistory',data,method:'post'})

/**
 * 用户主页
 */
//获取UP的信息
export const reqUpUserInfo = (data)=>requests({url:'/homePage/getUpUserInfo',data,method:'post'})
//获取UP的主页动态列表
export const reqUserMoment = (userId)=>requests({url:`/homePage/getUserMoment/${userId}`,method:'get'})
//获取UP的主页视频集列表
export const reqUserVideoSet = (userId)=>requests({url:`/homePage/getUserVideoSet/${userId}`,method:'get'})
//获取UP的主页关注列表
export const reqFollowList = (data)=>requests({url:'/homePage/getFollowList',data,method:'post'})
//获取UP的主页粉丝列表
export const reqFollowerList = (data)=>requests({url:'/homePage/getFollowerList',data,method:'post'})

/**
 * 历史记录
 */
//获取历史记录
export const reqHistory = (userId)=>requests({url:`/history/getHistory/${userId}`,method:'get'})
//删除一条历史记录
export const reqDeleteHistory = (data)=>requests({url:'/history/deleteHistory',data,method:'post'})
//删除全部历史记录
export const reqDeleteAllHistory = (data)=>requests({url:'/history/deleteAllHistory',data,method:'post'})

/**
 * 频道
 */
//获取二级分类列表
export const reqCategory2ListBy1id = (category1id)=>requests({url:`/channel/getCategory2ListBy1id/${category1id}`,method:'get'})
//获取楼层数据
export const reqFloorByCategory1id = (data)=>requests({url:'/channel/getCategory1PerCategory2',data,method:'post'})
//获取频道详情（二级分类视频）数据
export const reqChannelDetail = (data)=>requests({url:'/channel/getChannelDetail',data,method:'post'})
//加入频道
export const reqJoinChannel = (data)=>requests({url:'/channel/JoinChannel',data,method:'post'})
//获取UP主页的加入频道信息
export const reqJoinChannelInfo = (userId)=>requests({url:`/channel/getJoinChannelInfo/${userId}`,method:'get'})

/**
 * 管理员界面
 */
//通过管理员id获取审核视频集列表
export const reqReviewSetListByMId = (managerId)=>requests({url:`/admin/getReviewSetListByMId?managerId=${managerId}`,method:'get'})

//通过管理员id获取审核动态列表
export const reqReviewMomtListByMId = (managerId)=>requests({url:`/admin/getReviewMomentListByMId?managerId=${managerId}`,method:'get'})

//管理员审核操作
export const reqVideoSetOperation = (data)=>requests({url:'/admin/videoSetOperation',data,method:'post'})

//管理员审核操作-动态
export const reqMomentOperation = (data)=>requests({url:'/admin/momentOperation',data,method:'post'})

//管理员login
export const reqManagerLogin = (manager)=>requests({url:'/admin/login',data:manager,method:'post'})