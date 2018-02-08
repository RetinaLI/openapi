
let fs = require("fs");

module.exports = {
  getCarList() {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/car_list.json")).list;
  },
  getCar() {

  },
  getCarListByCarType() {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/car_list_by_car_type.json")).list;
  },
  getBrands() {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/car_brands.json")).list;
  },
  getTypeByBrand(id) {
    if (id == 3001)
      return JSON.parse(fs.readFileSync(__dirname + "/../json/car_type_by_brand_3001.json")).treeNodes;
    if (id == 50042)
      return JSON.parse(fs.readFileSync(__dirname + "/../json/car_type_by_brand_50042.json")).treeNodes;
    if (id == 57662)
      return JSON.parse(fs.readFileSync(__dirname + "/../json/car_type_by_brand_57662.json")).treeNodes;
  },
  getCarNumberByCity() {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/car_number_by_city.json")).list;
  },
  findAttendRateGroupByProvince() {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/attendRate_groupBy_city.json")).sectionMap;
  },
  findMileageOnMap() {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/mileage_on_map.json")).sectionMap;
  },
  findAvgVelocityByProvince() {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/avg_velocity_province.json")).list;
  },
  findAttendanceRateByMonth() {
    return { map: JSON.parse(fs.readFileSync(__dirname + "/../json/attendanceRate_month.json")).map };
  },
  findVelocityAvgByMonth() {
    return { map: JSON.parse(fs.readFileSync(__dirname + "/../json/VelocityAvgByMonth.json")).map };
  },
  findDrivingMileageByMonth() {
    return { map: JSON.parse(fs.readFileSync(__dirname + "/../json/DrivingMileageByMonth.json")).map };
  },
  getInstallByCarBrandDate() {
    return { data: JSON.parse(fs.readFileSync(__dirname + "/../json/installByCarBrandDate.json")).data };
  },
  getOnlineSummary() {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/online_summary.json"));
  },
  getWarnSummaryList() {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/WarnSummaryList.json"));
  },
  getSaleSummaryByDms() {
    return { "data": "", "info": "", "list": "", "map": { "actualSalesNum": 1523, "totalNum": 65286 }, "mapList": [], "resultMap": {}, "success": true, "texts": "", "totalCount": 0, "url": "" };
  },
  getSaleSummaryByEstimate() {
    return { "data": "", "info": "", "list": "", "map": { "actualSalesNum": 797, "totalNum": 17011 }, "mapList": [], "resultMap": {}, "success": true, "texts": "", "totalCount": 0, "url": "" };
  },

  getCarAlarmList() {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/car-alarm-list.json"));
  },

  getCarAlarmDetailList(_params) {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/car-alarm-detail-list.json"));
  },

  getCarRunSummary() {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/car-run-summary.json"));
  },
  getCarCollectStatus() {
    return { "carInfoList": "", "data": "", "info": "", "list": "", "success": true, "texts": "", "totalCount": 0, "url": "", "userList": "" };
  },
  collectCar(_isCollect) {
    return { "carInfoList": "", "data": "", "info": _isCollect ? "保存成功" : "成功取消收藏！", "list": "", "success": true, "texts": "", "totalCount": 0, "url": "", "userList": "" };
  },
  getDeviceInfo() {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/car-device-info.json"));
  }
};