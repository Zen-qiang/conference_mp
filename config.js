


const host = "http://192.168.8.8:5300";
// const host = "https://sit.dingliantech.com";
// const host = "http://192.168.3.7:5300";

let api = {
  // 登陆
  login: `${host}/api/user/login`,
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
}

var config = {
  host,
  ...api
};

module.exports = config;