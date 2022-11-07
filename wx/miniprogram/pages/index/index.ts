import { routing } from "../../utils/routing"


Page({
  isPageShowing:false,
  dest:{
    latitude:23.099994,
    longitude:112.324520,
  },
  data:{
    avatarURL:'',
    setting:{
      skew:0,
      rotate:0,
      showLocation:true,
      showScale:true,
      subKey:'',
      layerStyle:-1,
      enableZoom:true,
      enableScroll:true,
      enableRotate:false,
      showCompass:false,
      enable3D:false,
      enableOverlooking:false,
      enableSatellite:false,
      enableTraffic:false,
    },
    location:{
      latitude:31,
      longitude:120,
    },
    scale:10,
    markers:[
      {
        iconPath:"../../resources/car.png",
        id:0,
        latitude:23.099994,
        longitude:112.324520,
        width:50,
        height:50
      },
      {
        iconPath:"../../resources/car.png",
        id:1,
        latitude:23.099994,
        longitude:113.324520,
        width:50,
        height:50
      },
    ],
  },

  onScanTap(){
    wx.scanCode({
      success:async res=>{
        console.log(res)
        await this.selectComponent('#licModal').showModal()
        const carID = 'car123'
        //const redirectURL = `/pages/lock/lock?car_id=${carID}`
        const redirectURL = routing.lock({car_id:carID})
        wx.navigateTo({
          //url:`/pages/register/register?redirect=${encodeURIComponent(redirectURL)}`
          url:routing.register({redirectURL:redirectURL})
        })
        
      },
      fail:console.error,
    })
  },

  onShow(){
    this.isPageShowing = true
  },

  onHide(){
    this.isPageShowing = false
    console.log('000000')
  },

  onLoad(){
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({
      avatarURL:userInfo.avatarUrl
    })
  },

  onMyLocationTap(){
    wx.getLocation({
      type:'gcj02',
      success:res=>{
        console.log(res)
        this.setData({
          location:{
            latitude:res.latitude,
            longitude:res.longitude
          },
        })
      },
      fail:err=>{
        console.log(err.errMsg)
        wx.showToast({
          icon:'none',
          title:"请前往设置页获取权限"
        })
      }
    })
  },
  
  moveCars(){
    const map = wx.createMapContext("map")
    

    const moveCar = () =>{
      this.dest.latitude += 0.1
      this.dest.longitude += 0.1
      map.translateMarker({
        destination:{
          latitude:this.dest.latitude,
          longitude:this.dest.longitude,
        },
        markerId:0,
        autoRotate:false,
        rotate:0,
        duration:5000,
        animationEnd:()=>{
          if(this.isPageShowing){
            moveCar()
          }else{
            

          }
        },
      })
    }

    moveCar()
    
  },

  onMytripsTap(){
    wx.navigateTo({
      //url:'/pages/mytrips/mytrips'
      url:routing.mytrips()
    })
  },


})
