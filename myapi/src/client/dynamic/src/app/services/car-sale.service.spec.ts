import { TestBed, inject } from '@angular/core/testing';

import { CarSaleService } from './car-sale.service';

describe('CarSaleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarSaleService]
    });
  });

  it('should be created', inject([CarSaleService], (service: CarSaleService) => {
    expect(service).toBeTruthy();
  }));
});
