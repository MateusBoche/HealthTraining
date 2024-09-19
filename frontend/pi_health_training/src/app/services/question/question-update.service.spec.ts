import { TestBed } from '@angular/core/testing';

import { QuestionUpdateService } from './question-update.service';

describe('QuestionUpdateService', () => {
  let service: QuestionUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
