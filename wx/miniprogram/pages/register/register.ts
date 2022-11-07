import { routing } from "../../utils/routing"

// pages/register/register.ts
Page({
  redirectURL:'',
  /**
   * 页面的初始数据
   */
  data: {
    state:'UNSUBMITTED' as 'UNSUBMITTED' | 'PENDING' | 'VERIFIED',
    licNo:'',
    name:'',
    birthDate:'1990-01-01',
    genderIndex:0,
    genders:['未知','男','女','其他'],
    licImgURL:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opt:Record<'redirect',string>) {
    const o:routing.RegisterOpts = opt
    if(o.redirect){
      this.redirectURL = decodeURIComponent(o.redirect)
    }

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  onUploadLic(){
    wx.chooseMedia({
      success:res=>{
        this.setData({
          licImgURL:res.tempFiles[0].tempFilePath,
        })

        setTimeout(()=>{
          this.setData({
            licNo:'123456789',
            name:'张三',
            genderIndex:1,
            birthDate:'1996-11-04'
          })
        },1000)

      }
    })
  },

  onGenderChange(e:any){
    this.setData({
      genderIndex:e.detail.value,
    })
  },

  onBirthDateChange(e:any){
    this.setData({
      birthDate:e.detail.value
    })
  },

  onSubmit(){
    this.setData({
      state:'PENDING'
    })

    setTimeout(()=>{
      this.onLicVerified()
    },3000)

  },

  onResubmit(){
    this.setData({
      state:'UNSUBMITTED',
      licImgURL:'',
    })
  },

  onLicVerified(){
    this.setData({
      state:'VERIFIED',
    })

    if(this.redirectURL){
      wx.redirectTo({
        url:this.redirectURL,
      })
    }

   
  },

  
})