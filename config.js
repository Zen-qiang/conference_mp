

const host = "https://conferences.dlt-world.com";
// const host = "http://192.168.8.8:5300";
// const host = "https://sit.dingliantech.com";
// const host = "http://192.168.3.16:5300";
// const host = "http://192.168.3.23:5300";
// const host = "http://192.168.3.7:5300";

let api = {
  login: `${host}/api/user/login`,
  conferenceList: `${host}/api/conference/list`,
  conferenceInfo: `${host}/api/conference/info`
}

var config = {
  host,
  ...api
};

module.exports = config;