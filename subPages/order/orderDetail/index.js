import { orderDetail, orderCancel, orderPay, orderSuccess } from '../../../api/order'
import Toast from '@vant/weapp/toast/toast'
Page({
  data: {
    orderNo: '',
    amt: null,
    createTime: '',
    note: '',
    orderAddressVo: {
      name: '',
      mobile: '',
      areas: '',
      address: ''
    },
    orderCouponAmt: null,
    orderItemVoList: [],
    orderno: '',
    postage: null,
    qty: null,
    status: null,
    more: false // 展示所有商品
  },
  onLoad (options) {
    this._eventChannel = this.getOpenerEventChannel()
    // console.log(this._eventChannel)
    const { orderNo } = options
    this.data.orderNo = orderNo
    this._getDetail(orderNo)
  },
  unOnLoad () {
    this._timer && clearTimeout(this._timer)
  },
  _getDetail (orderNo) {
    orderDetail({ orderNo }, { showLoading: true }).then(({ data }) => {
      // console.log(data)
      const { amt, createTime, note, orderAddressVo, orderCouponAmt, orderItemVoList, orderno, postage, qty, status } = data
      this.setData({ amt, createTime, note, orderAddressVo, orderCouponAmt, orderItemVoList, orderno, postage, qty, status })
    })
  },
  _displayMore () {
    this.setData({
      more: !this.data.more
    })
  },
  _orderCancel ({ currentTarget: { dataset: { no: orderNo } } }) {
    // console.log(orderNo)
    const _this = this
    wx.showModal({
      title: '提示',
      content: '确认取消订单',
      confirmColor: '#f75355',
      async success ({ confirm, cancel }) {
        if (confirm) {
          await orderCancel({ orderNo })
          Toast.success('订单已取消')
          // console.log(this._eventChannel)
          _this._eventChannel?.emit('fromOrderDetail')
          _this._timer = setTimeout(() => {
            // 获取当前页面栈
            const pages = getCurrentPages()
            const prePages = pages[pages.length - 2]
            // 判断是否从订单状态页面跳转过来
            if (prePages.route === 'subPages/pay/payStatus/index') {
              wx.redirectTo({ url: '/subPages/order/order/index' })
              return
            }
            wx.navigateBack()
          }, 1500)
        }
      }
    })
  },
  async _orderPay ({ currentTarget: { dataset: { no: orderNo } } }) {
    // console.log(orderNo)
    const _this = this
    const params = { orderNo }
    const { data: { timeStamp, nonce_str: nonceStr, prepay_id, paySign } } = await orderPay(params, { showLoading: true })
    wx.requestPayment({
      timeStamp,
      nonceStr,
      package: `prepay_id=${prepay_id}`,
      signType: 'MD5',
      paySign,
      success (res) {
        Toast.success('支付成功')
        _this._eventChannel?.emit('fromOrderDetail')
        _this._timer = setTimeout(() => { wx.navigateBack() }, 1500)
      }
    })
  },
  async _orderConfirm ({ currentTarget: { dataset: { no: orderNo } } }) {
    const _this = this
    wx.showModal({
      title: '提示',
      content: '确认收货',
      confirmColor: '#f75355',
      async success ({ confirm, cancel }) {
        if (confirm) {
          await orderSuccess(orderNo)
          Toast.success('订单已确认收货')
          _this._eventChannel?.emit('fromOrderDetail')
          _this._timer = setTimeout(() => { wx.navigateBack() }, 1500)
        }
      }
    })
  },
  _orderRate ({ currentTarget: { dataset: { no: orderNo } } }) {
    const _this = this
    wx.navigateTo({
      url: `/subPages/order/orderRate/index?orderno=${orderNo}`,
      events: {
        updateRateFromOrderRate () {
          _this._getDetail(_this.data.orderNo)
          _this._eventChannel?.emit('fromOrderDetail')
        }
      },
      success (res) {
        res.eventChannel.emit('orderItemVoListFromOrderRate', _this.data.orderItemVoList)
      }
    })
  }
})