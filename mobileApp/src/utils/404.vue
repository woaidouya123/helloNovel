<template>
    <span>{{msg}}</span>
</template>
<script>
export default {
    name:"404",
    mounted(){
        console.log("404");
    },
    data(){
        return {
            "msg":"页面找不到了"
        }
    }
}
</script>
