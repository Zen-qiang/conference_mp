import Toast from '@vant/weapp/toast/toast'
import { createEvaluate } from '../../../api/order'
Page({
  data: {
    orderno: '',
    list: [],
    active: 0,
    ratedList: []
  },
  onLoad (options) {
    const { orderno } = options
    this._eventChannel = this.getOpenerEventChannel()
    this._eventChannel.on('orderItemVoListFromOrderRate', (list) => {
      // console.log(list)
      const listMap = list.map(item => {
        return {
          ...item,
          rate: 0,
          msg: ''
        }
      })
      this.setData({ orderno, list: listMap })
    })
  },
  onUnload () {
    this._timer && clearTimeout(this._timer)
  },
  _getRated () {
    const ratedList = this.data.list.filter(item => {
      return item.rate
    })
    // this.data.ratedList = ratedList
    this.setData({ ratedList })
  },
  _selectItem ({ currentTarget: { dataset: { index } } }) {
    // console.log(index)
    this.setData({ active: index })
  },
  _changeRate ({ detail }) {
    // console.log(detail)
    const key = `list[${this.data.active}].rate`
    this.setData({
      [key]: detail
    }, () => {
      this._getRated()
    })
  },
  _changeMsg ({ detail: { value } }) {
    // console.log(value)
    const key = `list[${this.data.active}].msg`
    this.setData({
      [key]: value
    })
  },
  _batchRate () {
    const _this = this
    wx.showModal({
      content: '一键五星好评',
      success: async (res) => {
        if (res.confirm) {
          const params = {
            addEvaluateVoList: _this.data.list.map(item => {
              return {
                productId: item.productId,
                content: item.msg,
                level: 5
              }
            }),
            orderNo: _this.data.orderno
          }
          // console.log(params)
          await createEvaluate(params)
          _this._eventChannel?.emit('updateRateFromOrderRate')
          Toast({
            message: '感谢您的评价～',
            duration: 1500
          })
          _this._timer = setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        }
      }
    })
  },
  async _submit () {
    if (!this.data.ratedList.length) {
      Toast('请对商品打分')
      return
    }
    const params = {
      addEvaluateVoList: this.data.ratedList.map(item => {
        return {
          productId: item.productId,
          content: item.msg,
          level: item.rate
        }
      }),
      orderNo: this.data.orderno
    }
    // console.log(params)
    await createEvaluate(params)
    this._eventChannel?.emit('updateRateFromOrderRate')
    Toast({
      message: '感谢您的评价～',
      duration: 1500
    })
    this._timer = setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  }
})