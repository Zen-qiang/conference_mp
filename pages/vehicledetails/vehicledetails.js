// pages/vehicledetails/vehicledetails.js
const app = getApp();
import config from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlArr: [
      '../../common/resource/lb1.jpg',
      '../../common/resource/lb2.jpg',
      '../../common/resource/lb3.jpg'
    ],
    disabled: false,
    // 轮播图 相关
    loop: true,
    current: 0,
    circular: true,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    carId: '',
    carInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      carId: options.id
    })
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
    this.queryVehicleInfoById()
  },
  // 报名该车辆
  toSendCar() {
    this.addVehiclesMembers()
  },
  queryVehicleInfoById() {
    var data = {
      url: config.queryVehicleInfoById,
      params: {
       id: this.data.carId
      }
    }
    app.nGet(data).then(data => {
      if (data.data) {
        this.setData({
          carInfo: data.data
        })
        console.log(data.data, '车辆列表')
      }
    }, res => {

    });
  },
  addVehiclesMembers() {
    let membersArr = this.data.carInfo.members.map(e => {
      return e.id
    })
    // console.log(arr)
    var data = {
      url: config.addVehiclesMembers,
      params: {
        shiftsId: this.data.carId,
        'membersId[]': membersArr
      }
    }
    app.nPut(data).then(data => {
      if (data.code == 0) {
        app.showMsg("车辆报名成功");
        wx.reLaunch({
          url: '/pages/sendcar/sendcar',
        })
      }
    }, res => {

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