Component({
  properties: {
    info: Object
  },
  methods: {
    _showAction () {
      const _this = this
      wx.showActionSheet({
        itemList: ['修改评论'],
        success (res) {
          // console.log(res)
          const { tapIndex } = res
          if (tapIndex === 0) {
            _this.triggerEvent('tapRate', {productId: _this.data.info.productId, orderNo: _this.data.info.orderNo})
          }
        }
      })
    },
    _navigeteTo () {
      this.triggerEvent('tapPdt', {productId: this.data.info.productId})
    }
  }
})