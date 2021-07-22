// components/ranking/ranking.js
import imageurl from '../../http/api'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list1:{
      type:Array,
      value:''
    },
    title:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url:imageurl.STATIC_HOST
  },

  /**
   * 组件的方法列表
   */
  methods: {
    classification(item){
      // console.log(item)
      wx.navigateTo({
        url: `/pages/classification/classification?item=${JSON.stringify(item.currentTarget.dataset.item)}`,
      })
    }
  }
})
