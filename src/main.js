import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './assets/font_2213983_2wocirerw7j/iconfont.css'
//引入轮播图样式

//4.引入字体图标
// import './assets/font_2213983_g8de1zlvtsi'

//1.引入fastclick 
import Fastclick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

Vue.use(VueAwesomeSwiper)
//Fastclick是一个简单易用的库，它消除了移动端浏览器上的物理点击和触发一个click事件之间
//的300ms延迟
//实现原理是：在检测到toucend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把
//浏览器在300ms之后真正的click事件阻止掉
//出现延迟的原因是：移动端浏览器会从你点击按钮之后，等待大约300ms才会触发点击事件，原因是浏览器
//会等待看你的行为是否会双击
//使用方法如下
if('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function(){
    Fastclick.attach(document.body);
  }, false)
}
//2.引入全局样式
import './../src/style/conmon.less'
//3.引入全局组件库
import './plugins/vant'
// 引入rem
import './config/rem'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
