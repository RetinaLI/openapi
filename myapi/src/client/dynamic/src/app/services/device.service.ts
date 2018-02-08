import { Injectable } from '@angular/core';
import { AjaxService, IResponseData } from "../providers/ajax.service";
import { IDevice, TDeviceStatus } from "./device.service.interface";

@Injectable()
export class DeviceService {

  constructor(private ajaxService: AjaxService) { }

  // function deviceStatusRender(rowdata, rowindex, value, column) {
  //   var txt = '<div class="padding_top5 padding_left20">';
  //   var exportData = '';
  //   var lastTime = '';
  //   if (value.location && value.location.sendTime) {
  //     lastTime = value.location.sendTime;
  //   } else {
  //     lastTime = '无';
  //   }
  //   if (value.onOff=="1") {
  //     if (value.location && value.location.standardVelocity && value.location.standardVelocity > 0){
  //       txt += '<span class="icon_runing" title="行驶&#10;最后通信时间：' + lastTime + '"></span>';
  //       exportData += '行驶';
  //     }else if (value.location && value.location.standardVelocity && value.location.standardVelocity <= 0){
  //       txt += '<span class="icon_stoping" title="停车&#10;最后通信时间：' + lastTime + '"></span>';
  //       exportData += '停车';
  //     }else{
  //       txt += '<span class="icon_online" title="在线&#10;最后通信时间：' + lastTime + '"></span>';
  //       exportData += '在线';
  //     }
  //   } else {
  //     txt += '<span class="icon_offline" title="离线&#10;最后通信时间：' + lastTime + '"></span>';
  //     exportData += '离线';
  //   }
  //   rowdata['exportData_' + column.columnindex] = exportData;
  //   txt += '</div>';
  //   return txt;
  // }
  getDeviceList(_params: {
    "pager.pageNo": number
    "pager.pageSize":number,
    "sort": string,
    "direction": string
  }): Promise<{
    list: IDevice[]
  }> {
    return (this.ajaxService.call("getDeviceList", _params) as Promise<{
      list: IDevice[]
    }>).then(result => {
      result.list = result.list || [];

      result.list.forEach(item => {
        let __status: TDeviceStatus = "离线";
        if(item.onOff == 1) {
          if(item.location && Number(item.location.velocity) == item.location.velocity) {
            __status = item.location.velocity > 0 ? "行驶" : "停车";
          } else {
            __status = "在线";
          }
        }

        item.__status = __status;
      });

      return result;
    });
  }
}
