import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkCollectionComponent } from './milk-collection.component';

describe('MilkCollectionComponent', () => {
  let component: MilkCollectionComponent;
  let fixture: ComponentFixture<MilkCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilkCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
