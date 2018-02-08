import { Component, OnInit, Input, Output, AfterContentInit, ViewContainerRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less']
})
export class DialogComponent implements OnInit, AfterContentInit {
  @Input() enableHeader = true;
  @Input() enableFooterButton = false;
  @Input() title = "";
  @Input() set showDialog(_is_show){
    if(!this.$element || this.isShowModal == _is_show) return;
    this.isShowModal = _is_show;
    if(_is_show) {
      this.$element.modal('show');
    } else {
      this.$element.modal('hide');
    }
  }

  @Output() onHide = new EventEmitter();

  private $element: JQuery;
  private isShowModal = false;

  constructor(private element: ViewContainerRef) {
  }

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.$element = $(this.element.element.nativeElement).find(".modal");
    this.$element.on('hide.bs.modal',  (e) => {
      this.isShowModal = false;
      this.onHide.emit();
    });
  }
}
