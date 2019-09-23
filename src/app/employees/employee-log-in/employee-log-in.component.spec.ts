import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLogInComponent } from './employee-log-in.component';

describe('EmployeeLogInComponent', () => {
  let component: EmployeeLogInComponent;
  let fixture: ComponentFixture<EmployeeLogInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeLogInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
