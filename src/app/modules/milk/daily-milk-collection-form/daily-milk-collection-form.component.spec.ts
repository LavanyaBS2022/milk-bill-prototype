import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyMilkCollectionFormComponent } from './daily-milk-collection-form.component';

describe('DailyMilkCollectionFormComponent', () => {
  let component: DailyMilkCollectionFormComponent;
  let fixture: ComponentFixture<DailyMilkCollectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyMilkCollectionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyMilkCollectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
