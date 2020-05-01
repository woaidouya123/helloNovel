<template>
    <div>
        <Header :title="article_name"></Header>
        <div class="chapter-list">
        <span class="chapter-name" v-if="read_record&&read_record.index" @click="goContentPage(read_record)">最近阅读：{{read_record.name}}</span>
        <span class="chapter-name" v-for="(item, index) in chapter_list" :key="index" @click="goContentPage(item)">{{item.name}}</span>
    </div>
    </div>

</template>
<script>
import LS from '../utils/localStroageTools.js'
export default {
    name:"chapter",
    data(){
        return{
            chapter_list:"",
            article_name:"",
            read_record:""
        }
    },
    created(){
        this.article_name = this.$route.params.name;
        let record = LS.getLS(this.article_name) || {};
        this.read_record = {
            "article_name":this.article_name,
            "index":parseInt(record.index),
            "name":record.name
        };
        let self = this;
        this.axios.post("/api/queryAllChapterDir",{
            "article_name":this.article_name
        }).then(function(res){
            self.chapter_list = res.data
        })
    },
    methods:{
        goContentPage(item){
            this.$router.push({
                name:'content',
                params:{
                    name:this.article_name,
                    index:item.index
                }
            })
        }
    }
}
</script>
<style lang="stylus">
.chapter-list
    min-height: 500px;

.chapter-name
    display: block;
    font-size: 15px;
    border-bottom: 1px solid rgba(128,128,128,0.3);
    padding: 10px 10px 10px 0px;
    text-indent: 0.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
</style>
