import { orderPay } from '../../../api/order'
const app = getApp()
Page({
  data: {
    status: null, // 支付结果状态
    orderNo: ''
  },
  onLoad (options) {
    // console.log(options)
    const { orderNo, status } = options
    this.setData({ orderNo, status: parseInt(status) })
    // console.log('onload', app.globalData.payParams)
    // const { status } = app.globalData.payParams
    // if (!status) {
    //   const { orderNo } = app.globalData.payParams
    //   this.setData({ orderNo })
    // }
    // this.setData({ status })
  },
  // onUnload () {
  //   app.globalData.payParams = {
  //     status: null,
  //     orderNo: ''
  //   }
  //   console.log('onunload', app.globalData.payParams)
  // },
  toOrder () {
    // console.log('toorder', this.data.orderNo)
    wx.navigateTo({
      url: `/subPages/order/orderDetail/index?orderNo=${this.data.orderNo}`
    })
  },
  async pay () {
    const _this = this
    const params = { orderNo: this.data.orderNo }
    const { data: { timeStamp, nonce_str: nonceStr, prepay_id, paySign } } = await orderPay(params, { showLoading: true })
    wx.requestPayment({
      timeStamp,
      nonceStr,
      package: `prepay_id=${prepay_id}`,
      signType: 'MD5',
      paySign,
      success (res) {
        _this.setData({ status: true })
      }
    })
  }
})