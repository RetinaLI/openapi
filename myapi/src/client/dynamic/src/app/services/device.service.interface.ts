export type TDeviceStatus = "行驶" | "停车" | "在线" | "离线";

export interface IDevice {
  id: number,
  onOff: number,
  did: string,
  sn: string,
  sim: number,
  location: {
    address: string,
    standardVelocity: number,
    velocity: number
  },
  carInfo: {
    framenum: string,
    lpn: string,
    carType: {
      carBrand: {
        name: string
      },
      energyMode: string,
      name: string
    }
  },
  __status: TDeviceStatus
}