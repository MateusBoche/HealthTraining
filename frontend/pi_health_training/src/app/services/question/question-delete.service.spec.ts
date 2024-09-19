import { TestBed } from '@angular/core/testing';

import { QuestionDeleteService } from './question-delete.service';

describe('QuestionDeleteService', () => {
  let service: QuestionDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
