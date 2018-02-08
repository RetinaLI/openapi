
let fs = require("fs");

module.exports = {
  getReportList(_type) {
    if(_type == 1)
      return JSON.parse(fs.readFileSync(__dirname + "/../json/month_report_list.json"));
    if(_type == 2)
      return JSON.parse(fs.readFileSync(__dirname + "/../json/week_report_list.json"));
  },
  getReportData(_type) {
    if(_type == 1)
      return JSON.parse(fs.readFileSync(__dirname + "/../json/month_report_data.json"));
    if(_type == 2)
      return JSON.parse(fs.readFileSync(__dirname + "/../json/week_report_data.json"));
  }
};