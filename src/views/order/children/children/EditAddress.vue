<template>
    <div id="editAddress">
        <van-nav-bar title="编辑地址" left-arrow :fixed= true :border= true @click-left="onClickLeft"/>
        <van-address-edit
        :area-list="areaList"
        :address-info="addressInfo"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        style="margin-top: 3rem"
        />

    </div>
</template>
<script>
//引入地址js文件
import areaList from './../../address/addressList.js'
import {mapState} from 'vuex'
import {changeUserAddress, getCurrentUserAddress, delUserAddress} from './../../../../service/api/index'
import { Toast } from 'vant';
export default {
    name: 'EditAddress',
    data() {
        return {
            areaList: areaList,
            searchResult: [],
            addressInfo: {}
        }
    },
    computed:{
        ...mapState(['userInfo'])
    },
    mounted(){
        console.log(this.$route);
        if(this.$route.query.address_id){
            if(this.userInfo.token){
                this.getCurrentAddress(this.userInfo.token, this.$route.query.address_id)
            }
        }
    },
    methods:{
        onClickLeft(){
            this.$router.back()
        },
        async onSave(content){
            console.log(1111);
            console.log(content);
            if(this.userInfo.token){
                //发起修改请求
                let result = await changeUserAddress(this.addressInfo.id, this.userInfo.token, content.name, content.tel, content.province + content.city + content.county, 
                content.addressDetail, content.postalCode, content.isDefault, content.province, content.city, content.county, content.areaCode)
                console.log(result);
                if(result.success_code === 200){
                    Toast({
                        message: '编辑地址成功~',
                        duration: 400
                    })
                    //返回上一层
                    this.$router.back()
                    //发布消息
                    PubSub.publish('backToMyaddress')
                }else{
                    Toast({
                        message: '编辑地址失败~',
                        duration: 400
                    })
                }
            }

        },
        async onDelete(){
            console.log('是不是');
            if(this.userInfo.token){
                let result = await delUserAddress(this.addressInfo.id)
                console.log(99999999);
                console.log(result);
                if(result.success_code === 200){
                    Toast({
                        message: '删除地址成功~',
                        duration: 400
                    })
                    //返回上一层
                    this.$router.back()
                    //发布消息
                    PubSub.publish('backToMyaddress')
                }else{
                    Toast({
                        message: '删除地址失败~',
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
        async getCurrentAddress(user_id, address_id){
            let result = await getCurrentUserAddress(user_id, address_id)
            console.log(result);
            if(result.success_code === 200){
                this.addressInfo = {
                    id: result.data._id,
                    name: result.data.address_name,
                    tel: result.data.address_phone,
                    province: result.data.province,
                    city: result.data.city,
                    county: result.data.county,
                    addressDetail: result.data.address_area_detail,
                    areaCode: result.data.areaCode,
                    postalCode: result.data.address_post_code,
                    isDefault: result.data.address_tag,
                }
            }
        }
    }
}
</script>
<style scoped> 
    #editAddress{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f5f5f5;
        z-index: 9999;
    }

</style>