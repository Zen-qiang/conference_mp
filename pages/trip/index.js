// pages/trip/index.js
const app = getApp();
import config from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate: '',
    minDate: new Date().getTime(),
    show: false,
    show1: false,
    // 用户登陆信息
    loginData: '',
    // 选中同行人员的信息
    selectMemberInfo: '',
    selectId: [],//id
    selectMemberInfo1: '',
    selectId1: [],//id
    // 
    journeyType: 'ARRIVE',
    createdTime: '',// 当前时间
    disabled: true, // tab 是否禁用
    activeNum: 0,// 显示下划线
    // 到站信息
    checked: false, //自行解决
    ind: 0,
    showList: false,
    trafficList: [
      { id: 10, value: '高铁' },
      { id: 11, value: '飞机' },
      {id: 12, value: '动车'}
    ],
    value:'高铁',//交通类型
    valueId: 10,//交通类型ID
    city: '',
    addr: '',
    time: '',
    shifts: '',
    // 返回信息
    checked1: false,
    ind1: 0,
    showList2: false,
    trafficList2: [
      { id: 10, value: '高铁' },
      { id: 11, value: '飞机' },
      { id: 12, value: '动车' }
    ],
    value1: '高铁',
    valueId1: 10,
    city1: '',
    addr1: '',
    time1: '',
    shifts1: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.activeNum == 1) {
      this.setData({
        journeyType: 'DEPART'
      })
    } 
    if (options.activeNum == 0) {
      this.setData({
        journeyType: 'ARRIVE'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  closeTrafficLeft(e) {
    if(this.data.showList == true) {
      this.setData({
        showList: false,
      })
    }
    if (this.data.showList2 == true) {
      this.setData({
        showList2: false,
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    let loginData = app.getValue('loginData');
    // 选中的同行人员的信息
    let selectMemberInfo = app.getValue('clickSelectArr');
    let selectMemberInfo1 = app.getValue('clickSelectArr1');
    let entryObj = app.getValue('entryObj');
    console.log(entryObj)
    if (this.data.journeyType == 'ARRIVE') {
      this.setData({
        activeNum: 0,
        checked: entryObj.isHandleByOneself || '',
        ind: entryObj.ind || '',
        value: entryObj.trafficValue || '高铁',
        valueId: entryObj.fkVehiclesId || '',
        city: entryObj.arriveCity || '',
        addr: entryObj.arrivePlace || '',
        time: entryObj.arriveTime || '',
        shifts: entryObj.numberOfRuns || ''
      })
    }else {
      this.setData({
        activeNum: 1,
        checked1: entryObj.isHandleByOneself || '',
        ind1: entryObj.ind1 || '',
        value1: entryObj.trafficValue || '',
        valueId1: entryObj.fkVehiclesId || '',
        city1: entryObj.arriveCity || '',
        addr1: entryObj.arrivePlace || '',
        time1: entryObj.arriveTime || '',
        shifts1: entryObj.numberOfRuns || ''
      })
    }

    this.properties()
    this.setData({
      loginData: loginData,
      selectMemberInfo: selectMemberInfo || [],
      selectMemberInfo1: selectMemberInfo1 || [],
    })
    // 同行人员的id 提交的时候使用
    this.data.selectMemberInfo.forEach((e) => {
      this.data.selectId.push(e.id)
    })
    this.data.selectMemberInfo1.forEach((e) => {
      this.data.selectId1.push(e.id)
    })
  },
  // 切换tabjourneyType
  titleInfo(e) {
    if (e.detail.title == '到站信息') {
      this.setData({
        journeyType: 'ARRIVE'
      })
    }
    if (e.detail.title == '返回信息') {
      this.setData({
        journeyType: 'DEPART'
      })
    }
  },

  // 时间弹窗模块

  // 时间格式化 年月日
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
  // 显示时间弹窗
  showpopup() {
    this.setData({
      show: true,
      show1: false
    })
  },
  showpopup1() {
    this.setData({
      show: false,
      show1:true
    })
  },
  // 关闭时间弹窗
  onClose() {
    if (this.data.journeyType == 'ARRIVE') {
      this.setData({ show: false });
    }else {
      this.setData({ show1: false });
    }
  },
  // 改变时间
  onInput(event) {
    this.setData({
      // currentDate: event.detail
    });
  },
  // 确认 按钮
  confirm(e) {
    if (this.data.journeyType == 'ARRIVE') {
      this.setData({
        show: false,
        currentDate: e.detail,
        time: this.changeTimeType(e.detail),
        // time1: this.changeTimeType(e.detail)
      });
    }else {
      this.setData({
        show1: false,
        currentDate: e.detail,
        // time1: this.changeTimeType(e.detail),
        time1: this.changeTimeType(e.detail)
      });
    }
  },
  // 取消 按钮
  cancel() {
    if (this.data.journeyType == 'ARRIVE') {
      this.setData({
        show: false
      });
    }else {
      this.setData({
        show1: false
      });
    }
  },
    /**
   * 到站
   */
  // 切换开关
  switchBtnChange(e) {
    console.log(e)
    this.setData({
      checked: e.detail
    })
  },
  // 显示交通类型选择框
  showList() {
    this.setData({
      showList: !this.data.showList
    })
  },
  // 点击选择的交通类型
  selectItem(e) {
    console.log(e)
    this.setData({
      ind: e.currentTarget.dataset.index,
      value: e.currentTarget.dataset.value,
      valueId: e.currentTarget.dataset.id, 
      showList: !this.data.showList
    })
  },
  blurCity(e) {
    if (this.data.journeyType == 'ARRIVE') {
      this.setData({
        city: e.detail
      })
    }
    if (this.data.journeyType == 'DEPART') {
      this.setData({
        city1: e.detail
      })
    }
  },
  blurAddr(e) {
    if (this.data.journeyType == 'ARRIVE') {
      this.setData({
        addr: e.detail
      })
    }
    if (this.data.journeyType == 'DEPART') {
      this.setData({
        addr1: e.detail
      })
    }
  },
  blurTime(e) {
      this.setData({
        time: e.detail
      })
    // if (this.data.journeyType == 'DEPART') {
    //   this.setData({
    //     time1: e.detail
    //   })
    // }
  },
  blurTime1(e) {
    this.setData({
      time1: e.detail
    })
  },
  blurShifts(e) {
    if (this.data.journeyType == 'ARRIVE') {
      this.setData({
        shifts: e.detail
      })
    }
    if (this.data.journeyType == 'DEPART') {
      this.setData({
        shifts1: e.detail
      })
    }
  },
  /**
   * 返回
   */
  // 开关切换
  switchBtnChange1(e) {
    console.log(e)
    this.setData({
      checked1: e.detail
    })
  },
  // 显示交通类型选择框
  showList2() {
    this.setData({
      showList2: !this.data.showList2
    })
  },
  // 点击选择的类型
  selectItem2(e) {
    console.log(e)
    this.setData({
      ind1: e.currentTarget.dataset.index,
      value1: e.currentTarget.dataset.value,
      showList2: !this.data.showList2
    })
  },
  // 成员信息
  memberInfo() {
    // 将填入的信息存起来  从其他成员页面跳回时 回显在页面上
    if (this.data.journeyType == 'ARRIVE') {
      let entryToObj = {
        ind: this.data.ind || '',
        trafficValue: this.data.value,
        isHandleByOneself: this.data.checked,
        fkVehiclesId: this.data.valueId,
        arriveCity: this.data.city,
        arrivePlace: this.data.addr,
        arriveTime: this.data.time,
        numberOfRuns: this.data.shifts,
      }
      app.saveValue('entryObj', entryToObj);
    }else {
      let entryBackObj = {
        ind1: this.data.ind1,
        trafficValue: this.data.value1,
        // trafficId: this.data.valueId1,
        isHandleByOneself: this.data.checked1,
        fkVehiclesId: this.data.valueId1,
        arriveCity: this.data.city1,
        arrivePlace: this.data.addr1,
        arriveTime: this.data.time1,
        numberOfRuns: this.data.shifts1,
        fkConferenceId: 1
      }
      app.saveValue('entryObj', entryBackObj);
    }
    wx.reLaunch({
      url: '/pages/memberInfo/index?page=' + 'trip' + '&journeyType=' + this.data.journeyType,
    })
  },
  // 点击完成  添加成员
  toDetail() {
    // selectId
    wx.removeStorageSync('entryObj')
    wx.removeStorageSync('journeyType')
    wx.removeStorageSync('clickSelectArr')
    wx.removeStorageSync('clickSelectArr1')
    wx.removeStorageSync('journeyType')

    let arrive = {
      fkUserId: this.data.loginData.company.id,
      journeyType: this.data.journeyType, //
      fkVehiclesId: this.data.valueId,
      arriveCity: this.data.city,
      arrivePlace: this.data.addr,
      arriveTime: this.data.time,
      numberOfRuns: this.data.shifts,
      createdTime: new Date(),
      isHandleByOneself: this.data.checked,
      fkConferenceId: 1
    }
    let depart = {
      fkUserId: this.data.loginData.company.id,
      journeyType: this.data.journeyType, 
      fkVehiclesId: this.data.valueId1,
      arriveCity: this.data.city1,
      arrivePlace: this.data.addr1,
      arriveTime: this.data.tiem1,
      numberOfRuns: this.data.shifts1,
      createdTime: new Date(),
      isHandleByOneself: this.data.checked1,
      fkConferenceId: 1
    }
    let backObj = JSON.stringify(arrive)
    let toarr = JSON.stringify(depart)
    if (this.data.journeyType == 'ARRIVE') {
      var data = {
        url: config.addJourney,
        params: {
          journey:  '[' + JSON.stringify(arrive) + ']',
          memberIds: '[' + this.data.selectId + ']'
        },
      }
    } 
    if (this.data.journeyType == 'DEPART') {
      var data = {
        url: config.addJourney,
        params: {
          journey: '[' + JSON.stringify(depart) + ']',
          departMemberIds: '[' + this.data.selectId1 + ']'
        },
      }
    }
    app.nPut(data).then(data => {
      if (data.code === 0) {
        wx.reLaunch({
          url: '/pages/activetab/activetab',
        })
      }
    }, res => {
      console.log(res)
    })
  },
  // 获取交通类型
  properties() {
    var data = {
      url: config.properties,
      params: {
        group: 'VEHICLES_TYPE'
      },
    }
    app.nGet(data).then(data => {
      if (data.data) {
        this.setData({
          trafficList: data.data,
          trafficList2: data.data
        })
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