import { pointsDetail } from '../../../api/user'
Page({
  data: {
    _pageNum: 1,
    _pageSize: 20,
    isNoMore: false
  },
  onLoad () {
    // this._getList()
    wx.startPullDownRefresh()
  },
  async _getList () {
    try {
      const params = {
        pageNum: this.data._pageNum,
        pageSize: this.data._pageSize
      }
      const { data } = await pointsDetail(params)
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