import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLimitExceededComponent } from './user-limit-exceeded.component';

describe('UserLimitExceededComponent', () => {
  let component: UserLimitExceededComponent;
  let fixture: ComponentFixture<UserLimitExceededComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLimitExceededComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLimitExceededComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
