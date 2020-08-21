import { getOrderList, orderCancel, orderPay, orderSuccess } from '../../../api/order'
import Toast from '@vant/weapp/toast/toast'
Page({
  data: {
    active: 0,
    triggered: false,
    _pageNum: 1,
    isNoMore: false,
    list: []
  },
  onLoad (options) {
    // console.log(options)
    const { id } = options
    this.setData({ active: parseInt(id) || 0 })
    this._getList()
  },
  _getList () {
    const params = {
      pageNum: this.data._pageNum,
      status: this.data.active || ''
    }
    // 获取对应订单状态的列表，如果需要获取全部订单列表则不传,1待支付 3待收货 4待评价 6售后退款
    getOrderList(params, { showLoading: true }).then(({ data }) => {
      // console.log(data)
      if (data) {
        const list = this.data._pageNum === 1 ? data.list : this.data.list.push(...data.list)
        this.setData({
          list,
          isNoMore: data.isLastPage
        })
      } else {
        this.setData({
          list: [],
          isNoMore: true
        })
      }
    }).catch(err => {
      this.setData({ isNoMore: true })
    }).finally(() => {
      // console.log('finally')
      this.setData({
        triggered: false
      })
    })
  },
  _tabChange ({ currentTarget: { dataset: { index } } }) {
    // console.log(index)
    this.setData({ active: index, isNoMore: false, list: [] })
    this.data._pageNum = 1
    this._getList()
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
          _this.setData({ isNoMore: false })
          _this.data._pageNum = 1
          _this._getList()
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
        _this.setData({ isNoMore: false })
        _this.data._pageNum = 1
        _this._getList()
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
          _this.setData({ isNoMore: false })
          _this.data._pageNum = 1
          _this._getList()
        }
      }
    })
  },
  _orderRate ({ currentTarget: { dataset: { no: orderNo, index } } }) {
    const _this = this
    wx.navigateTo({
      url: `/subPages/order/orderRate/index?orderno=${orderNo}`,
      events: {
        updateRateFromOrderRate () {
          _this.setData({ isNoMore: false })
          _this.data._pageNum = 1
          _this._getList()
        }
      },
      success (res) {
        res.eventChannel.emit('orderItemVoListFromOrderRate', _this.data.list[index].orderItemVoList)
      }
    })
  },
  _toOrderDetail ({ currentTarget: { dataset: { no: orderNo } } }) {
    // console.log(orderNo)
    const _this = this
    wx.navigateTo({
      url: `/subPages/order/orderDetail/index?orderNo=${orderNo}`,
      events: {
        // 从编辑地址页面传过来之后更新地址列表
        fromOrderDetail () {
          // console.log('fromOrderDetail')
          _this.setData({ isNoMore: false })
          _this.data._pageNum = 1
          _this._getList()
        }
      }
    })
  },
  _refresherrefresh () {
    this.data._pageNum = 1
    this._getList()
  },
  _scrolltolower () {
    if (this.data.isNoMore) return
    this.data._pageNum = this.data._pageNum + 1
    this._getList()
  }
})