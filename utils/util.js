export default {
  saveHistory({
    key,
    data,
    attr
  }) {
    // 如果是其余的数据 判断的属性可能就不叫name了
    // 拼接一个名字
    let name = key + 'History'
    let history = wx.getStorageSync(name)
    if (history) {
      // 之前存储过
      let arr = wx.getStorageSync(name)
      // 检测数据是否已经存在
      let item = null
      if (typeof data === 'string') {
        arr = arr.filter(i => {
          return i[attr] !== data
        })
        let obj = {
          [attr]: data
        }
        arr.unshift(obj)
      } else {
        arr = arr.filter(i => {
          return i[attr] !== data[attr]
        })
        arr.unshift(data)
      }
        wx.setStorageSync(name,arr)
    } else {
      // 第一次存储
      // 把存储的数据都转换成对象
      let arr = []
      if (typeof data === 'string') {
        let obj = {
          name: data
        }
        arr.unshift(obj)
      } else {
        arr.unshift(data)
      }
      wx.setStorageSync(name,arr)
    }
  },
  // 获取存储记录
  getHistory({
    key
  }) {
    let name = key + 'History'
    let arr = wx.getStorageSync(name)
    if (arr) return arr
    else return null
  },
  // 清除
  removeHistory({
    key,
    data,
  }){
    let name=key+ 'History'
    let list = this.getHistory({key}) 
    let newlist=list.filter(item=>{
      return item._id!==data
    })
    wx.setStorageSync(name, newlist)
  }
}