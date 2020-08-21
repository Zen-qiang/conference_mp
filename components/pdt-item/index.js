import { addOrUpdate, reduce, updateQty } from '../../api/cart'
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    info: Object
  },
  methods: {
    // 阻止stepper组件事件冒泡
    stopBubble (e) {
      return false
    },
    async _blur ({ detail: { value }, currentTarget: { dataset: { id } } }) {
      // console.log(value, id)
      const count = parseInt(value)
      const params = {
        count,
        productId: id
      }
      try {
        await updateQty(params, { showLoading: true })
        const cartCount = count - parseInt(this.data.info.cartCount)
        app.globalData.cartCount = parseInt(app.globalData.cartCount) + cartCount
        let obj = {}
        obj[id] = count
        const cartCountObj = { ...app.globalData.cartCountObj, ...obj }
        app.globalData.cartCountObj = cartCountObj
        this.triggerEvent('addSuccess', { count, id }, { bubbles: true, composed: true })
      } catch (err) {
        console.log(err)
        this.triggerEvent('addError', { count: parseInt(this.data.info.cartCount), id }, { bubbles: true, composed: true })
      }
    },
    async _plus ({ currentTarget: { dataset: { id } } }) {
      // console.log({ currentTarget: { dataset: { id } } })
      const params = {
        count: 1,
        productId: id
      }
      try {
        await addOrUpdate(params, { showLoading: true })
        const cartCount = parseInt(app.globalData.cartCount) + 1
        app.globalData.cartCount = cartCount
        let obj = {}
        obj[id] = parseInt(this.data.info.cartCount) + 1
        const cartCountObj = { ...app.globalData.cartCountObj, ...obj }
        app.globalData.cartCountObj = cartCountObj
        this.triggerEvent('addSuccess', { count: parseInt(this.data.info.cartCount) + 1, id }, { bubbles: true, composed: true })
      } catch (err) {
        console.log(err)
        this.triggerEvent('addError', { count: parseInt(this.data.info.cartCount), id }, { bubbles: true, composed: true })
      }
    },
    async _minus ({ currentTarget: { dataset: { id } } }) {
      // console.log('minus', this.data.info.cartCount)
      // console.log(index)
      const params = {
        count: 1,
        productId: id
      }
      try {
        await reduce(params, { showLoading: true })
        const cartCount = parseInt(app.globalData.cartCount) - 1
        app.globalData.cartCount = cartCount
        let obj = {}
        obj[id] = parseInt(this.data.info.cartCount) - 1
        const cartCountObj = { ...app.globalData.cartCountObj, ...obj }
        app.globalData.cartCountObj = cartCountObj
        this.triggerEvent('addSuccess', { count: parseInt(this.data.info.cartCount) - 1, id }, { bubbles: true, composed: true })
        // console.log('success minus', this.data.info.cartCount)
      } catch (err) {
        // console.log(err)
        this.triggerEvent('addError', { count: parseInt(this.data.info.cartCount), id }, { bubbles: true, composed: true })
        // console.log('error minus', this.data.info.cartCount)
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
      // this.clearAnimation('.cart', function () {
      //   console.log('清除动画')
      // })
      // this.animate('.cart', [
      //   { opacity: 1, scale: [1, 1] },
      //   { opacity: 0, scale: [1.5, 1.5] }
      // ], 400, () => {
      //   this.clearAnimation('.cart', function () {
      //     console.log('清除动画')
      //   })
      // })
    }
  },
})