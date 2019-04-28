// pages/accomAdd/accomAdd.js
const app = getApp();
import config from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotelId: '',
    accomAdd:'',
    addListNew: '',
    hotelName: '',
    ind: '',
    showClick: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hotelId: options.hotelId,
      hotelName: options.hotelName,
      ind: options.ind
    })
    this.setData({
      addListNew: app.getValue('keepArr') || [],
      accomAdd: app.getValue('accomAdd')
    })
    console.log(this.data.addListNew,'aa')
    console.log(options)
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
    let flag = false
    console.log(e)
    let index = e.currentTarget.dataset.index;
    let arrs = this.data.accomAdd;
    console.log(this.data.addListNew[this.data.ind].fkMemberId.indexOf(arrs[index]))
    console.log(arrs[index])
    console.log(this.data.addListNew[this.data.ind].fkMemberId)
    if (this.data.addListNew[this.data.ind].fkMemberId.length) {
      this.data.addListNew[this.data.ind].fkMemberId.forEach((e,i) => {
        if (e.memberId == arrs[index].memberId) {
          return flag = true
        }else {
          return flag = false
        }
      })
      if (arrs[index].isChecked && flag) {
        arrs[index].isChecked = false; 
        let inx = this.data.addListNew[this.data.ind].fkMemberId.forEach((e, i) => {
          if (e.memberId == arrs[index].memberId) {
            return i
          }
        })
        this.data.addListNew[this.data.ind].fkMemberId.splice(inx,1)
        console.log('111')
        console.log(this.data.addListNew[this.data.ind].fkMemberId)
      } 
      console.log(arrs)
      if (!arrs[index].isChecked && !flag) {
        arrs[index].isChecked = true;
        console.log('222')
        this.data.addListNew[this.data.ind].fkMemberId.push(arrs[index])
      }
    }else {
      if (arrs[index].isChecked) {
        arrs[index].isChecked = true;
        app.showMsg("该成员已入住其他房间");
      }else {
        arrs[index].isChecked = true;
        this.data.addListNew[this.data.ind].fkMemberId.push(arrs[index])
      }
    }

    this.setData({
      accomAdd: arrs
    })
    app.saveValue('accomAdd', this.data.accomAdd)

  },
  toBack() {
    console.log('3333')
    console.log('/pages/peopleManage/index?hotelId=' + this.data.hotelId + '&hotelName=' + this.data.hotelName)
    app.saveValue('keepArr', this.data.addListNew)
    wx.navigateTo({
      url: '/pages/peopleManage/index?hotelId=' + this.data.hotelId + '&hotelName=' + this.data.hotelName
    })
    // clickSelectArr = []
  },
  // // 添加住宿人员列表
  // searchHotelMemberInfo() {
  //   var data = {
  //     url: config.searchHotelMemberInfo,
  //     params: {
  //       hotelId: this.data.hotelId
  //     }
  //   }
  //   app.nGet(data).then(data => {
  //     if (data.data) {
  //       this.setData({
  //         accomAdd: data.data,
  //       })
  //       console.log(data.data, '添加')
  //     }
  //   }, res => {

  //   });
  // },
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