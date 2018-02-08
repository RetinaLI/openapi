import { Component, OnInit, Input, Output, ViewContainerRef, AfterViewInit } from '@angular/core';
import { CT_GlobalConfig, NEW_ENERGY_PLATFORM_MAP, PLATFORM_MAP } from "./car-report.interface";
import { ReportService } from "../../services/report.service";
import { ReportDataObj, CT_Report } from "../../services/report.interface";
import { E1Service } from "./e1";
import { E2Service } from "./e2";
import { E7Service } from "./e7";
import { E8_9_10_11_Service } from "./e8_9_10_11";
import { E4_5_6_Service } from "./e4_5_6";

@Component({
  selector: 'app-car-report',
  templateUrl: './car-report.component.html',
  styleUrls: ['./car-report.component.less'],
  providers: [E1Service, ReportService, E2Service, E7Service, E8_9_10_11_Service, E4_5_6_Service]
})
export class CarReportComponent implements OnInit {
  @Input() title = "福田汽车报告";
  @Input() type: "week" | "month" | "day" = "week";
  dataGroupType: "brand" | "carType" = "brand";
  dataRange: "all" | "new_energy" | "brand" = "all";
  startDateTime = 0;
  endDateTime = 0;

  private $element: JQuery;

  reportSelectedIndex = 0;

  dataObj: ReportDataObj;
  reportStartDate: string;
  reportEndDate: string;
  dataGroupTypeLabel: "品牌" | "车型" | "" = "";
  reportConfig: CT_GlobalConfig = {
    SPEC_BRAND: "雷萨",
    dataGroupType: this.dataGroupType,
    dataRange: this.dataRange,
    reportType: this.type,
    platformBrandMap: null,
    startDate: null,
    endDate: null,
    dayCount: 0,
    days: [],
    brandMap: {
    },
    lineColors: ['#c23531', "#00BFFF", "#000000", '#EE7942', '#61a0a8', '#91c7ae', '#749f83', '#ca8622', '#6e7074', '#546570', '#c4ccd3', '#2f4554']
  };
  reportTypeLabelMap = {
    "week": "周",
    "month": "月",
    "day": "日"
  };
  reportTypeLabel: string;
  reportDropDownList: {label: string, value: string}[];
  reportList: CT_Report[];
  selectedReport: CT_Report

  constructor(private element: ViewContainerRef, private reportService: ReportService,
    public e1Service: E1Service, public e2Service: E2Service, public e7Service: E7Service,
    public e8_9_10_11_Service: E8_9_10_11_Service, public e4_5_6_Service: E4_5_6_Service) {

  }

  onWindowResize(){
    this.renderData();
  }

  renderConfig(){

    let typeList = this.dataObj.brands || this.dataObj.carTypes || [];
    typeList.forEach(_item => {
      PLATFORM_MAP[_item.code] = _item.name;
      NEW_ENERGY_PLATFORM_MAP[_item.code] = _item.name;
      this.reportConfig.brandMap[_item.code] = _item.name;
    });

    this.reportConfig.startDate = new Date(this.dataObj.optionWeek6AddInfo.section[0].replace(/-/g, "/") + " 00:00:00");
    this.reportConfig.endDate = new Date(this.dataObj.optionWeek6AddInfo.section[1].replace(/-/g, "/") + " 00:00:00");
    this.reportConfig.dayCount = (this.reportConfig.endDate.getTime() - this.reportConfig.startDate.getTime()) / (24 * 60 * 60 * 1000) + 1;
    let d = this.reportConfig.startDate.getTime(),
      days = [];
    for (var i = 0; i < this.reportConfig.dayCount; i++) {
      days.push({
        t: FOTON_GLOBAL.Date.getDateByFormat(d, "yyyyMMdd"),
        d: FOTON_GLOBAL.Date.getDateByFormat(d, "yyyy-MM-dd"),
        md: FOTON_GLOBAL.Date.getDateByFormat(d, "MM-dd")
      });
      d = this.reportConfig.startDate.getTime() + (i + 1) * (24 * 60 * 60 * 1000);
    }
    this.reportConfig.days = days;
    this.reportConfig.reportType = this.type;
    let title = this.title;
    if(this.selectedReport) {
      if(this.selectedReport.path.indexOf("report_by_brand") > -1) {
        this.dataGroupType = "carType";
        this.dataRange = "brand";
        title = this.dataObj.brandName + "车联网";
      } else {
        this.dataGroupType = "brand";
        if(this.selectedReport.path.indexOf("new_energy_") > -1) {
          this.dataRange = "new_energy";
          title = "福田新能源车联网";
        } else {
          this.dataRange = "all";
          title = "福田商用车车联网";
        }
      }
      title += this.reportTypeLabel + "报";
    }
    this.title = title;
    this.reportConfig.dataGroupType = this.dataGroupType;
    this.dataGroupTypeLabel = this.dataGroupType == "brand" ? "品牌" : "车型";
    this.reportConfig.dataRange = this.dataRange;
    this.reportConfig.platformBrandMap = this.dataRange == "all" ? PLATFORM_MAP : this.dataRange == "new_energy" ? NEW_ENERGY_PLATFORM_MAP : this.reportConfig.brandMap;
  }

  renderData() {
    var dataObj = $.extend(true, {}, this.dataObj);
    this.e1Service.renderData(dataObj, this.reportConfig);
    this.e2Service.renderData(dataObj, this.reportConfig);
    this.e7Service.renderData(dataObj, this.reportConfig);
    this.e8_9_10_11_Service.renderData(dataObj, this.reportConfig);
    this.e4_5_6_Service.renderData(dataObj, this.reportConfig);
  }

  refreshReportData(){
    if(!this.selectedReport) return;
    let url = decodeURIComponent(this.selectedReport.path.split("=")[1]);
    this.reportService.getReportData(url, this.type == "week" ? 2 : 1).then(result => {
      this.dataObj = result;
      this.renderConfig();
      this.reportStartDate = FOTON_GLOBAL.Date.getDateByFormat(this.reportConfig.startDate, "MM/dd");
      this.reportEndDate = FOTON_GLOBAL.Date.getDateByFormat(this.reportConfig.endDate, "MM/dd");


      this.renderData();
    });
  }

  bindData(){
    this.reportService.getReportList({
      type: this.type == "week" ? 2 : 1,
      startDate: this.startDateTime,
      endDate: this.endDateTime
    }).then(result => {
      this.reportList = result.list;
      this.reportSelectedIndex = this.reportList.length == 0 ? 0 : (this.reportList.length - 1);
      this.reportDropDownList = this.reportList.map(_item => {
        return {
          label: _item.rangeTitle,
          value: _item.id + ""
        };
      });
      this.selectedReport = this.reportList.length && this.reportList[this.reportList.length - 1] || null;
      this.refreshReportData();
    });
  }

  ngOnInit() {
    this.reportTypeLabel = this.reportTypeLabelMap[this.type];
    let year = (new Date(Date.now())).getFullYear();
    this.startDateTime = (new Date(`2015/01/01 00:00:00`)).getTime();
    year += 1;
    this.endDateTime = (new Date(`${year}/01/01 00:00:00`)).getTime() - 1;
    this.bindData();
  }

  ngAfterViewInit(){
    // this.$element = $(this.element.element.nativeElement).find(".echart-map-china");
  }

  onReportSelectChanged(_item: { item: {label: string, value: string} }){
    this.selectedReport = this.reportList.find(_r => (_r.id + "") == _item.item.value);
    this.refreshReportData();
  }

}
