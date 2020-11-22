<template>
    <div id="home">
       <div v-if="!showloading">
            <Header/>
            <Sowing :sowing_lis= "sowing_list"/>
            <Nav :nav_list= 'nav_list'/>
            <Flash/>
            <Items :items_list= 'items_list'/>
       </div>
       <van-loading v-else type="spinner" color="#1989fa"
       style="position: absolute; left: 50%; top: 40%; transform: translate(-50%)"
       >小撩正在加载中...</van-loading>
    </div>
</template>
<script>
//引人请求的数据
import {getHomeData} from './../../service/api/index'
//引入Header组件
import Header from './conponents/Header.vue'
import Sowing from './conponents/Sowing.vue'
import Nav from './conponents/Nav.vue'
import Flash from './conponents/Flash.vue'
import Items from './conponents/Items.vue'
export default {
    name:'Home',
    data(){
        return{
            //首页的轮播图数据
            sowing_list: [],
            showloading: true,
            //导航数据
            nav_list:[],
            //清单数据
            items_list:[]
        }
    },
    created(){
        //请求网络数据
        getHomeData().then((response) => {
            console.log(response);
            if(response.success){
                this.sowing_list = response.data.list[0].icon_list
                //导航数据
                this.nav_list = response.data.list[2].icon_list
                //清单数据
                this.items_list = response.data.list[3].product_list
                console.log(this.items_list);
                // console.log(this.sowing_list);
                //隐藏动画加载
                this.showloading = false
            }
            
        }).catch(error => {
            console.log(error);
        })
    },
    components: {
        Header,
        Sowing,
        Nav,
        Flash,
        Items
    }
}
</script>
<style lang="less" scoped>
    #home{
        width: 100%;
        height: 3000px;
        background-color: skyblue;
    }
</style>