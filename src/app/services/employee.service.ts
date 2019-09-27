import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly base = '/api/employees';

  constructor(private readonly http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.base);
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.base}/${id}`);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.base}/${employee._id}`, employee);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    console.log("In employee service", employee);
    return this.http.post<Employee>(this.base, employee);
  }

  destroyEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(`${this.base}/${id}`);
  }

  login(employee: { email: string; password: string }): Observable<Employee> {
    return this.http.post<Employee>(`${this.base}/login`, employee);
  }

  addTask(employeeID: string, taskID: string): Observable<any> {
    return this.http.put<any>(`${this.base}/${employeeID}/addTask`,{taskID});
  }

  addProject(employeeID: string, projectID: string): Observable<any> {
    console.log("Inside employee service addProject")
    console.log("employee ID:",employeeID);
    console.log("projectID: ", projectID)
    return this.http.put<any>(`${this.base}/${employeeID}/addProject`, {projectID});
  }

  addManagedProject(employeeID: string, projectID: string): Observable<any> {
    console.log("Inside employee service addManagedProject")
    console.log("employee ID:",employeeID);
    console.log("projectID: ", projectID)
    return this.http.put<any>(`${this.base}/${employeeID}/addManagedProject`, {projectID});
  }

  

}
