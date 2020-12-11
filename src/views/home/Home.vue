<template>
    <div id="home">
       <div v-if="!showloading">
            <Header/>
            <Sowing :sowing_lis= "sowing_list"/>
            <Nav :nav_list= 'nav_list'/>
            <Flash/>
            <Items :items_list= 'items_list'/>
            <YouLikeTop :guesslike_list= 'guesslike_list'/>
            <MarkTop v-if="showBackStatus"/>
       </div>
       <van-loading v-else type="spinner" color="#1989fa"
       style="position: absolute; left: 50%; top: 40%; transform: translate(-50%)"
       >小撩正在加载中...</van-loading>
    </div>
</template>
<script>
//引人请求的数据//引入购物车接口方法
import {addGoodsToCart, getHomeData} from './../../service/api/index'
//引入Header组件
import Header from './conponents/Header.vue'
import Sowing from './conponents/Sowing.vue'
import Nav from './conponents/Nav.vue'
import Flash from './conponents/Flash.vue'
import Items from './conponents/Items.vue'
import YouLikeTop from './conponents/YouLikeTop.vue'
import MarkTop from './conponents/MarkTop'
//引入消息订阅组件插件
import PubSub from 'pubsub-js'
//引入轻提示组件
import { Toast } from 'vant';
//引入vuex
import { mapMutations, mapState } from 'vuex'

//引入处理返回顶部的函数
import {showBack} from '@/config/global.js'
//引入人民币过滤器
import '@/config/filters.js'
export default {
    name:'Home',
    data(){
        return{
            //首页的轮播图数据
            sowing_list: [],
            showloading: true,
            //导航数据
            nav_list:[],
            //清单数据
            items_list:[],
            //喜欢数据
            guesslike_list:[],
            //返回顶部的按钮
            showBackStatus: false
        }
    },
    created(){
        //请求网络数据
        this.reqData()
    },
    computed:{
        ...mapState(['userInfo'])
    },
    mounted(){  
        //消息订阅（添加到购物车的消息）
        PubSub.subscribe('homeAddToCart', (msg, goods) => {
            if(msg === 'homeAddToCart'){
                //判断用户是否登录
                if(this.userInfo.token){//已经登录
                    //将数据同步到服务器，然后在同步到本地，通过接口部署到服务器
                    this.dealGoodsAdd(goods)
                    //轻提示用户添加购物车成功
                    Toast('添加购物车成功');
                }else{//没有登录
                    this.$router.push('/login')
                }
                
            }
            
        })
    },      
    components: {
        Header,
        Sowing,
        Nav,
        Flash,
        Items,
        YouLikeTop,
        MarkTop
    },
    methods:{
        ...mapMutations(["ADD_GOODS"]),
        async reqData(){
            let response = await getHomeData()
            if(response.success){
                this.sowing_list = response.data.list[0].icon_list
                //导航数据
                this.nav_list = response.data.list[2].icon_list
                //清单数据
                this.items_list = response.data.list[3].product_list
                console.log(this.items_list);
                //喜欢数据
                this.guesslike_list = response.data.list[12].product_list
                // console.log(this.sowing_list);
                //隐藏动画加载
                this.showloading = false
                 showBack((status) => {
                    this.showBackStatus = status
                })
            }
        },
        //添加商品到购物车然后同步到服务器方法
        async dealGoodsAdd(goods){
            let result = await addGoodsToCart(this.userInfo.token, goods.id, goods.name, goods.price, goods.small_image)
            console.log(result);
            if(result.success_code === 200){
                this.ADD_GOODS({
                    goodsId: goods.id,
                    goodsName: goods.name,
                    smallImage: goods.small_image,
                    goodsPrice: goods.price
                })
                Toast({
                    message: '添加到购物车成功',
                    duration: 500
                })
            }
        }
    },
    beforeDestroy(){
        PubSub.unsubscribe('homeAddToCart')
    }

    
}
</script>
<style lang="less" scoped>
    #home{
        width: 100%;
        // height: 3000px;
        // background-color: #ffff;
        overflow: auto;
        margin-bottom: 3rem;
        // background-color: skyblue;
    }
</style>