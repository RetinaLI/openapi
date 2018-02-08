import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookForwardComponent } from './look-forward.component';

describe('LookForwardComponent', () => {
  let component: LookForwardComponent;
  let fixture: ComponentFixture<LookForwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookForwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
