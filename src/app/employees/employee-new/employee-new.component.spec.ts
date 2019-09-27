import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeNewComponent } from './employee-new.component';

describe('EmployeeNewComponent', () => {
  let component: EmployeeNewComponent;
  let fixture: ComponentFixture<EmployeeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
