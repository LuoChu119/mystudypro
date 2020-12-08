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
//引入确认组件
import { Dialog } from 'vant';

// 全局注册
Vue.use(Dialog);
//单选框
import { RadioGroup, Radio } from 'vant';

Vue.use(Radio);
Vue.use(RadioGroup);
//引入订单界面导航栏组件
import { NavBar } from 'vant';

Vue.use(NavBar);
////地址组件
import { ContactCard } from 'vant';

Vue.use(ContactCard);
//地址编辑
import { AddressList } from 'vant';

Vue.use(AddressList);
//添加地址
import { AddressEdit } from 'vant';

Vue.use(AddressEdit);
//引入单元格
import { Cell, CellGroup } from 'vant';

Vue.use(Cell);
Vue.use(CellGroup);
//提交订单栏子
import { SubmitBar } from 'vant';

Vue.use(SubmitBar);
//引入宫格组件
import { Grid, GridItem } from 'vant';

Vue.use(Grid);
Vue.use(GridItem);
//引入表单组件
import { Form } from 'vant';

Vue.use(Form);
//引入弹出层组件
import { Popup } from 'vant';

Vue.use(Popup);
//引入日期组件
import { DatetimePicker } from 'vant';

Vue.use(DatetimePicker);
//引入商品卡片组件
import { Card } from 'vant';

Vue.use(Card);
//选项卡
import { Tab, Tabs } from 'vant';

Vue.use(Tab);
Vue.use(Tabs);