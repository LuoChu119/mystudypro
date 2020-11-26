import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);
import { Icon } from 'vant';
Vue.use(Icon);
import { Loading } from 'vant';
Vue.use(Loading);
//图片懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload);
//引入轮播组件
import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);
//引入轻提示组件
import { Toast } from 'vant';
Vue.use(Toast);