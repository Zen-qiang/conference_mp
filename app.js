//app.js
const openIdUrl = require('./config').openIdUrl
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    // userInfo: null
    hasLogin: false,
    openid: null
  },
  getUserOpenId: function (callback) {
    var self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function (data) {
          console.log('wx.login data', data)
          console.log('openIdUrl', openIdUrl)
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success: function (res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail: function (res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function (err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  },
  // 网络请求=========
  /**
   * get请求
   * */
  nGet: function (data) {
    let params = data.params || {};
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        let element = params[key];
        if (element instanceof Array) {
          params[key] = JSON.stringify(element)
        }
      }
    }
    var _that = this;
    let sessionKey = this.getValue('sessionKey') || '';
    // let cityId = this.getValue('cityCode') || '310000';
    let promise = new Promise(function (resolve, reject) {
      wx.request({
        url: data.url,
        xhrFields: { withCredentials: true },
        data: params,
        method: "GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'session-Token': sessionKey,
          // 'city': cityId,
        },
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) {
          if (res.data && res.data.code === 0) {
            resolve(res.data);
          } else if (res.data && res.data.code === 8006 || res.data && res.data.code === 8005) {
            _that.clearValue();
            wx.reLaunch({
              url: '/pages/login/index?page=first'
            });
          } else {
            reject(res.data);
            if (res.data && res.data.message) {
              _that.showMsg(res.data.message);
            }
          }
        }
      });
    });
    return promise;
  },
  /**
* post请求
* */
  nPost: function (data) {
    let params = data.params || {};
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        let element = params[key];
        if (element instanceof Array) {
          params[key] = JSON.stringify(element)
        }
      }
    }
    var _that = this;
    let sessionKey = this.getValue('sessionKey') || '';
    // let cityId = this.getValue('cityCode') || '310000';
    let promise = new Promise(function (resolve, reject) {
      wx.request({
        url: data.url,
        data: params,
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'session-Token': sessionKey,
          // 'city': cityId,
        },
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) {
          if (res.data && res.data.code === 0) {
            resolve(res.data);
          } else if (res.data && res.data.code === 8006 || res.data && res.data.code === 8005) {
            _that.clearValue();
            wx.reLaunch({
              url: '/pages/login/index?page=first'
            });
          } else {
            reject(res.data);
            if (res.data && res.data.message) {
              _that.showMsg(res.data.message);
            }
          }
        }
      });
    });
    return promise;
  },

  /**
* delete请求
* */
  nDelete: function (data) {
    let params = data.params || {};
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        let element = params[key];
        if (element instanceof Array) {
          params[key] = Number(element)
        }
      }
    }
    var _that = this;
    let sessionKey = this.getValue('sessionKey') || '';
    // let cityId = this.getValue('cityCode') || '310000';
    let promise = new Promise(function (resolve, reject) {
      wx.request({
        url: data.url,
        data: params,
        method: "DELETE",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'session-Token': sessionKey,
          // 'city': cityId,
        },
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) {
          if (res.data && res.data.code === 0) {
            resolve(res.data);
          } else if (res.data && res.data.code === 8006 || res.data && res.data.code === 8005) {
            _that.clearValue();
            wx.reLaunch({
              url: '/pages/login/index?page=first'
            });
          } else {
            reject(res.data);
            if (res.data && res.data.message) {
              _that.showMsg(res.data.message);
            }
          }
        }
      });
    });
    return promise;
  },
  /**
* put请求
* */
  nPut: function (data) {
    var _that = this;
    let sessionKey = this.getValue('sessionKey') || '';
    // let cityId = this.getValue('cityCode') || '310000';
    let promise = new Promise(function (resolve, reject) {
      wx.request({
        url: data.url,
        data: data.params,
        method: "PUT",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'session-Token': sessionKey,
          // 'city': cityId,
        },
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) {
          if (res.data && res.data.code === 0) {
            resolve(res.data);
          } else if (res.data && res.data.code === 8006 || res.data && res.data.code === 8005) {
            _that.clearValue();
            wx.reLaunch({
              url: '/pages/login/index?page=first'
            });
          } else {
            reject(res.data);
            if (res.data && res.data.message) {
              _that.showMsg(res.data.message);
            }
          }
        }
      });
    });
    return promise;
  },
  // 本地存储=========
  saveValue: function (key, value) {
    wx.setStorageSync(key, value);
  },

  getValue: function (key) {
    return wx.getStorageSync(key);
  },
  removeValue: function (key) {
    wx.removeStorageSync(key);
  },
  clearValue: function () {
    wx.clearStorageSync();
  },
  // 提示弹窗=========
  showMsg: function (msg, rduration) {
    if (!rduration) {
      rduration = 2;
    }
    rduration = 1000 * rduration;
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: rduration
    })
  },
})