import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartMapChinaComponent } from './echart-map-china.component';

describe('EchartMapChinaComponent', () => {
  let component: EchartMapChinaComponent;
  let fixture: ComponentFixture<EchartMapChinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartMapChinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartMapChinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
