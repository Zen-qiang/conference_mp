// pages/memberInfo/index.js
const app = getApp();
import config from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNum: '',
    journeyid: '',
    membersInfo: '',
    tripMembersInfo: '',
    page: '',//判断从哪个页面来
    journeyType: '',//判断是返程还是到达
    arrId:[],
    selectId: [],// 存放选中人员的Id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.page) {
      this.addJourneyMembersInfo()
      this.setData({
        page: options.page,
        journeyType: options.journeyType
      })
    }else {
      this.setData({
        journeyid: options.journeyid
      })
      // this.getMembersInfo()
    }
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
  selectClick(e) {
    console.log(e,'选中')
    // 到站
    if (this.data.journeyType == 'ARRIVE') {
      let index = e.currentTarget.dataset.index;
      let arrs = this.data.tripMembersInfo;
      if (arrs[index].isChecked == false) {
        arrs[index].isChecked = true;
      } else {
        arrs[index].isChecked = false;
      }
      this.setData({
        tripMembersInfo: arrs
      })
    }else{ // 返程
      let index = e.currentTarget.dataset.index;
      let arrs = this.data.tripMembersInfo;
      if (arrs[index].isChecked == false) {
        arrs[index].isChecked = true;
      } else {
        arrs[index].isChecked = false;
      }
      this.setData({
        tripMembersInfo: arrs
      })
    }
  },

  // 底部确认按钮
  footBtn() {
    if (this.data.journeyType == 'ARRIVE') {
      this.setData({
        activeNum: 0
      })
      let clickSelectArr = this.data.tripMembersInfo.filter((e, i) => {
        console.log(e)
        return e.isChecked === true
      })
      app.saveValue('clickSelectArr', clickSelectArr);
    }else {
      this.setData({
        activeNum: 1
      })
      let clickSelectArr1 = this.data.tripMembersInfo.filter((e, i) => {
        console.log(e)
        return e.isChecked === true
      })
      app.saveValue('clickSelectArr1', clickSelectArr1);
    }
    if (this.data.page ) {
      wx.reLaunch({
        url: '/pages/trip/index?activeNum=' + this.data.activeNum
      })
    }else {
      console.log(2)
    }
  },
  // 获取同程人员信息
  getMembersInfo() {
    var data = {
      url: config.membersInfo,
      params: {
        journeyId: this.data.journeyid
      }
    }
    app.nGet(data).then(data => {
      if(data.data) {
        this.setData({
          membersInfo:data.data
        })
        console.log(this.data.membersInfo)
      }
    }, res => {

    })
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
  // 获取 添加行程人员的信息
  addJourneyMembersInfo() {
    let appointTime = this.changeTimeType(new Date().getTime())
    var data = {
      url: config.addJourneyMembersInfo,
      params: {
        appointTime: appointTime,
      }
    }
    app.nGet(data).then(data => {
      if (data.data) {
        this.setData({
          tripMembersInfo: data.data
        })
        console.log(data.data,'xinxi')
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