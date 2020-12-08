<template>
    <div id="minrOrder">
        <!-- 导航栏 -->
        <van-nav-bar title="订单详情" left-arrow :fixed= true :border= true @click-left="$router.go(-1)"/>
        <van-tabs @click="dealWithTabClick" v-model="activeName" style="margin-top: 2.6rem" color="#75a342" title-active-color="#75a342">
            <van-tab title="全部" name="a">
                <OrderInfo v-for="(order) in allOrderArr" :key="order.id" :order="order"/>
            </van-tab>
            <van-tab title="待支付" name="b">
                <OrderInfo v-for="(order) in allWillOrderArr" :key="order.id" :order="order"/>
            </van-tab>
            <van-tab title="待收货" name="c">
                <OrderInfo v-for="(order) in allPayOrderArr" :key="order.id" :order="order"/>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import OrderInfo from './../orderInfo/OrderInfo'
import {getOrder} from './../../../service/api/index'
import {mapState} from 'vuex'
import {Toast} from 'vant'
export default {
    name: 'MineOrder',
    data(){
        return {
            activeName: 'a',
            allOrderArr: null,//所有订单
            allWillOrderArr: null,//所有待支付订单
            allPayOrderArr: null//所有支付的订单
        }
    },
    computed: {
        ...mapState(["userInfo"])
    },
    mounted(){
        //获取订单数据
        this.initOrder()
    },
    methods: {
        //数据初始化
        async initOrder(){
            let result = await getOrder(this.userInfo.token)
            if(result.success_code === 200){
                this.allOrderArr = result.data
                console.log(this.allOrderArr);
            }else{
                Toast({
                    message: '订单获取失败~', duration: 500
                })
            }
        },
        async dealWithTabClick(name, title){
            if(name === 'a'){
                this.allOrderArr = await this.getTabOrder()
            }else if(name === 'b'){
                this.allWillOrderArr = await this.getTabOrder('will')
            }else if(name === 'c'){
                this.allPayOrderArr = await this.getTabOrder('pay')
            }

        },
        async getTabOrder(status){
            let result = await getOrder(this.userInfo.token, status)
            if(result.success_code === 200){
                return result.data
            }else{
                Toast({
                    message: '订单获取失败~', duration: 500
                })
            }
        }
    },
    components: {
        OrderInfo
    },
    
}
</script>
<style scoped>
    #minrOrder{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f5f5f5;
        z-index: 200;
        overflow: auto;
    }
</style>