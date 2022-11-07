import { routing } from "../../utils/routing"

const shareLocationKey = 'shareLocation'
// pages/lock/lock.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareLocation:true,
    avatarURL:'',

  },

  onLoad(opt:Record<'car_id',string>){
    const o:routing.LockOpts = opt
    console.log('unlocking car',o.car_id)
    const userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      this.setData({
        avatarURL:userInfo.avatarUrl,
        shareLocation:wx.getStorageSync(shareLocationKey) || false,
      })
    }

  },

  onGetUserInfo(){
    wx.getUserProfile({
      desc:'用于完善会员资料',
      success:res=>{
        wx.setStorageSync('userInfo',res.userInfo)
        this.setData({
          
          avatarURL:res.userInfo.avatarUrl
        })
        
      },
      fail:err=>{
        console.log(err)
      }
    })
  },

  onShareLocation(e:any){
   const shareLocation:boolean = e.detail.value
   wx.setStorageSync(shareLocationKey,shareLocation)
  },

  onUnlockTap(){

    wx.getLocation({
      type:'gcj02',
      success:loc=>{
        
        wx.request({
          url:'https://api.coolcar.cn/trip',
          dataType:'json',
          data:{
            location:{
              latitude:loc.latitude,
              longitude:loc.longitude
            },
            avatarURL:this.data.shareLocation ? this.data.avatarURL : '',
          },
          header:{
            authorization:'jf32i9r89h'
          },
          method:'POST',
          responseType:'text',
          success(res) {
            if(res.statusCode === 200){
              const tripID = res.data.tripID
              wx.showLoading({
                title:'开锁中',
                mask:true,
              })
      
              setTimeout(() => {
                wx.redirectTo({
                  //url:`/pages/driving/driving?trip_id=${tripID}`,
                  url:routing.driving({trip_id:tripID}),
                  complete:() => {
                    wx.hideLoading()
                  }
                })
              }, 2000);

            }
          }
        })


        console.log("starting a trip",{
          location:{
            latitude:loc.latitude,
            longitude:loc.longitude
          },
          avatarURL:this.data.shareLocation ? this.data.avatarURL : '',
        })

        
        /*const tripID = 'trip456'
        wx.showLoading({
          title:'开锁中',
          mask:true,
        })

        setTimeout(() => {
          wx.redirectTo({
            //url:`/pages/driving/driving?trip_id=${tripID}`,
            url:routing.driving({trip_id:tripID}),
            complete:() => {
              wx.hideLoading()
            }
          })
        }, 2000);*/
      },

      fail:()=>{
        wx.showToast({
          icon:'none',
          title:'请前往设置页授权位置信息'
        })
      }
    })

  },

 
})