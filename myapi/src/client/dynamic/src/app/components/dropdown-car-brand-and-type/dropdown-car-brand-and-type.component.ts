import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from "../../services/data.service";
import { IDropDownCarBrandTypeSelectedItem } from "./interface";

@Component({
  selector: 'app-dropdown-car-brand-and-type',
  templateUrl: './dropdown-car-brand-and-type.component.html',
  styleUrls: ['./dropdown-car-brand-and-type.component.css'],
  providers: [DataService]
})
export class DropdownCarBrandAndTypeComponent implements OnInit {
  @Output() onChanged = new EventEmitter<IDropDownCarBrandTypeSelectedItem>();

  brands = [];
  types = [];
  currentBrand;
  currentType;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCarBrands().then(result => {
      this.brands = [{
        label: "全部品牌",
        value: ""
      }].concat(result.list.map(elem => {
        return {
          label: elem.key,
          value: elem.value
        };
      }));
    });
  }

  onSelectBrandChanged(_brand: { item: { label: string, value: any }, index: number }){
    this.types = [];
    this.currentBrand = _brand && _brand.item || null;
    this.currentType = null;
    this.onChanged.emit({
      brand: this.currentBrand,
      type: this.currentType
    });
    if(!_brand.item) return;
    this.dataService.getCarTypeByBrand({ carBrandId: _brand.item.value }).then(result => {
      this.types = [{
        label: "全部型号",
        value: null
      }].concat(result.list.map(elem => {
        return {
          label: elem.name,
          value: elem.id
        };
      }));
    });
  }

  onSelectTypeChanged(_type: { item: { label: string, value: any }, index: number }){
    this.currentType = _type && _type.item || null;
    this.onChanged.emit({
      brand: this.currentBrand,
      type: this.currentType
    });
  }

}
