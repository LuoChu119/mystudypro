<template>
    <div id="mark">
        <div class="marktop">
            <van-icon name="back-top" />
        </div>
    </div>
</template> 
<script>
export default {
    name:'MarkTop',
    props:{
       
    }
}
</script>
<style scoped>
    #mark{
        position: fixed;
        bottom: 150px;
        right: 10px;
    }
    #mark .marktop{
        width: 35px;
        height: 35px;
        background-color: #ffffff;
        text-align: center;
        line-height: 40px;
        border-radius: 50%;
    }

</style>