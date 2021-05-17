import { TestBed } from '@angular/core/testing';

import { NgTypedDateService } from './ng-typed-date.service';

describe('NgTypedDateService', () => {
  let service: NgTypedDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgTypedDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
