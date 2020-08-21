import { getRequest, postRequest, uploadFile } from '../utils/request'
module.exports.getBanner = (data, config = {}) => getRequest('/static/banner/list', data, config) // 获取首页轮播图列表
module.exports.getHomeCategoryList = (data, config = {}) => getRequest('/product/getHomeCategoryList', data, config) // 首页分类
module.exports.getCategory = (data, config = {}) => getRequest('/product/getCategory', data, config) // 获取一级分类
module.exports.getSecondCategoryProduct = (data, config = {}) => getRequest('/product/getSecondCategoryProduct', data, config) // 获取子分类和产品
module.exports.getServicetime = (data, config = {}) => getRequest('/servicetime/list', data, config) // 查看送达日期列表
module.exports.getAreasList = (data, config = {}) => getRequest('/areas/getAreasList', data, config) // 区域列表
module.exports.getCoupon = (data, config = {}) => getRequest('/coupon/list', data, config) // 查看优惠券列表
module.exports.orderCouponList = (amt, config = {}) => getRequest('/coupon/orderCouponList', { amt }, config) // 查看优惠券列表
module.exports.sendCouponForNewUser = (mobile, config = {}) => postRequest('/coupon/sendCouponForNewUser', { mobile }, config) // 新用户领取优惠券
module.exports.addFeedback = ({ content, pic }, config = { showLoading: true }) => postRequest('/opinions/add', { content, pic }, config) // 添加反馈建议
module.exports.addPic = (filePath, data = null, config = {}) => uploadFile('/opinions/addPic', filePath, data, config) // 反馈建议的图片