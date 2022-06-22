import { TestBed } from '@angular/core/testing';

import { ManageFlightService } from './manage-flight.service';

describe('ManageFlightService', () => {
  let service: ManageFlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageFlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
