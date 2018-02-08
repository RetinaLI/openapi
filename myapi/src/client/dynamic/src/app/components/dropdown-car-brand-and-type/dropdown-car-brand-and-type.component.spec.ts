import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownCarBrandAndTypeComponent } from './dropdown-car-brand-and-type.component';

describe('DropdownCarBrandAndTypeComponent', () => {
  let component: DropdownCarBrandAndTypeComponent;
  let fixture: ComponentFixture<DropdownCarBrandAndTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownCarBrandAndTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownCarBrandAndTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
