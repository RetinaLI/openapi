export interface ICarWarnSummary {
  optionTypeCode: string,
  optionTypeName: string,
  status: string,
  statusName: string,
  repeatTimes: number
}
export interface ICarWarnSummaryList {
  list: ICarWarnSummary[]
}

export interface ICar {
  id: number,
  framenum: string,
  lpn: string,
  customer: {
    name: string
  },
  carType: {
    name: string,
    carBrand: {
      name: string
    }
  },
  currentDevice: {
    did: string,
    sn: string,
    currentDeviceSim: {
      simNumber: string
    }
  }
}

export interface ICarDevice{
  locationInfo: string,
  velocity: string,
  carInfo: {
    carType: {
      name: string,
      carBrand: {
        name: string
      }
    }
  },
  location: {
    address: "内蒙古自治区呼和浩特市回民区",
    latitude: string,
    longitude: string,
    sendTime: string
  }
}

export interface ICarRunSummary{
  TT_ALL_DAYS: number,
  TT_AVG_VELOCITY: number,
  TT_MILEAGE: number,
  TT_RUN_DAYS: number,
  TT_RUN_PERCENT: number,
  TT_RUN_TIME: number,
  TT_WORK_DAYS: number,
  TT_WORK_PERCENT: number,
  TT_WORK_TIME: number
}

export interface ICarDataMapByMonth{
  map: {
    carsMap: {
      [x: string]: number
    },
    reportMap: {
      [x: string]: number
    }
  }
}
