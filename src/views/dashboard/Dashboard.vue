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
             <van-tabbar-item replace to="/dashboard/cart">
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
        <router-view/>
    </div>
</template>
<script>
export default {
    name:'Dashboard',
    data() {
    return {
      active: 0,
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
}
</script>
<style lang="less" scoped>
#dashboard{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}
</style>