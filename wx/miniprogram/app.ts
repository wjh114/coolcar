// app.ts
// import {IAppOption} from "./appoption"
// import {getSetting,getUserInfo} from "./utils/wxapi"

import { coolcar } from "./service/proto_gen/trip_pb"
// import {camelcaseKeys} from "./node_modules/camelcase-keys"
import camelcaseKeys = require("camelcase-keys")

 
App({
  // globalData: {
  //   userInfo:new Promise((resolve,reject)=>{
  //     resolveUserInfo = resolve
  //     rejectUserInfo = reject
  //   })
  // },
  onLaunch() {

    wx.request({
      url:'http://localhost:8080/trip/trip123',
      method:'GET',
      success:res=>{
        const getTripRes = coolcar.GetTripResponse.fromObject(camelcaseKeys(res.data as object,{deep:true}))
        console.log(getTripRes)
        console.log(coolcar.TripStatus[getTripRes.trip?.status!])
      },
      fail:err=>{
        console.log('err:' + err.errMsg)
      }
    })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})