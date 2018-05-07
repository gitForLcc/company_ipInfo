import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router.config'
import axios from 'axios'
import qs from 'qs'
import store from './store/'
import Loading from './components/loading'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


require('./assets/css/index.css')

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Loading);
const router=new VueRouter({
	scrollBehavior:()=>({y:0}), 
	routes
});
if(window.location.hash="#/login"){
  if(sessionStorage.getItem('token')){
    router.push({ path: '/ip-info' })
  }
}
//配置发送请求的信息
axios.interceptors.request.use(function(config){
	store.dispatch('showLoading')
	return config;
}),function(error){
	return Promise.reject(error);
}

//请求回来
axios.interceptors.response.use(function(response){
	store.dispatch('hideLoading')
	return response;
}),function(error){
	return Promise.reject(error);
}
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.baseURL = window.location.origin;
axios.defaults.baseURL = 'http://172.16.0.44:5000'
//拦截器，定义token
axios.interceptors.request.use(
config => {
  if(config.method=='post'){
    config.data = qs.stringify(config.data);
  }
    const token = sessionStorage.getItem('token')
    if (token) {
        config.headers.token = token;
    }
    return config
},
error => {
    return Promise.reject(error)
});
Vue.prototype.$http=axios;  //把axios暴露到Vue原型上 名字为$http



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
