import { Injectable } from '@angular/core';

import { CT_GlobalConfig } from "./car-report.interface";

class BaseService{
  title;
  unit;
  legendData;
  _gridLeftFn;
  xData;
  yData;
  dayCount;
  constructor(title, unit, _gridLeftFn){
    this.title = title;
    this.unit = unit;
    this._gridLeftFn = _gridLeftFn;
  }

  public renderData(_result, _config: CT_GlobalConfig, _dataProName, _valueViewFn, _valueFn){
    let _carBrandMap = _config.platformBrandMap;

    var result = _result && _result.carOperateAvgReport ? _result : {
      carOperateAvgReport: {
        // avgWorkTimeData: []
      }
    };

    var data = result.carOperateAvgReport[_dataProName] || [];

    var xData = [],
      xDataHash = {};
    var yData = [];
    var legendData = [],
      legendDataHash = {};
    var dayCount = _config.days.length;
    // if (!window.global.is_new_energy) {

    var leisa = {},
      tempDate = 0,
      has_leisa = false;
    for (var i = data.length - 1, ci, date; i >= 0; i--) {
      ci = data[i];

      if (!_carBrandMap[ci.code]) {
        if (_carBrandMap[_config.SPEC_BRAND] && _carBrandMap[_config.SPEC_BRAND][ci.code]) {
          tempDate = Number(ci.date.replace(/-/g, ""));
          leisa[tempDate] = leisa[tempDate] || { name: _config.SPEC_BRAND, d: tempDate, date: ci.date, value: [] };
          leisa[tempDate].value.push(ci);
          has_leisa = true;
        }
        data.splice(i, 1);
      } else {
        ci.value = _valueFn(ci);
        data[i].name = _carBrandMap[ci.code];
      }
    }

    if (_carBrandMap[_config.SPEC_BRAND]) {
      var temp = [],
        sum_numerator = 0, sum_denominator = 0;
      for (var k in leisa) {
        sum_numerator = 0;
        sum_denominator = 0;
        for (var j = 0; j < leisa[k].value.length; j++) {
          sum_numerator += leisa[k].value[j].numerator;
          sum_denominator += leisa[k].value[j].denominator;
        }
        leisa[k].value = _valueFn({ numerator: sum_numerator, denominator: sum_denominator });
        temp.push(leisa[k]);
      }

      temp.sort(function (a, b) { return a.d - b.d; });

      data = data.concat(temp);
    }
    // }
    var tempBrandMap = {};
    for (var i = 0, ci; i < data.length; i++) {
      ci = data[i];
      tempBrandMap[ci.name] = tempBrandMap[ci.name] || {};
      tempBrandMap[ci.name][ci.date.replace(/-/g, "")] = ci;
    }
    var cb, allZero = false, zeroBrands = [];
    for (var brand in tempBrandMap) {
      cb = tempBrandMap[brand];
      allZero = true;
      for (var i = 0, d; i < dayCount; i++) {
        d = _config.days[i];
        if (cb[d.t] != null) {
          if (cb[d.t].value) {
            allZero = false;
          }
          cb[d.t].t = d.t;
          continue;
        }
        cb[d.t] = {
          date: d.d,
          name: brand,
          value: 0,
          t: d.t
        };
      }

      if (allZero) {
        zeroBrands.push(brand);
      }
    }

    for (var i = 0; i < zeroBrands.length; i++) {
      delete tempBrandMap[zeroBrands[i]]
    }

    var tempArr = [],
      tempSumArr = [];
    for (var brand in tempBrandMap) {
      cb = tempBrandMap[brand];
      tempArr = [];
      for (var m in cb) {
        tempArr.push(cb[m]);
      }
      tempArr.sort(function (a, b) { return a.t - b.t; });
      tempSumArr.push({ name: brand, list: tempArr });
    }

    tempSumArr.sort();

    for (var i = 0; i < tempSumArr.length; i++) {
      tempSumArr[i] = tempSumArr[i].list;
    }


    data = [].concat.apply([], tempSumArr);

    for (var i = 0; i < dayCount; i++) {
      xData.push(_config.days[i].md);
    }

    for (var i = 0, ci, date; i < data.length; i++) {
      ci = data[i];
      ci.value = _valueViewFn(ci.value); //Math.round(ci.value / 60 / 60);
      date = ci.date.substr(5);

      if (!legendDataHash[ci.name]) {
        legendDataHash[ci.name] = [];
        legendData.push({
          name: ci.name,
          icon: "roundRect"
        });
        yData.push({
          name: ci.name,
          type: 'line',
          silent: true,
          smooth: true,
          lineStyle: {
            normal: {
              color: _config.lineColors[yData.length]
            }
          },
          itemStyle: {
            normal: {
              color: _config.lineColors[yData.length]
            }
          },
          data: legendDataHash[ci.name]
          // markPoint: {
          //   data: {
          //     xAxis: ci.name,
          //     yAxis: ci.value
          //   },
          //   label: {
          //     normal: {
          //       backgroundColor: "#00b0f0",
          //       color: "red"
          //     }
          //   }
          // }
        });
      }
      legendDataHash[ci.name].push(ci.value);
    }
    this.legendData = legendData;
    this.xData = xData;
    this.yData = yData;
    this.dayCount = dayCount;
    return this.refreshChart();
  }

