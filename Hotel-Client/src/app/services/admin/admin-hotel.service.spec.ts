import { TestBed } from '@angular/core/testing';

import { AdminHotelService } from './admin-hotel.service';

describe('AdminHotelService', () => {
  let service: AdminHotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
