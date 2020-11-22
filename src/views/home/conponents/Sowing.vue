<template>
        <!-- <swiper id="swiper" ref="mySwiper" :options="swiperOptions">
            <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
            <swiper-slide v-for="itm in sowing_lis" :key="itm.cid">
                <img :src="itm.icon_url" :alt="itm.public_name">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>    -->
        <div  id="swiper" class="swiper-container">
          <div class="swiper-wrapper">
              <div class="swiper-slide">Slide 1</div>
              <div class="swiper-slide">Slide 2</div>
              <div class="swiper-slide">Slide 3</div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
          <div class="swiper-scrollbar"></div>
      </div>
</template>
<script>
//局部引入vue-awesome-swiper轮播图样式
// import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.css'
// import 'swiper/css/swiper.css'
import Swiper from 'swiper'; 
// console.log(Swiper)
export default {
    name:'Sowing',
    props: {
        sowing_lis: Array
    },
    beforeCreated(){
        console.log(this.sowing_list);
    },
    data() {
    },
    // computed: {
    //   swiper() {
    //     return this.$refs.mySwiper.$swiper
    //   }
    // },
    mounted() {
      var mySwiper = new Swiper ('.swiper-container', {
        loop: true, // 循环模式选项
        
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
        
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        
        // 如果需要滚动条
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      })        
    },
    // components: {
    //     Swiper,
    //     SwiperSlide
    // },
//     directives: {
//     swiper: directive
//    }
}
</script>
<style scoped>
    #swiper{
        vertical-align: top;
        width: 100%;
        height: 180px;
        background-color: purple;
    }
    #swiper img{
        width: 100%;
        height: 100%;
    }

</style>