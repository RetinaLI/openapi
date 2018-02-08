import { Injectable } from '@angular/core';

import { CT_GlobalConfig } from "./car-report.interface";

class BaseService {
  chartOption;
  yAxisOperateMileageAvgData;
  _unit;
  _xName;
  seriesOperateMileageAvgData;
  _colorList;
  list = [];
  firstName = "";
  firstNum = "";
  secondName = "";
  secondNum = "";
  thirdName = "";
  thirdNum = "";
  lastFirstName = "";
  lastFirstNum = "";
  lastSecondName = "";
  lastSecondNum = "";
  lastThirdName = "";
  lastThirdNum = "";
  chartHeight;
  topArr = [];
  bottomArr = [];
  constructor(_unit, _xName) {
    this._unit = _unit;
    this._xName = _xName;
  }

  renderData(_dataProName, _result, _config: CT_GlobalConfig, _colorList) {
    var result = {};
    var _carBrandMap = _config.platformBrandMap;

    if (_result && _result[_dataProName]) {
      result = _result;
    } else {
      result[_dataProName] = {
        seriesData: [],
        yAxisData: []
      };
    };

    var data = result[_dataProName];
    var yAxisOperateMileageAvgData = data.yAxisData;
    var seriesOperateMileageAvgData = data.seriesData;

    var temp = {}, tempList = [];

    for (var i = 0; i < yAxisOperateMileageAvgData.length; i++) {
      if (temp[yAxisOperateMileageAvgData[i]]) {
      } else {
        temp[yAxisOperateMileageAvgData[i]] = 1;
        tempList.push({
          city: yAxisOperateMileageAvgData[i],
          value: data.seriesData[i]
        });
      }
    }

    tempList.sort(function (a, b) { return a.value - b.value; });
    var tempColotList = [];
    yAxisOperateMileageAvgData = [];
    seriesOperateMileageAvgData = [];
    this.list = tempList;

    let count = tempList.length,
      topCount = count == 1 ? 1 : Math.ceil(count / 2), bottomCount = count - topCount;

    let topArr = [], bottomArr = [], max = 3;
    for (var i = 0; i < tempList.length; i++) {
      if (i < topCount) {
        if (bottomArr.length < max) {
          bottomArr.unshift(tempList[i]);
        }
        tempColotList.push(_colorList[0]);
      } else {
        if (topArr.length < max) {
          topArr.unshift(tempList[i]);
        }
        tempColotList.push(_colorList[1]);
      }
      yAxisOperateMileageAvgData.push(tempList[i].city);
      seriesOperateMileageAvgData.push(tempList[i].value);
    }

    this.topArr = topArr;
    this.bottomArr = bottomArr;
    this._colorList = tempColotList;
    for (var i = 0; i < seriesOperateMileageAvgData.length; i++) {
      if (i < topCount) {
        seriesOperateMileageAvgData[i] = {
          value: seriesOperateMileageAvgData[i],
          label: {
            normal: {
              position: "right"
            }
          }
        };
      } else {
        seriesOperateMileageAvgData[i] = {
          value: seriesOperateMileageAvgData[i],
          label: {
            normal: {
              position: "insideRight"
            }
          }
        };
      }
    }
    this.seriesOperateMileageAvgData = seriesOperateMileageAvgData;
    this.yAxisOperateMileageAvgData = yAxisOperateMileageAvgData;
    return this.refreshChart();
  }

  refreshChart() {
    if (document.documentElement.clientWidth >= 720) {
      this.chartHeight = ((6 * this._colorList.length / 10 * 100 / 65) + "rem");
    } else {
      this.chartHeight = ((10 * this._colorList.length / 10 * .65) + "rem");
    }
    var colorList = this._colorList;
    var width = document.documentElement.clientWidth;
    this.chartOption = {
      calculable: true,
      tooltip: { show: false },
      grid: {
        left: width >= 720 ? "7%" : '1%', //'7%',
        right: width >= 720 ? "7%" : '3%', //'7%',
        top: '0%',
        bottom: 0,
        containLabel: true
      },
      xAxis: [{
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLabel: {
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
        }
      }],
      yAxis: [{
        "axisLabel": {
          formatter: function (value) {
            if (width >= 720) return value;
            return FOTON_GLOBAL.String.getRealLength(value) > 8 ? value.substr(0, 4) + "\n" + value.substr(4) : value;
          },
          "interval": 0,
          "show": true,
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
        data: this.yAxisOperateMileageAvgData
      }],
      series: [{
        silent: true,
        itemStyle: {
          normal: {
            color: function (params) {
              return colorList[params.dataIndex]
            },
            label: {
              show: false
            }
          }
        },
        label: {
          normal: {
            formatter: '{c}' + this._unit,
            position: 'insideRight',
            show: true
          }
        },
        name: this._xName,
        type: 'bar',
        data: this.seriesOperateMileageAvgData
      }]
    };
  }
}

@Injectable()
export class E4_5_6_Service {
  avg_mileage_option;
  avg_speed_option;
  attendance_option;

  avg_mileage_chart_height;
  avg_speed_chart_height;
  attendance_chart_height;

  avgMileages = {
  };
  avgSpeeds = {
    list: [],
    firstName: "",
    firstNum: "",
    secondName: "",
    secondNum: "",
    thirdName: "",
    thirdNum: "",
    lastFirstName: "",
    lastFirstNum: "",
    lastSecondName: "",
    lastSecondNum: "",
    lastThirdName: "",
    lastThirdNum: "",
  };
  avgAttendances = {
    list: [],
    firstName: "",
    firstNum: "",
    secondName: "",
    secondNum: "",
    thirdName: "",
    thirdNum: "",
    lastFirstName: "",
    lastFirstNum: "",
    lastSecondName: "",
    lastSecondNum: "",
    lastThirdName: "",
    lastThirdNum: "",
  };
  avgMileageService;
  avgSpeedService;
  avgAttendanceService;
  constructor() {
    this.avgMileageService = new BaseService("公里", "里程");
    this.avgSpeedService = new BaseService("KM/H", "平均速度");
    this.avgAttendanceService = new BaseService("%", "出勤率");
  }
  renderData(_result, _config: CT_GlobalConfig) {
    this.avgMileageService.renderData("carAvgMileageReport", _result, _config, ["#99e636", '#55970f']);
    this.avgSpeedService.renderData("carAvgSpeedReport", _result, _config, ['#ffe7b0', "#ffc302"]);
    this.avgAttendanceService.renderData("carAttendanceReport", _result, _config, ["#64baf9", '#2382d3']);
  }

  refreshChart() {
    this.avgMileageService.refreshChart();
    this.avgSpeedService.refreshChart();
    this.avgAttendanceService.refreshChart();
  }
}