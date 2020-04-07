import Vue from 'vue';
import App from './app.vue';
import VueRouter from 'vue-router';
import router from './routes.js';
import axios from 'axios';
import Vueaxios from 'Vue-axios';
// import store from './vuex-config.js';
// import Vuex from 'vuex';

Vue.use(VueRouter);
Vue.use(Vueaxios,axios);
// Vue.use(Vuex);

// Vue.prototype.$http = axios;
axios.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        console.log("请求发送...");
        config.data.LoginType = "C";
        config.data.BankId = "9999";
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
  );

  //响应拦截器
  axios.interceptors.response.use(
    function (config) {
        // 对响应数据做点什么
        console.log("请求返回...")
        console.log(config);
        if(config.data.jsonError){
            alert(config.data.jsonError[0]._exceptionMessage);
        }
        return config;
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
  );

const root = document.createElement("div");
root.id="root";
document.body.appendChild(root);

new Vue({
    el:"#root",
    router,
    render:(h) => h(App)
})
