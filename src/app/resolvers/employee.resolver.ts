import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeResolver implements Resolve<Employee[]> {
  constructor(private readonly employeeService: EmployeeService) {}

  resolve(): Observable<Employee[]> {
    return this.employeeService.getEmployees();
  }
}
