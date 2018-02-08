import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSummaryBoardComponent } from './simple-summary-board.component';

describe('SimpleSummaryBoardComponent', () => {
  let component: SimpleSummaryBoardComponent;
  let fixture: ComponentFixture<SimpleSummaryBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleSummaryBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSummaryBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
