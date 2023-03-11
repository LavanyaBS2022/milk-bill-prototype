import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcKendraComponent } from './bmc-kendra.component';

describe('BmcKendraComponent', () => {
  let component: BmcKendraComponent;
  let fixture: ComponentFixture<BmcKendraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmcKendraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmcKendraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
