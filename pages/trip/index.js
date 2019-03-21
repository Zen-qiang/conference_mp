// pages/trip/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 到站
    checked: true,
    // 返回
    checked1: false,
    // tab 是否禁用
    disabled: true,
    // 显示下划线
    activeNum: 0,
    // 到站
    showList: false,
    // 返回
    showList2: false,
    // 到站
    name: '飞机',
    // 返回
    name2: '飞机',
    // 到站
    trafficList: [
      { name: '飞机' },
      { name: '动车' },
      {name: '火车'}
    ],
    // 返回
    trafficList2: [
      { name: '飞机' },
      { name: '动车' }
    ],
    ind: 0,
    ind2: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.activeNum == 1) {
      this.setData({
        disabled:false
      })
    } 
    console.log(options)
    this.setData({
      activeNum: options.activeNum
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
  onShow: function (e) {
    console.log(e)
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
      name: e.currentTarget.dataset.name,
      showList: !this.data.showList
    })
  },
  onClickIcon() {
    console.log('22')
  },
  blur(e) {
    console.log(e)
    console.log('444')
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
      ind2: e.currentTarget.dataset.index,
      name2: e.currentTarget.dataset.name,
      showList2: !this.data.showList2
    })
  },
  toDetail() {
    wx.navigateTo({
      url: '/pages/finishTrip/index',
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