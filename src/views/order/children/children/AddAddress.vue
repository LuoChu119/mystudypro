<template>
    <div id="addAddress">
        <van-nav-bar title="添加地址" left-arrow :fixed= true :border= true @click-left="onClickLeft"/>
        <van-address-edit
        :area-list="areaList"
        show-postal
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @change-detail="onChangeDetail"
        style="margin-top: 3rem"
        />

    </div>
</template>
<script>
import { Toast } from 'vant';
//引入地址js文件
import areaList from './../../address/addressList.js'
import {addUserAddress} from './../../../../service/api/index'
//引入发布订阅消息组件
import PubSub from 'pubsub-js'
import {mapState} from 'vuex'
export default {
    name:'AddAddress',
    data() {
        return {
            areaList: areaList,
            searchResult: [],
        };
    },
    computed:{
        ...mapState(['userInfo'])
    },
    methods:{
        onClickLeft(){
            this.$router.back()
        },
        async onSave(content){
            console.log(content);
            if(this.userInfo.token){
                let result = await addUserAddress(this.userInfo.token, content.name, content.tel, content.province + content.city + content.county, 
                content.addressDetail, content.postalCode, content.isDefault, content.province, content.city, content.county, content.areaCode)
                console.log(result);
                if(result.success_code === 200){
                    Toast({
                        message: '添加地址成功~',
                        duration: 400
                    })
                    //返回上一层
                    this.$router.back()
                    //发布消息
                    PubSub.publish('addAddressSuccess')
                }else{
                    Toast({
                        message: '添加地址失败~',
                        duration: 400
                    })
                }
            }
        },
        onChangeDetail(val) {
            if (val) {
                this.searchResult = [
                    {
                        name: '黄龙万科中心',
                        address: '杭州市西湖区',
                    },
                ];
            } else {
                    this.searchResult = [];
                }
            },
    }
}
</script>
<style lang="less" scoped>
    #addAddress{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f5f5f5;
        z-index: 9999;
    }
</style>