// pages/newState/newState.js
const app = getApp();
import config from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canChangeConferenceList: '', // 切换会务列表
    currentConference: '', // 当前会务
    steps: [
      {
        text: '[上海市] 行程车辆接送已更新',
        desc: '2019-04-16 16:20:15'
      },
      {
        text: '吊牌打印成功',
        desc: '2019-04-16 18:20:15'
      },
      {
        text: '全季酒店入住登记成功',
        desc: '2019-04-16 18:40:15'
      }
    ],
    active: 0,
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
    this.getSearchChangeConferenceList()
  },

  // 获取会务列表
  getSearchChangeConferenceList() {
    var data = {
      url: config.searchChangeConferenceList,
      params: {
        pageNo: 1,
        pageSize: 100,
      },
    }
    app.nGet(data).then(data => {
      if (data.data) {
        this.setData({
          canChangeConferenceList: data.data.canChangeConferenceList,
          currentConference: data.data.currentConference,
        })
      }

    }, res => {

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