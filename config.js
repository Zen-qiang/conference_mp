


const host = "http://192.168.8.8:5300";
// const host = "https://sit.dingliantech.com";
// const host = "http://192.168.3.16:5300";

let api = {
  login: `${host}/api/user/login`,
}

var config = {
  host,
  ...api
};

module.exports = config;