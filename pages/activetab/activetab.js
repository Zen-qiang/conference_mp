// pages/finishTrip/index.js
const app = getApp();
import config from '../../config.js';
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
    showClearBtn: false,
    journeyType: 'ARRIVE',
    // 行程列表数据
    journeyList: '',
    // 删除行程的id
    journeyId: null
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
    this.getJourneyList()
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
  // 获取是到站  还是返回
  toTitle() {
    this.setData({
      activeNum: 0,
      journeyType: 'ARRIVE'
    })
    this.getJourneyList()
  },
  backTitle() {
    this.setData({
      activeNum: 1,
      journeyType: 'DEPART'
    })
    this.getJourneyList()
  },
  // 点击 clearIcon 删除行程
  clearBtn(e) {
    this.setData({
      journeyId: e.currentTarget.dataset.id
    })
    console.log(this.data.journeyId)
    var data = {
      url: config.deleteJourney+'?journeyId=' + this.data.journeyId
      // params: {
      //   journeyId: this.data.journeyId
      // }
    }
    app.nDelete(data).then(data => {
      if(data.code === 0) {
        this.getJourneyList()
      }

      },res => {

      })
  },
  // 成员列表
  toMemberList(e) {
    let journeyid = e.currentTarget.dataset.journeyid
    wx.navigateTo({
      // url: '/pages/memberInfo/index?journeyid=' + journeyid,
      url: '/pages/memberInfo/index'
    })
  },
  // 点击 底部我的专车 按钮
  toCar() {
    wx.navigateTo({
    })
  },

  // 获取行程列表
  getJourneyList() {
    var data = {
      url: config.journeyList,
      params: {
        journeyType: this.data.journeyType,
      }
    }
    app.nGet(data).then(data => {
      if(data.data) {
        this.setData({
          journeyList: data.data
        })
      }
      },res => {

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