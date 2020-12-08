<template>
    <!-- 我的，顶部导航 -->
    <div id="mine" v-if="userInfo.token">
        <van-nav-bar title="我的"  :fixed= true :border= false />
        <van-cell-group style="margin-top: 2.6rem">
            <van-cell @click="$router.push('/dashboard/mine/usercenter')" value="" is-link style="background-color: #2eba5a; color：#fff" >
                <!-- 使用 title 插槽来自定义标题 -->
                <template slot="title" >
                    <div class="personMsg">
                        <img :src="userInfo.icon_url" alt="">
                        <div class="personInfo">
                            <span>{{userInfo.real_name}}</span>
                            <span>{{userInfo.phone}}</span>
                        </div>
                    </div>
                </template>
            </van-cell>
        </van-cell-group>
         <van-cell-group style="margin-top: 0.6rem">
            <van-cell @click="$router.push({path: '/dashboard/mine/mineOrder'})" icon="label" title="我的订单" value="查看所有订单" is-link/>
        </van-cell-group>
        <van-grid>
            <van-grid-item icon="pending-payment" text="待支付" />
            <van-grid-item icon="paid" text="待收货" />
            <van-grid-item icon="chat-o" text="待评价" />
            <van-grid-item icon="cash-back-record" text="售后/退款" />
        </van-grid>
         <van-cell-group style="margin-top: 0.6rem">
            <van-cell icon="gold-coin" title="我的优惠券" value="1张" is-link/>
            <van-cell icon="location" title="我的收货地址" value="" is-link/>
        </van-cell-group>
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell icon="phone" title="联系客服" value="咨询时间07:00-22:00" is-link/>
            <van-cell icon="comment-circle" title="意见反馈" value="" is-link/>
        </van-cell-group>
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell icon="cart" title="小撩买菜" value="下载APP体验更佳" is-link/>
        </van-cell-group>
        <transition name="router-slider" mode="out-in">
            <router-view/>
        </transition>
    </div>
    <SelectLogin v-else />

</template>
<script>
//引入登录组件
import SelectLogin from './../login/SelectLogin.vue'
import {mapState, mapMutations} from 'vuex'
export default {
    name:'Mine',
    components: {
        SelectLogin
    },
    computed: {
        ...mapState(['userInfo'])

    }

}
</script>
<style lang="less" scoped>
    #mine{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
    }
    .van-nav-bar{
        background-color: #3bba63;
    }
    #mine .van-nav-bar .van-nav-bar__content .van-nav-bar__title {
        color: #fff;
        font-size: 1rem;
    }
    .personMsg{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .personMsg>img{
        width: 4rem;
    }
    .personMsg .personInfo{
        display: flex;
        flex-direction: column;
        margin-left: 0.8rem;
        white-space: nowrap;
        color: #fff;
    }
    .van-icon-label{
        color: orangered;
        font-size: 1.2rem;
    }
    .van-icon-cart{
        color: orangered;
        font-size: 1.2rem;
    }
    .van-icon-gold-coin{
        color: orangered;
        font-size: 1.2rem;
    }
    .van-icon-location{
        color: orangered;
        font-size: 1.2rem;
    }
    .van-icon-phone{
        color: orangered;
        font-size: 1.2rem;
    }
    .van-icon-comment-circle{
        color: orangered;
        font-size: 1.2rem;
    }
    .router-slider-enter-active, .router-slider-leave-active{
        transition: all 0.5s;
    }
    .router-slider-enter, .router-slider-leave-active{
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>