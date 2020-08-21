import { getUserEvaluate } from '../../../api/user'
Page({
  data: {
    _pageNum: 1,
    _pageSize: 20,
    isNoMore: false,
    list: []
  },
  onLoad (options) {
    // this._getList()
    wx.startPullDownRefresh()
  },
  async _getList () {
    try {
      const params = {
        pageNum: this.data._pageNum,
        pageSize: this.data._pageSize
      }
      const { data } = await getUserEvaluate(params)
      const list = this.data._pageNum === 1 ? (data?.list || []) : this.data.list.push(...data.list)
        this.setData({
          list,
          isNoMore: data.isLastPage
        })
    } catch(err) {
      console.log(err)
    }
    wx.stopPullDownRefresh()
  },
  _getTapRate ({ detail }) {
    const _this = this
    wx.navigateTo({
      url: `/subPages/product/productRate/index?productId=${detail.productId}&orderNo=${detail.orderNo}`,
      events: {
        updateDataFromProductRatePage (data) {
          // console.log(data)
          const { productId, content, level } = data
          const targetItemIndex = _this.data.list.findIndex((item) => item.productId === productId)
          const key = `list[${targetItemIndex}]`
          const value = {..._this.data.list[targetItemIndex], content, level}
          _this.setData({
            [key]: value
          })
        }
      }
    })
  },
  _getTapPdt ({ detail }) {
    // console.log(detail)
    wx.navigateTo({
      url: `/subPages/product/details/index?id=${detail.productId}`
    })
  },
  onPullDownRefresh (e) {
    this.data._pageNum = 1
    this._getList()
  },
  onReachBottom () {
    if (this.data.isNoMore) return
    this.data._pageNum = this.data._pageNum + 1
    this._getList()
  }
})