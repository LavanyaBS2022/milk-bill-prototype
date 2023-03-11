import { TestBed } from '@angular/core/testing';

import { AccessMappingService } from './access-mapping.service';

describe('AccessMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessMappingService = TestBed.get(AccessMappingService);
    expect(service).toBeTruthy();
  });
});
