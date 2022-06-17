import { TestBed } from '@angular/core/testing';

import { ManageTicketService } from './manage-ticket.service';

describe('ManageTicketService', () => {
  let service: ManageTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
