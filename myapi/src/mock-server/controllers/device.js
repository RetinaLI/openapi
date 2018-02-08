let fs = require("fs");

module.exports = {
  getDeviceList(){
    return JSON.parse(fs.readFileSync(__dirname + "/../json/device-list.json"));
  }
};