  public refreshChart(){

    var interval = 0;

    if (document.documentElement.clientWidth >= 720) {
      interval = this.dayCount <= 7 ? 0 : this.dayCount == 30 ? 4 : 5;
    } else {
      interval = this.dayCount <= 7 ? 1 : this.dayCount == 31 ? 9 : 8;
    }

    return {
      title: {
        text: this.title + "（" + this.unit + "）",
        left: "center",
        textStyle: {
          color: "#4f4f4f"
        }
      },
      legend: {
        bottom: 0,
        show: true,
        data: this.legendData
      },
      calculable: true,
      tooltip: {
        show: document.documentElement.clientWidth >= 720,
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        left: this._gridLeftFn(), //'7%',
        right: "13%",
        containLabel: true
      },
      xAxis: [{
        "axisLabel": {
          "interval": interval,
          "show": true,
          "textStyle": {
            "fontFamily": "微软雅黑",
            "fontSize": 12,
            align: "center",
            color: "#4f4f4f"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#4f4f4f"
          }
        },
        axisTick: {
          alignWithLabel: true
        },
        type: 'category',
        name: '时间',
        data: this.xData
      }],
      yAxis: [{
        type: 'value',
        min: 0,
        axisLine: {
          lineStyle: {
            color: "#4f4f4f"
          }
        },
        axisLabel: {
          formatter: "{value}" + this.unit,
          "textStyle": {
            "fontFamily": "微软雅黑",
            "fontSize": 12,
            color: "#4f4f4f"
          }
        }
      }],
      series: this.yData
    };
  }
}

@Injectable()
export class E8_9_10_11_Service {
  avg_mileage_option;
  avg_work_time_option;
  avg_work_rate_option;
  avg_uncharge_power_option;

  avgMileageService;
  avgWorkTimeService;
  avgWorkRateService;
  avgUnchargePowerService;
  constructor() {
    this.avgMileageService = new BaseService("平均里程", "KM", function () {
      return document.documentElement.clientWidth >= 720 ? "7%" : '1%';
    });
    this.avgWorkTimeService = new BaseService("平均时长", "小时", function () {
      return document.documentElement.clientWidth >= 720 ? "7%" : '1%';
    });
    this.avgWorkRateService = new BaseService("平均运营率", "%", function () {
      return document.documentElement.clientWidth >= 720 ? "7%" : '4%';
    });
    this.avgUnchargePowerService = new BaseService("平均耗电量", "度", function () {
      return document.documentElement.clientWidth >= 720 ? "7%" : '1%';
    });
  }
  renderData(_result, _config: CT_GlobalConfig) {
    this.avg_mileage_option = this.avgMileageService.renderData(_result, _config, "avgMileageData", function (_value) {
      return _value / 1000;
    }, function (data) {
      return data.numerator == null ? data.value : (data.denominator == 0 ? 0 : Math.round(data.numerator / data.denominator));
    });

    this.avg_work_time_option = this.avgWorkTimeService.renderData(_result, _config, "avgWorkTimeData", function (_value) {
      _value = _value || 0;
      return (_value / 60 / 60).toFixed(5);
    }, function (data) {
      return data.numerator == null ? data.value : (data.denominator == 0 ? 0 : Math.round(data.numerator / data.denominator));
    });

    this.avg_work_rate_option = this.avgWorkRateService.renderData(_result, _config, "avgWorkRateData", function (_value) {
      return _value;
    }, function (data) {
      return data.numerator == null ? data.value : (data.denominator == 0 ? 0 : Math.round(data.numerator / data.denominator * 100));
    })

    if (_config.dataRange == "new_energy") {
      this.avg_uncharge_power_option = this.avgUnchargePowerService.renderData(_result, _config, "avgUnChargePowerData", function (_value) {
        return _value;
      }, function (data) {
        return data.numerator == null ? data.value : (data.denominator == 0 ? 0 : Math.round(data.numerator / data.denominator));
      })
    }
  }

  refreshChart(){
    this.avg_mileage_option = this.avgMileageService.refreshChart();
    this.avg_work_time_option = this.avgWorkTimeService.refreshChart();
    this.avg_work_rate_option = this.avgWorkRateService.refreshChart();
    this.avg_uncharge_power_option = this.avgUnchargePowerService.refreshChart();
  }
}