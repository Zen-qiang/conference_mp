const app = getApp()
import config from '../../config.js'
Page({
  data: {
    id: null,
    conferenceDetails: {},
    userInfo: {}
  },
  onLoad (option) {
    console.log(option)
    this.setData({
      id: parseInt(option.id)
    })
    this.getConferenceInfo()
  },
  onShow () {
    app.removeValue('conferenceDetails')
    app.removeValue('conferenceUserInfo')
  },
  // 获取会务详情
  getConferenceInfo () {
    let data = {
      url: config.conferenceInfo,
      params: {
        id: this.data.id
      }
    }
    console.log(data)
    app.nGet(data).then(res => {
      console.log(res)
      if (res.code === 0) {
        this.setData({
          conferenceDetails: res.data.conferenceDetails,
          userInfo: res.data.userInfo
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  jumpAddress () {
    const gps = this.data.conferenceDetails.gps && (this.data.conferenceDetails.gps).split(/\D/)
    const [latitude, longitude] = gps
    console.log(latitude, longitude)
    return
    wx.openLocation({

    })
  },
  jumpSign (event) {
    console.log(event)
    const id = event.currentTarget.dataset.id
    app.saveValue('conferenceDetails', this.data.conferenceDetails)
    app.saveValue('conferenceUserInfo', this.data.userInfo)
    wx.navigateTo({
      url: `/pages/conferenceSign/conferenceSign?id=${id}`
    })
  }
})