//输出测试
const log = (msg) => {
    const p = document.createElement("p")
    p.style.fontSize = "14px"
    p.innerHTML = msg
    p.style.position = "fixed"
    p.style.right = "0"
    p.style.top = '100px'
    document.body.append(p)
}
const test = async (that) => {
    // const result = await reqWeather("漳州","zh-hans",that)
    // log(JSON.stringify(result))
    const result2 = await reqHotFood(that)
    log(JSON.stringify(result2))
}
var map


document.addEventListener("deviceready", () => {
    // log("设备准备就绪")
    document.addEventListener("pause", () => {
        // log("应用被挂起")
    })
    document.addEventListener("resume", () => {
        // log("应用回来了")
    })
    document.addEventListener("backbutton", () => {
        // log("返回键被点击")
    })

})
const app = new Vue({
    el: '#app',
    data: {
        foodList: [],
        orderList: [],
        city:"请手动定位"
    },
    mounted() {
        this.getMap()
        this.showCityInfo()
    },
    methods: {
        getFood(params) {
            let isExisted = false
            for (let i = 0; i < this.orderList.length; i++) {
                if (this.orderList[i].foodId == params.foodId) {
                    if (params.foodCount == 0) {
                        console.log("删除！")
                        this.orderList.splice(i, 1)
                        console.log(this.orderList)
                        return
                    } else {
                        this.orderList[i].foodCount = params.foodCount
                        isExisted = true
                    }
                }
            }
            if (!isExisted) {
                this.orderList.push(params)
            }
            console.log('params=>', params)
            console.log('orderList=>', this.orderList)
        },

        changeFoods(data) {
            // this.foodList=
            console.log("changeFoods=>", data)
            for (let j = 0; j < data.length; j++) {
                data[j].foodCount = 0
                for (let i = 0; i < this.orderList.length; i++) {
                    //取出之前已经选中的食品的数量
                    if (this.orderList[i].foodId == data[j].foodId) {
                        data[j].foodCount = this.orderList[i].foodCount
                        console.log("data.foodCount=", data[j].foodCount)
                    }
                }

            }

            //更新数据
            this.foodList = data
            console.log("更新后的foodList=>", this.foodList)
            console.log("当前的orderList=>", this.orderList)
        },
        getMap() {
            const that = this
            map = new AMap.Map("container", {
                resizeEnable: true,
                center: [116.397428, 39.90923],//地图中心点
                lang: "zh_en",//中英文地图
                zoom: 13,//地图显示的缩放级别
                keyboardEnable: false
            });
            AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
                const autoOptions = {
                    city: "全国", //城市，默认全国
                    input: "search"//使用联想输入的input的id
                };
                autocomplete = new AMap.Autocomplete(autoOptions);
                const placeSearch = new AMap.PlaceSearch({
                    city: '全国',
                    map: map
                })
                AMap.event.addListener(autocomplete, "select", function (e) {
                    //TODO 针对选中的poi实现自己的功能
                    placeSearch.setCity(e.poi.adcode);
                    placeSearch.search(e.poi.name)
                    //利用经纬度查询天气，如果没有经纬度使用名称查询
                    const location = e.poi.location.P ? e.poi.location.P + "," + e.poi.location.Q : e.poi.name
                    that.getWeather(location, that.lang)
                });
            });

        },
        showCityInfo() {
            //实例化城市查询类
            const citysearch = new AMap.CitySearch();
            //自动获取用户IP，返回当前城市
            citysearch.getLocalCity((status, result)=> {
                console.log("getLocalCity")
                if (status === 'complete' && result.info === 'OK') {
                    if (result && result.city && result.bounds) {
                        console.log("success");
                        var cityinfo = result.city;
                        var citybounds = result.bounds;
                        this.city = cityinfo
                        //地图显示当前城市
                        map.setBounds(citybounds);
                    }
                } else {

                }
            });
        }

    },
    computed: {},
    components: {
        'top-bar': {
            template: '#top-bar',
            props:{
                city:{
                    type:String,
                    default:"请手动定位"
                }
            },
            data() {
                return {
                    location: '请手动定位',
                    modal: false
                };
            }
        },
        'left-nav': {
            template: '#left-nav',
            data() {
                return {
                    theme3: 'light'
                }
            },
            mounted() {
                this.getHotFood()
            },
            methods: {
                async getHotFood() {
                    console.log("测试this", this)
                    const result = await reqHotFood(this)
                    this.$emit("change-food", result.data)
                    // console.log(result)
                },
                async getFood(param) {
                    const result = await reqFoodByType(param, this)
                    console.log(result.data)
                    this.$emit("change-food", result.data)
                    // console.log(result)
                },
            }
        },
        'bottom-bar': {
            template: '#bottom-bar',
            props: {
                orderList: {
                    type: Array,
                    default: () => []
                }
            },
            computed: {
                price() {
                    let total = 0
                    for (let i = 0; i < this.orderList.length; i++) {
                        total += this.orderList[i].foodPrice * this.orderList[i].foodCount
                        console.log("item=>", total)
                    }
                    console.log("total=>", total)
                    return total.toFixed(2)
                },
                count() {
                    let total = 0
                    for (let i = 0; i < this.orderList.length; i++) {
                        total += this.orderList[i].foodCount
                    }
                    return total
                }
            },
            data() {
                return {
                    modal: false,
                    loading: true,
                    formOrder: {
                        address: "",
                        name: "",
                        phone: "",
                    },
                    ruleValidate: {
                        address: [
                            {required: true, message: '配送地址不能为空', trigger: 'blur'}
                        ],
                        name: [
                            {required: true, message: '用户姓名不能为空', trigger: 'blur'}
                        ],
                        phone: [
                            {required: true, message: '联系电话不能为空', trigger: 'blur'},
                        ],
                    }
                }
            },
            methods: {
                order() {
                    this.modal = true

                },
                sendOrder(name) {
                    console.log("sendOrderList=>", this.orderList)
                    this.$refs[name].validate(async (valid) => {
                        if (valid) {
                            this.$Message.success('订购成功!')
                            const orderSubDtoList = []
                            for (let i = 0; i < this.orderList.length; i++) {
                                const {foodName, foodPrice, foodCount} = this.orderList[i]
                                orderSubDtoList.push({foodName, foodPrice, foodCount})
                            }
                            console.log("orderSubDtoList=>", orderSubDtoList)
                            const {address, name, phone} = this.formOrder
                            const result = await reqOrder(address, name, phone, this.price, orderSubDtoList, this)
                            console.log(result)
                            this.modal = false
                        } else {
                            this.$Message.error('Fail!');
                            this.loading = false
                        }
                    })

                }
            },
        },
        'food-card': {
            template: '#food-card',
            props: {
                food: {
                    type: Object,
                    default: () => {
                    }
                }
            },
            data() {
                return {}
            },
            computed: {
                img_src() {
                    return 'img/' + this.food.foodId + '.jpg'
                }
            },
            mounted() {
                console.log("props=>", this.food)
            },
            methods: {
                addFood() {
                    this.food.foodCount++
                    const {foodCount, foodDesc, foodPrice, foodId, foodName} = this.food;
                    this.$emit('add-food', {
                        foodId, foodPrice, foodDesc, foodCount, foodName
                    })
                    console.log("addFood.$emit=>", {
                        foodId, foodPrice, foodDesc, foodCount, foodName
                    })
                },
                removeFood() {
                    this.food.foodCount--
                    const {foodCount, foodDesc, foodPrice, foodId} = this.food;
                    this.$emit('add-food', {
                        foodId, foodPrice, foodDesc, foodCount
                    })
                }
            }
        }
    }
})