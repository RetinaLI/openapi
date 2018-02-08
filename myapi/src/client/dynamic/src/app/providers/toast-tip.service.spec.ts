import { TestBed, inject } from '@angular/core/testing';

import { ToastTipService } from './toast-tip.service';

describe('ToastTipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastTipService]
    });
  });

  it('should be created', inject([ToastTipService], (service: ToastTipService) => {
    expect(service).toBeTruthy();
  }));
});
