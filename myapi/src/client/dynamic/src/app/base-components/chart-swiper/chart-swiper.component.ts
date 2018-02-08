import { Component, OnInit, AfterViewInit, Input, ViewContainerRef, Output, EventEmitter } from '@angular/core';
// import * as Swiper from "../../../../../assets/plugins/swiper/js/swiper.js";

@Component({
  selector: 'app-chart-swiper',
  templateUrl: './chart-swiper.component.html',
  styleUrls: ['./chart-swiper.component.less']
})
export class ChartSwiperComponent implements OnInit, AfterViewInit {
  @Input() title: string;
  @Input() height: string;
  @Output() onSwiperChanged = new EventEmitter<number>();

  private $element: JQuery;
  private mySwiper;
  currentIndex = 0;
  validWidth = 726;
  is_big_screen = true;

  constructor(private element: ViewContainerRef) { }

  ngOnInit() {
    this.$element = $(this.element.element.nativeElement);
    this.checkWindowWidth();
  }

  ngAfterViewInit(){
    this.renderSwiper();
  }

  checkWindowWidth(){
    if(document.documentElement.offsetWidth > this.validWidth) {
      this.is_big_screen = true;
    } else {
      this.is_big_screen = false;
    }
  }

  renderSwiper(){
    if(this.is_big_screen) return;
    this.mySwiper = new Swiper(this.$element.find('.swiper-container').get(0), {
      direction: 'horizontal',
      loop: false,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
    this.mySwiper.on('slideChange', () => {
      this.currentIndex = this.mySwiper.activeIndex;
      this.onSwiperChanged.emit(this.currentIndex);
    });
  }

  jumpTo(index: number){
    this.currentIndex = index;
    if(this.mySwiper) this.mySwiper.slideTo(this.currentIndex);
    this.onSwiperChanged.emit(this.currentIndex);
  }

  onWindowResize(){
    this.checkWindowWidth();
    if(this.is_big_screen) {
      if(this.mySwiper) this.mySwiper.destroy();
      this.mySwiper = null;
    } else {
      if(this.mySwiper) {
        this.mySwiper.update();
      } else {
        this.renderSwiper();
      }
    }

  }
}
