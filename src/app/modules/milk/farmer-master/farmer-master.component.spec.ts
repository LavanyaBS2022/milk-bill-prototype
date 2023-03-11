import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerMasterComponent } from './farmer-master.component';

describe('FarmerMasterComponent', () => {
  let component: FarmerMasterComponent;
  let fixture: ComponentFixture<FarmerMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
