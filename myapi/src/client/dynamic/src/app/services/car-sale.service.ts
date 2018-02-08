import { Injectable } from '@angular/core';
import { AjaxService, IResponseData } from "../providers/ajax.service";
import {
  ISaleSummaryByDmsMap, ISaleSummaryByEstimateMap, ISaleWarnEntryList,
  ICarRepairSummaryMap, ICarRepairInfo, ICarRepairInfoList,
  ICarFenceLocationList
} from "../services/car-sale.service.interface";

@Injectable()
export class CarSaleService {

  constructor(private ajaxService: AjaxService) { }

  getSaleInfoByCarType(_params: {
    dealerIds?: string,
    provinces?: string,
    citys?: string,
    vehiclePlatforms?: string,
    vehicleWidths?: string,
    vehicleSeriess?: string,
    vehicleLevels?: string,
    vehicleDrivers?: string,
    vehicleFunctions?: string,
    startDate: string,
    endDate: string
  }): Promise<{
    list: {
      salesCount: number,
      carTypeId: number,
      carTypeName: string
    }[]
  }> {
    return this.ajaxService.call("getSaleInfoByCarType", _params).then(result => {
      result.list = result.mapList || [];
      return result;
    }) as Promise<{
      list: {
        salesCount: number,
        carTypeId: number,
        carTypeName: string
      }[]
    }>;
  }

  getSaleInfoByMonth(_params: {
    dealerIds?: string,
    provinces?: string,
    citys?: string,
    vehiclePlatforms?: string,
    vehicleWidths?: string,
    vehicleSeriess?: string,
    vehicleLevels?: string,
    vehicleDrivers?: string,
    vehicleFunctions?: string,
    startDate: string,
    endDate: string
  }): Promise<{
    list: {
      saleMonth: string,
      salesCount: number
    }[]
  }> {
    return this.ajaxService.call("getSaleInfoByMonth", _params).then(result => {
      result.list = result.mapList || [];
      return result;
    }) as Promise<{
      list: {
        saleMonth: string,
        salesCount: number
      }[]
    }>;
  }

  getSaleInfoByCity(_params: {
    dealerIds?: string,
    provinces?: string,
    citys?: string,
    vehiclePlatforms?: string,
    vehicleWidths?: string,
    vehicleSeriess?: string,
    vehicleLevels?: string,
    vehicleDrivers?: string,
    vehicleFunctions?: string,
    startDate: string,
    endDate: string
  }): Promise<{
    list: {
      province: string,
      salesCount: number
    }[]
  }> {
    return this.ajaxService.call("getSaleInfoByCity", _params).then(result => {
      result.list = result.mapList || [];
      return result;
    }) as Promise<{
      list: {
        province: string,
        salesCount: number
      }[]
    }>;
  }

  getSaleSummaryByDms(): Promise<ISaleSummaryByDmsMap> {
    return (this.ajaxService.call("getSaleSummaryByDms") as Promise<ISaleSummaryByDmsMap>).then(result => {
      result.map = result.map || {};
      result.map.actualSalesNum = result.map.actualSalesNum || 0;
      result.map.totalNum = result.map.totalNum || 0;
      return result;
    });
  }

  getSaleSummaryByEstimate(): Promise<ISaleSummaryByEstimateMap> {
    return (this.ajaxService.call("getSaleSummaryByEstimate") as Promise<ISaleSummaryByEstimateMap>).then(result => {
      result.map = result.map || {};
      result.map.actualSalesNum = result.map.actualSalesNum || 0;
      result.map.totalNum = result.map.totalNum || 0;
      return result;
    });
  }

  getSaleWarnList(_params: {
    "Q_t.actualSaleDate_DL_GE"?: string,
    "Q_t.actualSaleDate_DG_LE"?: string,
    "pager.pageNo": number,
    "pager.pageSize": number,
    "sort"?: string,
    "direction": string
  } | {
    "Q_t.estimateSaleDate_DL_GE"?: string,
    "Q_t.estimateSaleDate_DG_LE"?: string,
    "pager.pageNo": number,
    "pager.pageSize": number,
    "sort"?: string,
    "direction": string

  }): Promise<ISaleWarnEntryList> {
    return this.ajaxService.call("getSaleWarnList", _params) as Promise<ISaleWarnEntryList>;
  }

  getRepairSummary(): Promise<ICarRepairSummaryMap> {
    return (this.ajaxService.call("getRepairSummary") as Promise<ICarRepairSummaryMap>)
      .then(result => {
        result.map = result.map || {};

        result.map.notRealNum = result.map.notRealNum || 0;
        result.map.totalNum = result.map.totalNum || 0;

        return result;
      });
  }

  getRepairList(_params: {
    "Q_t.maintainType_S_NEQ": string,
    "Q_t.isReal_NOTNULL": string,
    "Q_t.isReal_S_NEQ": string,
    "Q_t.vin_S_LK": string,
    "Q_t.repairCode_S_LK": string,
    "Q_t.isReal_S_LK": string,
    "Q_t.returnTime_DL_GE":string,
    "Q_t.returnTime_DG_LE":string,
    "pager.pageNo":number,
    "pager.pageSize":number,
    sort:string,
    direction: string
  }): Promise<ICarRepairInfoList> {
    return (this.ajaxService.call("getRepairList", _params) as Promise<ICarRepairInfoList>)
      .then(result => {
        result.list = result.list || [];
        result.list.forEach(elem => {
          elem.isInnerName = elem.isInner == 1 ? "是" : "否";
          elem.maintainTypeName = this.getMaintainTypeName(elem.maintainType);
        });
        return result;
      });
  }

  getRepairInfo(_params: {id: number}): Promise<{
    data: ICarRepairInfo,
    msg: string,
    info: string
  }>{
    return (this.ajaxService.call("getRepairInfo", _params) as Promise<{
      data: ICarRepairInfo,
      msg: string,
      info: string
    }>).then(result => {
      result.data = ((result.data || {}) as ICarRepairInfo);
      return result;
    });
  }

  getFenceLocationList(_params: {
    framenum: string,
    startTime: string,
    endTime: string,
    inFenceTime: string,
    outFenceTime: string,
  }): Promise<ICarFenceLocationList>{
    return (this.ajaxService.call("getFenceLocationList", _params) as Promise<ICarFenceLocationList>)
      .then(result => {
        result.list = result.list || [];
        return result;
      });
  }

  private getMaintainTypeName(_type: number): string {
    switch (_type) {
      case 1: return "普通维修";
      case 2: return "外出服务";
      case 3: return "强制保养";
      case 4: return "普通保养";
      case 5: return "商品车维修";
      case 6: return "事故维修";
      case 7: return "服务活动";
      case 98: return "商品车保养";
    }
    return "";
  }
}
