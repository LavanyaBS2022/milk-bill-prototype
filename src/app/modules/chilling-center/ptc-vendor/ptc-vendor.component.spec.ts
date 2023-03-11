import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtcVendorComponent } from './ptc-vendor.component';

describe('PtcVendorComponent', () => {
  let component: PtcVendorComponent;
  let fixture: ComponentFixture<PtcVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtcVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtcVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
