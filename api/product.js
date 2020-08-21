import { getRequest, postRequest } from '../utils/request'
module.exports.getIsCommandProductList = (data, config = {}) => getRequest('/product/getIsCommandProductList', data, config) // 获取首页轮播图列表
module.exports.getList = (data, config = {}) => getRequest('/product/getList', data, config) // 搜索产品，动态排序
module.exports.getDetail = (data, config = {}) => getRequest('/product/getDetail', data, config) // 查看产品详情
module.exports.getSaleProductList = (data, config = {}) => getRequest('/product/getSaleProductList', data, config) // 促销产品列表
module.exports.getProductEvaluate = ({ productId, pageNum, pageSize }, config = {}) => getRequest('/evaluate/getProductEvaluate', { productId, pageNum, pageSize }, config) // 查看产品评价