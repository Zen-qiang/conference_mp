import { wxCheckSession, wxLogin } from '../../../utils/wxCheckLogin'
import { login } from '../../../api/user'
const app = getApp()
Page({
  data: {
  },
  onLoad () {
    wxCheckSession()
    // this._eventChannel = this.getOpenerEventChannel()
  },
  _getPhoneNumber ({ detail }) {
    // console.log(detail)
    // await wxCheckSession()
    const ok = detail.errMsg === 'getPhoneNumber:ok'
    if (ok) {
      const { encryptedData, iv } = detail
      login({ encryptedData, iv }).then(({ data }) => {
        const { cartCount, mobile, canGet, points } = data
        Object.assign(app.globalData, { canGet, cartCount, userInfo: { mobile }, points })
        wx.navigateBack()
      })
      // wxCheckSession().then(token => {
      //   // console.log(token)
      //   login({ encryptedData, iv }).then(({ data }) => {
      //     // console.log(data)
      //     const { cartCount, mobile, orderStatusCount, token } = data
      //     wx.setStorageSync('token', token)
      //     Object.assign(app.globalData, { cartCount, orderStatusCount, userInfo: { mobile } })
      //     // this._eventChannel?.emit?.('getLoginInfo')
      //     wx.navigateBack()
      //   })
      // })
    } else {
      wx.showModal({
        title: '授权失败',
        content: '您已拒绝获取微信绑定手机号登录授权，可使用其它手机号验证登录',
        cancelText: '知道了',
        confirmText: '验证登录',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({ url: '/subPages/login/register/index' })
          }
        }
      })
    }
  }
})