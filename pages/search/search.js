import api from "../../http/api"
import util from '../../utils/util'
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    arr: [],
    value: '',
    flag: true,
    searchList: [],
    url: api.STATIC_HOST,
    searchList1: [],
    show: true,
    page: 0,
    total:0
  },
  // 热词搜索
  hotWord() {
    api.hotWord().then(res => {
      this.setData({
        list: res.hotWords,
      })
      let color = []
      this.data.list.map(item => {
        let r = Math.floor(Math.random() * 255)
        let g = Math.floor(Math.random() * 255)
        let b = Math.floor(Math.random() * 255)
        let rgb = `rgb(${r},${g},${b})`
        color.push(rgb)
      })
      this.setData({
        arr: color
      })
      let hotword = res.hotWords
      hotword = hotword.map(item => {
        let num = Math.floor(Math.random() * res.hotWords.length)
        return hotword[num]
      })
      hotword = Array.from(new Set(hotword))
      // console.log(hotword)
      this.setData({
        list: hotword
      })
    }).catch(err => {
      console.log('请求失败', err)
    })
  },
  // 点击换一换
  change() {
    this.hotWord()
  },
  // 监听输入框的值
  bindinput(e) {
    // console.log(e)
    if (e.detail.value === '') {
      this.setData({
        flag: true,
        show: true
      })
    } else {
      this.setData({
        show: false,
      })
    }
  },
  // 回车事件
  bindconfirm(e) {
    this.setData({
      searchList: []
    })
    console.log(e.detail.value)
    if (e.detail.value.trim()) {
      this.setData({
        flag: false,
        value: e.detail.value
      })
      this.bookSearch()
      // 存历史记录
      util.saveHistory({
        key: 'search',
        data: e.detail.value.trim(),
        attr: 'name'
      })
      // 获取历史记录
      this.getHistory()
    }
  },
  // 请求
  bookSearch() {
    api.bookSearch(this.data.value, this.data.page).then(res => {
      console.log(res)
      console.log(this.data.page)
      this.setData({
        searchList: this.data.searchList.concat(res.books),
        total:res.total
      })
    }).catch(err => {
      console.log('请求失败', err)
    })
  },
  // 点击赋值
  change1(e) {
    this.setData({
      value: e.currentTarget.dataset.item,
      flag: false,
    })
    if (this.data.value === '') {
      this.setData({
        flag: true,
        show: true
      })
    } else {
      this.setData({
        show: false,
      })
    }
    this.bookSearch()
    util.saveHistory({
      key: 'search',
      data: e.currentTarget.dataset.item,
      attr: 'name'
    })
    this.getHistory()
  },
  // 点击搜索框清除
  change2() {
    this.setData({
      value: '',
      searchList: [],
      page:0
    })
    if (this.data.value === '') {
      this.setData({
        flag: true,
        show: true
      })
    } else {
      this.setData({
        show: false,
      })
    }
  },
  // 点击清除搜索历史
  remove() {
    wx.removeStorageSync('searchHistory')
    this.getHistory()
  },
  // 获取存储记录
  getHistory() {
    this.setData({
      searchList1: util.getHistory({
        key: "search"
      })
    })
  },
  // 点击跳转
  jump(e) {
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
    this.hotWord()
    this.change()
    // 获取储存的记录
    this.getHistory()
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
    if (this.data.searchList.length > 0&&(this.data.searchList.length<this.data.total)) {
      this.setData({
        page: ++this.data.page
      })
      this.bookSearch()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})