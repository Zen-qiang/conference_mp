const app = getApp()
import config from '../../config.js'
Page({
  data: {
    members: [],
    number: 0
  },
  onLoad (option) {
    this.getSuccessMsg()
  },
  // 获取报名成功显示信息
  getSuccessMsg () {
    app.nGet({ url: config.searchApplySuccessMemberInfo}).then(res => {
      console.log(res)
      if (res.code === 0) {
        const {members, number} = res.data
        this.setData({members, number})
      }
    }).catch(err => {
      console.log(err)
    })
  }
})