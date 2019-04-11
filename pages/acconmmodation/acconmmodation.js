const app = getApp();
import config from '../../config.js';
Page({
  data: {
    user: false,// 不同的权限用户登陆显示不同的内容
    topList: [
      { title: '安排入住' },
      {title: '已经入住'}
    ],
    inx: 0,
    // 日期选择器弹窗
    currentDate: '',
    minDate: new Date().getTime(),
    show: false,
    startTime: '',
    show1: false,
    endTime: '',
    tabList: [
      { title: '未登记房间号', num: 2, active: 'numAcive1'},
      { title: '已登记房间号', num: 58, active: 'numAcive2'},
      { title: '所有用户', num: 60, active: 'numAcive3'}
    ],
    ind: 0
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let loginData = app.getValue('loginData');
    if (loginData.roleSet[0] == 'admin') {
      this.setData({
        user: true
      })
    }else {
      this.setData({
        user: false
      })
    }
  },
  switchTopTitle(e) {
    this.setData({
      inx: e.currentTarget.dataset.index
    })
  },
  switchTab(e) {
    this.setData({
      ind: e.currentTarget.dataset.index
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
    this.setData({ show: false,show1: false });
  },
  confirm(e) {
      this.setData({
        show: false,
        currentDate: e.detail,
        startTime: this.changeTimeType(e.detail),
      });
  },
  confirm1(e) {
    this.setData({
      show1: false,
      currentDate: e.detail,
      endTime: this.changeTimeType(e.detail),
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
  toHotel() {
    wx.navigateTo({
      url: '/pages/hotel/index'
    })
  }
})