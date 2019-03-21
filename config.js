


// const host = "http://192.168.3.41:5300";
const host = "https://sit.dingliantech.com";

let api = {
  login: `${host}/api/user/login`,
}

var config = {
  host,
  ...api
};

module.exports = config;