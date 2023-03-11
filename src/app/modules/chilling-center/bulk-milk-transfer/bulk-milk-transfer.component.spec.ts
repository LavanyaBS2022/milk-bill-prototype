import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkMilkTransferComponent } from './bulk-milk-transfer.component';

describe('BulkMilkTransferComponent', () => {
  let component: BulkMilkTransferComponent;
  let fixture: ComponentFixture<BulkMilkTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkMilkTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkMilkTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
