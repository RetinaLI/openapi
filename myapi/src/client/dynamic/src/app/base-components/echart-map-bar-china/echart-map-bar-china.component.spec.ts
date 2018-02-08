import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartMapBarChinaComponent } from './echart-map-bar-china.component';

describe('EchartMapBarChinaComponent', () => {
  let component: EchartMapBarChinaComponent;
  let fixture: ComponentFixture<EchartMapBarChinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartMapBarChinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartMapBarChinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
