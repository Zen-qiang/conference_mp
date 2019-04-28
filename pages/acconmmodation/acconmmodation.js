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
    // 酒店列表
    hotelsList: '',
    // 已经入住信息
    hotelRoomReserveMembers: [],
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
    this.getJourneyList()
    this.searchHotelRoomReserveMembers() // 已经入住
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
  // 时间格式化 时间戳  =》 年月日
  changeTimeType(time) {
    var timeType = ''
    var date = new Date(time)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = (date.getDate() + 1 < 10 ? '0' + (date.getDate()) : date.getDate())
      // let h = date.getHours() + ':'
  // let m = date.getMinutes() + ':'
  // let s = date.getSeconds()
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
  // 扫码  调用摄像头
  showScan() {
    wx.scanCode({
      success(res) {
        console.log(res)
        let productId = res.result
        let goodsType = 'productId'
      }
    })
  },
  // 安排车辆接送
  toCar() {
    wx.reLaunch({
      url: '/pages/sendcar/sendcar',
    })
  },
  // 筛选酒店
  selectHotels() {
    // 时间非空校验
    if (this.data.startTime == ''){
      app.showMsg("请选择起始时间");
    } else if (this.data.endTime == '') {
      app.showMsg("请选择截止时间");
    }else {
      this.hotelsList()
    }
  },
  // 点击 去酒店详情
  toHotelInfo(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/hotel/index?id=' + id + '&startTime=' + this.data.startTime + '&endTime=' + this.data.endTime
    })
  },

  // 获取酒店列表
  hotelsList() {
    var data = {
      url: config.hotelsList,
      params: {
        startTime: this.data.startTime + ' ' + '00' + ':' + '00' + ':' + '00',
        endTime: this.data.endTime + ' ' + '00' + ':' + '00' + ':' + '00'
      }
    }
    app.nGet(data).then(data => {
      if (data.data) {
        this.setData({
          hotelsList: data.data
        })
        console.log(this.data.hotelsList)
      }
    }, res => {

    });
  },
  // 住宿人员列表
  getJourneyList() {
    var data = {
      url: config.accommodationMembers,
      params: {
      }
    }
    app.nGet(data).then(data => {
      if (data.data) {
        console.log(data.data,'zhus')
      }
    }, res => {

    });
  },
  // 查询已经入住信息
  searchHotelRoomReserveMembers() {
    var data = {
      url: config.searchHotelRoomReserveMembers,
      params: {}
    }
    app.nGet(data).then(data => {
      if (data.data) {
        let hotelRoomReserveMembers = []
        hotelRoomReserveMembers.push(data.data)
        this.setData({
          hotelRoomReserveMembers: hotelRoomReserveMembers
        })
        console.log(data, '已经入住')
        // console.log(this.data.hotelRoomReserveMembers, '已经入住')
      }
    }, res => {

    });
  }
  
})