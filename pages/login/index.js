// pages/login/index.js
const app = getApp();
import config from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameValue: '',
    passValue: '',
    show: true
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
  // 账号
  nameInput(e) {
    this.setData({
      nameValue: e.detail.value
    })
  },
  // 密码
  passInput(e) {
    this.setData({
      passValue: e.detail.value
    })
  },
  // 登陆
  login() {
    if (this.data.nameValue && this.data.passValue) {
    // 账号密码都不为空
    // 登陆请求login
      var data = {
        url: config.login,
        params: {
          userName: this.data.nameValue,
          password: this.data.passValue
        }
      }
      app.nPost(data).then(res => {
        app.showMsg("登录成功");
        if (res.data) {
        }
        app.saveValue('uid', res.data.uid);
        app.saveValue('sessionKey', res.data.sessionToken);
      }, res => {
        this.setData({
          show: false,
          disabled: false
        })
        // console.error(res);
      });
      return false
    } else {
      //账号 或 密码 为空
      app.showMsg("请输入账号或密码！");
    }
  },
  // 账号清除
  nameClear() {
    this.setData({
      nameValue: ''
    })
  },
  // 密码清除
  passClear() {
    this.setData({
      passValue: ''
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