import { getAddressList, deleteAddress, addOrUpdateAddress } from '../../../api/address'
Page({
  data: {
    _pageNum: 1,
    list: [],
    defaultAddressId: null,
    canSelect: false // 是否可以选择地址
  },
  onLoad () {
    this._eventChannel = this.getOpenerEventChannel()
    this._eventChannel?.on('acceptDataFromReviewOrder', data => {
      // console.log(data)
      this.setData({ canSelect: data.enableClick })
    })
    this._getList()
  },
  async _getList () {
    const params = {
      pageNum: this.data._pageNum
    }
    const { data: { list } } = await getAddressList(params, { showLoading: true })
    // console.log(data)
    let defaultAddressId = null // 设置默认地址为选中状态
    for (let i = 0; i < list.length; i++) {
      if (list[i]?.prime) { // 为1时是默认地址
        defaultAddressId = list[i].addressId
        break
      }
    }
    this.setData({ list, defaultAddressId })
  },
  // 选择地址
  _selectAddress ({ currentTarget: { dataset: { id, index } } }) {
    if (!this.data.canSelect) return
    // console.log(id, index)
    this.setData({
      defaultAddressId: id // 设置当前选择地址
    }, () => {
      // 更改review页面地址
      this._eventChannel?.emit('acceptDataFromAddress', this.data.list[index])
      wx.navigateBack()
    })
  },
  _editAddress ({ currentTarget: { dataset: { id, index } } }) {
    // console.log(id, index)
    const _this = this
    wx.navigateTo({
      url: `/subPages/address/addressEdit/index?id=${id}`,
      events: {
        // 从编辑地址页面传过来之后更新地址列表
        acceptDataFromEditAddress () {
          _this._getList()
        }
      },
      success (res) {
        // 进入到编辑地址页面
        res.eventChannel.emit('acceptDataFromAddressToEdit', { address: _this.data.list[index] })
      }
    })
  },
  _addAddress () {
    const _this = this
    wx.navigateTo({
      url: '/subPages/address/addressEdit/index',
      events: {
        // 从编辑地址页面传过来之后更新地址列表
        acceptDataFromEditAddress () {
          _this._getList()
        }
      }
    })
  }
})