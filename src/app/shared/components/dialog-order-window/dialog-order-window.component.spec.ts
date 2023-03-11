import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrderWindowComponent } from './dialog-order-window.component';

describe('DialogOrderWindowComponent', () => {
  let component: DialogOrderWindowComponent;
  let fixture: ComponentFixture<DialogOrderWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOrderWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOrderWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
