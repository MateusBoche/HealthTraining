import { TestBed } from '@angular/core/testing';

import { QuestionCreateService } from './question-create.service';

describe('QuestionCreateService', () => {
  let service: QuestionCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
