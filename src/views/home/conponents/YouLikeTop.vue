<template>
    <div id="top">
        <div class="geuss">
            <div class="middle"></div>
            <div class="text">猜你喜欢</div>
            <YouLike v-for="(product) in guesslike_list" 
            :product="product"
            :key="product.id"/>
        </div>
    </div>
</template>
<script>
import YouLike from './YouLike.vue'
export default {
    name:"YouLikeTop",
    props:{
        guesslike_list: Array
    },
    components:{
        YouLike
    }
}
</script>
<style scoped>
    #top{
        margin-top: 1rem;
        position: relative;
    }
    #top .geuss .middle{
        padding-top: 1.09375rem;
        border-bottom: 1px solid #d8d8d8;
    }
    #top .geuss .text{
        position: absolute;
        text-align: center;
        display: inline-block;
        background-color: #ffffff;
        padding: 0 0.85rem;
        top: 33%;
        left: 36%;
    }
</style>