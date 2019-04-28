// pages/peopleManage/index.js
const app = getApp();
import config from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,//弹窗
    show1: false,
    index: '',
    ind: '',
    title: '删除',
    hotelId: '',
    hotelRoomType: '',
    hotelName: '',
    addListNew: [],
    columns:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'333')
    this.setData({
      hotelId: options.hotelId || 2,
      hotelName: options.hotelName
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
    this.properties()
    this.setData({
      addListNew: app.getValue('keepArr') || []
    })
  },
  // 切换 删除 或 取消 状态
  switchTitle() {
    if (this.data.title == '删除') {
      this.setData({
        title: '取消'
      })
    } else {
      this.setData({
        title: '删除'
      })
    }
  },
  showSelect(e) {
    this.setData({
      ind: e.currentTarget.dataset.index,
      show1: true
    })
  },
  // 房间类型弹窗事件
  onChange(event) {
    console.log(event)
    const { picker, value, index } = event.detail;
    // Toast(`当前值：${value}, 当前索引：${index}`);
  },
  onCancel() {
    this.setData({
      show1: false
    });
  },
  onConfirm(e) {
    let key = 'addListNew['+this.data.ind+'].roomType'
    let key1 = 'addListNew[' + this.data.ind + '].fkRoomTypeId'
    this.setData({
      show1: false,
      [key]: e.detail.value.value,
      [key1]: e.detail.value.id
    });
    console.log(this.data.addListNew)
  },
  // 点击 编辑  去成员列表页面
  toAccomAdd(e) {
    console.log(e)
    this.setData({
      ind: e.currentTarget.dataset.index
    })
    app.saveValue('keepArr', this.data.addListNew);
    wx.navigateTo({
      url: '/pages/accomAdd/accomAdd?hotelId=' + this.data.hotelId + '&hotelName=' + this.data.hotelName + '&ind=' + this.data.ind,
    })
  },
  //  点击 删除
  deleteList(e) {
    this.setData({
      show: true,
      index: e.currentTarget.dataset.index
    })
  },
  // 删除弹窗事件
  // 确认
  confirm() {
    this.data.addListNew.splice(this.data.index, 1)
    this.setData({
      addListNew: this.data.addListNew,
      show: false 
    })
    console.log(this.data.addListNew)
  },
  // 取消
  cancel() {
    this.setData({ show: false });
  },
  // 关闭弹窗
  onClose() {
    this.setData({
      show: false,
      show1: false
    });
  },
  // 新增房型
  addListNew() {
    this.data.addListNew.push({ roomType: '房型', edit: '编辑', delet: '删除', fkHotelId: Number(this.data.hotelId), fkRoomTypeId: 1, fkMemberId: [], fkConferenceId: 1 })

    this.setData({
      addListNew: this.data.addListNew
    })
    console.log(this.data.addListNew)
  },
  // 点击保存 按钮
  keepBtn() {
    // wx.removeStorageSync('keepArr')
    this.setData({
      // addListNew: []
    })
    console.log('1')
    this.saveAccommodation()
    console.log('2')
  },


  // searchUpdateConferenceData() {
  //   var data = {
  //     url: config.searchUpdateConferenceData,
  //     params: {
  //       hotelId: this.data.hotelId
  //     }
  //   }
  //   app.nGet(data).then(data => {
  //     if (data.data) {
  //       this.setData({
  //         hotelsList: data.data
  //       })
  //       console.log(this.data.hotelsList)
  //     }
  //   }, res => {

  //   });
  // },


  // 房型属性
  properties() {
    var data = {
      url: config.properties,
      params: {
        group: 'HOTEL_ROOM_TYPE'
      }
    }
    app.nGet(data).then(data => {
      if (data.data) {
        let columns = []
        data.data.forEach((e,i) => {
          e.text = e.value
          columns.push(e)
          return columns
        })
        this.setData({
          hotelRoomType: data.data,
          columns: columns
        })
      }
    }, res => {

    });
  },

  // 保存预定入住信息
  saveAccommodation() {
    let postArr = []
    let fkMemberId = new Array()
    this.data.addListNew.forEach((e,i) => {
      delete e.roomType,
      delete e.edit,
      delete e.delet
      let arr = []
        e.fkMemberId.forEach((item, i) => {
          delete item.isChecked,
          delete item.name,
          delete item.photo,
          delete item.reserveId
          arr.push(item.memberId)
        })
      e.fkMemberId = arr
      fkMemberId.push(...e.fkMemberId)
      postArr.push(e)
      return postArr
    })
    // 处理数据  使数据结构符合接口参数
    let arr3 = []
    for (let index = 0; index < postArr.length; index++) {
      let flag = true;
      let obj = {};
      for (const key in postArr[index]) {
        obj[key] = postArr[index][key];
        if (Array.isArray(postArr[index][key])) {
          flag = false;
        }
      }
      if (flag) {
        arr3.push(postArr[index]);
      } else {
        for (let j = 0; j < postArr[index].fkMemberId.length; j++) {
          let obj2 = {};
          for (const key in obj) {
            obj2[key] = obj[key];
          }
          obj2.fkMemberId = postArr[index].fkMemberId[j];
          arr3.push(obj2);
        }
      }
    }
    // console.log(postArr, '4444')
    // console.log(fkMemberId,'4444')
    var data = {
      url: config.saveAccommodation,
      params: {
        hotelRoomReserveList: JSON.stringify(arr3),
        memberIds: JSON.stringify(fkMemberId),
        hotelId: this.data.hotelId,
        isMustUpdate: true
      }
    }
    app.nPost(data).then(data => {
      if (data.data) {
        console.log(data.data)
        wx.navigateTo({
          url: '/pages/hotel/index',
        })
      }
    }, res => {

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