import { addOrUpdate } from '../../api/cart'
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    list: {
      type: Array,
      value: [],
      // observer () {
      //   this._animate()
      // }
    }
  },
  data: {
    left: wx.getSystemInfoSync().windowWidth - 17
  },
  pageLifetimes: {
    show() {
      if (this._lastScrollLeft > 100 * this.data.list.length - wx.getSystemInfoSync().windowWidth) {
        this.setData({
          scrollLeft: 100 * this.data.list.length - wx.getSystemInfoSync().windowWidth,
        })
      }
    },
  },
  // lifetimes: {
  //   ready() {
  //     this._animate()
  //   }
  // },
  // ready() {
  //   this._animate()
  // },
  // observers: {
  //   list: function (list) {
  //     // console.log(list)
  //     if (!list.length) return
  //     this._animate()
  //   }
  // },
  methods: {
    // _animate() {
    //   this.createSelectorQuery().select("#scroller2").fields({
    //     scrollOffset: true,
    //     size: true,
    //   }, (res) => {
    //     console.log(res)
    //     // 绑定滚动元素
    //     const scrollTimeline = {
    //       scrollSource: '#scroller2',
    //       orientation: 'horizontal',
    //       timeRange: 1000,
    //       startScrollOffset: (210 * this.data.list.length - res.width) + 20,
    //       endScrollOffset: res.scrollWidth - res.width,
    //     }
    //     this.animate('#transform', [{
    //       offset: 0,
    //       width: '0px',
    //     }, {
    //       offset: 1,
    //       width: '30px',
    //     }], 1000, scrollTimeline)
    //   }).exec()
    // },
    scroll(e) {
      if (e.detail.scrollLeft + wx.getSystemInfoSync().windowWidth + 3 >= e.detail.scrollWidth) {
        if (e.detail.deltaX < 0 && !this._active) {
          this._active = true
          this.setData({wording: '释放跳转'})
          wx.vibrateShort()
        } else if (e.detail.deltaX > 0) {
          this._active = false
          this.setData({ wording: '查看更多' })
        }
      } else {
        this._active = false
      }
      this._lastScrollLeft = e.detail.scrollLeft
      clearTimeout(this._timer)
    },
    touchend() {
      clearTimeout(this._timer)
      if (this._active) {
        wx.navigateTo({
          url: '/subPages/product/saleList/index',
        })
        this._active = false
      } else if (this._lastScrollLeft > 100 * this.data.list.length - wx.getSystemInfoSync().windowWidth) {
        this.setData({
          scrollLeft: 100 * this.data.list.length - wx.getSystemInfoSync().windowWidth,
        })
      }
    },
    itemClick ({
      currentTarget: {
        dataset: {
          id
        }
      }
    }) {
      // console.log(id)
      wx.navigateTo({
        url: `/subPages/product/details/index?id=${id}`
      })
    },
    async cartClick ({ currentTarget: { dataset: { id } } }) {
      // console.log('addcart', id)
      if (!app.globalData.userInfo?.mobile) {
        wx.navigateTo({ url: '/subPages/login/login/index' })
        return
      }
      const params = {
        count: 1,
        productId: id
      }
      try {
        await addOrUpdate(params, { showLoading: true })
        const cartCount = parseInt(app.globalData.cartCount) + 1
        app.globalData.cartCount = cartCount
        let obj = {}
        obj[id] = 1
        const cartCountObj = { ...app.globalData.cartCountObj, ...obj }
        app.globalData.cartCountObj = cartCountObj
        this.triggerEvent('addSuccess', { count: 1, id }, { bubbles: true, composed: true })
      } catch (err) {
        console.log(err)
        this.triggerEvent('addError', { count: 0, id }, { bubbles: true, composed: true })
      }
    }
  },
})
