import { TestBed } from '@angular/core/testing';

import { StockmanagementService } from './stockmanagement-service';

describe('StockmanagementService', () => {
  let service: StockmanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockmanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
