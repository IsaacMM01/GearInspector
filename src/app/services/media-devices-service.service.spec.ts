import { TestBed } from '@angular/core/testing';

import { MediaDevicesService } from './media-devices.service';

describe('MediaDevicesServiceService', () => {
  let service: MediaDevicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaDevicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
