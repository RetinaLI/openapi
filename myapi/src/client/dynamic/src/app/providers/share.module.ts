import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CarReportComponent } from '../components/car-report/car-report.component';
import { ChoosePlatformComponent } from '../components/choose-platform/choose-platform.component';
import { DialogComponent } from '../base-components/dialog/dialog.component';
import { EchartMapChinaComponent } from "../base-components/echart-map-china/echart-map-china.component";
import { EchartMapBarChinaComponent } from "../base-components/echart-map-bar-china/echart-map-bar-china.component";
import { EchartBaseComponent } from "../base-components/echart-base/echart-base.component";
import { DropdownComponent } from '../base-components/dropdown/dropdown.component';
import { DatepickerComponent } from '../base-components/datepicker/datepicker.component';
import { DropdownCarBrandAndTypeComponent } from '../components/dropdown-car-brand-and-type/dropdown-car-brand-and-type.component';
import { SimpleSummaryBoardComponent } from "../base-components/simple-summary-board/simple-summary-board.component";
import { FootableComponent } from "../base-components/footable/footable.component";
import { ChartSwiperComponent } from "../base-components/chart-swiper/chart-swiper.component";
import { SummaryBoardComponent } from '../base-components/summary-board/summary-board.component';
import { ChartDataTableComponent } from '../base-components/chart-data-table/chart-data-table.component';

const import_list = [CommonModule, FormsModule];
const declaration_list = [
  EchartMapChinaComponent,
  EchartBaseComponent,
  DropdownComponent,
  DropdownCarBrandAndTypeComponent,
  DatepickerComponent,
  SimpleSummaryBoardComponent,
  EchartMapBarChinaComponent,
  FootableComponent,
  ChartSwiperComponent,
  SummaryBoardComponent,
  ChartDataTableComponent,
  DialogComponent,
  ChoosePlatformComponent,
  CarReportComponent
];
const export_list = (import_list as any[]).concat(declaration_list);

@NgModule({
  imports: import_list,
  exports: [
    CommonModule, FormsModule,
    EchartMapChinaComponent,
    EchartBaseComponent,
    DropdownComponent,
    DropdownCarBrandAndTypeComponent,
    DatepickerComponent,
    SimpleSummaryBoardComponent,
    EchartMapBarChinaComponent,
    FootableComponent,
    ChartSwiperComponent,
    SummaryBoardComponent,
    ChartDataTableComponent,
    DialogComponent,
    ChoosePlatformComponent,
    CarReportComponent
  ],
  declarations: declaration_list
})
export class SharedModule { }