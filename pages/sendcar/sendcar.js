const app = getApp();
import config from '../../config.js';

Page({
  data: {
    user: false,
    topList: [
      { title: '全部车辆' },
      { title: '已报名车辆' }
    ],
    inx: 0,
    bgcShow: false, //立即发车
    carList: '',// 车辆列表
    reportCarList: '',
    membersInfo: '',//添加人员列表
    ind: '',
    selectArr: ''
  },
  onLoad: function (options) {
    this.setData({
      ind: options.index || ''
    })
  },
  onShow() {
    // 全部车辆
    this.getCarList()
    // 已报名的车辆
    this.getReportCarList()
    this.setData({
      membersInfo: app.getValue('carMembersInfo'),
      selectArr: app.getValue('carArr') || []
    })
    // 添加乘车人员列表
    if (this.data.membersInfo) {
      return false
    }else {
      this.getMembersInfo()
    }
    let loginData = app.getValue('loginData');
    if (loginData.roleSet[0] == 'admin') {
      this.setData({
        user: true
      })
    } else {
      this.setData({
        user: false
      })
    }
  },
  switchTopTitle(e) {
    console.log(e)
    this.setData({
      inx: e.currentTarget.dataset.index
    })
  },

  toDriveredit() {
    wx.navigateTo({
      url: '/pages/driveredit/driveredit',
    })
  },
  // 立即发车
  nowClick() {
    this.setData({
      bgcShow: true
    })
  },
  // 乘客
  toPassengerInfo() {
    wx.navigateTo({
      url: '/pages/passengerInfo/passengerInfo'
    })
  },
  // 点击图片 去详情
  toVehicledetails(e) {
    console.log(e)
    let carId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/vehicledetails/vehicledetails?id=' + carId
    })
  },
  // 点击立即报名
  toCoverPage(e) {
    console.log(e)
    this.setData({
      ind: e.currentTarget.dataset.index
    })
    console.log(this.data.ind)
    let carArr = this.data.carList.filter(item => {
      if (item.id == e.currentTarget.dataset.id) {
        return item
      }
    })
    app.saveValue('carArr', carArr); 
    wx.navigateTo({
      url: '/pages/carMermber/carMermber?index=' + this.data.ind
    })
  },

  // 获取车辆列表carList （全部车辆）
  getCarList() {
    var data = {
      url: config.carList,
      params: {
        isApply: false
      }
    }
    app.nGet(data).then(data => {
      if (data.data) {
        if (this.data.ind) {
          data.data[this.data.ind].members.push(...this.data.selectArr[0].members)
        }
        this.setData({
          carList: data.data
        })
        console.log(data.data,'车辆列表')
      }
    }, res => {

    });
  },
  // 获取车辆列表 （已报名车辆）
  getReportCarList() {
    var data = {
      url: config.carList,
      params: {
        isApply: true
      }
    }
    app.nGet(data).then(data => {
      if (data.data) {
        this.setData({
          reportCarList: data.data
        })
        console.log(data.data, '已报名车辆列表')
      }
    }, res => {

    });
  },
  // 获取添加人员列表
  getMembersInfo() {
    var data = {
      url: config.searchAddVehiclesShiftsMembersInfo,
    }
    app.nGet(data).then(data => {
      if (data.data) {
        this.setData({
          membersInfo: data.data
        })
        app.saveValue('carMembersInfo', this.data.membersInfo)
      }
    }, res => {

    })
  },
  // 查询班次信息
  queryVehiclesShifts() {
    var data = {
      url: config.queryVehiclesShifts,
      params: {
        offset: '',
        limit: ''
      }
    }
    app.nGet(data).then(data => {
      if (data.data) {

      }
    }, res => {

    });
  }
})