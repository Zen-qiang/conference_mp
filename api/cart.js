import { getRequest, postRequest } from '../utils/request'
module.exports.getCartList = (data, config = {}) => getRequest('/cart/getCartList', data, config) // 获取购物车列表
module.exports.addOrUpdate = (data, config = {}) => postRequest('/cart/addOrUpdate', data, config) // 添加商品到购物车或者增加购物车产品数量
module.exports.reduce = (data, config = {}) => postRequest('/cart/reduce', data, config) // 减少购物车产品数量
module.exports.updateQty = (data, config = {}) => postRequest('/cart/updateQty', data, config) // 修改购物车产品数量
module.exports.deleteProduct = (data, config = {}) => postRequest('/cart/deleteProduct', data, config) // 删除购物车里N个产品