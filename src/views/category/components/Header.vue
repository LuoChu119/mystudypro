<template>
    <div id="header">
        <div class="header-right">
            <van-icon class="search" name="search" />
            <input class="head_search" type="text" placeholder="请输入你想要的...">
        </div>
    </div>
</template>
<script>
export default {
    name:"Header"
}
</script>
<style scoped>
    #header{
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: rgb(204, 192, 192);
    }
    .header-right{
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
        background-color: rgb(204, 192, 192);
    }

</style>