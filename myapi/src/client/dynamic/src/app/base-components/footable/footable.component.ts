import { Component, OnInit, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
// import "../../../../../assets/plugins/footable-bootstrap/css/footable.bootstrap.css";
// import "../../../../../assets/plugins/footable-bootstrap/js/footable.js";

@Component({
  selector: 'app-footable',
  templateUrl: './footable.component.html',
  styleUrls: ['./footable.component.less']
})
export class FootableComponent implements OnInit {
  @Input("load-completed")
  set _loadCompleted(_p: boolean) {
    this.loadCompleted = _p;
    if (this.loadCompleted == true) {
      this.dataBinding = false;
      this.renderFooTable();
    }
  }

  @Output() onScrollBottomed = new EventEmitter();

  loadCompleted = false;
  private $element;
  bottomed = false;
  dataBinding = false;
  scrollTrigger = "start";

  constructor(private element: ViewContainerRef) { }

  ngOnInit() {
    this.$element = $(this.element.element.nativeElement);
  }

  renderFooTable() {
    // this.$element.find("table").footable();
  }

  onWindowScroll(event) {
    let currentHeight = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight;
    currentHeight = Math.ceil(currentHeight);
    if(currentHeight >= document.documentElement.scrollHeight){
      this.bottomed = true;
      if(!this.dataBinding) {
        this.dataBinding = true;
        this.onScrollBottomed.emit();
      }
    }
  }

  scrollStart(event){
  }
  scrollEnd(event){
  }

}
