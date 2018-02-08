import { Injectable } from '@angular/core';
import { AjaxService, IResponseData } from "../providers/ajax.service";

@Injectable()
export class LogisticsService {

  constructor(private ajaxService: AjaxService) { }

  getCarShippingRecord(): Promise<{
    summaryMap?: {
      noTimelyArriveNum?: number,
      noTimelyBeginNum?: number,
      shouldArriveNum?: number,
      shouldBeginNum?: number
    }
  }>{
    return (this.ajaxService.call("getCarShippingRecord") as Promise<{
      summaryMap?: {
        noTimelyArriveNum?: number,
        noTimelyBeginNum?: number,
        shouldArriveNum?: number,
        shouldBeginNum?: number
      }
    }>).then(result => {
      result.summaryMap = result.summaryMap || {};

      result.summaryMap.noTimelyArriveNum = result.summaryMap.noTimelyArriveNum || 0;
      result.summaryMap.noTimelyBeginNum = result.summaryMap.noTimelyBeginNum || 0;
      result.summaryMap.shouldArriveNum = result.summaryMap.shouldArriveNum || 0;
      result.summaryMap.shouldBeginNum = result.summaryMap.shouldBeginNum || 0;
      return result;
    });
  }

  getMileageOverHalfOrder(
    _params: {
      "Q_t.carInfo.carType.carBrand.id_L_EQ": string,
      "Q_t.carInfo.carType.id_L_EQ": string,
      "Q_t.vin_S_LKMORE": string,
      "pager.pageNo": number,
      "pager.pageSize": number
    } = {
      "Q_t.carInfo.carType.carBrand.id_L_EQ": "",
      "Q_t.carInfo.carType.id_L_EQ": "",
      "Q_t.vin_S_LKMORE": "",
      "pager.pageNo": 1,
      "pager.pageSize": 20
    }
  ): Promise<{
    list: any[],
    totalCount: number
  }>{
    return (this.ajaxService.call("getMileageOverHalfOrder", _params) as Promise<{
      list: any[],
      totalCount: number
    }>).then(result => {
      result.totalCount = result.totalCount || 0;
      result.list.forEach(elem => {
        elem.mileagePercent = (elem.tboxMileage* 100 / elem.standardMileage).toFixed(0);
        return elem;
      });
      return result;
    });
  }

  getCarShippingList(_params: {
    tboxStatus: number,
    Q_vin_S_LK: string,
    "pager.pageNo": number,
    "pager.pageSize": number,
    sort: string,
    direction: string,
    "Q_t.carInfo.carType.carBrand.id_L_EQ": string,
    "Q_t.carInfo.carType.id_L_EQ": string
  }): Promise<{
    list: any[],
    totalCount: number
  }> {
    return (this.ajaxService.call("getCarShippingList", _params) as Promise<{
      list: any[],
      totalCount: number
    }>).then(result => {
      result.totalCount = result.totalCount || 0;
      result.list.forEach(elem => {
        elem.delayDays = ((FOTON_GLOBAL.currentTime - Date.parse(elem[_params.sort.indexOf("sapArriveDate")>-1?"sapArriveDate":"sapEstimateBeginDate"].replace(/-/g, "/")))/(1000*60*60*24)).toFixed(1);
        return elem;
      });
      return result;
    });
  }

  getTransportOrderInfo(_params: { id: string }): Promise<{
    data: {
      id: string,
      bindDate: string,
      tboxEndDate: string,
      [name:string]:any,
      vin: string,
      order: {
        sendDate: "",
        startPlace: {
          address: string
        },
        endPlace: {
          address: string
        }
      }
    }
  }>{
    return this.ajaxService.call("getTransportOrderInfo", _params) as Promise<{
      data: {
        id: string,
        bindDate: string,
        tboxEndDate: string,
        [name:string]:any,
        vin: string,
        order: {
          sendDate: "",
          startPlace: {
            address: string
          },
          endPlace: {
            address: string
          }
        }
      }
    }>;
  }

  getOrderTransportLocation(_params: {
    framenum: string,
    startTime: string,
    endTime: string
  }): Promise<{
    list: {
      accOn: boolean,
      address: string,
      did: string,
      direction: string,
      elevation: string,
      latitude: string,
      longitude: string,
      mileage: string,
      receivedTime: string,
      sendTime: string,
      stop: number,
      velocity: string
    }[]
  }>{
    return this.ajaxService.call("getOrderTransportLocation", _params) as Promise<{
      list: {
        accOn: boolean,
        address: string,
        did: string,
        direction: string,
        elevation: string,
        latitude: string,
        longitude: string,
        mileage: string,
        receivedTime: string,
        sendTime: string,
        stop: number,
        velocity: string
      }[]
    }>;
  }

  getOrderFence(_params: {id: string}): Promise<{
    data: {}
  }>{
    return this.ajaxService.call("getOrderFence", _params) as Promise<{
      data: {}
    }>;
  }

  getOrderDeliveryByCarType(_params: {columnName: string} = {columnName: "vehicleSeries"}): Promise<{
    resultMap: {
      [x:string]: {
        salesCount: number,
        carTypeName: string
      }[]
    }
  }>{
    return (this.ajaxService.call("getOrderDeliveryByCarType", _params) as Promise<{
      resultMap: {
        [x:string]: {
          salesCount: number,
          carTypeName: string
        }[]
      }
    }>).then(result => {
      result.resultMap = result.resultMap || {};
      return result;
    });
  }

  getOrderSummary(): Promise<{
    orderMap?: {
      ON_LOAD_COUNT?: number,
      WAIT_LEAVE_COUNT?: number
    }
  }>{
    return (this.ajaxService.call("getOrderSummary") as Promise<{
      orderMap?: {
        ON_LOAD_COUNT?: number,
        WAIT_LEAVE_COUNT?: number
      }
    }>).then(result => {
      result.orderMap = result.orderMap || {};

      result.orderMap.ON_LOAD_COUNT = result.orderMap.ON_LOAD_COUNT || 0;
      result.orderMap.WAIT_LEAVE_COUNT = result.orderMap.WAIT_LEAVE_COUNT || 0;

      return result;
    });
  }

  getAnomalyOrderSummary(): Promise<{
    orderMap?: {
      MIL_COUNT?: number,
      MORE_DAY_COUNT?: number,
      NOT_DEPARTURE_COUNT?: number,
      ONE_DAY_COUNT?: number,
      THREE_DAY_COUNT?: number,
      TWO_DAY_COUNT?: number
    }
  }>{
    return (this.ajaxService.call("getAnomalyOrderSummary") as Promise<{
      orderMap?: {
        MIL_COUNT?: number,
        MORE_DAY_COUNT?: number,
        NOT_DEPARTURE_COUNT?: number,
        ONE_DAY_COUNT?: number,
        THREE_DAY_COUNT?: number,
        TWO_DAY_COUNT?: number
      }
    }>).then(result => {
      result.orderMap = result.orderMap || {};

      result.orderMap.MIL_COUNT = result.orderMap.MIL_COUNT || 0;
      result.orderMap.MORE_DAY_COUNT = result.orderMap.MORE_DAY_COUNT || 0;
      result.orderMap.NOT_DEPARTURE_COUNT = result.orderMap.NOT_DEPARTURE_COUNT || 0;
      result.orderMap.ONE_DAY_COUNT = result.orderMap.ONE_DAY_COUNT || 0;
      result.orderMap.THREE_DAY_COUNT = result.orderMap.THREE_DAY_COUNT || 0;
      result.orderMap.TWO_DAY_COUNT = result.orderMap.TWO_DAY_COUNT || 0;
      return result;
    });
  }
}
