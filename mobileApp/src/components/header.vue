<template>
    <div class="header-static-div">
        <div class="header-div">
            <span :class="{'hidden':$route.name =='home','header-button':true}" @click="goback()" >{{backmsg}}</span>
            <span class="header-title">{{title}}</span>
            <span :class="{'hidden':$route.name =='home','header-button':true}" @click="gohome()" >主页</span>
        </div>
    </div>

</template>
<script>
export default{
    name:"Header",
    props:{
        title:String,
        backmsg:{
            type:String,
            default:"返回"
        }
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        gohome(){
            this.$router.push({
                name:'home'
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
.header-static-div
    height: 35px;
.header-div
    height: 35px;
    width:100%;
    position :fixed;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color : wheat;
.header-div .hidden
    visibility : hidden
.header-button
    display: inline-block;
    padding: 5px;
    margin: 0 5px;
.header-title
    width: 150px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    text-align center;
</style>
