import { TestBed } from '@angular/core/testing';

import { GameCreateService } from './game-create.service';

describe('GameCreateService', () => {
  let service: GameCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
