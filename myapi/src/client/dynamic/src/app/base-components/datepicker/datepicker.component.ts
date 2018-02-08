import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
// import * as mobiscroll from "../../../../../assets/plugins/mobiscroll/mobiscroll.javascript.min.js";

type TMobDateFormat = "yy-mm-dd" | "yy-mm";
type TDateFormat = "yyyy-MM-dd" | "yyyy-MM" | "yyyy";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.less']
})
export class DatepickerComponent implements OnInit, AfterViewInit {
  @Input() defaultValue: string;
  @Input() placeholder: string = "选择时间";
  @Input("format")
  set _format(_f: TDateFormat) {
    this.format = _f;
    this.renderMobDateFormat();
  }
  @Input("show-angle") showAngle = true;
  @Input("maxDate") set _maxDate(_m) {
    this.renderMaxDate(_m);
    this.renderBtn();
  }
  @Input("minDate") set _minDate(_m) {
    this.renderMinDate(_m);
    this.renderBtn();
  }
  @Output() onChanged = new EventEmitter<string>();

  format: TDateFormat = "yyyy-MM-dd";
  mobDateFormat: TMobDateFormat;
  id: string;
  value: string;
  viewValue: string;
  currentDate;
  dateObj;
  minDate: string;
  maxDate: string;

  yearRange: number[] = [];
  monthRange: number[] = [];
  dayRange: number[] = [];

  enablePrevBtn = false;
  enableNextBtn = false;


  constructor() {
    mobiscroll.settings = {
      lang: "zh",
    };
    this.id = "mob_" + FOTON_GLOBAL.uuid();
  }

  ngOnInit() {
    this.value = this.defaultValue;
    this.viewValue = this.value ? this.value : this.placeholder;
    this.renderCurrentDate();

    if(!this.maxDate) this.renderMaxDate(null);
    if(!this.minDate) this.renderMinDate(null);

    this.renderMobDateFormat();
    this.renderBtn();
  }


  renderBtn() {
    if (!this.currentDate) return;

    let currentDateObj = new Date(this.currentDate);

    let year = currentDateObj.getFullYear();
    let month = currentDateObj.getMonth() + 1;
    let day = currentDateObj.getDate();

    let yearToMinRange = year <= this.yearRange[0];
    let monthToMinRange = month <= this.monthRange[0];
    let dayToMinRange = day <= this.dayRange[0];

    let yearToMaxRange = year >= this.yearRange[1];
    let monthToMaxRange = month >= this.monthRange[1];
    let dayToMaxRange = day >= this.dayRange[1];

    this.enablePrevBtn = !yearToMinRange || yearToMinRange && !monthToMinRange || yearToMinRange && monthToMinRange && !dayToMinRange;
    this.enableNextBtn = !yearToMaxRange || yearToMaxRange && !monthToMaxRange || yearToMaxRange && monthToMaxRange && !dayToMaxRange;
  }

  renderCurrentDate(){
    if(!this.value) return;
    if (this.format === "yyyy") {
      this.currentDate = this.value + "/01/01";
    } else if (this.format === "yyyy-MM-dd") {
      this.currentDate = this.value.replace(/-/g, "/");
    } else if (this.format === "yyyy-MM") {
      this.currentDate = this.value.replace(/-/g, "/") + "/01";
    }
  }

  renderMaxDate(_m) {
    _m = _m || FOTON_GLOBAL.Date.getDateByFormat(FOTON_GLOBAL.currentTime, this.format);

    if (this.format === "yyyy") {
      this.maxDate = _m + "/01/01";
    } else if (this.format === "yyyy-MM-dd") {
      this.maxDate = _m.replace(/-/g, "/");
    } else if (this.format === "yyyy-MM") {
      this.maxDate = _m.replace(/-/g, "/") + "/01";
    }
    let dateObj = new Date(this.maxDate);
    this.yearRange[1] = dateObj.getFullYear();
    this.monthRange[1] = dateObj.getMonth() + 1;
    this.dayRange[1] = dateObj.getDate();
  }

  renderMinDate(_m) {
    _m = _m || FOTON_GLOBAL.Date.getDateByFormat("2000/01/01", this.format);

    if (this.format === "yyyy") {
      this.minDate = _m + "/01/01";
    } else if (this.format === "yyyy-MM-dd") {
      this.minDate = _m.replace(/-/g, "/");
    } else if (this.format === "yyyy-MM") {
      this.minDate = _m.replace(/-/g, "/") + "/01";
    }
    let dateObj = new Date(this.minDate);
    this.yearRange[0] = dateObj.getFullYear();
    this.monthRange[0] = dateObj.getMonth() + 1;
    this.dayRange[0] = dateObj.getDate();
  }

  renderMobDateFormat() {
    this.mobDateFormat = this.format.toLowerCase().replace("yyyy", "yy") as TMobDateFormat;
  }
  ngAfterViewInit() {
    let defaultValue;
    if (this.defaultValue) {
      if (this.format == "yyyy-MM-dd") {
        defaultValue = new Date(this.defaultValue.replace(/\-/g, "/"));
      } else if (this.format === "yyyy") {
        defaultValue = new Date(this.defaultValue + "/01/01");
      } else if (this.format === "yyyy-MM") {
        defaultValue = new Date(this.defaultValue.replace(/\-/g, "/") + "/01");
      }
    }
    this.dateObj = mobiscroll.date('#' + this.id, {
      theme: 'ios',
      display: 'bottom',
      dateFormat: this.mobDateFormat,
      min: this.minDate ? new Date(this.minDate) : null,
      max: this.maxDate ? new Date(this.maxDate) : null,
      defaultValue: defaultValue,
      onSet: ({ valueText }) => {
        this.onDateChanged(valueText);
      },
      onBeforeShow: () => {
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
        document.ontouchstart = function(event){
          event.preventDefault();
        };
        document.ontouchmove = function(event){
          event.preventDefault();
        };
      },
      onClose: () => {
        document.body.style.overflow = "auto";
        document.body.style.touchAction = "auto";
        document.ontouchstart = null;
        document.ontouchmove = null;
      }
    });
  }

  onDateChanged(_value) {
    this.value = _value;

    this.viewValue = this.value;
    this.onChanged.emit(this.value);
    this.renderCurrentDate();
    this.renderBtn();
  }

  jumpTo(_d) {
    if (!this.enablePrevBtn && _d == "prev" || !this.enableNextBtn && _d == "next") return;

    let newDate, currentDateObj = new Date(this.currentDate);

    if (this.format === "yyyy-MM-dd") {
      if (_d === "prev") {
        newDate = new Date(currentDateObj.getTime() - 24 * 60 * 60 * 1000);
      } else {
        newDate = new Date(currentDateObj.getTime() + 24 * 60 * 60 * 1000);
      }
    } else if (this.format == "yyyy-MM") {
      let month = Number(this.value.split("-")[1]), year = Number(this.value.split("-")[0]);

      if (_d === "prev") {
        month--;

        if (month == 0) {
          year--;
          month = 12;
        }
      } else {
        month++;
        if (month == 13) {
          month = 1;
          year++;
        }
      }

      newDate = new Date(`${year}/${month}/01`);
    } else if (this.format === "yyyy") {
      let year = Number(this.value);

      if (_d === "prev") {
        year--;
      } else {
        year++;
      }
      newDate = new Date(`${year}/01/01`);
    }
    this.dateObj && this.dateObj.setVal(newDate);
    this.onDateChanged(FOTON_GLOBAL.Date.getDateByFormat(newDate, this.format));
  }
}
