import { TestBed } from '@angular/core/testing';

import { DutyService } from './duty.service';

describe('DutyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DutyService = TestBed.get(DutyService);
    expect(service).toBeTruthy();
  });
});
