import api from '../../http/api'
// pages/bookcity/bookcity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[
      {name:'分类'},
      {name:'排行'}
    ],
    active:0,
    list:{},
    list1:[],
    list2:[],
  },
  setIndex(e){
    // console.log(e.currentTarget.dataset.index)
    this.setData({
      active:e.currentTarget.dataset.index
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
    api.getCats().then(res=>{
      res.male.map(item=>{
        item.gender='male'
      })
      res.female.map(item=>{
        item.gender='female'
      })
      res.press.map(item=>{
        item.gender='press'
      })
      // console.log(res)
      this.setData({
        list:res
      })
    }).catch(err=>{
      console.log('请求失败',err)
    })
    api.rankCategory().then(res=>{
      // console.log(res)
      this.setData({
        list1:res.male.slice(0,6),
        list2:res.female
        .slice(0,6),
      })
    }).catch(err=>{
      console.log('请求失败',err)
    })
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