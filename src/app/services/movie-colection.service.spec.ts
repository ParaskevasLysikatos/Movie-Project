import { TestBed } from '@angular/core/testing';

import { MovieColectionService } from './movie-colection.service';

describe('MovieColectionService', () => {
  let service: MovieColectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieColectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
