import { updateManager } from './utils/updateManager'
import { wxLogin } from './utils/wxCheckLogin'
//app.js
App({
  onLaunch: function () {
    // 版本更新
    updateManager()
    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },
  globalData: {
    canGet: null, // 是否是新人 true: 新人可以领优惠券
    userInfo: null,
    points: null, // 积分
    cartCount: 0, // 购物车商品数量
    cartCountObj: {}, // 商品购物车中的数量对象 {id: 0}
    switchClassifyId: null, // 首页分类跳转到分类tab id
    payParams: { // 订单支付状态判断
      status: null,
      orderNo: ''
    }
  },
  getUserInfo: async function(callback) {
    const _this = this
    if (_this.globalData.userInfo?.mobile) {
      const { canGet, userInfo: { mobile }, cartCount, points } = _this.globalData
      callback(null, { canGet, mobile, cartCount, points })
    } else {
      try {
        const res = await wxLogin()
        callback(null, res)
        const { canGet, mobile, cartCount, points } = res
        _this.globalData = { ..._this.globalData, canGet, userInfo: { mobile }, cartCount, points }
      } catch (err) {
        callback(err)
      }
    }
  }
})