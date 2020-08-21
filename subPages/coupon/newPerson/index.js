import { sendCouponForNewUser } from '../../../api/common'
import Toast from '@vant/weapp/toast/toast'
Page({
  data: {
    inputVal: '',
    showPop: false
  },
  _onInput ({ detail }) {
    // console.log(detail)
    this.setData({ inputVal: detail.value })
  },
  _getCoupon () {
    if (this.data.inputVal === '') {
      Toast('请输入手机号')
      return
    }
    if (this.data.inputVal.length != 11) {
      Toast('请正确输入手机号')
      return
    }
    sendCouponForNewUser(this.data.inputVal).then(({ data }) => {
      // console.log(data)
      // Toast('领取成功，请至我的优惠券页面查看')
      this.setData({ showPop: true })
    })
  },
  _closePop () {
    this.setData({ showPop: false })
  },
  _toGetCoupon () {
    const _this = this
    wx.navigateBack({
      success () {
        _this.setData({ showPop: false })
      }
    })
  },
})