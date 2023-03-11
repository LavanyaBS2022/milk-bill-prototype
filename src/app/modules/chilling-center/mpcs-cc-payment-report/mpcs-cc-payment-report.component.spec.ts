import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpcsCcPaymentReportComponent } from './mpcs-cc-payment-report.component';

describe('MpcsCcPaymentReportComponent', () => {
  let component: MpcsCcPaymentReportComponent;
  let fixture: ComponentFixture<MpcsCcPaymentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpcsCcPaymentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcsCcPaymentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
