<template>
    <div id="order">
        <!-- 顶部导航栏 -->
        <van-nav-bar title="填写订单" left-arrow :fixed= true :border= true @click-left="onClickLeft"/>
        <!-- 地址填写 -->
        <van-contact-card :type="address_type" :name="address_name" :tel="address_phone" @click="chooseAddress"
        add-text="选择收货地址"
        style="margin-top: 3rem"
         />
        <van-cell-group style="margin-top: 0.6rem" >
            <van-cell title="送达时间" @click="showPopup" :value="arriveDate" is-link/>
            <router-link :to="{path:'/comfirmOrder/orderDetail'}">
                <van-cell :value="`共${goodsCount}件`" is-link :center="true"> 
                <!-- 使用 title 插槽来自定义标题 -->
                    <template slot="title">
                        <img v-for="(goods) in threeShopCart" :key="goods.id" :src="goods.small_image" alt="" style="width: 3rem">
                    </template>
                </van-cell>
            </router-link>
        </van-cell-group>
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="支付方式" value="微信"/>
        </van-cell-group>
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="备注">
                <input type="text " style="text-align: right" placeholder="选填，备注您的特殊需求" v-model="notice">
            </van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="商品金额" :value="`￥${totalPrice}`"/>
            <van-cell title="配送费" :value="`￥${disPrice}`"/>
        </van-cell-group>
        <van-submit-bar label="实付" :price="totalPrice * 100 + disPrice * 100" button-text="提交订单" @submit="onSubmit" />
        <!-- 弹出日期组件 -->
        <!-- <van-cell is-link @click="showPopup">展示弹出层</van-cell> -->
        <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
            <van-datetime-picker
            v-model="currentDate"   
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="onDateCancel"
            @confirm="onDateConfirm"
            />
        </van-popup>
        <!-- 支付二维码门板展示 -->
        <van-popup v-model="ispay" position="center" :style="{ height: '30%' }">
            <qriously :value="qrcode" :size="200" />
        </van-popup>

        <transition name="router-slider" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>
