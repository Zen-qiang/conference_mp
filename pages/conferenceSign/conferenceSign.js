const app = getApp()
import config from '../../config.js'
Page({
  data: {
    conferenceDetails: {}, // 当前会务详情
    conferenceUserInfo: {}, // 当前人员信息
    memberInfoList: [] // 代报名人员
  },
  onShow () {
    this.setData({
      conferenceDetails: app.getValue('conferenceDetails'),
      conferenceUserInfo: app.getValue('conferenceUserInfo')
    })
  }
})