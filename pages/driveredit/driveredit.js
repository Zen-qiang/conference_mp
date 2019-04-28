// pages/driveredit/driveredit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carImg: '../../common/resource/car2.png',
    carName: '',
    carNum: '',
    linkMan: '',
    phone: '',
    passengerNum: '',
    departTime: '',
    departAddr: '',
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
  backPage() {
    wx.reLaunch({
      url: '/pages/sendcar/sendcar',
    })
  },

  // 新增车次信息
  addCarInfo() {
    var data = {
      url: config.addCarInfo,
      params: {
        carImg: this.data.carImg,
        carName: this.data.carName,
        carNum: this.data.carNum,
        linkMan: this.data.linkMan,
        phone: this.data.phone,
        passengerNum: this.data.passengerNum,
        departTime: this.data.departTime,
        departAddr: this.data.departAddr,
      }
    };
    app.nPost(data).then(ret => {
      
    }, res => {
      // console.error(JSON.stringify(res));
    });
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