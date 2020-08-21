// const baseUrl = 'https://avril.easy.echosite.cn'
// const baseUrl = 'https://dksx.dingliantech.com'
const baseUrl = 'http://120.24.29.201:8080/wuye'
function getCommonHeader () {

  let header = {
    'content-type': 'application/json'
    // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  }

  // 如果token有值则带上
  let token = wx.getStorageSync("token")
  if (token) {
    header = Object.assign({}, header, {
      'token': token
    })
  }

  return header
}

Object.defineProperty(Promise.prototype, 'finally', {
  get: () => function (callback) {
    const P = this.constructor
    return this.then(
      value => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => { throw reason })
    )
  }
})

function request (url, data = {}, header = {}, method = "POST", config = {}) {

  // header 空值处理
  let _header = {
    "content-type": "application/x-www-form-urlencoded"
  }
  if (Object.keys(header).length > 0) {
    _header = header
  }

  let showToast = true,
    showLoading = false,
    loadingTitle = '加载中...'
  // 默认显示toast
  if (config['showToast'] !== undefined && config['showToast'] === false) {
    showToast = false
  }
  // 默认显示loading
  if (config['showLoading'] != undefined && config['showLoading'] == true) {
    showLoading = true
  }
  if (config['loadingTitle']) {
    loadingTitle = config['loadingTitle']
  }

  return new Promise((resolve, reject) => {
    // 是否显示loading
    if (showLoading) {
      wx.showLoading({ title: loadingTitle, icon: 'none', mask: true })
    }

    wx.request({
      url: url,
      data: data,
      header: _header,
      method: method,
      success: ({ cookies, data, errMsg, header, statusCode }) => {

        // 服务器 非200 错误
        if (statusCode && statusCode !== 200) {
          wx.showToast({ title: '服务器 ' + statusCode + ' 错误', icon: 'none' })
          reject(data)
          return
        }

        if (data && data.code !== 0) {
          // 业务状态非0 是否提示
          if (showToast) {
            wx.showToast({ title: data.msg, icon: 'none' })
          }

          reject(data)
          return
        }
        resolve(data)
      },
      fail: err => {

        if (err.errMsg.indexOf('url not in domain list') > -1) {
          wx.showToast({ title: '请求url不在合法域名中，请打开调试模式', icon: 'none' })
        }

        reject(err)
      },
      complete: () => {
        if (showLoading) {
          wx.hideLoading()
        }
      }
    })
  })

}
function upload (url, data = null, header = {}, filePath, config = {}) {

  // header 空值处理
  let _header = {
    "content-type": "multipart/form-data"
  }
  if (Object.keys(header).length > 0) {
    _header = header
  }

  let showToast = true,
    showLoading = false,
    loadingTitle = '正在上传...'
  // 默认显示toast
  if (config['showToast'] !== undefined && config['showToast'] === false) {
    showToast = false
  }
  // 默认显示loading
  if (config['showLoading'] != undefined && config['showLoading'] == true) {
    showLoading = true
  }
  if (config['loadingTitle']) {
    loadingTitle = config['loadingTitle']
  }

  return new Promise((resolve, reject) => {
    // 是否显示loading
    if (showLoading) {
      wx.showLoading({ title: loadingTitle, icon: 'none', mask: true })
    }

    wx.uploadFile({
      url,
      filePath,
      header: _header,
      name: 'file',
      formData: data,
      success: ({ cookies, data, errMsg, header, statusCode }) => {
        const parseData = JSON.parse(data)
        // 服务器 非200 错误
        if (statusCode && statusCode !== 200) {
          wx.showToast({ title: '服务器 ' + statusCode + ' 错误', icon: 'none' })
          reject(parseData)
          return
        }

        if (data && parseData.code !== 0) {
          // 业务状态非0 是否提示
          if (showToast) {
            wx.showToast({ title: parseData.msg, icon: 'none' })
          }

          reject(parseData)
          return
        }
        resolve(parseData.data)
      },
      fail: err => {

        if (err.errMsg.indexOf('url not in domain list') > -1) {
          wx.showToast({ title: '请求url不在合法域名中，请打开调试模式', icon: 'none' })
        }

        reject(err)
      },
      complete: () => {
        if (showLoading) {
          wx.hideLoading()
        }
      }
    })
  })

}

function getRequest (url, data = {}, config = {}) {
  return request(baseUrl + url, data, getCommonHeader(), "GET", config)
}
function postRequest (url, data = {}, config = {}) {
  return request(baseUrl + url, data, getCommonHeader(), "POST", config)
}
function uploadFile (url, filePath, data = null, config = {}) {
  return upload(baseUrl + url, data, getCommonHeader(), filePath, config)
}

module.exports = {
  getRequest: getRequest,
  postRequest: postRequest,
  uploadFile: uploadFile
}