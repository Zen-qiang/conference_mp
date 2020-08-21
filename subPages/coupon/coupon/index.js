import { getCoupon } from '../../../api/common'
Page({
  data: {
    active: 0,
    triggered: false,
    _pageNum: 1,
    isNoMore: false,
    list: []
  },
  onLoad (options) {
    this._getList()
  },
  _getList () {
    const params = {
      pageNum: this.data._pageNum,
      status: this.data.active
    }
    // 优惠券状态0未使用1已使用2已过期
    getCoupon(params, { showLoading: true }).then(({ data }) => {
     // console.log(data)
     if (data) {
      const list = this.data._pageNum === 1 ? data.list : this.data.list.push(...data.list)
      this.setData({
        list,
        isNoMore: data.isLastPage
      })
    } else {
      this.setData({
        list: [],
        isNoMore: true
      })
    }
  }).finally(() => {
    // console.log('finally')
    this.setData({
      triggered: false
    })
  })
  },
  _tabChange ({ currentTarget: { dataset: { index } } }) {
    // console.log(index)
    this.setData({ active: index, isNoMore: false, list: [] })
    this.data._pageNum = 1
    this._getList()
  },
  _toIndex () {
    wx.switchTab({ url: '/pages/index/index'})
  },
  _refresherrefresh () {
    this.data._pageNum = 1
    this._getList()
  },
  _scrolltolower () {
    if (this.data.isNoMore) return
    this.data._pageNum = this.data._pageNum + 1
    this._getList()
  }
})