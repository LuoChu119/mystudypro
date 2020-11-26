<template>
    <div id="top">
        <div class="geuss">
            <span></span>
            <div>猜你喜欢</div>
            <span></span>
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

</style>