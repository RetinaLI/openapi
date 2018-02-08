import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDataTableComponent } from './chart-data-table.component';

describe('ChartDataTableComponent', () => {
  let component: ChartDataTableComponent;
  let fixture: ComponentFixture<ChartDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
