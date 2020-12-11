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
        line-height: 2.3rem;
        border-bottom: 1px solid #e6e6e6;
    }
    .header-right{
        margin-left: 0.7rem;
        font-size: 0.85rem;
        line-height: 2.3rem;
    }
    .search{
        margin-right: 3px;
        font-size: 1rem;
        vertical-align: -0.25rem;
    }
    .head_search{
        margin-left: 0.5rem;
        height: 16px;
        line-height: 16px;
        margin-right: 10px;
    }

</style>