import { getRequest, postRequest } from '../utils/request'
module.exports.getAreasList = (data, config = {}) => getRequest('/areas/getAreasList', data, config) // 区域列表
module.exports.getAddressList = (data, config = {}) => getRequest('/address/list', data, config) // 查看地址列表
module.exports.deleteAddress = (data, config = {}) => postRequest('/address/deleteAddress', data, config) // 删除地址
module.exports.addOrUpdateAddress = (data, config = {}) => postRequest('/address/addOrUpdateAddress', data, config) // 添加或者修改地址