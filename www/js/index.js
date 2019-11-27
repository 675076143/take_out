document.addEventListener("deviceready",()=>{
    // log("设备准备就绪")
    document.addEventListener("pause",()=>{
        // log("应用被挂起")
    })
    document.addEventListener("resume",()=>{
        // log("应用回来了")
    })
    document.addEventListener("backbutton",()=>{
        // log("返回键被点击")
    })

})


const app = new Vue({
    el:'#app',
    data:{

    },
    components:{
        'top-bar':{
            template:'#top-bar',
            data(){
                return{

                }
            }
        },
        'left-nav':{
            template:'#left-nav',
            data(){
                return{
                    theme3: 'light'
                }
            }
        },
        'bottom-bar':{
            template:'#bottom-bar',
            data(){
                return{
                    price:69.0
                }
            }
        },
        'food-card':{
            template:'#food-card',
            data(){
                return{
                    foodDesc:'9.9元香辣鸡腿堡',
                    foodPrice:9.9,
                    foodCount:0
                }
            }
        }
    }
})