import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { EmployeeService } from '../services';
import { Employee } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeResolver implements Resolve<Employee[]> {
  constructor(private readonly employeeService: EmployeeService) {}

  resolve(): Observable<Employee[]> {
    return this.employeeService.getEmployees();
  }
}
