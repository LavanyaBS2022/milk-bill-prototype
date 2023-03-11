import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtcTransactionComponent } from './ptc-transaction.component';

describe('PtcTransactionComponent', () => {
  let component: PtcTransactionComponent;
  let fixture: ComponentFixture<PtcTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtcTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtcTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
