let express = require("express");
let path = require('path');
let app = express();
let router = express.Router();

let Controller = require("./controllers/index");

router.use("/mock-api/*", (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});

// router.get("/test/info", (req, res) => {
//   res.status(200).send('ok, come on!');
// });

router.get("/mock-api/manage/resource!treeMobilePanel.do", (req, res) => {
  res.status(200).send({list: Controller.passport.getMenuList()});
});

router.post("/mock-api/model.do", (req, res) => {
  let url = req.body.url;
  let menu = Controller.passport.getMenu(url);
  res.status(200).send({ url: menu && menu.reallyUrl || "" });
});

router.post("/mock-api/business/car_info!list.do", (req, res) => {
  res.status(200).send({ list: Controller.car.getCarList() });
});
router.get("/mock-api/sas/market/capacity_analysis!dynamicAreaAnalysis.do", (req, res) => {
  res.status(200).send({ list: Controller.chart.getDanymicAreaData() });
});

router.post("/mock-api/sas/car_operation!listGroupByCarType.do", (req, res) => {
  res.status(200).send({ list: Controller.car.getCarListByCarType() });
});

router.get("/mock-api/common/car_brand!combo.do", (req, res) => {
  res.status(200).send({ list: Controller.car.getBrands() });
});

router.get("/mock-api/common/car_type!ztree.do", (req, res) => {
  let carBrandId = req.query.carBrandId;
  res.status(200).send({ treeNodes: Controller.car.getTypeByBrand(carBrandId) });
});

router.post("/mock-api/sas/market/device_monthly!findCountByProvince.do", (req, res) => {
  res.status(200).send({ list: Controller.car.getCarNumberByCity() });
});

router.post("/mock-api/sas/market/device_monthly!findAttendRateGroupByProvince.do", (req, res) => {
  res.status(200).send({ sectionMap: Controller.car.findAttendRateGroupByProvince() });
});

router.post("/mock-api/sas/market/device_monthly!findMileageOnMap.do", (req, res) => {
  res.status(200).send({ sectionMap: Controller.car.findMileageOnMap() });
})

router.post("/mock-api/sas/market/device_monthly!findAvgVelocityByProvince.do", (req, res) => {
  res.status(200).send({ list: Controller.car.findAvgVelocityByProvince() });
});

router.post("/mock-api/sas/market/device_monthly!findAttendanceRate.do", (req, res) => {
  res.status(200).send(Controller.car.findAttendanceRateByMonth());
});

router.post("/mock-api/sas/market/device_monthly!findVelocityAvg.do", (req, res) => {
  res.status(200).send(Controller.car.findVelocityAvgByMonth());
});

router.post("/mock-api/sas/market/device_monthly!findDrivingMileage.do", (req, res) => {
  res.status(200).send(Controller.car.findDrivingMileageByMonth());
});

router.get("/mock-api/business/component!installByCarBrandDate.do", (req, res) => {
  res.status(200).send(Controller.car.getInstallByCarBrandDate());
});

router.post("/mock-api/sas/vlogistics/car_shipping_record!summaryInfo.do", (req, res) => {
  res.status(200).send(Controller.logistics.getCarShippingRecord());
});

router.post("/mock-api/sas/vlogistics/car_shipping_record!mileageOverHalfOrder.do", (req, res) => {
  res.status(200).send(Controller.logistics.getMileageOverHalfOrder());
});

router.post("/mock-api/sas/vlogistics/car_shipping_record!list.do", (req, res) => {
  res.status(200).send(Controller.logistics.getCarShippingList({ tboxStatus: req.body.tboxStatus }));
});

router.post("/mock-api/sas/vlogistics/car_shipping_record!mileageOverHalfOrder.do", (req, res) => {
  res.status(200).send(Controller.logistics.getCarShippingMileageOverHalfOrderList());
});

router.post("/mock-api/vlogistics2/car_shipping_record!get.do", (req, res) => {
  res.status(200).send(Controller.logistics.getOrderInfo());
});

router.post("/mock-api/business/location!listByDid.do", (req, res) => {
  res.status(200).send(Controller.logistics.getOrderTransportLocation());
});

router.post("/mock-api/vlogistics2/order!get.do", (req, res) => {
  res.status(200).send(Controller.logistics.getOrderFence());
});

router.post("/mock-api/sas/car_lifecycle!orderDeliveryByCarType.do", (req, res) => {
  res.status(200).send(Controller.logistics.getOrderDeliveryByCarType());
});

router.post("/mock-api/sas/vlogistics/order!orderSummary.do", (req, res) => {
  res.status(200).send(Controller.logistics.getOrderSummary());
});

router.post("/mock-api/sas/vlogistics/order!anomalyOrderSummary.do", (req, res) => {
  res.status(200).send(Controller.logistics.getAnomalyOrderSummary());
});

