import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authenticatorGuard } from './authenticator.guard';

describe('authenticatorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authenticatorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
