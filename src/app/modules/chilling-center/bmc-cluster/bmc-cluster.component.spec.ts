import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcClusterComponent } from './bmc-cluster.component';

describe('BmcClusterComponent', () => {
  let component: BmcClusterComponent;
  let fixture: ComponentFixture<BmcClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmcClusterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmcClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
