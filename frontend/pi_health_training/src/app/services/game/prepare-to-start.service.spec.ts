import { TestBed } from '@angular/core/testing';

import { PrepareToStartService } from './prepare-to-start.service';

describe('PrepareToStartService', () => {
  let service: PrepareToStartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrepareToStartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
