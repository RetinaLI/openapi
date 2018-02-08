import { Injectable } from '@angular/core';
import { AjaxService, IResponseData } from "../providers/ajax.service";

import { ReportDataObj, CT_Report } from "./report.interface";

@Injectable()
export class ReportService {

  constructor(private ajaxService: AjaxService) { }

  getReportData(_url: string, _type: 1 | 2 = 2): Promise<ReportDataObj> {
    return this.ajaxService.callByUrl(_url, "get", { type: _type }).then(result => {
      return result;
    });
  }

  getReportList(_params: {
    type: 1 | 2,
    startDate: number,
    endDate: number
  }): Promise<{
    list: CT_Report[]
  }>{
    return (this.ajaxService.call("getReportList", _params) as Promise<{
      list: CT_Report[]
    }>);;
  }
}
