import { getCartList, deleteProduct } from '../../api/cart'
const app = getApp()
Page({
  data: {
    error: '', // 错误提示
    list: [],
    checkedAll: true,
    isCheckedAll: true,
    totalPrice: 0.00,
    checkedList: [],
    showLoginBtn: false, // 未登录显示登录按钮
    statusList: [] // status 1下架0在售2删除
  },
  onShow () {
    // console.log(app.globalData.userInfo?.mobile)
    if (app.globalData.userInfo?.mobile) {
      if (this.data.showLoginBtn) {
        this.setData({
          showLoginBtn: false
        })
      }
      this._getList()
    } else {
      this.setData({
        showLoginBtn: true
      })
    }
  },
  _getList () {
    getCartList().then(({ data }) => {
      const list = [], statusList = []
      data.cartProductVoList.forEach(item => {
        if (item.status) {
          statusList.push(item)
        } else {
          list.push(item)
        }
      })
      this.setData({
        list,
        statusList,
        totalPrice: data.carTotalPrice
      })
    }).finally (() => {
      this.setData({
        checkedAll: true,
        isCheckedAll: true,
      })
      wx.stopPullDownRefresh()
    })
  },
  onCheckAll ({ detail }) {
    // console.log('checkAll event', detail)
    this.setData({ checkedAll: !(this.data.checkedAll && this.data.isCheckedAll) })
  },
  getCalc ({ detail }) {
    // console.log('getCalc', detail)
    const { sum, num, isCheckedAll, checkedList } = detail
    app.globalData.cartCount = num
    if (parseInt(num)) {
      wx.setTabBarBadge({
        index: 2,
        text: num + ''
      })
    } else {
      wx.removeTabBarBadge({
        index: 2
      })
    }
    this.setData({
      isCheckedAll: isCheckedAll,
      totalPrice: sum,
      checkedList: checkedList
    })
  },
  onSubmit (e) {
    let paramsData = []
    if (this.data.checkedList.length) {
      paramsData = this.data.checkedList.map(item => item.productId)
    } else if (this.data.checkedAll || this.data.isCheckedAll) {
      paramsData = this.data.list.map(item => item.productId)
    } else {
      this.setData({
        error: '请至少选择一件商品'
      })
    }
    if (!paramsData.length) return
    // console.log(e, paramsData)
    wx.navigateTo({
      url: '/subPages/pay/orderReview/index',
      success (res) {
        res.eventChannel.emit('acceptDataFromCart', paramsData)
      }
    })
  },
  _toLogn () {
    wx.navigateTo({ url: '/subPages/login/login/index' })
  },
  // 清空失效的商品
  _clearAllSuccess () {
    const _this = this
    this.setData({
      statusList: []
    }, () => {
      let obj = {}
      _this.data.statusList.forEach(item => {
        obj[item.productId] = 0
      })
      const cartCountObj = { ...app.globalData.cartCountObj, ...obj }
      app.globalData.cartCountObj = cartCountObj
    })
  },
  // 删除选中的商品
  _deleteSelectedItem () {
    const _this = this
    wx.showModal({
      title: '提示',
      content: '删除当前所选商品',
      confirmColor: '#f75355',
      async success ({ confirm, cancel }) {
        if (confirm) {
          let obj = {}
          const productIds = _this.data.checkedList.reduce((acc, cur) => {
            obj[cur.productId] = 0
            acc.push(cur.productId)
            return acc
          }, [])
          await deleteProduct({ productIds: productIds.join(',') }, { showLoading: true })
          const cartCountObj = { ...app.globalData.cartCountObj, ...obj }
          app.globalData.cartCountObj = cartCountObj
          _this._getList()
        }
      }
    })
  },
  onPullDownRefresh (e) {
    this._getList()
  }
})