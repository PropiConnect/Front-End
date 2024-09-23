import { TestBed } from '@angular/core/testing';

import { BaseServiceService} from './base.service.service';

describe('BaseServiceService', () => {

  // @ts-ignore
  let service: BaseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
