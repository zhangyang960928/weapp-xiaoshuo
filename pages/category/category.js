import api from '../../http/api'
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [{
        id: 'hot',
        name: '热门'
      },
      {
        id: 'new',
        name: '新书'
      },
      {
        id: 'reputation',
        name: '好评'
      },
      {
        id: 'over',
        name: '完结'
      },
      {
        id: 'monthly',
        name: 'VIP'
      }
    ],
    name: '',
    gender: '',
    list: [],
    minor: '',
    active: 0,
    active1: 0,
    start: 1,
    arr:[],
    url:api.STATIC_HOST,
  },
  // 二级目录请求
  getMinor() {
    api.getMinor().then(res => {
      // console.log(res)
      let list1 = res[this.data.gender]
      let obj = list1.filter(item => {
        return item.major === this.data.name
      })
      // console.log(obj)
     if(obj[0].mins.length>0){
      obj[0].mins.unshift('全部'),
        this.setData({
          list: obj[0].mins
        })
     }
      // console.log(this.data.list)
    }).catch(err => {
      console.log('请求失败', err)
    })
  },
  // 一级点击事件
  obtain(e) {
    // console.log(e)
    this.setData({
      active: e.currentTarget.dataset.index
    })
    this.getCatsBooks(this.data.typeList[this.data.active].id,this.data.minor)
  },
  // 二级点击事件
  obtain1(e) {
    if(e.currentTarget.dataset.item!=='全部'){
      this.setData({
        active1: e.currentTarget.dataset.index,
        minor: e.currentTarget.dataset.item
      })
    }else{
      this.setData({
        active1: e.currentTarget.dataset.index,
        minor:''
      })
    }
    this.getCatsBooks(this.data.typeList[this.data.active].id,this.data.minor)
  },
  // 详情请求
  getCatsBooks(type,minor) {
    api.getCatsBooks(
      this.data.gender,
      type,
      this.data.name,
      minor,
      this.data.start
    ).then(res => {
      console.log(res)
      this.setData({
        arr:res.books
      })
    }).catch(err => {
      console.log('请求失败', err)
    })
  },
  // 下拉
  getCatsBooks1(type,minor) {
    api.getCatsBooks(
      this.data.gender,
      type,
      this.data.name,
      minor,
      this.data.start
    ).then(res => {
      this.setData({
        arr:this.data.arr.concat(res.books)
      })
    }).catch(err => {
      console.log('请求失败', err)
    })
  },
  // 跳转详情页
  jump(e){
    wx.navigateTo({
      url: `/pages/details/details?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      name: options.name,
      gender: options.gender
    })
    wx.setNavigationBarTitle({
      title: options.name
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMinor()
    this.getCatsBooks(this.data.typeList[0].id,this.data.minor)
    // console.log(this.data.typeList[0].id)
    // console.log(this.data.minor)
    // console.log(this.data.gender)
    // console.log(this.data.name)
    // console.log(this.data.start)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      start:++this.data.start
    })
    this.getCatsBooks1(this.data.typeList[0].id,this.data.minor)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})