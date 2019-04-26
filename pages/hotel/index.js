// pages/hotel/index.js
const app = getApp();
import config from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // urlArr: [
    //   '../../common/resource/lb1.jpg',
    //   '../../common/resource/lb2.jpg',
    //   '../../common/resource/lb3.jpg'
    // ],
    disabled: false,
    // 轮播图 相关
    loop: true,
    current: 0,
    circular: true,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    // 酒店id
    hotelId: '',
    // 酒店信息
    hotelsInfo: '',
    imgUrls: '',
    // 日期选择器弹窗
    currentDate: '',
    minDate: new Date().getTime(),
    show: false,
    enterTime: '',
    show1: false,
    leaveTime: '',
    accomAdd: ''
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 选择酒店的 Id 及 日期
    this.setData({
      hotelId: options.id,
      enterTime: options.startTime,
      leaveTime: options.endTime,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取酒店信息
    this.hotelsInfo()
    this.hotelsRoomList()
    this.searchHotelMemberInfo()
  },
  // 时间格式化 年月日
  changeTimeType(time) {
    var timeType = ''
    var date = new Date(time)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = (date.getDate() + 1 < 10 ? '0' + (date.getDate()) : date.getDate())
    return timeType = Y + M + D
  },
  // 日期选择器
  showpopup() {
    this.setData({
      show: true,
      show1: false,
    })
  },
  showpopup1() {
    this.setData({
      show: false,
      show1: true
    })
  },
  onClose() {
    this.setData({ show: false, show1: false });
  },
  confirm(e) {
    this.setData({
      show: false,
      currentDate: e.detail,
      enterTime: this.changeTimeType(e.detail),
    });
  },
  confirm1(e) {
    this.setData({
      show1: false,
      currentDate: e.detail,
      leaveTime: this.changeTimeType(e.detail),
    });
  },
  cancel() {
    this.setData({
      show: false
    });
  },
  cancel1() {
    this.setData({
      show1: false
    });
  },
  // 点击安排入住
  toPeoPleManage() {
    wx.navigateTo({
      url: '/pages/peopleManage/index?hotelId=' + this.data.hotelId + '&hotelName=' + this.data.hotelsInfo.name
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  // 酒店信息
  hotelsInfo() {
    var data = {
      url: config.hotelsInfo + this.data.hotelId,
      // params: {
      //   hotelId: this.data.hotelId
      // }
    }
    app.nGet(data).then(data => {
      if (data.data) {
        this.setData({
          imgUrls: data.data.photo.split("|"),
          hotelsInfo: data.data
        })
      }
    }, res => {

    });
  },
  // 添加住宿人员列表
  searchHotelMemberInfo() {
    var data = {
      url: config.searchHotelMemberInfo,
      params: {
        hotelId: this.data.hotelId
      }
    }
    app.nGet(data).then(data => {
      if (data.data) {
        data.data.forEach(e => {
          e.select = false
          return data.data
        })
        this.setData({
          accomAdd: data.data,
        })
        app.saveValue('accomAdd', this.data.accomAdd)
        console.log(data.data, '添加')
      }
    }, res => {

    });
  },

  // 酒店房间列表
  hotelsRoomList() {
    var data = {
      url: config.hotelsRoomList + this.data.hotelId,
      // params: {
      //   hotelId: ''
      // }
    }
    app.nGet(data).then(data => {
      if (data.data) {
        console.log(data.data, '酒店房间')
      }
    }, res => {

    });
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