import { TestBed } from '@angular/core/testing';

import { ManagePlaneService } from './manage-plane.service';

describe('ManagePlaeService', () => {
  let service: ManagePlaneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagePlaneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
