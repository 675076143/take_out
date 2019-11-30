# 外卖系统

## 技术选择

### 前端: Cordova

#### plugins

```json
cordova-plugin-whitelist //配置域名白名单
cordova-plugin-geolocation //调用gps定位
cordova-plugin-splashscreen //应用启动时图片
```

#### 高德地图API

### 后端：SpringBoot+Mysql

主机：114.55.36.231

端口：3306

用户名：Redtea

密码：123456

## 功能实现

1. 系统自动定位到当前城市
2. 从选择一级餐品分类
3. 选择需要的餐品添加到购物车
4. 结算订单并发送给数据库



## 备注

如果需要新增数据

在food表中新增一条数据后，将餐品图片命名为foodId.jpg并放入img文件夹中

并执行`cordova build android`重新编译



