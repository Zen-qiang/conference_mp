import { getAreasList, addOrUpdateAddress, deleteAddress } from '../../../api/address'
import Toast from '@vant/weapp/toast/toast'
Page({
  data: {
    areaList: [], // 区域列表
    areaIndex: null, // 区域下标
    id: null,
    name: '',
    mobil: '',
    address: '',
    prime: 0, // 是否为默认地址
    radio: ''
  },
  onLoad (options) {
    getAreasList().then(res => {
      // console.log(res)
      const { data: { list: areaList } } = res
      this.setData({ areaList })
    })
    const { id } = options
    if (id) {
      this.setData({ id })
      wx.setNavigationBarTitle({
        title: '编辑地址'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '新增地址'
      })
    }
    this._eventChannel = this.getOpenerEventChannel()
    this._eventChannel?.on('acceptDataFromAddressToEdit', data => {
      // console.log(data)
      const { address: { address, mobile, name } } = data
      this.setData({ address, mobile, name })
    })
  },
  onChange ({ detail, currentTarget: { dataset: { key } } }) {
    // console.log(detail, key)
    this.setData({
      [key]: detail
    })
  },
  _genderChange ({ detail: { value } }) {
    // console.log(value)
    this.setData({ radio: value })
  },
  _primeSwitch ({ detail }) {
    this.setData({ prime: detail })
  },
  _pickerChange ({ detail: { value } }) {
    // console.log(value)
    this.setData({ areaIndex: value })
  },
  async _addOrUpdateAddress () {
    this.setData({
      saving: true
    })
    const params = {
      address: this.data.address,
      addressId: this.data.id || null,
      areas: this.data.areaList[this.data.areaIndex]?.name || '',
      mobile: this.data.mobile,
      name: this.data.name + this.data.radio,
      prime: this.data.prime // 是否为默认地址
    }
    try {
      await addOrUpdateAddress(params)
      this.setData({ saving: false })
      Toast.success('保存成功')
      this._eventChannel?.emit('acceptDataFromEditAddress')
      wx.navigateBack()
    } catch (err) {
      this.setData({ saving: false })
    }
  },
  _deleteAddress () {
    const _this = this
    wx.showModal({
      title: '提示',
      content: '确认删除地址',
      async success (res) {
        if (res.confirm) {
          await deleteAddress({ addressId: parseInt(_this.data.id) }, { showLoading: true })
          _this._eventChannel?.emit('acceptDataFromEditAddress')
          wx.navigateBack()
        }
      }
    })
  }
})