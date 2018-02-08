import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNoAccessComponent } from './page-no-access.component';

describe('PageNoAccessComponent', () => {
  let component: PageNoAccessComponent;
  let fixture: ComponentFixture<PageNoAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNoAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNoAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
