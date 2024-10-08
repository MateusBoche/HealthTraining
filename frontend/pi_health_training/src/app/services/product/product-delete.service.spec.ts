import { TestBed } from '@angular/core/testing';

import { ProductDeleteService } from './product-delete.service';

describe('ProductDeleteService', () => {
  let service: ProductDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
