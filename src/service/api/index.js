import ajax from './ajax'
//http://demo.itlike.com/web/xlmc/api/homeApi
//http://demo.itlike.com/web/xlmc/api/homeApi/api/homeApi/categories
//http://demo.itlike.com/web/xlmc/api/homeApi/api/homeApi/categoriesdetail/lk001
//定义基础路径
const BASE_URL = 'http://demo.itlike.com/web/xlmc';


export const getHomeData = () => ajax(BASE_URL + '/api/homeApi');
export const getCategories = () => ajax(BASE_URL + '/api/homeApi/categories');
export const getCategoriesDetail = (preparams) => ajax(BASE_URL + '/api/homeApi/categoriesdetail/lk' + preparams);


