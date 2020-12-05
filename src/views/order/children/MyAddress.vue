<template>
    <div id="myAddress">
        <!-- 导航栏 -->
        <van-nav-bar title="我的地址" left-arrow :fixed= true :border= true @click-left="onClickLeft"/>
        <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="selectAddressDel"
        style="margin-top: 3rem"
        />
        <transition name="router-slider" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>
<script>
import { Toast } from 'vant';
import {getUserAddress} from './../../../service/api/index'
//引入发布订阅消息组件
import PubSub from 'pubsub-js'
import {mapState} from 'vuex'
export default {
    name: 'MyAddress',
    data() {
        return {
            chosenAddressId: '1',
            list: [
            ],
            index: null
        };
    },
    computed: {
        ...mapState(['userInfo'])
    },
    mounted(){
        this.initUserAddress()
        //订阅成功添加地址的消息
        PubSub.subscribe('addAddressSuccess', (msg) => {
            if('addAddressSuccess' === msg){
                this.initUserAddress()
            }
        })
        //订阅改变地址的信息
         PubSub.subscribe('addAddresschange', (msg) => {
            if('addAddresschange' === msg){
                this.initUserAddress()
            }
        })
        //订阅删除地址的信息
        PubSub.subscribe('addAddressdel', (msg) => {
            if('addAddressdel' === msg){
                this.selectAddressDel(this.index)
            }
        })

    },
    methods:{
        onClickLeft(){
            this.$router.back()
        },
        onAdd() {
            Toast('新增地址');
            this.$router.push(
                {
                    path: '/comfirmOrder/MyAddress/AddAddress'
                }
            )
        },
        onEdit(item, index) {
            // Toast('编辑地址:' + index);
            this.index = index
            // console.log(item);
            this.$router.push(
                {
                    path: '/comfirmOrder/MyAddress/EditAddress?address_id=' + item.address_id
                }
            )
        },
        //获取当前的用户地址用于删除
        async selectAddressDel(index){
            this.list.splice(index,1)
            
        },
        //获取当前用户的地址
        async initUserAddress(){
            if(this.userInfo.token){//处于登录状态
                let result = await getUserAddress(this.userInfo.token)
                console.log('aaaaaaaa');
                console.log(result);
                if(result.success_code ===200){
                    let addressArr = result.data
                    this.list = []
                    //遍历地址数组
                    addressArr.forEach((address, index) => {
                        let addressObj = {
                            id: String(index + 1),
                            name: address.address_name,
                            tel: address.address_phone,
                            address: address.address_area + address.address_area_detail,
                            address_id: address._id,
                            user_id: address.user_id
                        }
                        //追加到list列表
                        this.list.push(addressObj)
                    })
                }
            }else{
                Toast({
                    message: `获取地址失败`,
                    duration: 500
                })
            }
        }
    },  
    beforeDestroy(){
        // 取消订阅
        PubSub.unsubscribe('addAddressSuccess')
    }
}
</script>

<style scoped>
    #myAddress{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f5f5f5;
        z-index: 200;
    }
    /* 路由转场动画 */
    .router-slider-enter-active, .router-slider-leave-active{
        transition: all 0.5s;
    }
    .router-slider-enter, .router-slider-leave-active{
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>