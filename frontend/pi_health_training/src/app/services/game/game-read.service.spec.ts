import { TestBed } from '@angular/core/testing';

import { GameReadService } from './game-read.service';

describe('GameReadService', () => {
  let service: GameReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
