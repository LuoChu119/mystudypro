<template>
    <div id="category">
        <Header/>
        <div class="listWrapper" v-if="!showloading">
            <div class="leftWrapper">
                <ul class="wrapper">
                    <li class="categoryItem" 
                    v-for="(cate, index) in categoriesData" 
                    :class="{selected: currentIndex === index}"
                    @click="clickLeftLi(index)"
                    :key="cate.id"
                    ref="menuList"
                    >
                        <span class="textWrapper">{{cate.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <van-loading v-else type="spinner" color="#1989fa"
       style="position: absolute; left: 50%; top: 40%; transform: translate(-50%)"
       >小撩正在加载中...</van-loading>
       <ContentView :categoriesDetailData= 'categoriesDetailData'/>
    </div>
</template>
<script>
//引入组件
import Header from './components/Header.vue'
import ContentView from './components/ContentView'
//引入人民币过滤器
import '@/config/filters.js'
//引入滚动组件
import Bscroll from 'better-scroll'
//引入数据接口
import {getCategories, getCategoriesDetail} from '../../service/api/index'
import { mapMutations } from 'vuex'
//引入消息订阅组件插件
import PubSub from 'pubsub-js'
//引入轻提示组件
import { Toast } from 'vant';
export default {
    name:'Category',
    components:{
        Header,
        ContentView
    },
    data(){
        return{
            //是否显示加载图标
            showloading: true,
            //左边列表数据
            categoriesData:[],
            //右边列表数据
            categoriesDetailData:[],
            //左边item选中与否
            currentIndex: 0
        }

    },
    created(){
        this.initData();

    },
    mounted(){
    },  
    methods:{
        //1.初始化操作
        async initData(){
            //1.获取左边的数据
            let leftRes = await getCategories();
            if(leftRes.success){
                console.log(leftRes);
                this.categoriesData = leftRes.data.cate
                console.log(this.categoriesData);
            }
            //获取右边的数据
            let rightRes = await getCategoriesDetail('001');
            if(rightRes.success){
                console.log(rightRes);
                this.categoriesDetailData = rightRes.data.cate
            }
            
            //3.隐藏loading框
            this.showloading = false
            //初始化滚动框架
            this.$nextTick(() => {
             this.leftScroll = new Bscroll('.leftWrapper', {probeType: 3})
            })
        },
        //2.处理li的点击
        async clickLeftLi(index){
            this.currentIndex = index
            //2.1滚动到对应的位置
            //2.1通过绑定ref 拿到了所有的li标签
            let menuLists = this.$refs.menuList;
            let el = menuLists[index];
            //2.2li标签滚动到对应的位置
            this.leftScroll.scrollToElement(el, 300);
            //2.获取右边的数据
            let rightRes = await getCategoriesDetail('00' + (index + 1));
            console.log(rightRes);
            if(rightRes.success){
                this.categoriesDetailData = rightRes.data.cate
            };
        }
    }
}
</script>
<style lang="less" scoped>
    #category{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        overflow: hidden;
    }
    .listWrapper{
        display: flex;
        position: absolute;
        top: 2.28rem;
        bottom: 3rem;
        width: 100%;
        overflow: hidden;
    }
    .leftWrapper{
        background-color: #f4f4f4;
        width: 5.3124rem;
        flex: 0 0 5.3124rem;
    }
    .categoryItem{
        padding: 0.75rem 0;
        border-bottom:  solid 1px #e8e9e8;
        position: relative;
    }
    .categoryItem .textWrapper{
        line-height: 1.25rem;
        border-left: solid 0.1875rem transparent;
        padding: 0.3125rem 0.6875rem;
        font-size: 0.8125rem;
        color: #666666;
    }
    .selected{
        background: #fff;
    }
    .selected .textWrapper{
        border-left-color: #3cb963;
        font-weight: bold;
        font-size: 0.875rem;
        color: #333333;

    }
</style>