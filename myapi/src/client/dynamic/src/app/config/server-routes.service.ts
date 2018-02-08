import { Injectable } from '@angular/core';

export const REQUEST_METHODS = {
  GET: "get",
  POST: "post"
};

export interface IServerRoute {
  url: string,
  method: string,
  responseDataIsList: boolean,
  delay: number //ms
}

@Injectable()
export class ServerRoutesService {

  constructor() {
    this.check();
  }

  private route_map: { [name:string]: [string, string, boolean, number] } = {
    "getCurrentUserInfo": ["/manage/user!getSelf.do", REQUEST_METHODS.POST, false, 0],
    "getDeviceList": ["/business/device!list.do", REQUEST_METHODS.POST, true, 3000],

    "getMobileModuleList": ["/manage/resource!treeMobilePanel.do", REQUEST_METHODS.GET, true, 1000],
    "validateRouteRedirect": ["/model.do", REQUEST_METHODS.POST, false, 1000],
    "getCarList": ["/business/car_info!list.do", REQUEST_METHODS.POST, true, 0],
    "collectCar": ["/business/collect!save.do", REQUEST_METHODS.POST, false, 0],
    "cancelCollectCar": ["/business/collect!cancle.do", REQUEST_METHODS.POST, false, 0],
    "getCarCollectStatus": ["/business/collect!findByCarId.do", REQUEST_METHODS.POST, false, 0],
    "getCarRunSummary": ["/sas/car_analysis!runInfo.do", REQUEST_METHODS.GET, false, 0],
    "getDeviceInfo": ["/business/device!findByDid.do", REQUEST_METHODS.POST, false, 0],

    "getDynamicAreaAnalysisData": ["/sas/market/capacity_analysis!dynamicAreaAnalysis.do", REQUEST_METHODS.GET, true, 0],
    "getCarListGroupByCarType": ["/sas/car_operation!listGroupByCarType.do", REQUEST_METHODS.POST, true, 2000],
    "getCarBrands": ["/common/car_brand!combo.do", REQUEST_METHODS.GET, true, 0],
    "getCarTypeByBrand": ["/common/car_type!ztree.do", REQUEST_METHODS.GET, true, 0],
    "getCarNumberByCity": ["/sas/market/device_monthly!findCountByProvince.do", REQUEST_METHODS.POST, true, 0],
    "getAttendRateGroupByProvince": ["/sas/market/device_monthly!findAttendRateGroupByProvince.do", REQUEST_METHODS.POST, true, 0],
    "getMileageOnMap": ["/sas/market/device_monthly!findMileageOnMap.do", REQUEST_METHODS.POST, true, 0],
    "getAvgVelocityByProvince": ["/sas/market/device_monthly!findAvgVelocityByProvince.do", REQUEST_METHODS.POST, true, 0],

    "getAttendanceRateByMonth": ["/sas/market/device_monthly!findAttendanceRate.do", REQUEST_METHODS.POST, true, 0],
    "getVelocityAvgByMonth": ["/sas/market/device_monthly!findVelocityAvg.do", REQUEST_METHODS.POST, true, 0],
    "getDrivingMileageByMonth": ["/sas/market/device_monthly!findDrivingMileage.do", REQUEST_METHODS.POST, true, 0],

    "getInstallByCarBrandDate": ["/business/component!installByCarBrandDate.do", REQUEST_METHODS.GET, false, 0],

    "getCarShippingRecord":["/sas/vlogistics/car_shipping_record!summaryInfo.do", REQUEST_METHODS.POST, false, 0],
    "getMileageOverHalfOrder": ["/sas/vlogistics/car_shipping_record!mileageOverHalfOrder.do", REQUEST_METHODS.POST, true, 0],
    "getCarShippingList": ["/sas/vlogistics/car_shipping_record!list.do", REQUEST_METHODS.POST, true, 3000],
    "getTransportOrderInfo": ["/vlogistics2/car_shipping_record!get.do", REQUEST_METHODS.POST, false, 0],
    "getOrderTransportLocation": ["/business/location!listByDid.do", REQUEST_METHODS.POST, true, 0],
    "getOrderFence": ["/vlogistics2/order!get.do", REQUEST_METHODS.POST, false, 0],

    "getOrderDeliveryByCarType": ["/sas/car_lifecycle!orderDeliveryByCarType.do", REQUEST_METHODS.POST, false, 0],
    "getOrderSummary": ["/sas/vlogistics/order!orderSummary.do", REQUEST_METHODS.POST, false, 0],
    "getAnomalyOrderSummary": ["/sas/vlogistics/order!anomalyOrderSummary.do", REQUEST_METHODS.POST, false, 0],

    "getSaleInfoByCarType": ["/sas/car_lifecycle!listSalesInfoByCarType.do", REQUEST_METHODS.POST, true, 0],
    "getSaleInfoByMonth": ["/sas/car_lifecycle!listSalesInfoByTime.do", REQUEST_METHODS.POST, true, 0],
    "getSaleInfoByCity": ["/sas/car_lifecycle!listSalesInfoByProvince.do", REQUEST_METHODS.POST, true, 0],

    "getOnlineSummary": ["/business/server_summary!onlineInfo.do", REQUEST_METHODS.POST, false, 0],
    "getWarnSummaryList": ["/business/alarm_summary!listRealTimeByCompany.do", REQUEST_METHODS.GET, true, 3000],

    "getSaleSummaryByDms": ["/sas/car_lifecycle!saleSummaryByDms.do", REQUEST_METHODS.POST, false, 0],
    "getSaleSummaryByEstimate": ["/sas/car_lifecycle!saleSummaryByEstimate.do", REQUEST_METHODS.POST, false, 0],
    "getSaleWarnList": ["/sas/car_lifecycle!listAllSaleWarning.do", REQUEST_METHODS.POST, true, 0],

    "getRepairSummary": ["/sas/repair!findSummary.do", REQUEST_METHODS.POST, false, 0],
    "getRepairList": ["/sas/repair!listAll.do", REQUEST_METHODS.POST, true, 0],
    "getRepairInfo": ["/sas/repair!get.do", REQUEST_METHODS.POST, false, 0],

    "getFenceLocationList": ["/business/location!listFenceByDid.do", REQUEST_METHODS.POST, true, 0],
    "getCarAlarmList": ["/business/alarm_summary!listRealTimeByCompany.do", REQUEST_METHODS.POST, true, 0],
    "getCarAlarmDetailList": ["/business/alarm_summary!findAlarmDetailByCompany.do", REQUEST_METHODS.POST, true, 0],
    "changeAccountPassword": ["/manage/user!resetSeflPassword.do", REQUEST_METHODS.POST, true, 0],

    "getPlatformsByUser": ["/manage/user!listGroupUsers.do", REQUEST_METHODS.GET, true, 0],
    "addLoginPlatform": ["/manage/user!joinGroup.do", REQUEST_METHODS.POST, false, 0],
    "loginPlatform": ["/security/login!loginNoCaptcha.do", REQUEST_METHODS.POST, false, 0],

    "getReportList": ["/business/subsc_file!listLinked.do", REQUEST_METHODS.GET, true, 0]
  };

  check(){
    let action_map = {};
    let url_map = {};
    Object.keys(this.route_map).forEach(action => {
      if(action_map[action]) {
        action_map[action] ++;
        console.warn(`action repeat: ${action}`);
      } else {
        action_map[action] = 1;
      }
      let action_config = this.route_map[action];
      let url = action_config[0];

      if(url_map[url]) {
        url_map[url] ++;
        console.warn(`request url repeat: ${url}`);
      } else {
        url_map[url] = 1;
      }

      url_map[url] = 1;
    });
  }

  getRoute(action: string): IServerRoute {
    let route = this.route_map[action];

    if(!route) {
      throw `not found route: ${action}`;
    }
    return {
      url: route[0],
      method: route[1],
      responseDataIsList: route[2],
      delay: route[3]
    };
  }
}
