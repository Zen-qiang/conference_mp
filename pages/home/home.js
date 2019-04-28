const app = getApp()
import config from '../../config.js'
Page({
  data: {
    pageNo: 1,
    pageSize: 10,
    conferenceList: [],
    loadDone: false
  },
  onLoad (option) {
    this.getList()
  },
  onReachBottom () {
    console.log('onReachBottom')
    if (this.loadDone) return
    this.data.pageNo++
    this.setData({
      pageNo: this.data.pageNo
    })
    this.getList()
  },
  // 获取会务列表
  getList () {
    let data = {
      url: config.conferenceList,
      params: {
        pageNo: this.data.pageNo,
        pageSize: this.data.pageSize
      }
    }
    app.nGet(data).then(res => {
      if (res.code === 0) {
        if (this.data.pageNo === 1) {
          this.setData({
            conferenceList: res.data,
            loadDone: this.data.pageSize > res.data.length
          })
        } else {
          this.data.conferenceList.push(...res.data)
          this.setData({
            conferenceList: this.data.conferenceList,
            loadDone: this.data.pageSize > res.data.length
          })
        }
      } else {
        this.setData({
          loadDone: true
        })
      }
    }).catch(err => {
      console.log(err)
      this.setData({
        loadDone: true
      })
    })
  },
  // 跳转到会务详情
  jumpInfo (event) {
    console.log(event)
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/conferenceInfo/conferenceInfo?id=${id}`
    })
  }
})