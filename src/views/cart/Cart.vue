<template>
    <div id="cart" v-if="userInfo.token">
        <!-- 头部区域 -->
        <header class="titleWrapper">
            <h4><strong>购物车</strong></h4>
            <button @click="clearCart" class="clearCart">清空购物车</button>
        </header>
        <!-- 中间内容 -->
        <div class="contentWrapper">
            <main class="contentWrapperList">
                <section class=" main_part" v-for="(goods) in shopCart" :key="goods.id">
                    <div class="select">
                        <van-icon @click="singerGoodsSelected(goods, goods.id)" v-if="!goods.checked" name="circle" class="no_select"/>
                        <van-icon @click="singerGoodsSelected(goods, goods.id)" v-else name="passed" class="y_select"/>
                    </div>
                    <div class="proImg">
                        <img :src="goods.small_image" alt="">
                    </div>
                    <div class="pro_desccrip">
                        <span class="pro_desccripText">{{goods.name}}</span>
                    </div>
                    <div class="price">
                        <span class="price_text">{{goods.price | moneyFormat}}</span>
                    </div>
                    <div class="pro_add">
                        <span @click="removeOutCart(goods.id, goods.num)" class="minus"><strong>-</strong></span>
                        <span class="num">{{goods.num}}</span>
                        <span @click="addToCart(goods.id, goods.name, goods.small_image, goods.price)" class="add"><strong>+</strong></span>
                    </div>
                </section>
            </main>
            <div class="tabBar">
                <div class="tabBarLeft">
                    <a href="javascript:" class="cartCheckBox"></a>
                    <div class="select" @click="selectAll()">
                        <van-icon v-if="isSelectAll" name="passed" class="y_select"/>
                        <van-icon v-else name="circle" class="no_select"/>
                    </div>
                    <span>全选</span>
                    <div class="selectAll">
                        合计：<span class="totalPrice">199.00</span>
                    </div>
                </div>
                <div class="tabBarRight">
                    <router-link tag="a" class="pay" :to="{path: '/comfirmOrder'}">去结算(3)</router-link>
                </div>
                
            </div>
        </div>
    </div>
    <SelectLogin v-else />
