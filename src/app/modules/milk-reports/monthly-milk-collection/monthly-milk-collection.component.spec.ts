import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyMilkCollectionComponent } from './monthly-milk-collection.component';

describe('MonthlyMilkCollectionComponent', () => {
  let component: MonthlyMilkCollectionComponent;
  let fixture: ComponentFixture<MonthlyMilkCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyMilkCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyMilkCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
