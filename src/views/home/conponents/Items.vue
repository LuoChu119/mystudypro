<template>
    <div class="wrapper">
        <div class="wrapperItem" v-for="(slect) in items_list" :key="slect.id">
            <div class="img">
                <img :src="slect.small_image" :alt="slect.product_name">
            </div>
            <div class="description">
                <span class="des_text">{{slect.name}}</span>
            </div>
            <div class="no_price">
                <span>￥{{slect.origin_price}}</span>
            </div>
            <div class="line"></div>
            <div class="price">
                ￥{{slect.price}}
            </div>
            <div class="shop"><van-icon name="cart-o" /></div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Items',
    props:{
        items_list: Array
    }
}
</script>
<style scoped lang='less'>
    .wrapper{
        width: 100%;
        margin-top: 40px;
        z-index: 999;
        white-space: nowrap;
        overflow: scroll;
        padding: 0 5px;
    }
    .wrapper .wrapperItem{
        width: 110px;
        height: 195px;
        font-size: 12px;
        display: inline-block;
        margin-right: 15px;
        position: relative;

        
        
    }
    .wrapper .wrapperItem .img{
        width: 110px;
        height: 100px;
    }
    .wrapper .wrapperItem .img img{
        width: 100%;
        height: 100%;
    }
    .wrapper .wrapperItem .description {
        
        text-align: left;
        margin-top: 3px;
        .des_text{
            display: block;
            white-space: pre-wrap;
            height: 30px;
        }
    }
    .wrapper .wrapperItem .no_price{
        padding-left: 5px;
        top: 123px;
        margin-top: 12px;
        text-decoration: line-through;
        color: rgb(197, 186, 186);
    }
    .wrapper .wrapperItem .price{
        padding-left: 5px;
        margin-top: 7px;
        color: orangered;
        position: absolute;
        top: 162px;
    }
    .wrapper .wrapperItem .line{
        width: 45px;
        left: 12px;
    }
    .wrapper .wrapperItem .shop{
        color: #ffffff;
        font-size: 20px;
        width: 27px;
        height: 27px;
        background-color: green;
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
        position: absolute;
        top: 164px;
        right: 5px;
    }
</style>