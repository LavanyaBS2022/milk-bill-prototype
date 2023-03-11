import { TestBed } from '@angular/core/testing';

import { RbacModulesService } from './rbac-modules.service';

describe('RbacModulesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RbacModulesService = TestBed.get(RbacModulesService);
    expect(service).toBeTruthy();
  });
});
