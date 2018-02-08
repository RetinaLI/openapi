import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOrderListComponent } from './profile-order-list.component';

describe('ProfileOrderListComponent', () => {
  let component: ProfileOrderListComponent;
  let fixture: ComponentFixture<ProfileOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
