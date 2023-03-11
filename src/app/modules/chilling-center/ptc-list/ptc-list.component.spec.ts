import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtcListComponent } from './ptc-list.component';

describe('PtcListComponent', () => {
  let component: PtcListComponent;
  let fixture: ComponentFixture<PtcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtcListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
