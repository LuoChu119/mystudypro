import {ADD_GOODS, INIT_SHOP_CART, REDCE_CART} from './mutations-type.js'
import {setStore, getStore} from './../config/global'
export default {
    
    //1.往购物车里添加数据
    [ADD_GOODS](state, {goodsId, goodsName, smallImage, goodsPrice}){
        let shopCart = state.shopCart
        //1.1判断商品是否存在
        if(shopCart[goodsId]){//存在
            //商品数量+1
            shopCart[goodsId]['num']++
        }else{//不存在
            //创建一个商品对象
            shopCart[goodsId] = {
                "num": 1,
                "id": goodsId,
                "name": goodsName,
                "small_image": smallImage,
                "price": goodsPrice,
                "checked": true
            }
        }
        //1.2产生新对象壳子
        state.shopCart = {...shopCart}
        //1.3将获取到的购物车信息存入到本地
        setStore('shopCart', state.shopCart)
    },
    //2.页面初始化，获取购物车的数据，（本地）
    [INIT_SHOP_CART](state){
        let initCart = getStore('shopCart');
        if(initCart){
            state.shopCart = JSON.parse(initCart)
        }
    },
    //商品移除购物车
    [REDCE_CART](state, {goodsId}){
        let shopCart = state.shopCart
        let goods = shopCart[goodsId]
        if(goods){
            if(goods['num'] > 0){
                goods['num']--
                //判断是否只有0个
                if(goods['num'] === 0){
                    delete shopCart[goodsId]
                }
            }else{
                goods = null
            }
            //同步数据
            state.shopCart = {...shopCart}
            //存入本地
            setStore('shopCart', state.shopCart)

        }
    }

}
