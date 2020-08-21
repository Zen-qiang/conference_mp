import { logOut } from '../../api/user'
import { refreshCount } from '../../api/order'
const app = getApp()
Page({
  data: {
    avatar: '',
    userInfo: {},
    points: null,
    cartCount: null,
    version: '',
    gardList: [
      // POSTAGE(30,"运费门槛金额"),
      // CANCELED(0, "已取消"),
      // NO_PAY(1, "未支付"),
      // PAID(2, "已付款"),
      // SHIPPED(3, "已发货"),
      // ORDER_SUCCESS(4, "订单完成"),
      // ORDER_CLOSE(5, "订单关闭"),
      // REFUND(6, "退款售后")
      {
        icon: 'peer-pay',
        text: '待支付',
        alias: '未支付',
        index: '1',
        info: ''
      },
      {
        icon: 'send-gift-o',
        text: '待收货',
        alias: '已发货',
        index: '3',
        info: ''
      },
      {
        icon: 'comment-o',
        text: '待评价',
        alias: '订单完成',
        index: '4',
        info: ''
      }
    ]
  },
  onLoad () {
    const accountInfo = wx.getAccountInfoSync()
    this.setData({
      version: accountInfo.miniProgram.version
    })
  },
  onShow () {
    const { cartCount, userInfo, points } = app.globalData
    if (parseInt(cartCount)) {
      wx.setTabBarBadge({
        index: 2,
        text: cartCount + ''
      })
    } else {
      wx.removeTabBarBadge({
        index: 2
      })
    }
    if (userInfo?.mobile) {
      this.setData({
        userInfo: userInfo,
        points
      })
      refreshCount().then(({ data }) => {
        // console.log(data)
        if (!data) return
        this.data.gardList.forEach(item => {
          item.info = ''
          for (let i = 0; i < data.length; i++) {
            if (item.alias in data[i]) {
              item.info = data[i][item.alias]
              break
            }
          }
        })
        this.setData({ gardList: this.data.gardList })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  _onLogin (e) {
    if (this.data.userInfo?.mobile) return
    wx.navigateTo({
      url: '/subPages/login/login/index'
      // events: {
      //   getLoginInfo: (data) => {
      //     this.setData({
      //       userInfo: data.userInfo,
      //       points: data.points
      //     })
      //   }
      // }
    })
  },
  _onOrder ({ currentTarget: { dataset: { index } } }) {
    // console.log(index)
    if (app.globalData.userInfo?.mobile) {
      wx.navigateTo({ url: `/subPages/order/order/index?id=${index}` })
    } else {
      wx.navigateTo({ url: '/subPages/login/login/index' })
    }
  },
  _jump ({ currentTarget: { dataset: { father, child } } }) {
    // console.log(father, child)
    if (app.globalData.userInfo?.mobile) {
      wx.navigateTo({ url: `/subPages/${father}/${child}/index` })
    } else {
      wx.navigateTo({ url: '/subPages/login/login/index' })
    }
  },
  async _onLogout () {
    await logOut().catch(err => { console.log(err) })
    wx.clearStorage()
    app.globalData.userInfo = {}
    app.globalData.cartCount = null
    const gardList = this.data.gardList.map(item => {
      return {
        ...item,
        info: ''
      }
    })
    this.setData({
      userInfo: {},
      cartCount: null,
      gardList
    })
    wx.removeTabBarBadge({
      index: 2
    })
  },
  _previewImage () {
    wx.previewImage({
      current: 'https://dksx.dingliantech.com/banner/qrcode.jpg',
      urls: ['https://dksx.dingliantech.com/banner/qrcode.jpg']
    })
  }
})