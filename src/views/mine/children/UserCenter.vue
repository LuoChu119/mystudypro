<template>
    <div id="ueser_center">
        <!-- 导航条 -->
        <van-nav-bar title="用户中心" left-arrow :fixed= true :border= true @click-left="$router.go(-1)"/>
        <div class="logout">
            <button @click="logOut" >退出登录</button>
        </div>

    </div>
</template>
<script>
import { getLogOut } from '../../../service/api'
import {mapMutations} from 'vuex'
import {Toast} from 'vant'
export default {
    name: 'UserCenter',
    methods: {
        ...mapMutations(['RESET_USER_INFO', 'CLEAR_CART']),
        async logOut(){
            let result = await getLogOut()
            if(result.success_code  === 200){
            //清空本地的数据
            this.RESET_USER_INFO()
            //清空本地的购物车
            this.CLEAR_CART()
            Toast(
                {
                    message: '退出登录成功',
                    duration: 500
                }
            )
            }
        }
    }
}
</script>
<style scoped>
    #ueser_center{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f5f5f5;
        z-index: 200;
        overflow: hidden;
    }
    .logout{
        margin-top: 3.6rem;
        text-align: center;
    }
    .logout>button{
        font-size: 0.9rem;
        color: #f5f5f5;
        padding: 0.3rem 0.5rem;
        background-color: red;
        border-radius: 0.8rem;
    }
</style>