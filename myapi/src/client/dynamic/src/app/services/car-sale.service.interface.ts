export interface ISaleSummaryByDms {
  actualSalesNum?: number,
  totalNum?: number
}
export interface ISaleSummaryByDmsMap {
  map?: ISaleSummaryByDms
}
export interface ISaleSummaryByEstimate {
  actualSalesNum?: number,
  totalNum?: number
}
export interface ISaleSummaryByEstimateMap {
  map?: ISaleSummaryByEstimate
}

export interface ISaleWarnEntry {
  actualSaleDate: string,
  id: number,
  vin: string,
  carInfo: {
    id: number,
    lpn: string,
    carType: {
      name: string,
      carBrand: {
        name: string
      }
    },
    currentDevice: {
      did: string,
      location: {
        latitude: string,
        longitude: string,
        mileage: string,
        sendTime: string
      }
    }
  },
  dealer: {
    name: string
  },
  centreWarehouse: {}
  company: {}
  created: string,
  endShippingTime: string,
  estimateSaleDate: string,
  estimateSaleReason: string,
  inCentreWHTime: string,
  inDealerWHTime: string,
  modified: string,
  modifiedTime: string,
  "new": boolean,
  outCentreWHTime: string,
  outDealerWHTime: string,
  productDate: string,
  startShippingTime: string
}
export interface ISaleWarnEntryList {
  list: ISaleWarnEntry[]
}

export interface ICarRepairSummary {
  notRealNum?: number,
  totalNum?: number
}

export interface ICarRepairSummaryMap {
  map?: ICarRepairSummary
}

export interface ICarRepairInfo {
  vin: string,
  plateNumber: string,
  repairCode: string,
  stationName: string,
  maintainType: number,
  maintainTypeName: string,
  clientName: string,
  clientPhone: string,
  isInner: number,
  isInnerName: string,
  isRealNote: string,
  id: number,
  totalCost: number,
  isReal: string,
  returnTime: string,
  inFenceTime: string,
  outFenceTime: string,
  servicer: {
    id: number,
    fence: {
      type: number,
      value: string
    }
  }
}

export interface ICarRepairInfoList {
  list: ICarRepairInfo[]
}


export interface ICarFenceLocationInfo {
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
}
export interface ICarFenceLocationList {
  did: string,
  list: ICarFenceLocationInfo[]
}