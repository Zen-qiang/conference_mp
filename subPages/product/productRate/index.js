import Toast from '@vant/weapp/toast/toast'
import { createEvaluate } from '../../../api/order'
Page({
  data: {
    _productId: null,
    _orderno: null,
    rate: 0,
    msg: '',
  },
  onLoad (options) {
    const { productId, orderNo } = options
    this.data._productId = parseInt(productId)
    this.data._orderno = orderNo
  },
  onUnload () {
    this._timer && clearTimeout(this._timer)
  },
  _changeRate ({ detail }) {
    // console.log(detail)
    this.setData({
      rate: detail
    })
  },
  _changeMsg ({ detail: { value } }) {
    // console.log(value)
    this.setData({
      msg: value
    })
  },
  async _submit () {
    if (!this.data.rate) {
      Toast('请对商品打分')
      return
    }
    const params = {
      addEvaluateVoList: [{
        productId: this.data._productId,
        content: this.data.msg,
        level: this.data.rate
      }],
      orderNo: this.data._orderno
    }
    // console.log(params)
    await createEvaluate(params)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel?.emit('updateDataFromProductRatePage', {
      productId: this.data._productId,
      content: this.data.msg,
      level: this.data.rate
    })
    Toast({
      message: '感谢您的评价～',
      duration: 1500
    })
    this._timer = setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  }
})