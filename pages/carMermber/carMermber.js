// pages/carMermber/carMermber.js
const app = getApp();
import config from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carArr: '',
    membersInfo: '',
    ind: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ind: options.index
    })
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
    this.setData({
      carArr: app.getValue('carArr'),
      membersInfo: app.getValue('carMembersInfo')
    })
    console.log(this.data.carArr)
    console.log(this.data.membersInfo,'444')
  },
  selectClick(e) {
    console.log(e)
    let flag = false
    let index = e.currentTarget.dataset.index;
    let arrs = this.data.membersInfo;
    if (this.data.carArr[0].members.length) {
      this.data.carArr[0].members.forEach((e,i) => {
        if(e.id == arrs[index].id) {
          return flag = true
        }else {
          return flag = false
        }
      })
      if (arrs[index].isChecked && flag) {
        arrs[index].isChecked = false;
        let inx = this.data.carArr[0].members.forEach((e, i) => {
          if (e.id == arrs[index].id) {
            return i
          }
        })
        this.data.carArr[0].members.splice(inx, 1)
        console.log('111')
        console.log(this.carArr[0].members)
      }
      console.log(arrs)
      if (!arrs[index].isChecked && !flag) {
        arrs[index].isChecked = true;
        this.data.carArr[0].members.push(arrs[index])
      }
    }else {
      if (arrs[index].isChecked) {
        arrs[index].isChecked = true;
        app.showMsg("该成员已乘坐其他车辆");
      } else {
        arrs[index].isChecked = true;
        this.data.carArr[0].members.push(arrs[index])
      }
    }

    // if (arrs[index].isChecked == false) {
    //   arrs[index].isChecked = true;
    //   } else {
    //   arrs[index].isChecked = false;
    //   }
      this.setData({
        membersInfo: arrs
      })
    app.saveValue('carMembersInfo', this.data.membersInfo)
  },

  // 点击添加至车辆按钮
  addCar() {
    app.saveValue('carArr', this.data.carArr)
    wx.reLaunch({
      url: '/pages/sendcar/sendcar?index=' + this.data.ind,
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