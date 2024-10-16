import { TestBed } from '@angular/core/testing';

import { GameRankingService } from './game-ranking.service';

describe('GameRankingService', () => {
  let service: GameRankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameRankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
