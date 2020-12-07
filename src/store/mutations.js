import {ADD_GOODS, INIT_SHOP_CART, REDCE_CART,
    SELECTED_All_GOODS,
     SELECTED_SIGLE_GOODS, USER_INFO, INIT_USER_INFO
     ,RESET_USER_INFO, CLEAR_CART
    } from './mutations-type.js'
import {setStore, getStore, removeStore} from './../config/global'
import Vue from 'vue'
import { Object } from 'core-js'
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
    //3.商品移除购物车
    [REDCE_CART](state, goodsId){
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
    },
    //4.单个商品选中或者取消选中
    [SELECTED_SIGLE_GOODS](state, goodsId){
        let shopCart = state.shopCart
        let goods = shopCart[goodsId]
        if(goods){
            if(goods.checked){
                goods.checked = !goods.checked
            }else{
                Vue.set(goods, 'checked', true)
            }
        }
        //同步数据
        state.shopCart = {...shopCart}
        //存入本地
        setStore('shopCart', state.shopCart)
        
    },
    // 全选和非全选
    [SELECTED_All_GOODS](state, {isSelected}) {
        let shopCart = state.shopCart
        Object.values(shopCart).forEach((goods, index) => {
            if(goods.checked){
                goods.checked = !isSelected
            }else{
                Vue.set(goods, 'checked', !isSelected)
            }
        })
        
        state.shopCart = {...shopCart}
            //存入本地
        setStore('shopCart', state.shopCart)
    },
    //5.保存用户信息到本地
    [USER_INFO](state, {userInfo}){
        state.userInfo = userInfo;
        setStore('userInfo', state.userInfo)
    },
    //清空购物车
    [CLEAR_CART](state){
        state.shopCart = null
        state.shopCart = {...state.shopCart}
        setStore('shopCart', state.shopCart)
    },
    //获取用户信息，拿到本地用户信息
    [INIT_USER_INFO](state){
        //拿本地用户信息
        let userInfo = getStore('userInfo')
        //判断
        if(userInfo){
            state.userInfo = JSON.parse(userInfo)
        }
    },
    //退出登录
    [RESET_USER_INFO](state){
        state.userInfo = {}
        removeStore('userInfo')
    }

}
