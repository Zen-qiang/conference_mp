// pages/user/index.js
const app = getApp();
import config from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    tableList: [
      { name: '报名信息', img: '../../common/resource/enroll.svg', index: 0 },
      { name: '行程安排', img: '../../common/resource/trip.svg', index: 1 },
      { name: '派车管理', img: '../../common/resource/cart.svg', index: 2 },
      { name: '住宿登记', img: '../../common/resource/room.svg', index: 3 },
      { name: '用餐扫码', img: '../../common/resource/sm.svg', index: 4 },
      { name: '证件通行', img: '../../common/resource/paper.svg', index: 5}
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
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
  //  点击设置图标
  toLogOut() {
    wx.navigateTo({
      url: '/pages/logOut/logOut',
    })
  },
  switch() {
    wx.navigateTo({
      url: '/pages/meeting/index',
    })
  },
  //  根据点击的信息 跳转
  toPage(e) {
    let content = e.currentTarget.dataset.content
    switch (content) {
      case '报名信息':
        console.log(1)
        break;
      case '行程安排':
        wx.reLaunch({
          url: '/pages/activetab/activetab',
        })
        break;
      case '派车管理':
        wx.reLaunch({
          url: '/pages/sendcar/sendcar',
        })
        break;
      case '住宿登记':
        wx.reLaunch({
          url: '/pages/acconmmodation/acconmmodation'
        })
        break;
      case '用餐扫码':
        wx.navigateTo({
          url: '/pages/diNing/diNing'
        })
        break;
      case '证件通行':
        console.log(6)
        break;
    }
  },
  // 去最新的状态
  toNewState() {
    wx.navigateTo({
      url: '/pages/newState/newState',
    })
  },

  // 获取个人数据
  getUserInfo() {
    var data = {
      url: config.userInfo,
      params: {},
    }
    app.nGet(data).then(data => {
      if(data.data) {
        this.setData({
          userInfo: data.data
        })
      }

    },res => {

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