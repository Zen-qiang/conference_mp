const app = getApp()
import config from '../../config.js'
Page({
  data: {
    conferenceDetails: {}, // 当前会务详情
    conferenceUserInfo: {}, // 当前人员信息
    memberInfoList: [] // 代报名人员
  },
  onLoad (option) {
    console.log('conSign-load')
    this.setData({
      conferenceDetails: app.getValue('conferenceDetails'),
      conferenceUserInfo: app.getValue('conferenceUserInfo'),
      memberInfoList: app.getValue('conferenceUserInfo').members
    })
  },
  onShow () {
    console.log('conSign-show')
    if (app.getValue('members') && app.getValue('members').length) {
      this.data.memberInfoList.push(...app.getValue('members'))
      this.setData({memberInfoList: this.data.memberInfoList})
    }
  },
  onHide () {
    console.log('conSign-hide')
    app.removeValue('members')
  },
  onUnload () {
    console.log('conSign-unload')
  },
  // 跳转到添加代报名页面
  jumpAddMember (e) {
    wx.navigateTo({
      url: `/pages/addMember/addMember`
    })
  },
  // 申请报名
  signAction () {
    let url = config.conferenceSign,
      { id } = this.data.conferenceDetails,
      { name, phoneno: phoneNo, fk_gender_id: fkGenderId, id: fkMasterId } = this.data.conferenceUserInfo
    const params = {
      conferenceId: id,
      conferenceMemberViews: [{ name, phoneNo, fkGenderId, fkMasterId, isMaster: true}, ...this.data.memberInfoList]
    }
    // console.log(url, params)
    app.nPost({url, params}).then(res => {
      console.log(res)
      if (res.code === 0) {
        wx.navigateTo({
          url: '/pages/signSuccess/signSuccess'
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
})