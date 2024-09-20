import { TestBed } from '@angular/core/testing';

import { GameDeleteService } from './game-delete.service';

describe('GameDeleteService', () => {
  let service: GameDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
