import { routing } from "../../utils/routing"

interface Trip{
  id:string
  start:string
  end:string
  duration:string
  distance:string
  fee:string
  status:string
}

interface MainItem{
  id:string
  navId:string
  data:Trip
  navScrollId:string
}

interface NavItem{
  id:string
  mainId:string
  label:string
}

interface MainItemQueryResult{
  id:string
  top:number
  dataset:{
    navId:string
    navScrollId:string
  }
}

// pages/mytrips/mytrips.ts
Page({

  scrollStates:{
    mainItems:[] as MainItemQueryResult[],
  },
  /**
   * 页面的初始数据
   */
  data: {
    promotionItems: [
        {
            img: 'https://img.mukewang.com/5f7301d80001fdee18720764.jpg',
            promotionID: 1,
        },            
        {
            img: 'https://img.mukewang.com/5f6805710001326c18720764.jpg',
            promotionID: 2,
        },
        {
            img: 'https://img.mukewang.com/5f6173b400013d4718720764.jpg',
            promotionID: 3,
        },
        {
            img: 'https://img.mukewang.com/5f7141ad0001b36418720764.jpg',
            promotionID: 4,
        },
    ],
    avatarURL: '',
    navCount:0,
    mainItems:[] as MainItem[],
    navItems:[] as NavItem[],
    tripsHeight:0,
    mainScroll:'',
    navSel:'',
    navScroll:'',


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.populateTrips()
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({
      avatarURL:userInfo.avatarUrl
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  onReady(){
    wx.createSelectorQuery().select('#heading').boundingClientRect(rect =>{
      const height = wx.getSystemInfoSync().windowHeight - rect.height
      this.setData({
        tripsHeight:height,
        navCount:Math.round(height/50)
      })
      
    }).exec()
  },

  populateTrips(){
    const mainItems : MainItem[] = []
    const navItems : NavItem[] = []
    let navSel = ''
    let prevNav = ''
    for(let i =0; i < 100; i++){
      const mainId = 'main-' + i
      const navId = 'nav-' + i
      const tripId = (10001 + i).toString()
      if(!prevNav){
        prevNav = navId
      }
      mainItems.push({
        id:mainId,
        navId:navId,
        navScrollId:prevNav,
        data:{
          id:tripId,
          start:'东方明珠',
          end:'迪士尼乐园',
          distance:'27.0公里',
          fee:'128.00元',
          duration:'00时44分',
          status:'已完成',
        }
        
      })

      navItems.push({
        id:navId,
        mainId:mainId,
        label:tripId
      })
      if(i === 0){
        navSel = navId
      }
      prevNav = navId
    }
    this.setData({
      mainItems,
      navItems,
      navSel,
    },()=>{
      this.prepareScrollStates()
    })
  },

  prepareScrollStates(){
    wx.createSelectorQuery().selectAll('.main-item').fields({
      id:true,
      dataset:true,
      rect:true
    }).exec(res=>{
      this.scrollStates.mainItems = res[0]
    })
  },

  onPromotionItemTap(e: any) {
    const promotionID:number = e.currentTarget.dataset.promotionId
    if (promotionID) {
        console.log('claiming promotion', promotionID)
    }
  },

  onGetUserInfo(e: any) {
    const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
    if (userInfo) {
        //getApp<IAppOption>().resolveUserInfo(userInfo)
        this.setData({
            avatarURL: userInfo.avatarUrl,
        })
    }
  },

  onRegisterTap() {
    wx.navigateTo({
        //url: '/pages/register/register',
        url:routing.register(),
    })
  },

  onNavItemTap(e:any){
    const mainId:string = e.currentTarget?.dataset?.mainId
    const navId:string = e.currentTarget?.id
    if(mainId && navId){
      this.setData({
        mainScroll:mainId,
        navSel:navId, 
      })
    }
  },

  onMainScroll(e:any){
    const top:number = e.currentTarget?.offsetTop + e.detail?.scrollTop
    if(top === undefined){
      return
    }

    const selItem = this.scrollStates.mainItems.find(v=>
      v.top >= top)
    if(!selItem){
      return
    }

    this.setData({
      navSel:selItem.dataset.navId,
      navScroll:selItem.dataset.navScrollId,
    })
  },

})