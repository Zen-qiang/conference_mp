const computedBehavior = require('miniprogram-computed')
import { getCategory, getSecondCategoryProduct } from '../../api/common'
import { addOrUpdate, reduce, updateQty } from '../../api/cart'
import Toast from '@vant/weapp/toast/toast'
const app = getApp()
Component({
  behaviors: [computedBehavior],
  data: {
    activeTab: 0,
    list: [],
    categoryList: [],
    _tempList: {},
    activeKey: 0
  },
  computed: {
    stabs (data) {
      return data.list.reduce((acc, cur) => {
        acc.push({ title: cur.name })
        return acc
      }, [])
    }
  },
  pageLifetimes: {
    async show () {
      const { switchClassifyId } = app.globalData
      if (switchClassifyId) {
        if (!this.data.categoryList.length) {
          const { data: categoryList } = await getCategory()
          const activeIndex = categoryList.findIndex(item => parseInt(switchClassifyId) === item.id)
          this.setData({ categoryList, activeKey: activeIndex })
        } else {
          const activeIndex = this.data.categoryList.findIndex(item => parseInt(switchClassifyId) === item.id)
          this.setData({ activeKey: activeIndex })
        }
        if (this.data._tempList[switchClassifyId]) {
          this.setData({
            list: this.data._tempList[switchClassifyId]
          })
        } else {
          const { data } = await getSecondCategoryProduct({ categoryId: switchClassifyId }, { showLoading: true })
          this.data._tempList[switchClassifyId] = data
          this.setData({
            list: data
          })
        }
      }
      this._updateCartCount()
    },
    hide () {
      app.globalData.switchClassifyId = null
    }
  },
  lifetimes: {
    async attached () {
      if (app.globalData.switchClassifyId) return // 如果从点击首页分类过来
      const { data: categoryList } = await getCategory()
      // console.log(categoryList)
      this.setData({ categoryList })
      const categoryId = app.globalData.switchClassifyId || categoryList[0]?.id
      const { data } = await getSecondCategoryProduct({ categoryId }, { showLoading: true })
      // console.log(data)
      this.data._tempList[categoryId] = data
      this.setData({
        list: data
      })
    }
  },
  methods: {
    _updateCartCount () {
      let globalDataCartCountArr = []
      for (let key in app.globalData.cartCountObj) {
        globalDataCartCountArr.push({ id: key, value: app.globalData.cartCountObj[key] })
      }
      this.data.list.forEach((item, outIndex) => {
        for (let i = 0; i < globalDataCartCountArr.length; i++) {
          const id = parseInt(globalDataCartCountArr[i].id)
          const index = item.productVoList.findIndex(item => item.id === id)
          if (typeof(index) === 'number' && index != -1) {
            this.setData({
              [`list[${outIndex}].productVoList[${index}].cartCount`]: globalDataCartCountArr[i].value
            })
            globalDataCartCountArr.splice(i, 1)
            i--
          }
        }
      })
    },
    async tapClassifyItem ({ currentTarget: { dataset: { id } } }) {
      // console.log(id)
      if (this.data._tempList[id]) {
        this.setData({
          list: this.data._tempList[id],
          activeTab: 0
        })
        this._updateCartCount()
        return
      }
      const { data } = await getSecondCategoryProduct({ categoryId: id }, { showLoading: true })
      this.data._tempList[id] = data
      this.setData({
        list: data,
        activeTab: 0
      })
    },
    onItem ({
      currentTarget: {
        dataset: {
          id
        }
      }
    }) {
      // console.log(id)
      wx.navigateTo({ url: `/subPages/product/details/index?id=${id}`})
    },
    // 阻止stepper组件事件冒泡
    stopBubble (e) {
      return false
    },
    async _blur ({ detail: { value }, currentTarget: { dataset: { id, outIndex, inIndex } } }) {
      // console.log(value, id)
      const count = parseInt(value)
      const params = {
        count,
        productId: id
      }
      const itemCartCount = parseInt(this.data.list[outIndex].productVoList[inIndex].cartCount)
      try {
        await updateQty(params, { showLoading: true })
        const cartCount = count - itemCartCount
        app.globalData.cartCount = parseInt(app.globalData.cartCount) + cartCount
        this._setTabBarBadge(app.globalData.cartCount)
        let obj = {}
        obj[id] = count
        const cartCountObj = { ...app.globalData.cartCountObj, ...obj }
        app.globalData.cartCountObj = cartCountObj
        this._addSuccess({ count, outIndex, inIndex  })
      } catch (err) {
        console.log(err)
        this._addError({ count: itemCartCount, outIndex, inIndex })
      }
    },
    async _plus ({ currentTarget: { dataset: { id, outIndex, inIndex } } }) {
      // console.log({ currentTarget: { dataset: { id } } })
      const params = {
        count: 1,
        productId: id
      }
      const itemCartCount = parseInt(this.data.list[outIndex].productVoList[inIndex].cartCount)
      try {
        await addOrUpdate(params, { showLoading: true })
        const cartCount = parseInt(app.globalData.cartCount) + 1
        app.globalData.cartCount = cartCount
        this._setTabBarBadge(app.globalData.cartCount)
        let obj = {}
        obj[id] = itemCartCount + 1
        const cartCountObj = { ...app.globalData.cartCountObj, ...obj }
        app.globalData.cartCountObj = cartCountObj
        this._addSuccess({ count: itemCartCount + 1, outIndex, inIndex })
      } catch (err) {
        console.log(err)
        this._addError({ count: itemCartCount, outIndex, inIndex })
      }
    },
    async _minus ({ currentTarget: { dataset: { id, outIndex, inIndex } } }) {
      // console.log(index)
      const params = {
        count: 1,
        productId: id
      }
      const itemCartCount = parseInt(this.data.list[outIndex].productVoList[inIndex].cartCount)
      try {
        await reduce(params, { showLoading: true })
        const cartCount = parseInt(app.globalData.cartCount) - 1
        app.globalData.cartCount = cartCount
        this._setTabBarBadge(app.globalData.cartCount)
        let obj = {}
        obj[id] = itemCartCount - 1
        const cartCountObj = { ...app.globalData.cartCountObj, ...obj }
        app.globalData.cartCountObj = cartCountObj
        this._addSuccess({ count: itemCartCount - 1, outIndex, inIndex })
      } catch (err) {
        console.log(err)
        this._addError({ count: itemCartCount, outIndex, inIndex })
      }
    },
    async onCart ({
      currentTarget: {
        dataset: {
          id,
          outIndex,
          inIndex
        }
      }
    }) {
      // console.log(id, outIndex, inIndex)
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
        this._setTabBarBadge(app.globalData.cartCount)
        let obj = {}
        obj[id] = 1
        const cartCountObj = { ...app.globalData.cartCountObj, ...obj }
        app.globalData.cartCountObj = cartCountObj
        this._addSuccess({ count: 1, outIndex, inIndex })
      } catch (err) {
        // console.log(err)
        this._addError({ count: 0, outIndex, inIndex })
      }
    },
    _addSuccess (detail) {
      Toast.success({
        duration: 1000
      })
      // console.log(detail)
      const key = `list[${detail.outIndex}].productVoList[${detail.inIndex}].cartCount`
      this.setData({
        [key]: detail.count
      })
    },
    _addError (detail) {
      // Toast.fail('添加失败请重试')
      const key = `list[${detail.outIndex}].productVoList[${detail.inIndex}].cartCount`
      this.setData({
        [key]: detail.count
      })
    },
    _setTabBarBadge (cartCount) {
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
    }
  }
})
