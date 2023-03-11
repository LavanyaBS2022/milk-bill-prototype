import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmersLedgerComponent } from './farmers-ledger.component';

describe('FarmersLedgerComponent', () => {
  let component: FarmersLedgerComponent;
  let fixture: ComponentFixture<FarmersLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmersLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmersLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
