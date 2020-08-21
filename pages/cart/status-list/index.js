const deleteIconSrc = '/assets/trash.png'
const computedBehavior = require('miniprogram-computed')
import { deleteProduct } from '../../../api/cart'
Component({
  behaviors: [computedBehavior],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^(_|list)/ // 指定所有 _ 或者 list 开头的数据字段为纯数据字段
  },
  properties: {
    list: Array
  },
  observers: {
    /**
     * todo 初始化组件数据作为内部数据
     */
    list: function (res) {
      const arr = res.map(item => {
        const id = item.id
        return {
          ...item,
          delete: [{ src: deleteIconSrc, data: id }]
        }
      })
      this.setData({ result: arr })
    }
  },
  data: {
    // sum: 0,
    result: [],
    _isClose: true, // 左滑状态是否关闭
    _transitionEnd: true // 左滑动画效果是否结束
  },
  methods: {
    /**
     * 左滑删除按钮
     * @param {*} id 商品id
     */
    slideButtonTap({ detail: { data: id }}) {
      const targetItemIndex = this.data.result.findIndex(item => item.id === id)
      this.deleteItem(targetItemIndex)
    },
    // 左滑动画结束事件
    slideTransitionEnd (e) {
      if (!this.data._isClose) return
      this.data._transitionEnd = true
    },
    // 左滑状态隐藏
    slideHide (e) {
      this.data._isClose = true
    },
    // 左滑显示状态
    slideShow (e) {
      this.data._isClose = false
      this.data._transitionEnd = false
    },
    // 单击跳转到详情页
    onItemClick ({ currentTarget: { dataset: { id } } }) {
      // console.log(id)
      if (!this.canClick()) return
      wx.navigateTo({
        url: `/subPages/product/details/index?id=${id}`
      })
    },
    // 判断当前左滑组件是否可以点击
    canClick () {
      return this.data._isClose && this.data._transitionEnd
    },
    async clearAll () {
      wx.showLoading({
        title: '加载中',
      })
      const productIds = this.data.result.reduce((acc, cur) => {
        acc.push(cur.productId)
        return acc
      }, [])
      try {
        await deleteProduct({ productIds: productIds.join(',') })
        wx.hideLoading()
        this.triggerEvent('clearAllSuccess')
      } catch(err) {
        wx.hideLoading()
      }
    },
    /**
     * 删除指定商品
     * @param {index} 商品下标 
     */
    deleteItem (index) {
      // console.log(index)
      const _this = this
      wx.showModal({
        content: '确定删除该商品吗？',
        confirmColor: '#f75355',
        async success ({ confirm, cancel }) {
          if (confirm) {
            // const params = {
            //   productIds: _this.data.result[index].productId + ''
            // }
            await deleteProduct({ productIds: _this.data.result[index].productId + '' }, { showLoading: true })
            let obj = {}
            obj[_this.data.result[index].productId] = 0
            const cartCountObj = { ...app.globalData.cartCountObj, ...obj }
            app.globalData.cartCountObj = cartCountObj
            _this.data.result.splice(index, 1)
            _this.setData({
              result: _this.data.result
            }, () => {
              _this.triggerEvent('calc', { sum: _this.data.sum, num: _this.data.num, isCheckedAll: _this.data.isCheckedAll, checkedList: _this.data.checkedList })
            })
          }
        }
      })
    }
  }
})