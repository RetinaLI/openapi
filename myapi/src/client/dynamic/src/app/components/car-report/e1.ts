import { Injectable } from '@angular/core';

import { CT_GlobalConfig } from "./car-report.interface";

@Injectable()
export class E1Service {

  carSumNum: number = 0;
  newNumInWeek: number = 0;
  newNumInPreWeek: number = 0;
  weekRateLabel: "增长" | "下降" = "增长";
  newRateWithPreWeek: string | number = 0;
  newRateWithPreWeekLabel: "不足1" | "" = "";
  car_new_num_option: any;

  dataObj: {
    optionWeek6AddInfo?: {
      totalJson: {
        markPointData: any[],
        "carTotalNum": 0,
        "addCarNum1": 0,
        "addCarNum2": 0,
        "addRate": 0,
        "xData": any[],
        "sendTime": ""
      }
    }
  } = {};

  dataSource = {};

  constructor() { }

  renderData(_result, _config: CT_GlobalConfig) {
    this.dataObj = _result && _result.optionWeek6AddInfo ? _result : this.dataObj;
    this.dataSource = this.dataObj.optionWeek6AddInfo.totalJson;
    let _carBrandMap = _config.platformBrandMap;
    // if(!window.global.is_new_energy){
    var others = [],
      leisa = 0,
      ci, has_leisa = false;

    var data = _result.optionWeek6AddInfo.totalJson;

    for (var i = data.xData.length - 1; i >= 0; i--) {
      ci = data.xData[i];
      if (_carBrandMap[ci]) {
        data.xData[i] = _carBrandMap[ci];
        data.markPointData[i].name = _carBrandMap[ci];
      } else {
        if (_carBrandMap[_config.SPEC_BRAND] && _carBrandMap[_config.SPEC_BRAND][ci]) {
          has_leisa = true;
          leisa += data.markPointData[i].value;
        } else
          others.push(data.markPointData[i]);
        data.markPointData.splice(i, 1);
        data.xData.splice(i, 1);
      }
    }
    if (_carBrandMap[_config.SPEC_BRAND] && has_leisa) {
      data.xData.push(_config.SPEC_BRAND);
      data.markPointData.push({
        name: _config.SPEC_BRAND,
        value: leisa
      });
    }

    if (others.length > 0) {
      data.xData.push("其它");
      var otherValue = 0;
      for (var i = 0; i < others.length; i++) {
        otherValue += others[i].value;
      }
      data.markPointData.push({
        name: "其它",
        value: otherValue
      });
    }
    // }

    this.carSumNum = data.carTotalNum;
    this.newNumInPreWeek = data.addCarNum2;
    this.newNumInWeek = data.addCarNum1;

    data.markPointData.sort(function (a, b) { return b.value - a.value; });

    var addRate = data.addCarNum1 - data.addCarNum2;
    var per_addRate: number | string = 0;

    if (data.addCarNum2 == data.addCarNum1) {
      per_addRate = 0;
    } else if (data.addCarNum2 == 0) {
      per_addRate = 100;
    } else {
      per_addRate = (Math.abs(addRate) / data.addCarNum2) * 100;

      if (per_addRate > 0 && per_addRate < 1) {
        per_addRate = "不足1";
      } else {
        per_addRate = Math.round(per_addRate);
      }
    }

    if (addRate >= 0) {
      this.weekRateLabel = "增长";
    } else {
      this.weekRateLabel = "下降";
    }
    this.newRateWithPreWeek = per_addRate;

    this.car_new_num_option = this.getChartOption();
  }

  getChartOption() {
    var width = document.documentElement.clientWidth;
    return {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        top: width >= 720 ? "15px" : '5%',
        right: width >= 720 ? "10%" : '0%',
        data: this.dataObj.optionWeek6AddInfo.totalJson.xData,
        formatter: function (value) {
          if(width >= 720) return value
          return FOTON_GLOBAL.String.getRealLength(value) >= 10 ? value.substr(0, 3) + "\n" + value.substr(3) : value;
        }
      },
      series: [{
        name: '新增车辆数',
        silent: width < 720,
        type: 'pie',
        radius: width >= 720 ? "70%" : '43%',
        center: width >= 720 ? ["50%", "50%"] : ['40%', '40%'],
        itemStyle: {
          normal: {
            color: function (params) {
              //首先定义一个数组
              var colorList = ["#2382d3", "#ff5608", "#ffc000", "#baeaf1", "#ffe7b0", '#92d050', "#01c0c8", '#00b0f0'];
              return colorList[params.dataIndex]
            },
            //以下为是否显示
            label: {
              show: true
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        data: this.dataObj.optionWeek6AddInfo.totalJson.markPointData
      }]
    };
  }
}