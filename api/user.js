import { getRequest, postRequest } from '../utils/request'
module.exports.getUserInfo = (data, config = {}) => getRequest('/user/getUserInfo', data, config) // 获取用户信息
module.exports.login = (data, config = {}) => postRequest('/user/login', data, config) // 解密用户手机号并登陆
module.exports.mobileLogin = (data, config = {}) => postRequest('/user/mobileLogin', data, config) // 用户手机号注册/登陆
module.exports.sendMessage = (data, config = {}) => getRequest('/user/sendMessage', data, config) // 发送验证码
module.exports.logOut = (data, config = {}) => getRequest('/user/logOut', data, config) // 退出登陆
module.exports.pointsDetail = (data, config = { showLoading: true }) => getRequest('/user/pointsDetail', data, config) // 用户积分明细
module.exports.getUserEvaluate = (data = { productId, pageNum, pageSize }, config = { showLoading: true }) => getRequest('/evaluate/getUserEvaluate', data, config) // 用户评价列表