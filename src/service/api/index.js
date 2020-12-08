import ajax from './ajax'
// import {devServer} from './../../../tests/vue.config.js'
//http://demo.itlike.com/web/xlmc/api/homeApi
//http://demo.itlike.com/web/xlmc/api/homeApi/api/homeApi/categories
//http://demo.itlike.com/web/xlmc/api/homeApi/api/homeApi/categoriesdetail/lk001
//定义基础路径
const BASE_URL = 'http://demo.itlike.com/web/xlmc';


export const getHomeData = () => ajax(BASE_URL + '/api/homeApi');
export const getCategories = () => ajax(BASE_URL + '/api/homeApi/categories');
export const getCategoriesDetail = (preparams) => ajax(BASE_URL + '/api/homeApi/categoriesdetail/lk' + preparams);

//用户中心接口
//获取短信验证码（GET）
export const getPhoneCode = (phone) => ajax(BASE_URL + '/api/send_code', {phone})
//手机验证码登录（POST）
export const phoneCodeLogin = (phone, code) => ajax(BASE_URL + '/api/login_code', {phone, code}, 'POST')
//用户名和密码登录
export const pwdLogin = (user_name, user_pwd, captcha) => ajax(BASE_URL + '/api/login_pwd', {user_name, user_pwd, captcha}, 'POST')
//自动登录
export const getUserInfo = () => ajax(BASE_URL + '/api/userinfo')
//退出登录
export const getLogOut = () => ajax(BASE_URL + '/api/logout')
//购物车接口（同步到服务器）
export const addGoodsToCart = (user_id, goods_id, goods_name, goods_price, small_image) => ajax(BASE_URL + '/api/cart/add', 
{user_id, goods_id, goods_name, goods_price, small_image}, 'POST')
//获取当前用户购物车中的商品数据请求接口
export const getGoodsCart = (user_id) => ajax(BASE_URL + '/api/cart/search/' + user_id)
//修改购物车商品数量的数据请求接口
export const changeCartNum = (user_id, goods_id, type) => ajax(BASE_URL + '/api/cart/num', {user_id, goods_id, type}, 'POST')
//删除当前用户购物车中所有的商品
export const claerAllCart = (user_id) => ajax(BASE_URL + '/api/cart/clear/' + user_id)

//4.地址接口
//4.1获取当前用户地址
export const getUserAddress = (user_id) => ajax(BASE_URL + '/api/address/search/' + user_id)
//4.2添加新的地址
export const addUserAddress = (user_id, address_name, address_phone, address_area, address_area_detail,
    address_post_code, address_tag, province, city, county, areaCode) => ajax(BASE_URL + '/api/address/add', {user_id, address_name, 
    address_phone, address_area, address_area_detail,address_post_code, address_tag, province, city, county, areaCode}, 'POST')
//4.3编辑用户地址
export const changeUserAddress = (address_id, user_id, address_name, address_phone, address_area, address_area_detail,
    address_post_code, address_tag, province, city, county, areaCode) => ajax(BASE_URL + '/api/address/edit', {address_id, user_id, address_name, 
    address_phone, address_area, address_area_detail,address_post_code, address_tag, province, city, county, areaCode}, 'POST')
//4.4删除用户地址
export const delUserAddress = (address_id) => ajax(BASE_URL + '/api/address/del/' + address_id)
//4.5获取单条地址
export const getCurrentUserAddress = (user_id, address_id) => ajax(BASE_URL + '/api/address/one', {user_id, address_id}, 'POST')


//5.1单个商品的选中和取消选中接口
export const singleGoodsSelect = (user_id, goods_id) => ajax(BASE_URL + '/api/cart/singer_select', {user_id, goods_id}, 'POST')
//5.2所有商品全选和非全选接口
export const allGoodsSelect = (user_id, flag) => ajax(BASE_URL + '/api/cart/all_select', {user_id, flag}, 'POST')
//5.3查询所有已经被选中的商品
export const getAllSelectGoods = (user_id) => ajax(BASE_URL + '/api/cart/selected/' + user_id)
//5.4删除已经生成订单的商品
export const delAllSelectGoods = (user_id) => ajax(BASE_URL + '/api/cart/del_checked/' + user_id)



//6.订单接口
//6.1提交订单
export const postOrder = (user_id, address_id, arrive_time, cart_shop, notice, shop_price, dis_price) => ajax(BASE_URL + 
    '/api/order/post', {user_id, address_id, arrive_time, cart_shop, notice, shop_price, dis_price}, 'POST')

//6.2订单支付成功
export const OrderPaySuccess = (user_id, order_id) => ajax(BASE_URL + '/api/order/change_status', {user_id, order_id}, 'POST')

//6.3查询订单
export const getOrder = (user_id, status) => ajax(BASE_URL + '/api/order/get', {user_id, status}, 'POST')

//7.微信支付接口部署
// const PAY_URL = 'http://47.98.157.152/WXPayProject/pay'
const PAY_URL = '/pay'
//7.1获取支付的URL
export const getWXCode = (outTradeNo, totalFee) => ajax(PAY_URL + '/createNative.do', {outTradeNo, totalFee})
export const queryPayStatus = (out_Trade_no) => ajax(PAY_URL + '/queryPayStatus.do', {out_Trade_no})

