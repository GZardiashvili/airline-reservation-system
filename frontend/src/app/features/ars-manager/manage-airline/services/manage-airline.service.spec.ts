import { TestBed } from '@angular/core/testing';

import { ManageAirlineService } from './manage-airline.service';

describe('ManageAirlineService', () => {
  let service: ManageAirlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageAirlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
