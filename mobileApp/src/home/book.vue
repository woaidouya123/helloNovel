<template>
    <div class="book-div" @click="goChapterList()">
        <div class="book-img">
            <img :src="require('../images/'+_id+'.png').default" alt="封面">
        </div>
        <span class="book-name">{{name}}</span>
    </div>
</template>
<script>
export default {
    props:{
        name:String,
        _id:String
    },
    name:"book",
    data(){
        return{
        }
    },
    mounted(){

    },
    methods:{
        goChapterList(){
            console.log("click")
            this.$router.push({name:"chapter",params:{name:this.name}})
        }
    }
}
</script>
<style lang="stylus" scoped>
.book-div
    width : 33.333%
    height : 200px
    font-size: 15px
    padding: 5px
    display :inline-block
.book-img
    height : 150px
    display :flex
    justify-content :center
    align-items :center
.book-img img{
    width : 100%
    height : 100%
}
</style>
