<template>
    <div id="mark">
        <div class="marktop" @click="toTop">
            <van-icon name="back-top" />
        </div>
    </div>
</template> 
<script>
export default {
    name:'MarkTop',
    mounted(){
        window.addEventListener("scroll", this.handleScroll, true);
    },
    methods: {
        toTop() {
            let top = document.documentElement.scrollTop || document.body.scrollTop;
            // 实现滚动效果 
            const timeTop = setInterval(() => {
            document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
            if (top <= 0) {
                    clearInterval(timeTop);
                }
            }, 10);
        }
  
    },
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