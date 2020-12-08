<template>
    <div id="myOrderItem">
        <div class="itemTop">
            <van-cell :title="order.arrive_time" :value="`${order.order_status === 'pay' ? '已支付' : '待支付'}`"/>
        </div>
        <div class="itemCenter">
            <div class="centerLeft">
                <img v-for="(cartGoods) in order.cart_shop.slice(0, 5)" :key="cartGoods.id" :src="cartGoods.small_image" alt="" width="30">
            </div>
            <div class="centerRight">{{order.cart_shop.length > 5 ? '...' : ''}}</div>
        </div>
        <div class="itemBottom">
            <van-cell title="" :value="`共${order.cart_shop.length}份商品 实付￥${order.shop_price + order.dis_price}`"/>
        </div>
    </div>
</template>
<script>
export default {
    name: 'OrderInfo',
    props: {
        order: Object
    }
}
</script>
<style scoped>
    #myOrderItem{
        width: 100%;
        height: 8.5rem;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        font-size: 0.7rem;
        margin: 0.5rem 0;
        z-index: 200;
        overflow: auto;
    }
    #myOrderItem .itemTop{
        flex: 1;
    }
    #myOrderItem .itemCenter{
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #e0e0e0;
        flex: 2;
    }
    #myOrderItem .itemCenter .centerLeft{
        flex: 9;
    }
    #myOrderItem .itemCenter .centerRight{
        flex: 1;
    }
    #myOrderItem .itemCenter .centerLeft img{
        width: 2.8rem;
        margin: 0.5rem 0.3rem;
    }
    #myOrderItem .itemBottom{
        flex: 1;
    }

</style>