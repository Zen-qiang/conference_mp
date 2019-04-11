// pages/hotel/index.js
const app = getApp();
import config from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      { url: '../../common/resource/lb1.jpg' },
      { url: '../../common/resource/lb2.jpg' },
      { url: '../../common/resource/lb3.jpg' },
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
    // 日期选择器弹窗
    currentDate: '',
    minDate: new Date().getTime(),
    show: false,
    enterTime: '',
    show1: false,
    leaveTime: '',
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
  toPeoPleManage() {
    wx.navigateTo({
      url: '/pages/peopleManage/index'
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