<script>
import { Toast } from 'vant';
//引入发布订阅消息组件
import PubSub from 'pubsub-js'
//
import {mapState, mapMutations, mapActions} from 'vuex'
//引入数据请求接口
import {postOrder, createOrderSuccess, getWXCode, queryPayStatus, getAllSelectGoods
, delAllSelectGoods} from './../../service/api/index'
//引入时间格式化组件
import Moment from 'moment'
export default {
    name:'Order',
    computed:{
        ...mapState(['shopCart', 'userInfo']),
        //1.商品总件数
        goodsCount(){
            let num = 0
            num = Object.keys(this.shopCart).length
            Object.values(this.shopCart).forEach((goods, index) => {
                if(!goods.checked){
                    num -=1
                }   
            })
            return  num         
        },
        //2.商品总价
        totalPrice(){
            let totalPrice = 0
            Object.values(this.shopCart).forEach((goods, index) => {
                if(goods. checked){
                    totalPrice += goods.price * goods.num
                }
                
            })
            return totalPrice
        },
        //3.取出购物车前3件选中的商品
        threeShopCart(){
            let shopCart = []
            Object.values(this.shopCart).forEach((goods, index) => {
                if(goods.checked){
                    //添加到shopCart空数组中
                    shopCart.push(goods)
                }
            })
            return shopCart.slice(0, 3)
        },
        //4.配送费条件
        disPrice(){
            //  商品总价> 40免费， <40, 6元
            let disPrice = 0
            if(this.totalPrice > 40){
                return disPrice = 0
            }else{
                return disPrice = 6
            }
        }
    },
    data(){
        return {
            //1.地址展示相关
            address_type: 'add',//地址卡片类型
            address_name: null,//显示收货人姓名
            address_phone: null,//显示收货人电话
            address_id: null,//收货人id
            //2.选择送达日期相关
            show: false,
            minDate: new Date(2020, 0, 1),  
            maxDate: new Date(2025, 10, 1),
            currentDate: new Date(),
            //送达时间
            arriveDate: '请选择送达时间',
            //备注
            notice: null,
            //支付门板显示
            ispay: false,
            //生成微信二维码的地址
            qrcode: null 
   
        }
    },
    mounted(){
        //订阅收货地址
        PubSub.subscribe('userAddress', (msg, address) => {
            if(msg === 'userAddress'){
                console.log(1111111111111111111);
                console.log(address);
                //修改地址卡片的类型
                this.address_type = 'edit'
                this.address_name = address.name
                this.address_phone = address.tel
                this.address_id = address.address_id
            }
        })
    }, 
    methods:{
        //点击了左边
        onClickLeft(){
            this.$router.back()
        },
        chooseAddress() {
            this.$router.push('/comfirmOrder/MyAddress')
        },
        //订单提交
        async onSubmit(){
            //数据验证
            if(!this.address_id){
                Toast(
                    {
                        message: '请选择收货地址~~',
                        duration: 500
                    }
                )
                return
            }
            if(this.arriveDate === '请选择送达时间'){
                Toast(
                    {
                        message: '请选择送达时间~~',
                        duration: 500
                    }
                )
                return
            }
            if(!this.notice){
                Toast(
                    {
                        message: '请添加注意事项~~',
                        duration: 500
                    }
                )
                return
            }
            //处理订单相关
            if(this.userInfo.token){    
                //查询车订单
                let goodsResult = await getAllSelectGoods(this.userInfo.token)
                console.log(goodsResult);
                //创建订单
                if(goodsResult.success_code === 200){
                    let orderResult = await postOrder(this.userInfo.token, this.address_id, this.arrive_time, goodsResult.data, this.notice, 
                    this.totalPrice, this.disPrice)
                    console.log(orderResult);
                    //删除购物车中已经生成订单的商品
                    if(orderResult.success_code === 200){
                        let delResult = await delAllSelectGoods(this.userInfo.token)
                        console.log(delResult);
                        //发起微信支付
                        if(delResult.success_code === 200){
                            //请求微信支付接口,现在是默认一分钱
                            let urlResult = await getWXCode(orderResult.data.order_id, 1)
                            console.log(urlResult);
                            //判断求的数据是否有微信二维码的url地址
                            if(urlResult.code_url){
                                this.ispay = true
                                this.qrcode = urlResult.code_url
                                //再次验证用户是否扫码支付成功
                                let payResult = await queryPayStatus(orderResult.data.order_id)
                                console.log(payResult);
                                // if(!payResult.success){
                                //     Toast({
                                //         message: payResult.message, duration: 1000
                                //     })
                                //     this.ispay = false
                                //     //通知自己服务器订单支付成功
                                //     let statusResult = await OrderPaySuccess(this.userInfo.token, orderResult.data.order_id)
                                //     console.log(statusResult);
                                //     if(statusResult.success_code === 200){
                                //         //跳转到我的界面
                                //         this.$router.replace('/dashboard/mine')
                                //         window.sessionStorage.setItem('tabBarActiveIndex', '3')
                                //     }
                                // }

                            }


                        }else{
                            Toast(
                                {message: '出了点小问题哦~', duration: 500}
                            )
                        }
                    }else{
                         Toast(
                                {message: '订单同步出了点小问题哦~', duration: 500}
                            )
                    }
                }
                else{
                    Toast({
                        message: '获取订单商品失败',
                        duration: 500
                    })
                }
            }   
        },
        //展示日期组件
        showPopup(){
            this.show = true
        },
        //取消日期组件
        onDateCancel(){
            this.show = false
        },
        //确认日期组件
        onDateConfirm(value){
            this.show = false
            this.arriveDate = Moment(value).format('YYYY-MM-DD hh:mm')

        },

        
    },
    beforeDestroy(){
        // 取消订阅
        PubSub.unsubscribe('userAddress')
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