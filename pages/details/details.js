import api from '../../http/api'
import util from '../../utils/util'

// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    url: api.STATIC_HOST,
    list: {},
    index: 0,
    list1: [],
    books: [],
    score: '',
    arr: [],
    arr1: [],
    page: 1,
    flag: false,
    flag1: true,
  },
  // 发请求
  getDetails() {
    api.bookInfo(this.data.id).then(res => {
      this.setData({
        list: res,
        score: Math.floor(res.rating.score / 2)
      })
      // console.log(this.data.list)
      // console.log(this.data.score)
    }).catch(err => {
      console.log("请求失败", err)
    })
  },
  // 点击下标
  changecolor(e) {
    this.setData({
      index: e.currentTarget.dataset.index
    })
  },
  // 随机生成
  change() {
    if (this.data.books.length > 3) {
      let num = Math.floor(Math.random() * (this.data.books.length - 2))
      this.setData({
        list1: this.data.books.slice(num, num + 3)
      })
    }
  },
  // 点击随机的跳转
  jump(id) {
    wx.navigateTo({
      url: `/pages/details/details?id=${id.currentTarget.dataset.id}`,
    })
  },
  // 评论请求
  shortReviews() {
    api.shortReviews(this.data.id).then(res => {
      console.log(res)
      this.setData({
        arr: this.data.arr.concat(res.docs),
        arr1: res
      })
    }).catch(err => {
      console.log('请求失败', err)
    })
  },
  // 下拉评论
  bindscrolltolower() {
    this.setData({
      page: ++this.data.page
    })
    this.shortReviews()
  },
  // 遮罩层
  add() {
    this.setData({
      flag: true
    })
  },
  add1() {
    this.setData({
      flag: false
    })
  },
  // 点击加入书架
  join() {
    // console.log(11111)
    util.saveHistory({
      key: 'save',
      data: this.data.list,
      attr: '_id'
    })
    this.setData({
      flag1: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      id: options.id
    })
    // console.log(this.data.id)
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
    this.getDetails()
    // console.log(this.data.id)
    api.relatedRecommendedBooks(this.data.id).then(res => {
      this.setData({
        books: res.books
      })
      if (this.data.books.length < 3) {
        this.setData({
          list1: this.data.books,
        })
      } else {
        this.change()
      }
      // console.log(this.data.list1)
    }).catch(err => {
      console.log('请求失败', err)
    })
    this.shortReviews()
    let arr1 = util.getHistory({
      key: 'save',
    })
    let obj = arr1.filter(item => {
      return item._id === this.data.id
    })
    if (obj.length > 0) {
      this.setData({
        flag1: false
      })
    }
  },
  // 长安保存
  bindlongpress(e) {

    wx.showActionSheet({
      itemList: ['保存图片'],
      success(res) {
        wx.downloadFile({
          url: e.currentTarget.dataset.url, //仅为示例，并非真实的资源
          success(res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
              })
            }
          }
        })
      },
      fail(){}
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