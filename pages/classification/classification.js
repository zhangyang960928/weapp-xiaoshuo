// pages/classification/classification.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    _id:'',
    monthRank:'',
    totalRank:'',
    list:[],
    url:api.STATIC_HOST,
  },
  // 点击事件
  setIndex(e){
    this.setData({
      active:e.currentTarget.dataset.index
    })
    this.getbooks(e.currentTarget.dataset.id)
  },
  // 发请求
  getbooks(id){
    api.rankInfo(id).then(res=>{
      // console.log(res)
      this.setData({
        list:res.ranking.books
      })
      console.log(this.data.list)
    }).catch(err=>{
      console.log('请求失败',err)
    })
  },
  // 点击跳转详情
  jump(id){
    console.log(id)
    wx.navigateTo({
      url: `/pages/details/details?id=${id.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _id:JSON.parse(options.item)._id,
      monthRank:JSON.parse(options.item).monthRank,
      totalRank:JSON.parse(options.item).totalRank,
    })
    // console.log(this.data._id)
    wx.setNavigationBarTitle({
      title:JSON.parse(options.item).title
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
    this.getbooks(this.data._id)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})