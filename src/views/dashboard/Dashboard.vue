<template>
    <div id="dashboard">
        <van-tabbar v-model="active" active-color="#ff6700">
            <van-tabbar-item replace to="/dashboard/home">  
                <span>首页</span>
                <template #icon="props">
                    <img :src="props.active ? icon.active : icon.inactive" />
                </template>
            </van-tabbar-item>
             <van-tabbar-item replace to="/dashboard/category">
                <span>分类</span>
                <template #icon="props">
                    <img :src="props.active ? icon.active : icon.inactive" />
                </template>
            </van-tabbar-item>
             <van-tabbar-item replace to="/dashboard/cart" :badge="goodsNum > 0 ? goodsNum : ''">
                <span>购物车</span>
                <template #icon="props">
                    <img :src="props.active ? icon2.active : icon2.inactive" />
                </template>
            </van-tabbar-item>
             <van-tabbar-item replace to="/dashboard/mine">
                <span>我的</span>
                <template #icon="props">
                    <img :src="props.active ? icon1.active : icon1.inactive" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import { getGoodsCart } from '../../service/api';
import {setStore} from './../../config/global'
export default {
    name:'Dashboard',
    data() {
    return {
      active: Number(sessionStorage.getItem('tabBarActiveIndex')) | 0,
      icon: {
        active: 'https://img.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
      },
      icon1: {
          active: 'https://i8.mifile.cn/b2c-mimall-media/41f858550f42eb1770b97faf219ae215.png',
          inactive: 'https://i8.mifile.cn/b2c-mimall-media/55cad219421bee03a801775e7309b920.png'
      },
      icon2: {
          active: 'https://i8.mifile.cn/b2c-mimall-media/692a6c3b0a93a24f74a29c0f9d68ec71.png',
          inactive: 'https://i8.mifile.cn/b2c-mimall-media/d7db56d1d850113f016c95e289e36efa.png'
      }
      
    };
    },
    //监视器见识active的值的变动
    watch:{
        active(value){
            console.log(value);
            let tabBarActiveIndex = value > 1 ? value : 0;
            //缓存到本地
            sessionStorage.setItem('tabBarActiveIndex', value   )
        }
    },
    //从vuex中拿到的所有的数据，状态都应该放到computed里面
    computed:{
        ...mapState(['shopCart', ['userInfo']]),
        goodsNum(){
            if(this.shopCart){
                //总的购物车商品数量
                let num = 0
                //取出对象中的所有的值
                Object.values(this.shopCart).forEach((goods) => {
                    num += goods.num
                })
                return num
            }else{
                return 0
            }
        }
    },
    mounted(){
        //自动登录
        this.reqUserInfo()
        //到这个钩子里面代表页面初始化完毕
        //1.获取购物车里面的数据
        this.initShopCart();
    },
    methods:{
        ...mapMutations(['INIT_SHOP_CART']),
        ...mapActions(['reqUserInfo']),
        async initShopCart(){
            if(this.userInfo.token){//已经登录
                //获取当前购物车的商品（服务器端）
                let result = await getGoodsCart(this.userInfo.token)
                console.log(result);
                if(result.success_code === 200){
                    let cartArr = result.data
                    let shopCart ={}
                    //遍历
                    cartArr.forEach((value) => {
                        shopCart[value.goods_id] = {
                            "num": value.num,
                            "id": value.goods_id,
                            "name": value.goods_name,
                            "small_image": value.small_image,
                            "price": value.goods_price,
                            "checked": true
                        }
                    })
                    //本地数据同步
                    setStore('shopCart', shopCart)
                    this.INIT_SHOP_CART()
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
#dashboard{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}
</style>