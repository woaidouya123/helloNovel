import VueRouter from 'vue-router';
import _404 from './utils/404.vue';
import home from './home/home.vue'
const router = new VueRouter({
    routes:[
        {
            path:'/home',
            name:"home",
            component:home
        },
        {
            path:'/*',
            name:"404",
            component:_404
        },


    ]
})
module.exports = router;
