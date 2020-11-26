<template>
    <div id="youlike">
        <div class="like">
            <div class="likeimg">
                <img :src="product.small_image" :alt="product.name"> 
            </div>
            <div class="description">{{product.product_name}}</div>
            <span class="price">{{product.price | moneyFormat}}</span>
            <span class="no_price">{{product.origin_price | moneyFormat}}</span>
            <div @click="addToCart(product)" class="shop"><van-icon name="cart-o" /></div>
        </div>      
    </div>
</template>
<script>
import PubSub from 'pubsub-js'
export default {
    name:"YouLike",
    props:{
        product: Object
    },
    methods:{
        addToCart(goods){
            PubSub.publish('homeAddToCart', goods)
            // alert('怎么回事啊')
            // console.log(goods);
        }
    }
}
</script>
<style scoped>
    #youlike{
        margin-top: 30px;
        width: 50%;
        height: 231px   ;
        float: left;
    }
    #youlike .like{
        width: 80%;
        height: 100%;
        position: relative;
        margin: 0 auto;
    }
    #youlike .like .likeimg{
        width: 80%;
        margin: 0 auto;
    }
    #youlike .like .likeimg img{
        width: 100%;
    }
    #youlike .like .description{
        width: 80%;
        margin: 0 auto;
        font-size: 14px;
        margin-bottom: 15px;
    }
    #youlike .like .price{
        position: absolute;
        margin: 0px 15px;
        font-size: 12px;
        color: orangered;
        left: 0px;
        bottom: 15px;
    }
    #youlike .like .no_price{
        font-size: 12px;
        text-decoration: line-through;
        color:  rgb(197, 186, 186);
        position: absolute;
        left: 54px;
        bottom: 15px;
        
    }
    #youlike .like .shop{
        color: #ffffff;
        font-size: 20px;
        width: 27px;
        height: 27px;
        background-color: green;
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
        position: absolute;
        bottom: 12px;
        right: 20px;

    }

</style>