import { routing } from "../../utils/routing"

// pages/driving/driving.ts
const centPerSec = 0.7

function formatDuration(sec:number){
  const padString = (n:number) => n<10 ? '0' + n.toFixed(0): n.toFixed(0)

  const h = Math.floor(sec / 3600)
  sec -= 3600 * h
  const m = Math.floor(sec / 60)
  sec -= 60 * m
  const s = Math.floor(sec)
  return `${padString(h)}:${padString(m)}:${padString(s)}`

}

function formatFee(cents:number){
  return (cents / 100).toFixed(2)
}

Page({

  /**
   * 页面的初始数据
   */
  timer:undefined as number | undefined,
  data: {
    location:{
      latitude:31,
      longitude:120,
    },
    scale:14,
    elapsed:'00:00:00',
    fee:'0.00',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opt:Record<'trip_id',string>) {
    const o:routing.DrivingOpts = opt
    console.log('unlocking car',o.trip_id)
    this.setUpLocationUpdator()
    this.setUpTimer()
  },

  onUnload(){
    wx.stopLocationUpdate()
    if(this.timer){
      clearInterval(this.timer)
    }
  },

  setUpLocationUpdator(){
    wx.startLocationUpdate({
      fail:console.error
    })
    wx.onLocationChange(loc=>{
      console.log("location:",loc)
      this.setData({
        location:{
          latitude:loc.latitude,
          longitude:loc.longitude
        },
      })
    })
  },

  setUpTimer(){
    let elapsedSec = 0
    let cents = 0
    this.timer = setInterval(()=>{
      elapsedSec++
      cents += centPerSec
      this.setData({
        elapsed:formatDuration(elapsedSec),
        fee:formatFee(cents),
      })

    },1000)
  },

  onEndTripTap(){
    wx.redirectTo({
      url:routing.mytrips(),
    })
  }


  
})