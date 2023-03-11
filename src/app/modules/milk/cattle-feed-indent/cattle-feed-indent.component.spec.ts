import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CattleFeedIndentComponent } from './cattle-feed-indent.component';

describe('CattleFeedIndentComponent', () => {
  let component: CattleFeedIndentComponent;
  let fixture: ComponentFixture<CattleFeedIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CattleFeedIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CattleFeedIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