router.post("/mock-api/sas/car_lifecycle!listSalesInfoByCarType.do", (req, res) => {
  res.status(200).send(Controller.carSale.getSaleInfoByCarType());
});

router.post("/mock-api/sas/car_lifecycle!listSalesInfoByTime.do", (req, res) => {
  res.status(200).send(Controller.carSale.getSaleInfoByMonth());
});

router.post("/mock-api/sas/car_lifecycle!listSalesInfoByProvince.do", (req, res) => {
  res.status(200).send(Controller.carSale.getSaleInfoByCity());
});

router.post("/mock-api/business/server_summary!onlineInfo.do", (req, res) => {
  res.status(200).send(Controller.car.getOnlineSummary());
});

router.get("/mock-api/business/alarm_summary!listRealTimeByCompany.do", (req, res) => {
  res.status(200).send(Controller.car.getWarnSummaryList());
});

router.post("/mock-api/sas/car_lifecycle!saleSummaryByDms.do", (req, res) => {
  res.status(200).send(Controller.car.getSaleSummaryByDms());
});

router.post("/mock-api/sas/car_lifecycle!listAllSaleWarning.do", (req, res) => {
  res.status(200).send(Controller.carSale.getSaleWarnList(req.body || {}));
});

router.post("/mock-api/sas/car_lifecycle!saleSummaryByEstimate.do", (req, res) => {
  res.status(200).send(Controller.car.getSaleSummaryByEstimate());
});

router.post("/mock-api/sas/repair!findSummary.do", (req, res) => {
  res.status(200).send(Controller.carSale.getRepairSummary());
});

router.post("/mock-api/sas/repair!listAll.do", (req, res) => {
  res.status(200).send(Controller.carSale.getRepairList());
});

router.post("/mock-api/sas/repair!get.do", (req, res) => {
  res.status(200).send(Controller.carSale.getRepairInfo());
});

router.post("/mock-api/business/location!listFenceByDid.do", (req, res) => {
  res.status(200).send(Controller.carSale.getFenceLocationList());
});

router.post("/mock-api/business/alarm_summary!listRealTimeByCompany.do", (req, res) => {
  res.status(200).send(Controller.car.getCarAlarmList());
});

router.post("/mock-api/business/alarm_summary!findAlarmDetailByCompany.do", (req, res) => {
  res.status(200).send(Controller.car.getCarAlarmDetailList());
});

router.get("/mock-api/sas/car_analysis!runInfo.do", (req, res) => {
  res.status(200).send(Controller.car.getCarRunSummary());
});

router.post("/mock-api/business/collect!findByCarId.do", (req, res) => {
  res.status(200).send(Controller.car.getCarCollectStatus());
});

router.post("/mock-api/business/collect!save.do", (req, res) => {
  res.status(200).send(Controller.car.collectCar(true));
});

router.post("/mock-api/business/collect!cancle.do", (req, res) => {
  res.status(200).send(Controller.car.collectCar(true));
});

router.post("/mock-api/business/device!findByDid.do", (req, res) => {
  res.status(200).send(Controller.car.getDeviceInfo());
});

router.post("/mock-api/manage/user!resetSeflPassword.do", (req, res) => {
  res.status(200).send(Controller.passport.changeAccountPassword());
});

router.post("/mock-api/manage/user!getSelf.do", (req, res) => {
  res.status(200).send(Controller.passport.getCurrentUserInfo());
});

router.post("/mock-api/business/device!list.do", (req, res) => {
  res.status(200).send(Controller.device.getDeviceList());
});

router.get("/mock-api/manage/user!listGroupUsers.do", (req, res) => {
  res.status(200).send(Controller.passport.getPlatformsByUser());
});
router.post("/mock-api/manage/user!joinGroup.do", (req, res) => {
  res.status(200).send(Controller.passport.addLoginPlatform());
});
router.post("/mock-api/security/login!loginNoCaptcha.do", (req, res) => {
  res.status(200).send(Controller.passport.loginPlatform());
});
router.get("/mock-api/business/subsc_file!listLinked.do", (req, res) => {
  res.status(200).send(Controller.report.getReportList(req.query.type));
});
router.get("/mock-api/upload/*.json", (req, res) => {
  res.status(200).send(Controller.report.getReportData(req.query.type));
});

router.get("/mock-api/api/list", (req, res)=>{
  res.status(200).send(Controller.service.getList());
});
router.get("/mock-api/api/detail", (req, res)=>{
  res.status(200).send(Controller.service.getDetail(req.query.id));
});

// app.use(router);
// app.listen(port, () => {
//   console.info(`mock server start success! please visit: http://localhost:${port}/***`);
// });
module.exports = router;