<template>
    <div>
        <Header :title="title" :backmsg="'目录'"></Header>
        <!-- <p ref="text_div" class="article_text">{{text | insertLine}}</p> -->
        <keep-alive>
            <Page :text="text | insertLine" @goNextChapter="changeChapter()"></Page>
        </keep-alive>

        <!-- <div class="content-op">
            <button :class='["content-btn",index<=1?"content-btn-hidden":""]' @click="changeChapter(index-1)">上一章</button>
            <button :class='["content-btn",index>=lastIndex?"content-btn-hidden":""]' @click="changeChapter(index+1)">下一章</button>
        </div> -->
    </div>
</template>
<script>
import LS from '../utils/localStroageTools.js'
import Page from './page.vue'
export default {
    name:"Content",
    components:{
        Page
    },
    data(){
        return{
            text:"",
            article_name:"",
            title:"",
            index:"",
            lastIndex:""
        }
    },
    created(){
        this.article_name = this.$route.params.name;
        this.index = parseInt(this.$route.params.index);
        this.getTextContent();
        let self = this;
        this.axios.post("/api/queryDirInfo",{
            article_name:self.article_name
        }).then(function(res){
            self.lastIndex = parseInt(res.data[0].count);
        })
    },
    watch:{
        '$route'(to, from){
            this.article_name = to.params.name;
            this.index = parseInt(to.params.index);
            this.getTextContent();
            LS.setLS(this.article_name,this.index);
            // window.scrollBy(0,-this.$refs.text_div.scrollHeight);
        }
    },
    methods:{
        //切换章节
        changeChapter(index){
            if(!index)index = this.index+1;
            this.$router.replace({
                path:'/chapter/'+this.article_name+'/content/'+index
            })
        },
        //获取章节数据
        getTextContent(){
            let self = this;
            this.axios.post("/api/getChapterContent",{
                article_name:self.article_name,
                index:self.index
            }).then(function(res){
                self.text = res.data[0].content;
                self.title = res.data[0].name;
                LS.setLS(self.article_name,{
                    index: self.index,
                    name:self.title
                })
            })
        }
    },
    filters: {
        insertLine: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.replace(/(\s{6})/g,"\n$1")
        }
    }
}
</script>
<style lang="stylus" scoped>
.article_text
    font-size : 15px
    line-height : 2
    margin: 0 10px
    white-space: pre-line
    word-break: normal
.content-op
    height :35px;
    display: flex;
    justify-content: space-between;
.content-btn
    border: none;
    background: none;
    outline: none;
.content-btn-hidden
    visibility :hidden
</style>
