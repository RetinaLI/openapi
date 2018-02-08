import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSwiperComponent } from './chart-swiper.component';

describe('ChartSwiperComponent', () => {
  let component: ChartSwiperComponent;
  let fixture: ComponentFixture<ChartSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
