import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
// import * as mobiscroll from "../../../../../assets/plugins/mobiscroll/mobiscroll.javascript.min.js";

interface IItem {
  label: string | number,
  value: any
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.less']
})
export class DropdownComponent implements OnInit, AfterViewInit {
  //todo: 增加空选项配置
  @Input() placeholder: string = "";
  @Input("items")
  set _items(_items: IItem[]) {
    this.items = _items || [];
    this.label = this.placeholder;
    if (this.selectedIndex != null && this.items[this.selectedIndex]) {
      this.label = this.items[this.selectedIndex].label;
    }

    setTimeout(() => {
      this.renderMobSelect();
      this.dateObj && this.dateObj.setVal(this.items[this.selectedIndex].value);
    }, 0);
  }
  @Input("selected-index") set _selectedIndex(_index: number){
    this.selectedIndex = _index;
    if (this.selectedIndex != null && this.items && this.items[this.selectedIndex]) {
      this.label = this.items[this.selectedIndex].label;
      this.dateObj && this.dateObj.setVal(this.items[this.selectedIndex].value);
    }
  }

  selectedIndex: number

  @Output() onSelectChanged = new EventEmitter<{ item: IItem }>();

  items: IItem[] = [];
  id: string;
  dateObj;

  is_view_init = false;

  label: string | number = "";

  constructor() {
    mobiscroll.settings = {
      lang: "zh",
    };
    this.label = this.placeholder;
    this.id = "mob_select_" + FOTON_GLOBAL.uuid();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.is_view_init = true;
    this.renderMobSelect();
  }

  renderMobSelect() {
    if (!this.is_view_init || !this.items || this.items.length == 0) return;
    if (this.dateObj) {
      this.dateObj.refresh();
    } else
      this.dateObj = mobiscroll.select('#' + this.id, {
        theme: 'ios',
        display: 'bottom',
        onSet: ({ valueText }) => {
          this.label = valueText;
          this.onSelectChanged.emit({
            item: {
              value: this.dateObj.getArrayVal()[0],
              label: valueText
            }
          });
        }
      });
  }
}
