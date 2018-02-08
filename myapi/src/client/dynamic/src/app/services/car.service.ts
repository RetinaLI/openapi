import { Injectable } from '@angular/core';
import { AjaxService, IResponseData } from "../providers/ajax.service";
import { ICarWarnSummaryList, ICarWarnSummary, ICar, ICarDevice, ICarRunSummary,
  ICarDataMapByMonth } from "../services/car.service.interface";

@Injectable()
export class CarService {

  constructor(private ajaxService: AjaxService) { }

  getCarList(_params: {
    "pager.pageNo": number,
    "pager.pageSize": number,
    "Q_t.carInfo.carType.carBrand.id_L_EQ"?:string,
    "Q_t.carInfo.carType.id_L_EQ"?: string,
    sort?: string,
    direction?: string
  }): Promise<{
    list: ICar[]
  }> {
    return (this.ajaxService.call("getCarList", _params)as Promise<{
      list: ICar[]
    }>).then(result => {
      result.list = result.list || [];
      return result;
    });
  }

  getCarCollectStatus(_params: {
    carId: number
  }): Promise<{
    info: string
  }>{
    return this.ajaxService.call("getCarCollectStatus", _params) as Promise<{
      info: string
    }>;
  }

  getCarRunSummary(_params: {
    carId: number
  }) : Promise<ICarRunSummary> {
    return this.ajaxService.call("getCarRunSummary", _params).then(result => {
      return result.runSummary || {};
    }) as Promise<ICarRunSummary>;
  }

  getDeviceInfo(_params: {
    did: string
  }): Promise<ICarDevice>{
    return this.ajaxService.call("getDeviceInfo", _params).then(result => {
      return result.data || {};
    }) as Promise<ICarDevice>;
  }

  collectCar(_params: {
    carId: number,
    collect: boolean
  }){
    return this.ajaxService.call(_params.collect ? "collectCar" : "cancelCollectCar", _params);
  }

  getCarNumberByCity(_params: { month: string, carTypeIds: number }): Promise<{
    list?: { province: string, car_count: number }[]
  }> {
    return this.ajaxService.call("getCarNumberByCity", _params);
  }

  getAttendRateGroupByProvince(_params: { month: string, carTypeIds: number }): Promise<{
    list?: { province: string, attendRate: number }[]
  }> {
    return this.ajaxService.call("getAttendRateGroupByProvince", _params).then(result => {
      let list = [];
      if (result.sectionMap) {
        Object.keys(result.sectionMap).forEach(key => {
          list.push({
            province: key,
            attendRate: result.sectionMap[key]
          });
        });
      }
      return { list: list };
    });
  }

  getMileageOnMap(_params: { month: string, carTypeIds: number }): Promise<{
    list?: { province: string, mileage: number }[]
  }> {
    return this.ajaxService.call("getMileageOnMap", _params).then(result => {
      let list = [];
      if (result.sectionMap) {
        Object.keys(result.sectionMap).forEach(key => {
          list.push({
            province: key,
            mileage: result.sectionMap[key]
          });
        });
      }
      return { list: list };
    });
  }

  getAvgVelocityByProvince(_params: { month: string, carTypeIds: number }): Promise<{
    list?: { province: string, velocity_avg: number }[]
  }> {
    return this.ajaxService.call("getAvgVelocityByProvince", _params);
  }

  getAttendanceRateByMonth(_params: { month: string, carTypeIds: number }): Promise<ICarDataMapByMonth> {
    return (this.ajaxService.call("getAttendanceRateByMonth", _params) as Promise<ICarDataMapByMonth>).then(result => {
      result.map = result.map || {carsMap: {}, reportMap: {}};
      return result;
    });
  }

  getVelocityAvgByMonth(_params: { month: string, carTypeIds: number }): Promise<ICarDataMapByMonth> {
    return (this.ajaxService.call("getVelocityAvgByMonth", _params) as Promise<ICarDataMapByMonth>).then(result => {
      result.map = result.map || {carsMap: {}, reportMap: {}};
      return result;
    });
  }

  getDrivingMileageByMonth(_params: { month: string, carTypeIds: number }): Promise<ICarDataMapByMonth> {
    return (this.ajaxService.call("getDrivingMileageByMonth", _params) as Promise<ICarDataMapByMonth>).then(result => {
      result.map = result.map || {carsMap: {}, reportMap: {}};
      return result;
    });

  }

  getInstallByCarBrandDate(_params: { dateType: number } = { dateType: 2 }): Promise<{
    data: {
      categories?: string[],
      series?: {
        data: number[],
        id: string,
        name: string
      }[]
    }
  }> {
    return (this.ajaxService.call("getInstallByCarBrandDate", _params) as Promise<{
      data: {
        categories?: string[],
        series?: {
          data: number[],
          id: string,
          name: string
        }[]
      }
    }>).then(result => {
      result.data = result.data || {};
      result.data.categories = result.data.categories || [];
      result.data.series = result.data.series || [];
      return result;
    });
  }

  getOnlineSummary(): Promise<{
    onlineMap: {
      ALLNUM?: number,
      OFFLINENUM?: number,
      ONLINENUM?: number,
      todayRunCount?: number,
      todayStopCount?: number
    }
  }> {
    return (this.ajaxService.call("getOnlineSummary") as Promise<{
      onlineMap: {
        ALLNUM?: number,
        OFFLINENUM?: number,
        ONLINENUM?: number,
        todayRunCount?: number,
        todayStopCount?: number
      }
    }>).then(result => {
      result.onlineMap = result.onlineMap || {};
      return {
        onlineMap: {
          ALLNUM: result.onlineMap.ALLNUM || 0,
          OFFLINENUM: result.onlineMap.OFFLINENUM || 0,
          ONLINENUM: result.onlineMap.ONLINENUM || 0,
          todayRunCount: result.onlineMap.todayRunCount || 0,
          todayStopCount: result.onlineMap.todayStopCount || 0
        }
      };
    });
  }

  getWarnSummaryList(): Promise<ICarWarnSummaryList> {
    return this.ajaxService.call("getWarnSummaryList").then(result => {
      result.list = result.alarmSummaryList || [];
      return result;
    }) as Promise<ICarWarnSummaryList>;
  }

  getCarAlarmList(): Promise<{ alarmSummaryList?: ICarWarnSummary[] }> {
    return this.ajaxService.call("getCarAlarmList") as Promise<{
      alarmSummaryList?: ICarWarnSummary[]
    }>;
  }

  getCarAlarmDetailList(_params: { optionTypeCode: String, "pager.pageNo": number , "pager.pageSize": number, "direction": String  }): Promise<{ deviceList?: ICarWarnSummary[] }> {
    return this.ajaxService.call("getCarAlarmDetailList", _params) as Promise<{
      deviceList?: ICarWarnSummary[]
    }>;
  }
}
