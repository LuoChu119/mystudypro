<template>
    <div id="order">
        <!-- 顶部导航栏 -->
        <van-nav-bar title="填写订单" left-arrow :fixed= true :border= true @click-left="onClickLeft"/>
        <!-- 地址填写 -->
        <van-contact-card type="add" @click="chooseAddress"
        add-text="选择收货地址"
        style="margin-top: 3rem"
         />
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="送达时间" value="请选择送达时间" is-link/>
            <van-cell value="内容" is-link :center="true">
        <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
                <img src="" alt="" style="width: 3rem">
                <img src="" alt="" style="width: 3rem">
                <img src="" alt="" style="width: 3rem">
            </template>
            </van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="支付方式" value="微信"/>
        </van-cell-group>
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="备注">
                <input type="text " placeholder="选填，备注您的特殊需求">
            </van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="商品金额" value="￥50.30"/>
            <van-cell title="配送费" value="￥00.30"/>
        </van-cell-group>
        <van-submit-bar label="实付" :price="3050" button-text="提交订单" @submit="onSubmit" />
        <transition name="router-slider" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>
<script>
import { Toast } from 'vant';
export default {
    name:'Order',
    methods:{
        //点击了左边
        onClickLeft(){
            this.$router.back()
        },
        chooseAddress() {
            this.$router.push('/comfirmOrder/MyAddress')
        },
        //订单提交
        onSubmit(){
            alert('打钱')
        }
    }
}
</script>
<style scoped>
    #order{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
    }
    .router-slider-enter-active, .router-slider-leave-active{
        transition: all 0.5s;
    }
    .router-slider-enter, .router-slider-leave-active{
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>