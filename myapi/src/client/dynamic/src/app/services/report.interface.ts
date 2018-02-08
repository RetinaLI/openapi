export type ReportDataObj = {
  "currentTime": number,
  "carAvgMileageReport": {
    "seriesData": number[],
    "yAxisData": string[]
  },
  "brandName": string,
  brands: { "code": string, "name": string }[],
  "carTypes": { "code": string, "name": string }[],
  "carOperateAvgReport": {
    "avgUnChargePowerData": { "date": string, "code": string, "numerator": number, "denominator": number }[],
    "avgWorkTimeData": { "date": string, "code": string, "numerator": number, "denominator": number }[],
    "avgWorkRateData": { "date": string, "code": string, "numerator": number, "denominator": number }[],
    "avgMileageData": { "date": string, "code": string, "numerator": number, "denominator": number }[]
  },
  "carLongReport": {
    "seriesData": number[],
    "yAxisData": string[]
  },
  "carAvgSpeedReport": {
    "seriesData": number[],
    "yAxisData": string[]
  },
  "carAttendanceReport": {
    "seriesData": number[],
    "yAxisData": string[]
  },
  "optionCarBrandAddAndRunInfo": {
    "markPointAddData": {xAxis: string, yAxis: number}[],
    "Q3AddData": { "onLineRate": number, "code": string, "iCarNum": number, "onLine": number }[],
    "xAxisAddAndRunData": string[],
    "onlineData": { "carOnlineNum": number, "carOnlineRate": number },
    "seriesAddData": number[]
  },
  "optionWeek6AddInfo": {
    "section": string[],
    "totalJson": {
      "markPointData": {code: string, value: number}[],
      "carTotalNum": number,
      "addCarNum1": number,
      "addCarNum2": number,
      "addRate": number,
      "xData": string[],
      "sendTime": string
    }
  },
  "optionCarBrandRunInfo": {
    "seriesMileAgeData": number[],
    "xAxisRunInfoData": string[],
    "markPointMileageData": { xAxis: string, yAxis: number }[],
    "seriesRunTimeData": number[],
    "markPointRunTimeData": { xAxis: string, yAxis: number }[],
    "totalJson": {
      "chargeCount":number,
      "chargePower": number,
      "unchargeCount": number,
      "LocationNum": number,
      "CanNum": number,
      "AlarmNum": number,
      "carNum": number,
      "runTime": number,
      "mileAge": number
    },
    "OnlineData": {
      [x: string]: {
        code: string,
        carNum: number,
        runTime: number,
        mileAge: number
      }
    }[]
  }
};

export type CT_Report = {
  company: {},
  created: string,
  id: number,
  modified: string,
  modifiedTime: string,
  name: string,
  "new": boolean,
  note: string,
  path: string,
  rangeTitle: string,
  startDate: string,
  status: number,
  subscTemplate: {}
}