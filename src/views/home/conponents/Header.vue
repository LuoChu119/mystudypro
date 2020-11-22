<template>
    <div id="header">
        <div class="header-left">
            <van-icon class="location" name="location-o"/>
            <span class="address">四川成都撩课大厦</span>
            <van-icon class="down" class-prefix="icon" name="xia1" />
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
        background-color: rgb(204, 192, 192);
    }
    .header-left{
        float: left;
        font-size: 14px;
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
    .down{
        font-size: 16px;
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
        height: 20px;
        margin-right: 10px;
        background-color: rgb(204, 192, 192);
    }
</style>
