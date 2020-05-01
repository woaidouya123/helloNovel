<template>
  <div>
        <router-view></router-view>
      <div class="loading" id="loading" style="display:none;"></div>
  </div>

</template>

<script>
export default {
    name:"app"

}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: margin-top 1s;
}
.fade-enter{
    margin-top: 100%;
}
.fade-enter-to, .fade-leave{
    margin-top:0px;
}
.fade-leave-to {
    margin-top: -100%;
}
</style>
