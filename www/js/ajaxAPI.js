const BASE_URL = "114.55.36.231:9000";
//获取热门食品
const reqHotFood = (that) => {
    console.log("发送请求：")
    return ajax('http://'+BASE_URL+'//cordova/takeout/getHotFoods',{},'GET',that)
}
//根据食品类别获取食品
const reqFoodByType=(foodType,that)=>{
    console.log("发送请求：")
    return ajax('http://'+BASE_URL+'//cordova/takeout/getFoodsByType',{foodType},'GET',that)
}
//插入订单信息
const reqOrder = (address,userName,phone,totalPrice,orderSubDtoList,that)=>{
    return ajax('http://'+BASE_URL+'//cordova/takeout/order',{address,userName,phone,totalPrice,orderSubDtoList},'POST',that)
}
