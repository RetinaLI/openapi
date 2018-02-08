import { Component, OnInit, Input, ViewContainerRef, AfterViewInit } from '@angular/core';
// import "../../../../../assets/themes/ample-admin/plugins/bower_components/jquery.easy-pie-chart/jquery.easypiechart.js";

@Component({
  selector: 'app-simple-summary-board',
  templateUrl: './simple-summary-board.component.html',
  styleUrls: ['./simple-summary-board.component.less']
})
export class SimpleSummaryBoardComponent implements OnInit {
  @Input() label: string;
  @Input("sub-label") subLabel: string = "";
  @Input("value") set _value(_value){
    this.value = _value;
    this.renderCircle();
  }
  @Input() unit: string = "";
  @Input() enablePercentEffect = false;

  private $element: JQuery;
  value: number = 0;

  constructor(private element: ViewContainerRef) { }

  ngOnInit() {
    this.$element = $(this.element.element.nativeElement);
  }

  renderCircle(){
    if(this.enablePercentEffect) {
      this.$element.attr("data-percent", this.value);
      this.$element.easyPieChart({
        easing: 'easeOutBounce',
        barColor : '#22a1fa',
        trackColor: "#eee",
        size: 90,
        lineWidth: 4,
        scaleColor: false,
        onStep: function(from, to, percent) {
          $(this.el).find('.percent').text(Math.round(percent));
        }
      });
    }
  }

}
