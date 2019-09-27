import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDashboardComponent } from './owner-dashboard.component';

describe('OwnerDashboardComponent', () => {
  let component: OwnerDashboardComponent;
  let fixture: ComponentFixture<OwnerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
