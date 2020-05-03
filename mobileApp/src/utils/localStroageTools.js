/**
 * 用来处理localStroage的方法
 */
export default{
    // getPriKey:(function(){
    //     let PRIMARYKEY = "hellonovel";
    //     return ()=>PRIMARYKEY;
    // })(),
    PRIMARYKEY:"hellonovel",
    getLS:function(key){
        let s = localStorage.getItem(this.PRIMARYKEY);
        if(s === undefined || s === null || s === '')return null;
        return JSON.parse(s)[key]
    },
    setLS:function(key,value){
        let s = localStorage.getItem(this.PRIMARYKEY), data;
        if(s === undefined || s === null || s === ''){
            data = {};
        }else{
            data = JSON.parse(localStorage.getItem(this.PRIMARYKEY));
        }
        data[key] = value;
        localStorage.setItem(this.PRIMARYKEY,JSON.stringify(data))
    }
}
