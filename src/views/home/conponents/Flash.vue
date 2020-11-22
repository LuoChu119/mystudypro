<template>
    <div class="wrapper">
        <div class="titleWrapper">
            <div class="shu"></div>
            <div class="title">限时抢购</div>
            <div class="actionStateText">07:00场</div>
            <div class="actionStateTextEnd">已结束</div>
            <div class="more">更多</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Flash'
}
</script>
<style scoped>
    .wrapper{
        width: 100%;
        height: 26px;
        margin-top: 30px;
        position: relative;
    }
    .wrapper .shu{
        width: 5px;
        height: 26px;
        background-color: green;
        float: left;
    }
    .titleWrapper{
        font-size: 20px;
    }
    .titleWrapper .title{
        font-weight:300;
        padding: 0 10px;
        float: left;
    }
    .titleWrapper .actionStateText{
        float: left;
        height: 26px;
        line-height: 26px;
        font-size: 14px;
        padding-right: 10px;
    }
    .titleWrapper .actionStateTextEnd{
        height: 26px;
        line-height: 26px;
        font-size: 14px;
        padding: 0px 5px;
        border: 1px solid rgb(184, 176, 176);
        border-radius: 8px;
        float: left;
    }
    .titleWrapper .more{
        position: absolute;
        top:0px;
        right: 0px;
        height: 26px;
        line-height: 26px;
        font-size: 14px;
        padding: 0px 5px;
        color: green;
        margin-right: 10px;
    }
</style>