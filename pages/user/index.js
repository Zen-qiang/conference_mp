// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableList: [
      { name: '报名信息', img: '../../common/resource/account.png', index: 0 },
      { name: '行程安排', img: '../../common/resource/account.png', index: 1 },
      { name: '派车管理', img: '../../common/resource/account.png', index: 2 },
      { name: '住宿登记', img: '../../common/resource/account.png', index: 3 },
      { name: '用餐扫码', img: '../../common/resource/account.png', index: 4 },
      { name: '证件通行', img: '../../common/resource/account.png', index: 5}
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //  根据点击的信息 跳转
  toPage(e) {
    let content = e.currentTarget.dataset.content
    // this.setData({
    //   content: e.currentTarget.dataset.content
    // })
    switch (content) {
      case '报名信息':
        console.log(1)
        break;
      case '行程安排':
        wx.navigateTo({
          url: '/pages/finishTrip/index',
        })
        break;
      case '派车管理':
        console.log(3)
        break;
      case '住宿登记':
        console.log(4)
        break;
      case '用餐扫码':
        console.log(5)
        break;
      case '证件通行':
        console.log(6)
        break;
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})