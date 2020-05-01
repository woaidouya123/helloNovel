<template>
    <div>
        <Header :title="'书架'"></Header>
        <Book v-for="item in article_list" :key="item._id" :_id="item._id" :name="item.name"></Book>
    </div>
</template>

<script>
import Book from './book.vue'
export default {
    components:{Book},
    name:"home",
    data(){
        return{
            article_list : ""
        }

    },
    mounted(){
        console.log("....")
        let self = this;
        this.axios.post("/api/queryAllDir",{}).then(function(res){
            self.article_list= res.data;
            console.log(self.article_list)

        })
    },
    methods:{

    }
}
</script>

<style>

</style>
