import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrderHistoryComponent } from './dialog-order-history.component';

describe('DialogOrderHistoryComponent', () => {
  let component: DialogOrderHistoryComponent;
  let fixture: ComponentFixture<DialogOrderHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOrderHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
