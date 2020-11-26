<template>
    <div class="content">
        <div class="contentscroll" v-for="(categoriesDetail) in categoriesDetailData" :key="categoriesDetail.id">
            <div class="categoryTitle">{{categoriesDetail.name}}</div>
            <ProductItem :products= "categoriesDetail.products "/>
        </div>
    </div>
</template>
<script>
import ProductItem from './ProductItem'

export default {
    name:'ContentView',
    props:{
        categoriesDetailData: Array
    },

    components:{
        ProductItem
    },
    created(){
    },
    methods:{
    }
}
</script>
<style scoped>
    .content{
        width: 282px;
        height: 565px;
        position: absolute;
        top: 48px;
        right: 0px;
        font-size: 0.9rem;
        overflow: hidden;
        white-space: nowrap;
        overflow-y: scroll;
    }
</style>