import { getUserInfo } from '../api/user'
const wxLogin = () => new Promise((resolve, reject) => {
  wx.login({
    success (res) {
      console.log('login success')
      if (res.code) {
        //发起网络请求
        getUserInfo({ code: res.code }).then(({ data }) => {
          console.log('login res', data)
          wx.setStorageSync('token', data.token)
          resolve(data)
        }).catch(err => {
          console.log('login err', err)
          wx.clearStorageSync()
          reject(err)
        })
      } else {
        console.log('登录失败！' + res.errMsg)
        reject(res)
      }
    },
    fail (err) {
      console.log('login error')
      console.log('登录失败！' + res)
      reject(err)
    }
  })
})
const wxCheckSession = () => new Promise((resolve, reject) => {
  wx.checkSession({
    success () {
      console.log('checkLogin success')
      //session_key 未过期，并且在本生命周期一直有效
      if (wx.getStorageSync('token')) {
        resolve(wx.getStorageSync('token'))
      } else {
        wxLogin().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      }
      // resolve(wx.getStorageSync('token'))
    },
    fail () {
      console.log('checkLogin error')
      // session_key 已经失效，需要重新执行登录流程
      wxLogin().then(res => { //重新登录
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    }
  })
})

module.exports = {
  wxCheckSession: wxCheckSession,
  wxLogin: wxLogin
}
