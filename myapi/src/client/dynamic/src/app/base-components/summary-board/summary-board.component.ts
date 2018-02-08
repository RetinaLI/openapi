import { Component, OnInit, Input, ViewContainerRef, AfterViewInit } from '@angular/core';
// import "../../../../../assets/themes/ample-admin/plugins/bower_components/waypoints/lib/jquery.waypoints.js";
// import "../../../../../assets/themes/ample-admin/plugins/bower_components/counterup/jquery.counterup.min.js";

@Component({
  selector: 'app-summary-board',
  templateUrl: './summary-board.component.html',
  styleUrls: ['./summary-board.component.less']
})
export class SummaryBoardComponent implements OnInit, AfterViewInit {
  @Input("label-color") label_color: string;
  @Input() label: string;
  @Input() value = 0;
  @Input() enableEffect = false;
  @Input() unit: string;
  @Input("background-color") bgColor: string = "#fff";
  @Input("icon") icon:string;

  constructor(private $element: ViewContainerRef) { }

  ngOnInit() {

  }

  ngAfterViewInit(){
    // alert($(this.$element.element.nativeElement).find("p:last-child").text());
    // $(this.$element.element.nativeElement).find("p:last-child").counterUp({
    //     delay: 500,
    //     time: 1200
    // });
  }
}
