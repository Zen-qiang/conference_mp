import { addPic, addFeedback } from '../../../api/common'
import Toast from '@vant/weapp/toast/toast'
Page({
  data: {
    tempImg: [],
    _paramsImg: []
  },
  onUnload () {
    this._timer && clearTimeout(this._timer)
  },
  _deleteImg ({ currentTarget: { dataset: { index } } }) {
    // console.log(index)
    wx.showModal({
      content: '确定删除照片',
      success: (res) => {
        if (res.confirm) {
          this.data.tempImg.splice(index, 1)
          this.data._paramsImg.splice(index, 1)
          this.setData({ tempImg: this.data.tempImg })
        }
      }
    })
  },
  _chooseImg () {
    wx.chooseImage({
      count: 4 - this.data.tempImg.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // console.log(res)
        if (res.errMsg === 'chooseImage:ok') {
          this._uploadimg({ path: res.tempFilePaths })
        }
      }
    })
  },
  async _formSubmit ({ detail: { value }}) {
    const params = {
      content: value.textarea,
      pic: this.data._paramsImg.length ? this.data._paramsImg.join(',') : ''
    }
    if (params.content === '') {
      Toast('你还没有输入内容哦～')
      return
    }
    try {
      await addFeedback(params)
      Toast({
        message: '你的反馈已收到，我们会第一时间处理',
        duration: 2000
      })
      this._timer = setTimeout(() => {
        wx.navigateBack()
      }, 2000)
    } catch (err) {
      console.log(err)
    }
  },
  _uploadimg (data) {
    let i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0
    addPic(data.path[i]).then(res => {
      // console.log('success', res)
      // tempFilePath可以作为img标签的src属性显示图片
      this.data.tempImg.push(data.path[i])
      this.setData({ tempImg: this.data.tempImg })
      this.data._paramsImg.push(res)
      success++
    }).catch(err => {
      // console.log('fail', err)
      fail++
      // console.log('fail:' + i + "fail:" + fail)
      Toast.fail({
        message: `第${i}张图片上传失败`,
        duration: 1500
      })
    }).finally(() => {
      // console.log('complete')
      i++
      if (i === data.path.length) { //当图片传完时，停止调用     
        // console.log('执行完毕')
        // console.log('成功：' + success + " 失败：" + fail)
      } else { //若图片还没有传完，则继续调用函数
        data.i = i
        data.success = success
        data.fail = fail
        this._uploadimg(data) //递归，回调自己
      }
    })
  }
})