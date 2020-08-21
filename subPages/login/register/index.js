import { wxCheckSession } from '../../../utils/wxCheckLogin'
import { login, sendMessage, mobileLogin } from '../../../api/user'
const app = getApp()
Page({
  data: {
    tel: '',
    sms: '',
    dis: true,
    text: '验证码',
    tips: {
      msg: '',
      type: 'error', // info、error、success
      show: false
    },
    logging: false
  },
  onUnload () {
    if (this._interval) clearInterval(this._interval)
  },
  onTelChange ({ detail }) {
    this.setData({
      tel: detail,
      dis: !/^1(3|4|5|7|8)\d{9}$/.test(detail)
    })
  },
  onSmsChange ({ detail }) {
    this.setData({
      sms: detail
    })
  },
  getSms (e) {
    if (this.data.text !== '验证码') {
      const tips = { msg: '验证码已发送，请耐心等待!', type: 'error', show: true }
      this.setData({ tips })
      return
    }
    sendMessage({ mobile: this.data.tel }).then(({ data }) => {
      console.log(data)
    })
    let time = 60
    this._interval = setInterval(() => {
      time--
      const text = time <= 0 ? '验证码' : `(${time}秒)`
      this.setData({ text })
      if (time <= 0) clearInterval(this._interval)
    }, 1000)
  },
  toLogin (e) {
    clearInterval(this._interval)
    this.setData({ logging: true, text: '验证码' })
    mobileLogin({ mobile: this.data.tel, verification: this.data.sms }, { showToast: false }).then(({ data }) => {
      // console.log(data)
      const { cartCount, mobile, canGet, points } = data
      Object.assign(app.globalData, { canGet, cartCount, userInfo: { mobile }, points })
      wx.navigateBack({ delta: 2 })
    }).catch(err => {
      const tips = { msg: err.msg || '登录失败！', type: 'error', show: true }
      this.setData({ tips })
    }).finally(() => {
      this.setData({ logging: false })
    })
  },
  _getPhoneNumber ({ detail }) {
    // console.log(detail)
    const ok = detail.errMsg === 'getPhoneNumber:ok'
    if (ok) {
      const { encryptedData, iv } = detail
      login({ encryptedData, iv }).then(({ data }) => {
        const { cartCount, mobile, canGet, points } = data
        Object.assign(app.globalData, { canGet, cartCount, userInfo: { mobile }, points })
        wx.navigateBack({ delta: 2 })
      })
    } else {
      wx.showModal({
        title: '授权失败',
        content: '您已拒绝获取微信绑定手机号登录授权，可使用其它手机号验证登录',
        cancelText: '知道了',
        confirmText: '验证登录'
      })
    }
  }
})