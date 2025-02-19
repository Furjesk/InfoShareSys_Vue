import {v4 as uuidv4} from 'uuid'
//生成uuid，每次执行不能发生变化，持久存储
export const getUUID = ()=>{
    //先从本地存储获取uuid，看有没有
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if(!uuid_token){
        //如果本地没有，生成
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}