import util from '../../utils/util'
import api from '../../http/api'


Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      url:api.STATIC_HOST,
      flag:true,
  },
  // 点击帮助
  help(){
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  // 点击编辑
  change(){
    this.setData({
      flag:false
    })
  },
  change1(){
    this.setData({
      flag:true
    })
  },
  // 点击清除
  remove(e){
    console.log(e)
    util.removeHistory({key:'save',data:e.currentTarget.dataset.item._id})
    this.setData({
      list:util.getHistory({key:'save'})
    })
  },
  // 书籍跳详情
  jump1(e){
    wx.navigateTo({
      url: `/pages/details/details?id=${e.currentTarget.dataset.item._id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.setData({
      list:util.getHistory({key:'save'})
    })
    // console.log(this.data.list)
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