const app = getApp()
Page({
  data: {
    url: '',
  },
  onLoad (options) {
    // console.log(options)
    const { url } = options
    this.setData({ url })
  },
  getH5Message: function (e) {
    // console.log(e)
    app.globalData.switchClassifyId = e.detail.data[0]
  //   wx.navigateToMiniProgram({
  //    appId: e.detail.data[0],
  //    path: '/pages/indAex/index',
  //    envVersion: 'release',
  //    success(res) {
  //      console.log('navigateToMiniProgram success');
  //    }
  //  })
 }
})