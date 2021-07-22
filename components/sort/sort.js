// components/sort/sort.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    jump(name){
      console.log(name.currentTarget.dataset.name)
      wx.navigateTo({
        url: `/pages/category/category?name=${name.currentTarget.dataset.name}&gender=${name.currentTarget.dataset.gender}`,
      })
    }
  }
})
