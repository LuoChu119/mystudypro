<template>
    <div class="wrapper">
        <div class="itemWrapper" v-for="(nav) in nav_list" :key="nav.cid">
            <div class="imageWrapper">
                <img class="image" :src="nav.icon_url" alt="nav.name">
            </div>
            <div class="titleWrapper">
                <span class="title">{{nav.name}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Nav',
    props:{
        nav_list: Array
    }
}
</script>
<style scoped>
    .wrapper{
        width: 100%;
        display: flex;
        justify-content:space-around;
        flex-wrap:wrap
    }
    .itemWrapper{
        width: 70px;
        height: 80px;
        font-size: 13px;
        text-align: center;
        margin-top: 10px;
        float: left;

    }
    .itemWrapper .imageWrapper{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
    }
    .itemWrapper .imageWrapper .image{
        width: 100%;
        height: 100%;
        display: inline-block;
        
    }
    .titleWrapper{
        margin-top: 2px;
    }
</style>