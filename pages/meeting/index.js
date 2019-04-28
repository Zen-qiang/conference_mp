// pages/meeting/index.js
const app = getApp();
import config from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchName: '切换',
    canChangeConferenceList: '', // 切换会务列表
    currentConference: '', // 当前会务
    id: ''
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
  switch(e) {
    this.setData({
      id: e.currentTarget.dataset.id
    })
    this.changeConference()
    if (this.data.switchName == '切换') {
      this.setData({
        switchName: '当前会务'
      })
    }else{
      this.setData({
        switchName: '切换'
      })
    }
  },
// 获取会务列表
  getSearchChangeConferenceList() {
    var data = {
      url: config.searchChangeConferenceList,
      params: {
        pageNo:1,
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

  // 切换 会务
  changeConference() {
    var data = {
      url: config.changeConference + this.data.id,
      // params: {
      //   id: this.data.id
      // },
    }
    app.nPut(data).then(data => {
      if (data.data) {
        console.log(data.data)
        this.getSearchChangeConferenceList()
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