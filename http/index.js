import Fly from '../lib/wx'
let fly = new Fly

// 基础路径
fly.config.baseURL = 'https://api.zhuishushenqi.com'

// 请求拦截
// 每次发请求的时候会触发
fly.interceptors.request.use(config => {
  wx.showLoading({
    title: '加载中...'
  })
  return config
}, err => {
  wx.hideLoading()
  return Promise.reject(err)
})


// 响应拦截
// 每一次请求有结果的时候会触发
fly.interceptors.response.use(res => {
  wx.hideLoading()
  return res.data
}, err => {
  wx.hideLoading()
  console.log(err)
  // 每次请求失败的状态码
  // let status = err.response && err.response.status
  // if (status === 400) {
  //   Toast.fail('参数错误')
  // }
  // if (status === 401) {
  //   Toast.fail('登录过期')
  // }
  // if (status === 403) {
  //   Toast.fail('没有全选')
  // }
  // if (status === 404) {
  //   Toast.fail('路径错误')
  // }
  // if (status === 500) {
  //   Toast.fail('服务器错误')
  // }
  // if (status === 503) {
  //   Toast.fail('服务器维护')
  // }
  return Promise.reject(err)
})

export default fly
