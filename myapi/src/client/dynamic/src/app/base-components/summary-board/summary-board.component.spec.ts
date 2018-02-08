import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryBoardComponent } from './summary-board.component';

describe('SummaryBoardComponent', () => {
  let component: SummaryBoardComponent;
  let fixture: ComponentFixture<SummaryBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
