export interface Data {
}

export interface IDeviceSim {
  simNumber: String
}

export interface IDevice {
  did: String,
  sn: String,
  currentDeviceSim: IDeviceSim
}

export interface ICarType {
  carBrand: {
    name: String
  }
}

export interface ICar {
  lpn: String,
  framenum: String,
  currentDevice: IDevice,
  carType: ICarType,
  openTime: String
}