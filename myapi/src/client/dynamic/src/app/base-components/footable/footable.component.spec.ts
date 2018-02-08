import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootableComponent } from './footable.component';

describe('FootableComponent', () => {
  let component: FootableComponent;
  let fixture: ComponentFixture<FootableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
