import { wxCheckSession } from '../../../utils/wxCheckLogin'
import { orderPreview, createOrder, refreshOrderPreview } from '../../../api/order'
import { getServicetime, orderCouponList } from '../../../api/common'
import Toast from '@vant/weapp/toast/toast'
const app = getApp()
Page({
  data: {
    comment: '', // 备注
    time: {}, // 送达时间
    amt: '', // 金额
    orderAddressVo: {}, // 地址
    orderItemVoList: [], // 商品列表
    previewCouponVo: {}, // 优惠券
    qty: '', // 商品订购数量
    realAmt: '', // 真实价格
    postage: '', // 运费
    error: '',
    showPop: false,
    couponList: null, // 可用优惠券
    couponLoaded: false,
    showPop_date: false,
    timeValue: ''
  },
  onLoad (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromCart', async (data) => {
      // console.log(data)
      const { data: { amt, orderAddressVo, orderItemVoList, previewCouponVo, qty, realAmt, postage } } = await orderPreview({ productIds: data.join(',') })
      // console.log({ amt, orderAddressVo, orderItemVoList, previewCouponVo, qty, realAmt })
      this.setData({ amt, orderAddressVo, orderItemVoList, previewCouponVo, qty, realAmt, postage })
    })
  },
  _toAddress () {
    const _this = this
    wx.navigateTo({
      url: '/subPages/address/address/index',
      events: {
        // 从地址页面传过来的选中的值
        acceptDataFromAddress (data) {
          // console.log(data)
          const { addressId: id, mobile, name, address, areas } = data
          _this.setData({
            orderAddressVo: { id, mobile, name, address, areas },
            time: {}, // 重新选择地址 所以时间要清空
            timeValue: ''
          })
        }
      },
      success (res) {
        // 进入到选择地址页面 让地址列表可以点击
        res.eventChannel.emit('acceptDataFromReviewOrder', { enableClick: true })
      }
    })
  },
  // 选择时间
  async _selectTime () {
    if (!this.data.orderAddressVo?.id) {
      Toast('请选择地址!')
      return
    }
    const params = {
      areas: this.data.orderAddressVo.areas
    }
    const { data } = await getServicetime(params, { showLoading: true })
    // console.log(data)
    this.setData({ showPop_date: true })
    this.setData({ time: data, timeValue: data.date + ' ' + data.time[0] })
  },
  _timeChange ({ detail: { value } }) {
    // console.log(value)
    this.setData({ timeValue: this.data.time.date + ' ' + this.data.time.time[value[1]]})
  },
  // 跳转到商品清单
  _toOrderItemList () {
    const _this = this
    wx.navigateTo({
      url: '/subPages/pay/orderItemList/index',
      success (res) {
        // 进入到商品清单
        res.eventChannel.emit('orderItemListFromReviewOrder', _this.data.orderItemVoList)
      }
    })
  },
  // 跳转优惠券页面
  async _toCoupon () {
    this.setData({ showPop: true })
    try {
      const { data: couponList } = await orderCouponList(this.data.amt)
      this.setData({ couponList })
    } catch(err) {
      console.log(err)
    }
    this.setData({ couponLoaded: true })
  },
  _closePop_date () {
    this.setData({ showPop_date: false })
  },
  _closePop () {
    this.setData({ showPop: false, couponLoaded: false })
  },
  async _useCoupon ({ currentTarget: { dataset: { id, amt }}}) {
    // console.log(id)
    const { data } = await refreshOrderPreview(id)
    this.setData({
      previewCouponVo: { id, amt },
      amt: data.amt,
      realAmt: data.realAmt,
      showPop: false
    })
  },
  async _nouseCoupon () {
    // console.log(id)
    const { data } = await refreshOrderPreview()
    this.data.previewCouponVo.id = null
    this.data.previewCouponVo.amt = null
    this.setData({
      previewCouponVo: this.data.previewCouponVo,
      amt: data.amt,
      realAmt: data.realAmt,
      showPop: false
    })
  },
  // 编辑备注
  _commentChange ({ detail }) {
    this.setData({ comment: detail })
  },
  async onSubmit () {
    if (!this.data.orderAddressVo?.id) {
      this.setData({
        error: '请选择送达收货地址'
      })
      return
    }
    if (!this.data.timeValue) {
      this.setData({
        error: '请选择送达时间'
      })
      this._selectTime()
      return
    }
    // console.log('creatOrder')
    const productIds = this.data.orderItemVoList.reduce((acc, cur) => {
      acc.push(cur.productId)
      return acc
    }, [])
    const params = {
      productIds: productIds.join(','),
      addressId: this.data.orderAddressVo.id,
      userCouponId: this.data.previewCouponVo?.id || null, // 用户优惠券id
      serviceDate: this.data.timeValue, // 送达时间
      note: this.data.comment || null // 备注
    }
    await wxCheckSession()
    const { data: { timeStamp, nonce_str: nonceStr, prepay_id, paySign, out_trade_no: orderNo } } = await createOrder(params, { showLoading: true })
    // const { data: { timeStamp, nonce_str: nonceStr, prepay_id, paySign, out_trade_no: orderNo } } = await orderPayTest({}, { showLoading: true })
    wx.requestPayment({
      timeStamp,
      nonceStr,
      package: `prepay_id=${prepay_id}`,
      signType: 'MD5',
      paySign,
      success (res) {
        // console.log(res)
        wx.redirectTo({
          url: `/subPages/pay/payStatus/index?orderNo=${orderNo}&status=1`
          // success (result) {
          //   app.globalData.payParams = { status: true, orderNo }
          //   console.log(app.globalData.payParams)
          // }
        })
      },
      fail (err) {
        // console.log(err)
        wx.redirectTo({
          url: `/subPages/pay/payStatus/index?orderNo=${orderNo}&status=0`
          // success (result) {
          //   app.globalData.payParams = { status: false, orderNo }
          //   console.log(app.globalData.payParams)
          // }
        })
      }
    })
  }
})