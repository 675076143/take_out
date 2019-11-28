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
        foodList: [
            {
                foodId:0,
                foodDesc:'9.9元香辣鸡腿堡',
                foodPrice:9.9,
                foodCount:0
            },
            {
                foodId:1,
                foodDesc:'9.9元香辣鸡腿堡',
                foodPrice:9.9,
                foodCount:0
            },
            {
                foodId:2,
                foodDesc:'9.9元香辣鸡腿堡',
                foodPrice:9.9,
                foodCount:0
            },
            {
                foodId:3,
                foodDesc:'9.9元香辣鸡腿堡',
                foodPrice:9.9,
                foodCount:0
            },
            {
                foodId:4,
                foodDesc:'9.9元香辣鸡腿堡',
                foodPrice:9.9,
                foodCount:0
            },
            {
                foodId:5,
                foodDesc:'9.9元香辣鸡腿堡',
                foodPrice:9.9,
                foodCount:0
            },

        ],
        orderList:[],
    },
    methods:{
        getFood(params){
            this.orderList.push(params)
            console.log('params=>',params)
            console.log('orderList=>',this.orderList)
        },

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
                    price:69.0,
                    modal:false,
                    loading:true,
                    formOrder:{
                        address:"",
                        name:"",
                        phone:"",
                    },
                    ruleValidate:{
                        address: [
                            { required: true, message: '配送地址不能为空', trigger: 'blur' }
                        ],
                        name: [
                            { required: true, message: '用户姓名不能为空', trigger: 'blur' }
                        ],
                        phone: [
                            { required: true, message: '联系电话不能为空', trigger: 'blur' },
                        ],
                    }
                }
            },
            methods:{
                order(){
                    this.modal=true
                },
                sendOrder(name){
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            this.$Message.success('Success!');
                            this.modal = false
                        } else {
                            this.$Message.error('Fail!');
                        }
                    })

                }
            },
        },
        'food-card':{
            template:'#food-card',
            props:{
              food:{
                  type:Object,
                  default:{}
              }
            },
            data(){
                return{

                }
            },
            mounted(){
                console.log("props=>",this.food)
            },
            methods:{
                addFood(){
                    this.food.foodCount++
                    const {foodCount,foodDesc,foodPrice,foodId} = this.food;
                    this.$emit('add-food',{
                        foodId,foodPrice,foodDesc,foodCount
                    })
                }
            }
        }
    }
})