import { TestBed } from '@angular/core/testing';

import { QuestionReadService } from './question-read.service';

describe('QuestionReadService', () => {
  let service: QuestionReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
