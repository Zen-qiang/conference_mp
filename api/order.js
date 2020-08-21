import { getRequest, postRequest } from '../utils/request'
module.exports.orderPayTest = (data, config = {}) => postRequest('/order/orderPayTest', data, config)
module.exports.createOrder = (data, config = {}) => postRequest('/order/createOrder', data, config) // 创建订单
module.exports.orderPay = (data, config = {}) => postRequest('/order/orderPay', data, config) // 订单支付
module.exports.refreshCount = (data, config = {}) => getRequest('/order/refreshCount', data, config) // 刷新用户每个订单状态的数量
module.exports.orderPreview = (data, config = {}) => getRequest('/order/orderPreview', data, config) // 订单预览
module.exports.getOrderList = (data, config = {}) => getRequest('/order/getOrderList', data, config) // 用户订单列表
module.exports.orderCancel = (data, config = {}) => postRequest('/order/orderCancel', data, config) // 取消订单
module.exports.orderDetail = (data, config = {}) => getRequest('/order/orderDetail', data, config) // 订单详情
module.exports.refreshOrderPreview = (userCouponId = null, config = {}) => postRequest('/order/refreshOrderPreview', { userCouponId }, config) // 取消订单
module.exports.orderSuccess = (orderNo, config = {}) => postRequest('/order/orderSuccess', { orderNo }, config) // 取消订单
module.exports.createEvaluate = (data, config = { showLoading: true }) => postRequest('/evaluate/createEvaluate', data, config) // 取消订单
