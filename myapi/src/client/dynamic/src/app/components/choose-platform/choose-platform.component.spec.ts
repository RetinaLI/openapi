import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePlatformComponent } from './choose-platform.component';

describe('ChoosePlatformComponent', () => {
  let component: ChoosePlatformComponent;
  let fixture: ComponentFixture<ChoosePlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosePlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
