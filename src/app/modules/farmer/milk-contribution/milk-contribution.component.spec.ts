import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkContributionComponent } from './milk-contribution.component';

describe('MilkContributionComponent', () => {
  let component: MilkContributionComponent;
  let fixture: ComponentFixture<MilkContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilkContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
