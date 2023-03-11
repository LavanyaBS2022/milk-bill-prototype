import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyCollectionComponent } from './monthly-collection.component';

describe('MonthlyCollectionComponent', () => {
  let component: MonthlyCollectionComponent;
  let fixture: ComponentFixture<MonthlyCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
