import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpcsListComponent } from './mpcs-list.component';

describe('MpcsListComponent', () => {
  let component: MpcsListComponent;
  let fixture: ComponentFixture<MpcsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpcsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
