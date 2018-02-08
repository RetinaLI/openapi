import { Injectable } from '@angular/core';

import { CT_GlobalConfig } from "./car-report.interface";

@Injectable()
export class E2Service {

  onlineNumInCurrent = 0;
  onlineRateInCurrent = 0;
  Q3AddData = [];
  car_online_rate_option: any;

  xAxisAddAndRunData;
  seriesAddData;
  markPointAddData;


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

  trackByQ3AddData(index: number, data: any) {
    return index;
  }

  renderData(_result, _config: CT_GlobalConfig) {
    let result = _result && _result.optionCarBrandAddAndRunInfo ? _result : {
      optionCarBrandAddAndRunInfo: {
        Q3AddData: [],
        xAxisAddAndRunData: [],
        markPointAddData: [],
        onlineData: {
          carOnlineNum: 0,
          carOnlineRate: 0
        },
        seriesAddData: []
      }
    };
    this.dataObj = _result && _result.optionCarBrandAddAndRunInfo ? _result : this.dataObj;
    let _carBrandMap = _config.platformBrandMap;

    // if(!window.global.is_new_energy){
    var leisa = {
      Q3AddData: [],
      markPointAddData: [],
      seriesAddData: [],
      xAxisAddAndRunData: ""
    },
      ci, cQ3, onlineNum = 0, sumNum = 0;
    for (var i = result.optionCarBrandAddAndRunInfo.Q3AddData.length - 1; i >= 0; i--) {
      cQ3 = result.optionCarBrandAddAndRunInfo.Q3AddData[i];
      ci = cQ3.code;
      onlineNum += cQ3.onLine;
      sumNum += cQ3.iCarNum;
      if (!_carBrandMap[ci]) {

        if (_carBrandMap[_config.SPEC_BRAND] && _carBrandMap[_config.SPEC_BRAND][ci]) {
          leisa.xAxisAddAndRunData = _config.SPEC_BRAND;
          leisa.Q3AddData.push(result.optionCarBrandAddAndRunInfo.Q3AddData[i]);
          leisa.markPointAddData.push(result.optionCarBrandAddAndRunInfo.markPointAddData[i]);
          leisa.seriesAddData.push(result.optionCarBrandAddAndRunInfo.seriesAddData[i]);
        }

        result.optionCarBrandAddAndRunInfo.xAxisAddAndRunData.splice(i, 1);
        result.optionCarBrandAddAndRunInfo.Q3AddData.splice(i, 1);
        result.optionCarBrandAddAndRunInfo.markPointAddData.splice(i, 1);
        result.optionCarBrandAddAndRunInfo.seriesAddData.splice(i, 1);
      } else {
        var rate = cQ3.iCarNum == 0 ? 0 : (Math.round(cQ3.onLine / cQ3.iCarNum * 100));
        cQ3.onLineRate = rate;

        result.optionCarBrandAddAndRunInfo.Q3AddData[i].name = _carBrandMap[ci];
        result.optionCarBrandAddAndRunInfo.markPointAddData[i].xAxis = _carBrandMap[ci];
        result.optionCarBrandAddAndRunInfo.markPointAddData[i].yAxis = rate;
        result.optionCarBrandAddAndRunInfo.seriesAddData[i] = rate;
        result.optionCarBrandAddAndRunInfo.xAxisAddAndRunData[i] = _carBrandMap[ci];
      }
    }
    if (_carBrandMap[_config.SPEC_BRAND] && leisa.seriesAddData.length > 0) {
      var rate = 0,
        value = 0,
        carNum = 0;
      for (var i = 0; i < leisa.seriesAddData.length; i++) {
        value += leisa.Q3AddData[i].onLine;
        rate += leisa.Q3AddData[i].onLineRate;
        carNum += leisa.Q3AddData[i].iCarNum;
      }
      rate = Math.round(carNum == 0 ? 0 : value / carNum * 100);
      var index = result.optionCarBrandAddAndRunInfo.seriesAddData.length;

      for (var i = 0; i < result.optionCarBrandAddAndRunInfo.seriesAddData.length; i++) {
        if (result.optionCarBrandAddAndRunInfo.seriesAddData[i] < rate) {
          index = i;
          break;
        }
      }

      if (index == result.optionCarBrandAddAndRunInfo.seriesAddData.length) {

        result.optionCarBrandAddAndRunInfo.xAxisAddAndRunData.push(_config.SPEC_BRAND);
        result.optionCarBrandAddAndRunInfo.Q3AddData.push({
          name: _config.SPEC_BRAND,
          onLineRate: rate,
          onLine: value,
          iCarNum: carNum
        });
        result.optionCarBrandAddAndRunInfo.markPointAddData.push({
          yAxis: rate,
          xAxis: _config.SPEC_BRAND
        });
        result.optionCarBrandAddAndRunInfo.seriesAddData.push(rate);
      } else {
        var temp = result.optionCarBrandAddAndRunInfo.xAxisAddAndRunData.splice(i);
        result.optionCarBrandAddAndRunInfo.xAxisAddAndRunData.push(_config.SPEC_BRAND);
        result.optionCarBrandAddAndRunInfo.xAxisAddAndRunData = result.optionCarBrandAddAndRunInfo.xAxisAddAndRunData.concat(temp);

        temp = result.optionCarBrandAddAndRunInfo.Q3AddData.splice(i);
        result.optionCarBrandAddAndRunInfo.Q3AddData.push({
          name: _config.SPEC_BRAND,
          onLineRate: rate,
          onLine: value,
          iCarNum: carNum
        });
        result.optionCarBrandAddAndRunInfo.Q3AddData = result.optionCarBrandAddAndRunInfo.Q3AddData.concat(temp);

        temp = result.optionCarBrandAddAndRunInfo.markPointAddData.splice(i);
        result.optionCarBrandAddAndRunInfo.markPointAddData.push({
          yAxis: rate,
          xAxis: _config.SPEC_BRAND
        });
        result.optionCarBrandAddAndRunInfo.markPointAddData = result.optionCarBrandAddAndRunInfo.markPointAddData.concat(temp);
      }
    }
    var Q3AddData = result.optionCarBrandAddAndRunInfo.Q3AddData;

    Q3AddData.sort(function (a, b) { return b.onLineRate - a.onLineRate; });
    var xAxisAddAndRunData = [];
    var seriesAddData = [];
    var markPointAddData = [];
    var carNums = [], ci,
      markPointCarNumData = [];
    for (i = 0; i < Q3AddData.length; i++) {
      ci = Q3AddData[i];
      xAxisAddAndRunData[i] = (ci.name);
      seriesAddData[i] = ci.onLineRate;
      markPointAddData[i] = {
        xAxis: ci.name,
        yAxis: ci.onLineRate
      };
      carNums[i] = ci.iCarNum;
      markPointCarNumData[i] = {
        xAxis: ci.name,
        yAxis: ci.onLineRate
      };
    }


    this.onlineNumInCurrent = onlineNum;
    this.onlineRateInCurrent = sumNum == 0 ? 0 : Math.round(onlineNum / sumNum * 100);
    this.Q3AddData = Q3AddData;

    this.xAxisAddAndRunData = xAxisAddAndRunData;
    this.seriesAddData = seriesAddData;
    this.markPointAddData = markPointAddData;
    this.refreshChart();
  }
  refreshChart() {
    this.car_online_rate_option = {
      calculable: true,
      tooltip: { show: false },
      grid: {
        left: "8%",
        right: "13%",
        containLabel: true
      },
      xAxis: [{
        "axisLabel": {
          "interval": 0,
          "show": true,
          "rotate": document.documentElement.clientWidth >= 720 ? "0" : '45', //'7%',"45",
          "textStyle": {
            "fontFamily": "微软雅黑",
            "fontSize": 12,
            color: "#4f4f4f"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#4f4f4f"
          }
        },
        type: 'category',
        data: this.xAxisAddAndRunData
      }],
      yAxis: [
        {
          type: 'value',
          name: '在线率(%)',
          min: 0,
          max: 100,
          axisLabel: {
            formatter: "{value}%",
            "textStyle": {
              "fontFamily": "微软雅黑",
              "fontSize": 12,
              color: "#4f4f4f"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#4f4f4f"
            }
          },
        }
      ],
      series: [
        {
          name: '在线率(%)',
          type: 'line',
          silent: true,
          lineStyle: {
            normal: {
              color: "#00b0f0"
            }
          },
          itemStyle: {
            normal: {
              color: "#00b0f0"
            }
          },
          data: this.seriesAddData,
          markPoint: {
            data: this.markPointAddData,
            label: {
              normal: {
                backgroundColor: "#00b0f0",
                color: "white"
              }
            }
          }
        }
      ]
    };

  }
}