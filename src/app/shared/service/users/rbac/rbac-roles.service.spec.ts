import { TestBed } from '@angular/core/testing';

import { RbacRolesService } from './rbac-roles.service';

describe('RbacRolesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RbacRolesService = TestBed.get(RbacRolesService);
    expect(service).toBeTruthy();
  });
});
