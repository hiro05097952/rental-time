# 時販機 じはんき

> 使用 Vue + Nuxt 打造的販賣時間平台。
  在時販機上，您可以自由販賣或購買時間，一單位為 30 分鐘，不同的主題可以讓你選擇精進自己、分享快樂又或是殺時間的娛樂。快來看看吧！

## Demo

[Demo Link](http://rental-time.herokuapp.com/)

[操作流程](https://gist.github.com/jedy05097952/63762af683b032a1c3a738d065e753dd)

### 測試帳號

```
  a.
  名稱：Judy
  帳號：test1@gmail.com
  密碼：test123123
  販時名稱：拍出適合妳的大頭貼
  
  b.
  名稱：Ｍiyu
  帳號：test2@gmail.com
  密碼：test123123
  販時名稱：畫穿搭
```

## 簡介

此作品使用 Nuxt 打造，搭配 WebRTC 可達成一對一線上視訊。

後端則是使用 Node.js 搭配資料庫 MySQL。

### 平台功能

* 會員註冊 / 登入 ( 支援第三方 Google, FaceBook )

* 忘記密碼 ( 使用 JWT 驗證 )

* 儲值點數 ( 綠界金流 )

* 編輯個人資訊 ( 可上傳大頭照 )

* 販賣 / 上架自己時間

* 下標 / 購買別人時間

* 訊息傳送

* 視訊聊天室

* 瀏覽商品

## 使用技術

* Vue
  
* Vue Router

* Vuex

* Vue Cli 4

* Nuxt

* WebRTC

* WebSocket

* Google SignIn

* FaceBook SignIn

* ESLint ( Airbnb )

* JavaScript

* tailwind CSS Framework

* Scss

* Node.js

* MySQL

* Git

## 前端介面

### 首頁

![index](https://user-images.githubusercontent.com/50637947/77354801-5ce46400-6d7e-11ea-89c0-48dae09d1f5d.png)

![index2](https://user-images.githubusercontent.com/50637947/77354806-5fdf5480-6d7e-11ea-9317-37940b635721.png)

![index3](https://user-images.githubusercontent.com/50637947/77360299-1267e500-6d88-11ea-977f-0cc6eb0eae65.png)

![index4](https://user-images.githubusercontent.com/50637947/77360308-16940280-6d88-11ea-8fd4-d12bb69be372.png)

### 商品列表 / 資訊

![productList](https://user-images.githubusercontent.com/50637947/77354852-75547e80-6d7e-11ea-8116-73ffd6634f45.png)

![productList2](https://user-images.githubusercontent.com/50637947/77354856-77b6d880-6d7e-11ea-9692-b286a08d03c6.png)

![productInfo](https://user-images.githubusercontent.com/50637947/77354876-7dacb980-6d7e-11ea-8da7-ca967cfbd158.png)

![productInfo2](https://user-images.githubusercontent.com/50637947/77360129-c5840e80-6d87-11ea-828e-9b1321d08a9a.png)

### 登入 / 註冊

![login](https://user-images.githubusercontent.com/50637947/77354975-ab91fe00-6d7e-11ea-9bd9-de8fe16a24fd.png)

### 編輯頁面

![editUserInfo](https://user-images.githubusercontent.com/50637947/77355099-d1b79e00-6d7e-11ea-94c9-43f252c402c7.png)

![editProductInfo](https://user-images.githubusercontent.com/50637947/77355109-d419f800-6d7e-11ea-8dbf-7a573c21f114.png)

### 信箱 / 訊息

![message1](https://user-images.githubusercontent.com/50637947/77355187-fa3f9800-6d7e-11ea-93bf-cf02b2d3d392.png)
![message2](https://user-images.githubusercontent.com/50637947/77355189-fca1f200-6d7e-11ea-8962-4125aeebf21b.png)

### 儲值點數

![charge](https://user-images.githubusercontent.com/50637947/77354980-adf45800-6d7e-11ea-86bb-33208383f96c.png)

### 下標 / 購時

![order](https://user-images.githubusercontent.com/50637947/77355249-19d6c080-6d7f-11ea-81a4-4950607a62b5.png)

### 視訊聊天室

![chatRoom](https://user-images.githubusercontent.com/50637947/77355256-1d6a4780-6d7f-11ea-8c23-d5600694e03d.png)


## 聲明
本作品單純練習用，不作任何商業用途。

## Build Setup

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
