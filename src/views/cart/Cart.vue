<template>
    <div id="cart">
        <!-- 头部区域 -->
        <header class="titleWrapper">
            <h4><strong>购物车</strong></h4>
            <button class="clearCart">清空购物车</button>
        </header>
        <!-- 中间内容 -->
        <div class="contentWrapper">
            <main class="contentWrapperList">
                <section class=" main_part" v-for="(goods) in shopCart" :key="goods.id">
                    <div class="select">
                        <van-icon @click="show" v-if="selectShow" name="circle" class="no_select"/>
                        <van-icon @click="show" v-else name="passed" class="y_select"/>
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
                        <span class="add"><strong>+</strong></span>
                    </div>
                </section>
            </main>
            <div class="tabBar">
                <div class="tabBarLeft">
                    <a href="javascript:" class="cartCheckBox"></a>
                    <div class="select">
                        <van-icon @click="show" v-if="selectShow" name="circle" class="no_select"/>
                        <van-icon @click="show" v-else name="passed" class="y_select"/>
                    </div>
                    <span>全选</span>
                    <div class="selectAll">
                        合计：<span class="totalPrice">199.00</span>
                    </div>
                </div>
                <div class="tabBarRight">
                    <a href="#" class="pay">去结算(3)</a>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
    name:'Cart',
    computed:{
        ...mapState(['shopCart'])
    },
    data(){
        return{
            selectShow: false
        }
    },
    methods:{
        ...mapMutations(['REDCE_CART']),
        //移出购物车
        removeOutCart(goodsId, goodsNum){
            if(goodsNum > 1){

            }

        },
        show(){
            if(this.selectShow){
                this.selectShow = false
            }
            else{
                this.selectShow = true
            }
        }
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