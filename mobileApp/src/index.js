import Vue from 'vue';
import App from './app.vue';
import VueRouter from 'vue-router';
import router from './routes.js';
import axios from 'axios';
import Vueaxios from 'Vue-axios';
import Header from './components/header'
import './css/primary.css';
import './css/novel.stylus';
// import store from './vuex-config.js';
// import Vuex from 'vuex';

Vue.use(VueRouter);
Vue.use(Vueaxios,axios);
Vue.component("Header",Header)
// Vue.use(Vuex);

// Vue.prototype.$http = axios;
axios.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        console.log("请求发送...");
        document.getElementById("loading").style.display="block";
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
        console.log("请求返回...");
        document.getElementById("loading").style.display="none";
        console.log(config);
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
