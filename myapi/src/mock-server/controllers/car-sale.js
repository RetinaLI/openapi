let fs = require("fs");

module.exports = {
  getSaleInfoByCarType() {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/saleInfo_carType.json"));
  },
  getSaleInfoByMonth() {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/saleInfo_month.json"));
  },
  getSaleInfoByCity() {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/saleInfo_city.json"));
  },
  getRepairSummary() {
    return { "data": "", "info": "", "list": "", "map": { "notRealNum": 33291, "totalNum": 60404 }, "success": true, "texts": "", "totalCount": 0, "url": "" };
  },
  getRepairList() {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/repair_list.json"));
  },
  getRepairInfo() {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/repair_info.json"));
  },
  getFenceLocationList() {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/fence_location_list.json"));
  },
  getSaleWarnList(_params) {
    if (_params.sort && _params.sort.indexOf("estimateSaleDate") > 0) {
      return JSON.parse(fs.readFileSync(__dirname + "/../json/no_sale_warn_list.json"));
    }
    return JSON.parse(fs.readFileSync(__dirname + "/../json/sale_warn_list.json"));
  }
}