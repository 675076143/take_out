//获取天气数据
const reqWeather = (location,lang) => {
    console.log("发送请求：",location,lang)
    return ajax('https://free-api.heweather.net/s6/weather',
        {location,key:"c0eabd2cbf7d4920bb45ff74c85dad5d",lang},'GET')
}