

// const host = "https://conferences.dlt-world.com";
const host = "http://192.168.8.8:5300";
// const host = "https://sit.dingliantech.com";
// const host = "http://192.168.3.16:5300";
// const host = "http://192.168.3.23:5300";
// const host = "http://192.168.3.7:5300";

let api = {
  // 登陆
  login: `${host}/api/user/login`,
  // 退出登录
  logout: `${host}/api/user/logout`,
  // 行程列表
  journeyList: `${host}/api/journey/list`,
  // 个人中心 页面数据
  userInfo: `${host}/api/user/findUserInfoByUserId`,
  // 删除行程
  deleteJourney: `${host}/api/journey/deleteJourney`,
  // 查看同程人员 信息
  membersInfo: `${host}/api/journey/searchJourneyMembersInfo`,
  // 添加行程
  addJourney: `${host}/api/journey/addJourney`,
  // 交通类型
  properties: `${host}/api/list/properties`,
  // 添加同行人员信息
  addJourneyMembersInfo: `${host}/api/journey/searchAddJourneyMembersInfo`,
  // 个人中心页面 切换会务列表
  searchChangeConferenceList: `${host}/api/conference/searchChangeConferenceList`,
  // 切换 会务
  changeConference: `${host}/api/conference/choose/`,

  // 住宿模块
  // 酒店列表/api/accommodation/hotels
  hotelsList: `${host}/api/accommodation/hotels`,
  // 酒店信息/api/accommodation/hotelInfo/{hotelId}
  hotelsInfo: `${host}/api/accommodation/hotelInfo/`,
  // 酒店房间列表/api/accommodation/hotelRooms/{hotelId}
  hotelsRoomList: `${host}/api/accommodation/hotelRooms/`,
  // 住宿人员列表/api/accommodation/members
  accommodationMembers: `${host}/api/accommodation/members`,
  // 查询已经入住信息
  searchHotelRoomReserveMembers: `${host}/api/accommodation/searchHotelRoomReserveMembers`,
  // 保存酒店预订信息时查询的人员信息
  searchUpdateConferenceData: `${host}api/accommodation/searchUpdateConferenceData`,
  // 添加住宿人员列表/api/accommodation/searchHotelMemberInfo
  searchHotelMemberInfo: `${host}/api/accommodation/searchHotelMemberInfo`,
  // 属性列表/api/list/properties
  properties: `${host}/api/list/properties`,
  //保存预定入住信息 
  saveAccommodation: `${host}/api/accommodation/saveAccommodation`,

  // 用餐模块
  // 根据Id查询用餐信息
  queryMealById: `${host}/meal/queryMealById`,




  // 派车管理模块
  // 车辆列表/api/dispatching/vehicles
  carList: `${host}/api/dispatching/vehicles`,
  // 新增车次信息/car/addCarInfo
  addCarInfo: `${host}/car/addCarInfo`,
  // 查询班次信息
  queryVehiclesShifts: `${host}/car/queryVehiclesShifts`,
  // 查询车辆信息  根据Id 
  queryVehicleInfoById: `${host}/api/dispatching/vehiclesInfo`,
  // 添加乘车人员时人员列表
  searchAddVehiclesShiftsMembersInfo: `${host}/api/dispatching/searchAddVehiclesShiftsMembersInfo`,
  // 添加乘车信息/api/dispatching/addVehiclesMembers
  addVehiclesMembers: `${host}/api/dispatching/addVehiclesMembers`,
  // 会务列表
  conferenceList: `${host}/api/conference/list`,
  // 会务详情
  conferenceInfo: `${host}/api/conference/info`,
  // 申请报名
  conferenceSign: `${host}/api/conference/enter`,
  // 报名成功显示信息
  searchApplySuccessMemberInfo: `${host}/api/conference/searchApplySuccessMemberInfo`
}

var config = {
  host,
  ...api
};

module.exports = config;