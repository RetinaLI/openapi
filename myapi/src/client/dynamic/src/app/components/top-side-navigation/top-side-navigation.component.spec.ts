import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSideNavigationComponent } from './top-side-navigation.component';

describe('TopSideNavigationComponent', () => {
  let component: TopSideNavigationComponent;
  let fixture: ComponentFixture<TopSideNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSideNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
