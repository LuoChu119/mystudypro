<template>
    <div id="header">
        <div class="header-left">
            <van-icon class="location" name="location" color="#bfbfbf" />
            <span class="address">成都市</span>
            <div class="img">
                <img class="down" src="./../image/down.png" alt="">
            </div>
        </div>
        <div class="header-right">
            <van-icon class="search" name="search" />
            <input class="head_search" type="text" placeholder="请输入你想要的...">
        </div>

    </div>
</template>
<script>
export default {
    name:'Header'
}
</script>
<style scoped>
    #header{
        width: 100%;
        height: 40px;
        line-height: 40px;
        overflow: auto;
    }
    .header-left{
        padding-left: 0.5rem;
        height: 100%;
        float: left;
        font-size: 14px;
        overflow: auto;
    }
    .location{
        font-size: 16px;
    }
    .address{
        display: inline-block;
        padding: 0px 9px;
        line-height: 40px;
        vertical-align: 3px;
    }
    .img{
        width: 0.96rem;
        float: right;
        margin-left: 2rem;
    }
    .down{
        width: 100%;
        margin-top: 12px;
        line-height: 40px;
        vertical-align: 2px;

    }
    .header-right{
        float: right;
        font-size: 14px;
        line-height: 40px;
    }
    .search{
        margin-right: 3px;
        font-size: 16px;
        vertical-align: -3px;
    }
    .head_search{
        height: 16px;
        line-height: 16px;
        margin-right: 10px;
        margin-left: 0.3rem;
    }
</style>
