// pages/diNing/diNing.js
const app = getApp();
import config from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: false,
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
    let loginData = app.getValue('loginData');
    // if (loginData.roleSet[0] == 'admin') {
    //   this.setData({
    //     user: true
    //   })
    // } else {
    //   this.setData({
    //     user: false
    //   })
    // }
  },

  showScan() {
    var that = this
    wx.scanCode({
      success(res) {
        var result = res.result;
       that.setData({
         id: result
        })
        that.queryMealById(res.result)
        console.log(res)
      }
    })
  },


// 根据Id查询用餐信息
  queryMealById(id) {
    let mealId = id
    var data = {
      url: config.queryMealById,
      params: {
        id: mealId
      },
    }
    app.nGet(data).then(data => {
      if (data.data) {
        console.log(data.data,'用餐信息')
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