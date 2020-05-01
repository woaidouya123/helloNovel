<template>
    <div class="show-div" ref="ShowDiv" @click="changePage($event)">
        <div class="swipper-content">
            <p ref="p" class="swipper-text">{{text}}</p>
            <p class="swipper-text" :style="getMarginTop(index)" v-for="index in pageCount" :key="chapterIndex+index">{{text}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name:"page",
    props:{
        text:String
    },
    data(){
        return{
            "lineHeigth":30,
            "screenHeight":Math.floor((window.innerHeight-35)/30)*30,
            "textHeight":0,
            "chapterIndex":this.$route.params.index
        }
    },
    methods:{
        getMarginTop:function(index){
            return{
                top:-this.screenHeight*index+"px"
            }
        },
        changePage:function(event){
            var ev = event || window.event;
            var target = ev.target || ev.srcElement;
            var swipperDiv = document.querySelector(".swipper-content");
            console.log(target, target.offsetLeft, target.offsetWidth);
            if(ev.clientX - target.offsetLeft > target.offsetWidth/2){
                var preMargin = parseInt(swipperDiv.style.marginLeft) || 0;
                swipperDiv.style.marginLeft = preMargin - target.offsetWidth/2 - 1 + "px";
                this.adjustMarginLeft();
            }else{
                var preMargin = parseInt(swipperDiv.style.marginLeft) || 0;
                swipperDiv.style.marginLeft = preMargin + target.offsetWidth/2 + 1 + "px";
                this.adjustMarginLeft();
            }
            ev.stopPropagation();
        },
        adjustMarginLeft:function(){
            var swipperDiv = document.querySelector(".swipper-content");
            var swipperTexts = document.querySelectorAll(".swipper-text");
            var divWidth = swipperTexts[0].scrollWidth;
            var preMargin = parseInt(swipperDiv.style.marginLeft) || 0;
            var cur = Math.round(preMargin/divWidth);
            cur = cur > 0?0:cur;
            if(cur < 1-swipperTexts.length){
                this.$emit("goNextChapter");
                return;
            }
            swipperDiv.style.marginLeft = cur*divWidth + "px";
        }
    },
    computed:{
        pageCount:function(){
            return Math.floor(this.textHeight/this.screenHeight);
        }
    },
    created(){
        console.log("created")
    },
    updated(){
        console.log("updated")
    },
    watch:{
        text:function(newValue){
            if(newValue){
                this.resizePage();
                this.$refs.p.parentNode.style.transition="";
                this.$refs.p.parentNode.style.marginLeft = "0px";
                this.$refs.p.parentNode.style.transition="margin-left 0.5s";
            }

        }
    },
    mounted(){
        this.resizePage = function(){
            var self = this;
            setTimeout(()=>{
                this.$refs.ShowDiv.style.height = this.screenHeight+"px";
                this.textHeight = this.$refs.p.scrollHeight;
            },100)
            var swipperTexts,swipperDiv;
            setTimeout(()=>{
            let startX, startMargin, moveFlag = false;
            swipperTexts = document.querySelectorAll(".swipper-text");
			swipperDiv = document.querySelector(".swipper-content");
			swipperTexts.forEach(function(div,index){
				['mousedown','touchstart'].forEach(function(eventname){
					div.addEventListener(eventname,function(event){
						var ev = event || window.event;
						var target = ev.target || ev.srcElement;
						if(!moveFlag){
							startX = ev.clientX || ev.changedTouches[0].clientX;
							startMargin = parseInt(target.parentNode.style.marginLeft) || 0;
							moveFlag = true;
						}

					})
				});

				['mousemove','touchmove'].forEach(function(eventname){
					div.addEventListener(eventname,function(event){
						var ev = event || window.event;
						var target = ev.target || ev.srcElement;
						if(moveFlag){
							var nowX = ev.clientX || ev.changedTouches[0].clientX;
							target.parentNode.style.transition = "";
							target.parentNode.style.marginLeft =
							startMargin + nowX - startX + "px";
						}

					})
				});
				['mouseout','mouseup','touchend'].forEach(function(eventname){
					div.addEventListener(eventname,function(event){
						var ev = event || window.event;
						var target = ev.target || ev.srcElement;
						if(moveFlag){
							moveFlag = false;
							target.parentNode.style.transition = "margin-left 0.5s";
							adjustMarginLeft();
						}

					})
				});

                div.style.width = window.innerWidth+"px";
                // div.style.height = (self.pageCount+1)*self.screenHeight+"px";
            });
            // document.querySelector(".show-div").addEventListener("click",function(event){
            //     var ev = event || window.event;
            //     var target = this || ev.target || ev.srcElement;
            //     console.log(target, target.offsetLeft, target.offsetWidth);
            //     if(!moveFlag){
            //         if(ev.clientX - target.offsetLeft > target.offsetWidth/2){
            //             var preMargin = parseInt(swipperDiv.style.marginLeft) || 0;
            //             swipperDiv.style.marginLeft = preMargin - target.offsetWidth/2 - 1 + "px";
            //             adjustMarginLeft();
            //         }else{
            //             var preMargin = parseInt(swipperDiv.style.marginLeft) || 0;
            //             swipperDiv.style.marginLeft = preMargin + target.offsetWidth/2 + 1 + "px";
            //             adjustMarginLeft();
            //         }
            //     }
            //     ev.stopPropagation();

            // },true)

            // 自动调整方法
            function adjustMarginLeft(){
                var divWidth = swipperTexts[0].scrollWidth;
                var preMargin = parseInt(swipperDiv.style.marginLeft) || 0;
                var cur = Math.round(preMargin/divWidth);
                // console.log(divWidth,preMargin,cur,swipperTexts.length)
                // cur = cur > 0?0:cur<1-swipperTexts.length?1-swipperTexts.length:cur;
                cur = cur > 0?0:cur;
                if(cur < 1-swipperTexts.length){
                    self.$emit("goNextChapter");
                    return;
                }
                swipperDiv.style.marginLeft = cur*divWidth + "px";
            }
        },1000)

        }
        // this.resizePage();



    }
}
</script>
<style lang="stylus" scoped>
.show-div
    height : 300px
    overflow :hidden
.swipper-content
    white-space : nowrap
    font-size : 0px
.swipper-text
    display :inline-block
    font-size : 15px
    line-height : 30px
    white-space: pre-line;
    box-sizing : border-box;
    width : 100vw;
    position :relative;
    padding:0 10px;
</style>
