const deleteIconSrc = '/assets/trash.png'
const computedBehavior = require('miniprogram-computed')
import { addOrUpdate, reduce, updateQty, deleteProduct } from '../../../api/cart'
const app = getApp()
Component({
  behaviors: [computedBehavior],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^(_|list)/ // 指定所有 _ 或者 list 开头的数据字段为纯数据字段
  },
  properties: {
    list: Array,
    checkedAll: {
      type: Boolean,
      value: true
    }
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
          checked: true,
          delete: [{ src: deleteIconSrc, data: id }]
        }
      })
      this.setData({ result: arr })
    },
    /**
     * todo 全选或者全取消选中
     * * 根据父级全选按钮状态判断
     */
    checkedAll (val) {
      // console.log('watch checkedAll', val)
      this.data.result.forEach(item => {
        item.checked = val
      })
      // console.log('watch checkedAll', val, this.data.result)
      const _this = this
      this.setData({
        result: this.data.result
      }, () => {
        _this.triggerEvent('calc', { sum: _this.data.sum, num: _this.data.num, isCheckedAll: val, checkedList: _this.data.checkedList })
        // console.log('sum', _this.data.sum, 'isCheckedAll', val, 'checkedList', _this.data.checkedList)
      })
    }
  },
  computed: {
    // 总价
    sum (data) {
      const sum = data.result.reduce((acc, obj) => {
        if (obj.checked) {
          return acc + parseFloat(obj.quantity) * parseFloat(obj.rulingPrice)
        }
        return acc
      }, 0)
      return Math.round(sum * 100)/ 100
    },
    num (data) {
      const num = data.result.reduce((acc, obj) => {
        if (obj.checked) {
          return acc + parseInt(obj.quantity)
        }
        return acc
      }, 0)
      return num
    },
    // 当前选中的项目
    checkedList (data) {
      return data.result.filter(item => item.checked)
    },
    // 是否全部选中
    isCheckedAll (data) {
      return data.checkedList.length === data.result.length
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
    // 单击切换选中状态
    onItemCheck ({ currentTarget: { dataset: { index } }, detail }) {
      const key = `result[${index}].checked`
      const _this = this
      this.setData({
        [key]: detail
      }, () => {
        _this.triggerEvent('calc', { sum: _this.data.sum, num: _this.data.num, isCheckedAll: _this.data.isCheckedAll, checkedList: _this.data.checkedList })
        // console.log('sum', _this.data.sum, 'isCheckedAll', _this.data.isCheckedAll, 'checkedList', _this.data.checkedList)
      })
    },
    // 单击跳转到详情页
    onItemClick ({ currentTarget: { dataset: { id } } }) {
      // console.log(id)
      if (!this.canClick()) return
      wx.navigateTo({
        url: `/subPages/product/details/index?id=${id}`
      })
    },
    // 阻止stepper组件事件冒泡
    stopBubble (e) {
      return false
    },
    // 修改订量
    // async onChangeQty ({
    //   detail,
    //   currentTarget: {
    //     dataset: { index }
    //   }
    // }) {
    //   if (!this.canClick()) return
    //   if (detail) {
    //     const params = {
    //       count: detail,
    //       productId: this.data.result[index].productId
    //     }
    //     try {
    //       await addOrUpdate(params, { showLoading: true })
    //       const key = `result[${index}].quantity`
    //       const _this = this
    //       this.setData({
    //         [key]: detail
    //       }, () => {
    //         _this.triggerEvent('calc', { sum: _this.data.sum, num: _this.data.num, isCheckedAll: _this.data.isCheckedAll, checkedList: _this.data.checkedList })
    //         // console.log('sum', _this.data.sum, 'isCheckedAll', _this.data.isCheckedAll, 'checkedList', _this.data.checkedList)
    //       })
    //     } catch (err) {
    //       console.log(err)
    //     }
    //   } else {
    //     this.deleteItem(index)
    //   }
    // },
    // 判断当前左滑组件是否可以点击
    canClick () {
      return this.data._isClose && this.data._transitionEnd
    },
    async _blur ({ detail: { value }, currentTarget: { dataset: { index } } }) {
      // console.log(value, index)
      if (!this.canClick()) return
      const count = parseInt(value)
      if (count) {
        const params = {
          count,
          productId: this.data.result[index].productId
        }
        try {
          await updateQty(params, { showLoading: true })
          let obj = {}
          obj[this.data.result[index].productId] = count
          const cartCountObj = { ...app.globalData.cartCountObj, ...obj }
          app.globalData.cartCountObj = cartCountObj
          const key = `result[${index}].quantity`
          const _this = this
          this.setData({
            [key]: count
          }, () => {
            _this.triggerEvent('calc', { sum: _this.data.sum, num: _this.data.num, isCheckedAll: _this.data.isCheckedAll, checkedList: _this.data.checkedList })
            // console.log('sum', _this.data.sum, 'isCheckedAll', _this.data.isCheckedAll, 'checkedList', _this.data.checkedList)
          })
        } catch (err) {
          console.log(err)
          const detail = parseInt(this.data.result[index].quantity)
          const key = `result[${index}].quantity`
          this.setData({
            [key]: detail
          })
        }
      } else {
        this.deleteItem(index)
      }
    },
    async _plus ({ currentTarget: { dataset: { index } } }) {
      // console.log({ currentTarget: { dataset: { index } } })
      if (!this.canClick()) return
      const params = {
        count: 1,
        productId: this.data.result[index].productId
      }
      const detail = parseInt(this.data.result[index].quantity) + 1
      try {
        await addOrUpdate(params, { showLoading: true })
        let obj = {}
        obj[this.data.result[index].productId] = detail
        const cartCountObj = { ...app.globalData.cartCountObj, ...obj }
        app.globalData.cartCountObj = cartCountObj
        const key = `result[${index}].quantity`
        const _this = this
        this.setData({
          [key]: detail
        }, () => {
          _this.triggerEvent('calc', { sum: _this.data.sum, num: _this.data.num, isCheckedAll: _this.data.isCheckedAll, checkedList: _this.data.checkedList })
          // console.log('sum', _this.data.sum, 'isCheckedAll', _this.data.isCheckedAll, 'checkedList', _this.data.checkedList)
        })
      } catch (err) {
        console.log(err)
        const detail = parseInt(this.data.result[index].quantity)
        const key = `result[${index}].quantity`
        this.setData({
          [key]: detail
        })
      }
    },
    async _minus ({ currentTarget: { dataset: { index } } }) {
      // console.log(index)
      if (!this.canClick()) return
      const detail = parseInt(this.data.result[index].quantity) - 1
      if (detail) {
        const params = {
          count: 1,
          productId: this.data.result[index].productId
        }
        try {
          await reduce(params, { showLoading: true })
          let obj = {}
          obj[this.data.result[index].productId] = detail
          const cartCountObj = { ...app.globalData.cartCountObj, ...obj }
          app.globalData.cartCountObj = cartCountObj
          const key = `result[${index}].quantity`
          const _this = this
          this.setData({
            [key]: detail
          }, () => {
            _this.triggerEvent('calc', { sum: _this.data.sum, num: _this.data.num, isCheckedAll: _this.data.isCheckedAll, checkedList: _this.data.checkedList })
            // console.log('sum', _this.data.sum, 'isCheckedAll', _this.data.isCheckedAll, 'checkedList', _this.data.checkedList)
          })
        } catch (err) {
          console.log(err)
          const detail = parseInt(this.data.result[index].quantity)
          const key = `result[${index}].quantity`
          this.setData({
            [key]: detail
          })
        }
      } else {
        this.deleteItem(index)
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
          } else {
            const detail = parseInt(_this.data.result[index].quantity)
            const key = `result[${index}].quantity`
            _this.setData({
              [key]: detail
            })
          }
        }
      })
    }
  }
})