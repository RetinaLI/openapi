import { Injectable } from '@angular/core';
import { ICar } from "../interfaces/data";
import { AjaxService, IResponseData } from "../providers/ajax.service";

import { IDataByCrType } from "./data.service.interface";

@Injectable()
export class DataService {

  constructor(private ajaxService: AjaxService) { }

  getAllCars(): { list: ICar[] } {

    return {
      list: [
        {
          lpn: "京A88888",
          framenum: "LRDS6PEB4HT019287",
          currentDevice: {
            did: "A64703732255",
            sn: "CB201H6140111",
            currentDeviceSim: {
              simNumber: "1064703732255"
            }
          },
          carType: {
            carBrand: {
              name: "欧曼-GTL"
            }
          },
          openTime: "2017-08-09"
        },

        {
          lpn: "京A88888",
          framenum: "LRDS6PEB4HT019287",
          currentDevice: {
            did: "A64703732255",
            sn: "CB201H6140111",
            currentDeviceSim: {
              simNumber: "1064703732255"
            }
          },
          carType: {
            carBrand: {
              name: "欧曼-GTL"
            }
          },
          openTime: "2017-08-09"
        },

        {
          lpn: "京A88888",
          framenum: "LRDS6PEB4HT019287",
          currentDevice: {
            did: "A64703732255",
            sn: "CB201H6140111",
            currentDeviceSim: {
              simNumber: "1064703732255"
            }
          },
          carType: {
            carBrand: {
              name: "欧曼-GTL"
            }
          },
          openTime: "2017-08-09"
        },
        {
          lpn: "京A88888",
          framenum: "LRDS6PEB4HT019287",
          currentDevice: {
            did: "A64703732255",
            sn: "CB201H6140111",
            currentDeviceSim: {
              simNumber: "1064703732255"
            }
          },
          carType: {
            carBrand: {
              name: "欧曼-GTL"
            }
          },
          openTime: "2017-08-09"
        },
        {
          lpn: "京A88888",
          framenum: "LRDS6PEB4HT019287",
          currentDevice: {
            did: "A64703732255",
            sn: "CB201H6140111",
            currentDeviceSim: {
              simNumber: "1064703732255"
            }
          },
          carType: {
            carBrand: {
              name: "欧曼-GTL"
            }
          },
          openTime: "2017-08-09"
        }
      ]
    };
  }

  getDynamicAreaAnalysisData(_params: { date: string }) {
    return this.ajaxService.call("getDynamicAreaAnalysisData", _params);
  }

  getCarListGroupByCarType(_params: { startDate: string, endDate: string }): Promise<{
    list: IDataByCrType[]
  }> {
    return this.ajaxService.call("getCarListGroupByCarType", _params) as Promise<{
      list: IDataByCrType[]
    }>;
  }

  getCarBrands() {
    return this.ajaxService.call("getCarBrands");
  }

  getCarTypeByBrand(_params: { carBrandId: string | number }): Promise<{
    list?: { id: number, name: string }[]
  }> {
    return this.ajaxService.call("getCarTypeByBrand", _params).then(result => {
      return {
        list: result.treeNodes || []
      }
    });
  }
}
