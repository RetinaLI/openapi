import { Injectable } from '@angular/core';

import { CT_GlobalConfig } from "./car-report.interface";

@Injectable()
export class E7Service {

  totalRunNum = 0;
  totalMileageNum = 0;
  totalRunTime = 0;
  positionDataNum = 0;
  canDataNum = 0;
  alarmNum = 0;
  totalChargeNum = 0;
  totalChargeCount = 0;
  totalUnChargeCount = 0;
  dataList = [];
  alarmUnit = "亿条";
  canDataNumUnit = "条";
  positionDataNumUnit = "条";


  dataObj: {
    optionCarBrandAddAndRunInfo?: {
      Q3AddData: any[],
      xAxisAddAndRunData: any[],
      markPointAddData: any[],
      onlineData: {
        carOnlineNum: number,
        carOnlineRate: number
      },
      seriesAddData: any[]
    }
  } = {};

  dataSource = {};

  constructor() { }

  trackByDataList(index: number, data: any) {
    return index;
  }

  renderData(_result, _config: CT_GlobalConfig) {
    var result = _result && _result.optionCarBrandRunInfo ? _result : {
      optionCarBrandRunInfo: {
        seriesMileAgeData: [],
        seriesRunTimeData: [],
        xAxisRunInfoData: [],
        markPointMileageData: [],
        markPointRunTimeData: [],
        OnlineData: [],
        totalJson: {
          AlarmNum: 0,
          CanNum: 0,
          LocationNum: 0,
          carNum: 0,
          mileAge: 0,
          runTime: 0,
          chargeCount: 0,
          chargePower: 0,
          unchargeCount: 0
        }
      }
    };
    let _carBrandMap = _config.platformBrandMap;
    var leisa = {
        seriesMileAgeData: null,
        seriesRunTimeData: null,
        markPointMileageData: null,
        markPointRunTimeData: null,
        OnlineData: null
      },
      ci, has_leisa = false;

    var data = result.optionCarBrandRunInfo;

    for (var i = data.xAxisRunInfoData.length - 1, ci; i >= 0; i--) {
      ci = data.xAxisRunInfoData[i];
      if (!_carBrandMap[ci]) {
        if (_carBrandMap[_config.SPEC_BRAND] && _carBrandMap[_config.SPEC_BRAND][ci]) {
          has_leisa = true;
          leisa.seriesMileAgeData += data.seriesMileAgeData[i];
          leisa.seriesRunTimeData += data.seriesRunTimeData[i];
          leisa.OnlineData += data.OnlineData[i][ci].carNum;
        }
        data.xAxisRunInfoData.splice(i, 1);
        data.seriesMileAgeData.splice(i, 1);
        data.seriesRunTimeData.splice(i, 1);
        data.markPointMileageData.splice(i, 1);
        data.markPointRunTimeData.splice(i, 1);
        data.OnlineData.splice(i, 1);
      } else {
        data.xAxisRunInfoData[i] = _carBrandMap[ci];
        data.markPointMileageData[i].xAxis = _carBrandMap[ci];
        data.markPointRunTimeData[i].xAxis = _carBrandMap[ci];
        data.OnlineData[i][_carBrandMap[ci]] = {
          name: _carBrandMap[ci],
          carNum: data.OnlineData[i][ci].carNum,
          runTime: data.OnlineData[i][ci].runTime,
          mileAge: data.OnlineData[i][ci].mileAge
        };
        delete data.OnlineData[i][ci];
      }
    }

    if (_carBrandMap[_config.SPEC_BRAND] && has_leisa) {
      leisa.seriesMileAgeData = leisa.seriesMileAgeData;
      leisa.seriesRunTimeData = leisa.seriesRunTimeData;
      leisa.markPointMileageData = { yAxis: leisa.seriesMileAgeData, xAxis: _config.SPEC_BRAND };
      leisa.markPointRunTimeData = { yAxis: leisa.seriesRunTimeData, xAxis: _config.SPEC_BRAND };
      var tempnum = leisa.OnlineData;
      leisa.OnlineData = {};
      leisa.OnlineData[_config.SPEC_BRAND] = {
        name: _config.SPEC_BRAND,
        carNum: tempnum,
        runTime: leisa.seriesRunTimeData,
        mileAge: leisa.seriesMileAgeData
      };

      var index = data.seriesMileAgeData.length;

      for (var i = 0; i < data.seriesMileAgeData.length; i++) {
        if (data.seriesMileAgeData[i] < leisa.seriesMileAgeData) {
          index = i;
          break;
        }
      }

      if (index == data.seriesMileAgeData.length) {
        data.xAxisRunInfoData.push(_config.SPEC_BRAND);
        data.seriesMileAgeData.push(leisa.seriesMileAgeData);
        data.seriesRunTimeData.push(leisa.seriesRunTimeData);
        data.markPointMileageData.push(leisa.markPointMileageData);
        data.markPointRunTimeData.push(leisa.markPointRunTimeData);
        data.OnlineData.push(leisa.OnlineData);
      } else {
        var temp = data.xAxisRunInfoData.splice(i);
        data.xAxisRunInfoData.push(_config.SPEC_BRAND);
        data.xAxisRunInfoData = data.xAxisRunInfoData.concat(temp);

        temp = data.seriesMileAgeData.splice(i);
        data.seriesMileAgeData.push(leisa.seriesMileAgeData);
        data.seriesMileAgeData = data.seriesMileAgeData.concat(temp);

        temp = data.seriesRunTimeData.splice(i);
        data.seriesRunTimeData.push(leisa.seriesRunTimeData);
        data.seriesRunTimeData = data.seriesRunTimeData.concat(temp);

        temp = data.markPointMileageData.splice(i);
        data.markPointMileageData.push(leisa.markPointMileageData);
        data.markPointMileageData = data.markPointMileageData.concat(temp);

        temp = data.markPointRunTimeData.splice(i);
        data.markPointRunTimeData.push(leisa.markPointRunTimeData);
        data.markPointRunTimeData = data.markPointRunTimeData.concat(temp);

        temp = data.OnlineData.splice(i);
        data.OnlineData.push(leisa.OnlineData);
        data.OnlineData = data.OnlineData.concat(temp);
      }
    }


    if (_config.dataRange == "new_energy") {
      this.totalChargeNum = Math.round(data.totalJson.chargePower / 10000);
      this.totalChargeCount = Math.round(data.totalJson.chargeCount / 10000);
      this.totalUnChargeCount = Math.round(data.totalJson.unchargeCount / 10000);
    }

    this.totalRunNum = Math.round(data.totalJson.carNum);
    this.totalMileageNum = data.totalJson.mileAge;
    this.totalRunTime = data.totalJson.runTime;

    let positionNumInfo = FOTON_GLOBAL.Number.getNewNumWithUnit(data.totalJson.LocationNum, "条");
    this.positionDataNum = positionNumInfo.num;
    this.positionDataNumUnit = positionNumInfo.unit;

    let canNumInfo = FOTON_GLOBAL.Number.getNewNumWithUnit(data.totalJson.CanNum, "条");
    this.canDataNum = canNumInfo.num;
    this.canDataNumUnit = canNumInfo.unit;

    let alarmNumInfo = FOTON_GLOBAL.Number.getNewNumWithUnit(data.totalJson.AlarmNum, "条");
    this.alarmNum = alarmNumInfo.num;
    this.alarmUnit = alarmNumInfo.unit;

    let dataList = [];
    data.OnlineData.forEach(element => {
      Object.keys(element).forEach(key => {
        let value = element[key];
        dataList.push({
          key: key,
          carNum: value.carNum,
          mileAge: value.mileAge,
          runTime: value.runTime
        });
      });
    });
    this.dataList = dataList;
  }

  refreshChart(){}
}