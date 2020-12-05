import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

//引入一级组件
import Dashboard from './../views/dashboard/Dashboard'
//二级路由懒加载
const Home = () => import('./../views/home/Home');
const Category = () => import('./../views/category/Category');
const Cart = () => import('./../views/cart/Cart');
//用户中心
const Mine = () => import('./../views/mine/Mine');
const UserCenter = () => import('./../views/mine/children/UserCenter');
//三级路由
const Order = () => import('./../views/order/Order')
const MyAddress = () => import('./../views/order/children/MyAddress')
const AddAddress = () => import('./../views/order/children/children/AddAddress')
const EditAddress = () => import('./../views/order/children/children/EditAddress')
//登录路由
const Login = () => import('./../views/login/Login')

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
        {path:'home', name:'home', component: Home, meta: {keepAlive: true}},
        {path:'category', name:'category', component: Category, meta: {keepAlive: true}},
        {path:'cart', name:'cart', component: Cart},
        {
          path:'mine', 
          name:'mine', 
          component: Mine,
          children: [
            {path: 'usercenter', component: UserCenter}//用户中心
          ]
        },

      ]
    },
    {
      path: '/comfirmOrder',
      name: 'order',
      component: Order,
      children: [
        {
          path: 'myAddress', 
          name: 'myAddress', 
          component: MyAddress,
          children: [
            {path: 'addAddress', name: 'addAddress', component: AddAddress},
            {path: 'editAddress', name: 'editAddress', component: EditAddress}
          ]
        }
      ]
    },
    {path: '/login', name: 'login', component: Login}
  ]
})