</template>
<script>
import {mapState, mapMutations} from 'vuex'
//引入登录组件
import SelectLogin from './../login/SelectLogin.vue'
//引入确认组件
import { Dialog, Toast } from 'vant';
//引入人民币过滤器
import '@/config/filters.js'
import { changeCartNum, claerAllCart} from '../../service/api';
export default {
    name:'Cart',
    computed:{
        ...mapState(['shopCart', 'userInfo']),
        //商品是否全选
        // isSelectAll(){
        //     let tag = true
        //     Object.values(this.shopCart).forEach((goods, index) => {
        //         if(!goods.checked){
        //             tag = false
        //         }
        //         return this.isSelectAll =  tag
        //     })
        // }
        
    },
    data(){
        return{
            radio: '1',
            isSelectAll: true
        }
    },
    methods:{
        ...mapMutations(['REDCE_CART', 'ADD_GOODS', 'SELECTED_SIGLE_GOODS', 'SELECTED_All_GOODS', 'CLEAR_CART']),
        selectAll(isSlected) {
            this.SELECTED_All_GOODS(isSlected)
            Object.values(this.shopCart).forEach((goods, index) => {
                if(!goods.checked){
                    return this.isSelectAll = false
                }
            })
        },
        //1.移出购物车
        async removeOutCart(goodsId, goodsNum){
            if(goodsNum > 1){
                    let result = await changeCartNum(this.userInfo.token, goodsId, 'reduce')
                    console.log(result);
                    if(result.success_code === 200){//修改成功
                    this.REDCE_CART(goodsId)
                    }else{
                        Toast({
                            message: '出了点小问题哟~',
                            duration: 500
                        })
                    }
            }else if(goodsNum === 1){
                // 挽留
                Dialog.confirm({
                title: '温馨提示',
                message: '确定删除该商品吗？',
                }).then(async () => {
                    // on confirm
                    let result = await changeCartNum(this.userInfo.token, goodsId, 'reduce')
                    console.log(result);
                    if(result.success_code === 200){//修改成功
                    this.REDCE_CART({goodsId})
                    }else{
                    Toast({
                        message: '出了点小问题哟~',
                        duration: 500
                    })
                }

                }).catch(() => {
                    // on cancel
                });
            }

        },
        //添加商品数量
        async addToCart(goodsId, goodsName, smallImage, goodsPrice){
                let result = await changeCartNum(this.userInfo.token, goodsId, 'add')
                    console.log(result);
                    if(result.success_code === 200){//修改成功
                        this.ADD_GOODS({goodsId, goodsName, smallImage, goodsPrice})
                    }else{
                        Toast({
                            message: '出了点小问题哟~',
                            duration: 500
                        })
                    }
        },
        //单个商品选中或者取消选中
        singerGoodsSelected(goods, goodsId){
            this.SELECTED_SIGLE_GOODS(goodsId)
            console.log(123456);
            console.log(goods.checked);
            if(!goods.checked){
                this.isSelectAll = false
            }else{
                this.isSelectAll = true
        }
            
        },
        //清空购物车
        clearCart(){
            // 挽留
                Dialog.confirm({
                title: '温馨提示',
                message: '确定删除该商品吗？',
                })
                .then(async () => {
                    // on confirm
                    let result = await claerAllCart(this.userInfo.token)
                    console.log(result);
                    if(result.success_code === 200){//清空成功
                        this.CLEAR_CART()
                    }else{
                        Toast({
                            message: '出了点小问题哟~',
                            duration: 500
                        })
                    }
                    
                })
                .catch(() => {
                    // on cancel
                });
        }
    },
    components: {
        SelectLogin
    }
}
</script>
<style lang="less" scoped>
    #cart{
        width: 100%;
        height: 100%;
        // position: relative;
    }
    .contentWrapper{
        margin-top: 1.8rem;
    }
    .titleWrapper{
        position: relative;
        text-align: center;
    }
    .titleWrapper .clearCart{
        position: absolute;
        top: 0.25rem;
        right: 0.5rem;
        background-color: transparent;
        font-size: 0.75rem;
        color: red;

    }

    .contentWrapper .contentWrapperList .main_part{
        height: 7.05rem;
        position: relative;
        margin-top: 1rem;
        margin-bottom: 1rem;
        border-bottom: 0.05rem solid rgb(230, 218, 218);
    }

    .contentWrapper .contentWrapperList .main_part .select{
        position: absolute;
        float: left;
        top: 0.7rem;
        left: 0.7rem;
        
    }
    .contentWrapper .contentWrapperList .select .y_select{
        color: red;

    }
    .contentWrapper .contentWrapperList  .proImg{
        width: 35%;
        height: 6rem;
        margin-left: 2.4rem;
        margin-right: 0.5rem;
        float: left;
    }
    .contentWrapper .contentWrapperList .proImg img{
        width: 100%;
        height: 100%;
    }
    .contentWrapper .contentWrapperList .pro_desccrip{
        margin-left: 0.5rem;
        font-size: 0.89rem;
    }
    .contentWrapper .contentWrapperList .price{
        position: absolute;
        bottom: 1rem;
        left: 10.5rem;
        margin-top: 2.5rem;
        font-size: 0.89rem;
    }
    .contentWrapper .contentWrapperList .main_part .pro_add{
        position: absolute;
        bottom: 1rem;
        right: 0.3rem;
        font-size: 1rem;
    }
    .contentWrapper .contentWrapperList .pro_add .num{
        display: inline-block;
        margin: 0 0.6rem;
        padding: 0 1rem;
        background-color: rgb(224, 203, 203);
        border-radius: 0.25rem;
        font-size: 0.8rem;
    }

    //底部结算样式
    .contentWrapper .tabBar{
        margin-top: 1rem;
        width: 100%;
        position: fixed;
        bottom: 2.8rem;
        background-color: #f5f5f5;
    }
    .contentWrapper .tabBarLeft{
        float: left;
        margin-top: 0.6rem;
    }
    .contentWrapper .tabBarLeft .select{
        margin: 0 0.7rem;
        float: left;
        line-height: 1.8rem;
    }

    .contentWrapper .tabBarLeft span{
        font-size: 0.87rem;
        padding: 0 0.5rem;
    }
    .contentWrapper .tabBarLeft .selectAll{
        padding-top: 0.15rem;
        float: right;
        font-size: 0.87rem;
    }
    .contentWrapper .tabBarRight{
        padding: 0.6rem 0;
    }
    .contentWrapper .tabBarRight .pay{
        color: #ffffff;
        display: inline-block;
        margin-left: 4rem;
        padding: 0.1rem 0.5rem;
        font-size: 0.9rem;
        background-color: red;
        border-radius: 0.49rem;
    }

</style>