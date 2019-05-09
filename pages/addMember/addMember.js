const app = getApp()
import config from '../../config.js'
Page({
  data: {
    infoList: []
  },
  onLoad (option) {
    console.log('addMember-onload', option)
    this.addInfo()
  },
  // 新增
  addInfo () {
    const infoObj = {
      name: '', // 用户名
      pic: '', // 照片
      tel: '', // 手机号
      idCard: '', // 身份证号
      genderObj: [
        {
          id: 4,
          value: '男'
        },
        {
          id: 5,
          value: '女'
        }
      ],
      genderIndex: 0, // 性别当前选中下标
      verify: { // 验证输入值是否合法
        name: false,
        pic: false,
        tel: false,
        idCard: false
      }
    }
    this.data.infoList.unshift(infoObj)
    this.setData({
      infoList: this.data.infoList
    })
  },
  // 新增代报名
  addMember () {
    if (!this.verified()) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }
    this.addInfo()
  },
  /* 
  * index 下标
  * target 目标key值
  * reg 正则表达式
  * value 值
  */
  inputFn (index, target, reg, value) {
    const key = `infoList[${index}]`
    let targetVal = key + `.${target}`
    let targetVerify = key + `.verify.${target}`
    let flag = !reg.test(value)
    this.setData({
      [targetVal]: value,
      [targetVerify]: flag
    })
  },
  // 姓名输入事件
  inputName (e) {
    let index = e.target.dataset.index,
    target = 'name',
    // 以中文字母开头，字母，数字，减号，下划线 2-8位
    reg = /^[\u4e00-\u9fa5a-zA-Z-_a-zA-Z0-9]{2,20}$/,
    value = e.detail.value
    this.inputFn(index, target, reg, value)
  },
  // 手机号输入事件
  inputTel (e) {
    let index = e.target.dataset.index,
    target = 'tel',
    // 以中文字母开头，字母，数字，减号，下划线 2-8位
    reg = /^1[34578]\d{9}$/,
    value = e.detail.value
    this.inputFn(index, target, reg, value)
  },
  // 身份证号输入事件
  inputIdCard (e) {
    let index = e.target.dataset.index,
    target = 'idCard',
    // 18位身份证号
    reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    value = e.detail.value
    this.inputFn(index, target, reg, value)
  },
  // 选择性别
  selectGender (e) {
    console.log(e)
    let key = `infoList[${e.target.dataset.index}].genderIndex`
    this.setData({
      [key]: e.detail.value
    })
  },
  // 选择照片
  chooseImg (e) {
    let key = `infoList[${e.currentTarget.dataset.index}].pic`,
    verifyKey = `infoList[${e.currentTarget.dataset.index}].verify.pic`
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        that.setData({
          [key]: tempFilePaths,
          [verifyKey]: false
        })
      },
      fail (res) {
        that.setData({
          [key]: '',
          [verifyKey]: true
        })
      }
    })
  },
  // 验证当前代报名对象所有值是否正确
  verified () {
    if (!this.data.infoList.length) return
    const obj = this.data.infoList[0],
    objVerify = obj.verify,
    objValues = Object.values(objVerify),
    objKeys = Object.keys(objVerify)
    for (let i = 0; i < objValues.length; i++) {
      if (!obj[objKeys[i]] || objValues[i]) {
        return false
      }
    }
    return true
  },
  saveMember () {
    if (!this.verified()) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
      })
      return
    }
    const members = this.data.infoList.map(item => {
      let fk_gender_id = item.genderObj[item.genderIndex].id,
      {name, pic: photo, tel: phone_no, idCard: id_number} = item
      return {name, photo, phone_no, id_number, fk_gender_id}
    })
    app.saveValue('members', members)
    wx.showToast({
      title: '保存成功'
    })
    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  }
})