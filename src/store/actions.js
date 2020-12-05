
//在vuex中 ，一旦涉及到异步的操作，就不能使用mapmutations方法，要使用actions
import {USER_INFO} from './mutations-type'
import {getStore} from './../config/global.js'
import { getUserInfo } from '../service/api'

export default {
    //同步用户信息
    syncUserInfo({commit}, userInfo){
        commit(USER_INFO, {userInfo})
    },
    //自动登录
    async reqUserInfo({commit}){
        //从本地获取数据
        let userInfo = JSON.parse(getStore('userInfo')) 
        if(userInfo){
            commit(USER_INFO, {userInfo})
        }else{
            //从服务器端验证
            let result = await getUserInfo()
            console.log(result);
            if(result.success_code){
                commit(USER_INFO, {userInfo: result.data})
            }
        }
    }
}   