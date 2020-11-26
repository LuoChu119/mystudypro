<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(images) in sowing_lis" :key="images.public_id">
                <img :src="images.icon_url" :alt="images.public_name">
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script>
//局部引入vue-awesome-swiper轮播图样式
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
// import 'swiper/css/swiper.css'

export default {
    name:'Sowing',
    props: {
        sowing_lis: Array
    },
    beforeCreated(){
        console.log(this.sowing_list);
    },
    data() {
      return {
        loop: true,
        autoplay: {
            delay:1000
        },
        swiperOptions: {
        pagination: {
            el: '.swiper-pagination'
          },
          // Some Swiper option/callback...
        }
      }
    },
    components: {
    Swiper,
    SwiperSlide
  },
}
</script>
<style scoped>
    .my-swipe{
        width: 100%;
    }
    .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
    width: 20px;
    height: 180px;
    }
    .my-swipe .van-swipe-item img{
        width: 100%;
        height: 100%;
    }

</style>