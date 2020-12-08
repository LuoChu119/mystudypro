<template>
    <div class="wrapper">
        <div class="geuss">
            <div class="proInformation" v-for="(pro) in products" :key="pro.id">
                <div class="proimg">
                    <img :src="pro.small_image" alt="">
                </div>
                <div class="proName">
                    <span class="proNameText">{{pro.name}}</span>
                </div>
                <div class="proDescrip">
                    <span class="proDescripText">{{pro.spec}}</span>
                </div>
                <div class="price">
                    <span>{{pro.price | moneyFormat}}</span>
                </div>
                <div @click="addToCart(pro)" class="shop"><van-icon name="cart-o" /></div>
            </div>
        </div>
    </div>
</template>
<script>
//引入滚动组件
import Bscroll from 'better-scroll'
//引入消息订阅模块
import PubSub from 'pubsub-js'
import {mapMutations, mapState} from 'vuex'
//引入轻提示
import {Toast} from 'vant'
//购物车同步到服务器请求
import {addGoodsToCart} from './../../../service/api/index'

export default {
    name:'ProductItem',
    props:{
        products: Array
    },
    computed:{
        ...mapState(['userInfo'])
    },
    data(){
        return{
            list:[]
        }
    },
    mounted(){
        //初始化滚动框架
        this.$nextTick(() => {
        this.leftScroll = new Bscroll('.leftWrapper', {probeType: 3})
            })
    },
    methods:{
        ...mapMutations(['ADD_GOODS']),
        async addToCart(goods){
            if(this.userInfo.token){//已经登录
                let result = await addGoodsToCart(this.userInfo.token, goods.id, goods.name, goods.price, goods.small_image)
                console.log(result);
                if(result.success_code === 200){
                    this.ADD_GOODS({
                    goodsId: goods.id,
                    goodsName: goods.name,
                    smallImage: goods.small_image,
                    goodsPrice: goods.price
                })
                //轻提示用户添加购物车成功
                Toast('添加购物车成功');
                }
            }else{
                this.$router.push('/login')
            }
            
        },
    }
}
</script>
<style scoped>
    .geusstext{
        font-size: 0.9rem;
    }
    .proInformation{
        width: 100%;
        height: 6.5rem;
        position: relative;
        border-bottom: 0.1rem solid rgb(214, 202, 202);
        background-color: #ffffff;
    }
    .proInformation .proimg{
        float: left;
        width: 30%;
        
    }
    .proInformation .proimg img{
        width: 100%;
    }
    .proInformation .proName{
        margin-top: 0.5rem;
        font-size: 0.9rem;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

    }
    .proInformation .proDescrip{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.75rem;
    }
    .proInformation .price{
        position: absolute;
        bottom: 0.2rem;
        left: 6rem;
        font-size: 0.85rem;
        color: orangered;

    }
    .wrapper .vip{
        margin-top: 1rem;
    }
    .proInformation .shop{
        color: #ffffff;
        font-size: 20px;
        width: 27px;
        height: 27px;
        background-color: green;
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
        position: absolute;
        bottom: 0.1rem;
        right: 0.8rem;

    }
</style>