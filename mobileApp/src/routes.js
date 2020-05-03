import VueRouter from 'vue-router';
import _404 from './utils/404.vue';
import home from './home/home.vue';
import chapter from './home/chapter.vue';
import content from './home/content.vue'
const router = new VueRouter({
    routes:[
        {
            path:'/',
            name:"主页面",
            redirect:'/home'
        },
        {
            path:'/home',
            name:"home",
            component:home
        },
        {
            path:'/chapter/:name',
            name:"chapter",
            component:chapter
        },
        {
            path:'/chapter/:name/content/:index',
            name:"content",
            component:content
        },
        {
            path:'/*',
            name:"404",
            component:_404
        }


    ]
})
module.exports = router;
