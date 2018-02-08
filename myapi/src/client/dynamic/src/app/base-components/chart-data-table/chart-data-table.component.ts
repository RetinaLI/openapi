import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart-data-table',
  templateUrl: './chart-data-table.component.html',
  styleUrls: ['./chart-data-table.component.less']
})
export class ChartDataTableComponent implements OnInit {
  @Input() enableTableHead = false;
  @Input() enableBottomModal: boolean = true;
  @Input("ext-class") extClass = ""; //ranking、pie-chart

  constructor() {
  }

  ngOnInit() {
  }

}
