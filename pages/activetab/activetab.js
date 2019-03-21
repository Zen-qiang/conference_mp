// pages/finishTrip/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab 是否禁用
    disabled: false,
    // 显示下划线
    activeNum: 0,
    changeName: '编辑',
    showClearBtn: false
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
  // 点击 编辑
  showClearIcon() {
    this.setData({
      showClearBtn: !this.data.showClearBtn
    })
    if(this.data.changeName == '编辑') {
      this.setData({
        changeName: '完成'
      })
    }else{
      this.setData({
        changeName: '编辑'
      })
    }
  },
  // 点击 + 
  addPerson() {
    wx.navigateTo({
      url: '/pages/trip/index?activeNum=' + this.data.activeNum,
    })
  },
  // 点击 底部我的专车 按钮
  toCar() {
    wx.navigateTo({
    })
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