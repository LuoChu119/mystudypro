import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

//引入一级组件
import Dashboard from './../views/dashboard/Dashboard'
//二级路由懒加载
const Home = () => import('./../views/home/Home');
const Category = () => import('./../views/category/Category');
const Cart = () => import('./../views/cart/Cart');
const Mine = () => import('./../views/mine/Mine');
export default new Router({
  routes: [
    //路由重定向
    {path:'/', redirect:'/dashboard'},
    {
      path:'/dashboard',
      name:'dashboard',
      component: Dashboard,
      //配置二级路由
      children: [
        //路由重定义
        {path:'/dashboard',redirect:'/dashboard/home'},
        {path:'home', name:'home', component: Home},
        {path:'category', name:'category', component: Category},
        {path:'cart', name:'cart', component: Cart},
        {path:'mine', name:'mine', component: Mine},

      ]

  }
  ]
})