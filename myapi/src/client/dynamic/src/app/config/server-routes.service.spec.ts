import { TestBed, inject } from '@angular/core/testing';

import { ServerRoutesService } from './server-routes.service';

describe('ServerRoutesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerRoutesService]
    });
  });

  it('should be created', inject([ServerRoutesService], (service: ServerRoutesService) => {
    expect(service).toBeTruthy();
  }));
});
