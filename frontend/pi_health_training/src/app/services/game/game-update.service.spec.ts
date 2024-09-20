import { TestBed } from '@angular/core/testing';

import { GameUpdateService } from './game-update.service';

describe('GameUpdateService', () => {
  let service: GameUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
