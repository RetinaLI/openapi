import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerSummaryComponent } from './server-summary.component';

describe('ServerSummaryComponent', () => {
  let component: ServerSummaryComponent;
  let fixture: ComponentFixture<ServerSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
