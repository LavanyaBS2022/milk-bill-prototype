import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CattleFeedPlantIndentComponent } from './cattle-feed-plant-indent.component';

describe('CattleFeedPlantIndentComponent', () => {
  let component: CattleFeedPlantIndentComponent;
  let fixture: ComponentFixture<CattleFeedPlantIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CattleFeedPlantIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CattleFeedPlantIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
