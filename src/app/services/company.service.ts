import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { Employee, Project } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly base = '/api/companies';

  constructor(private readonly http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.base);
  }

  getCompany(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.base}/${id}`);
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.base}/${company._id}`, company);
  }

  createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.base, company);
  }

  destroyCompany(id: string): Observable<Company> {
    return this.http.delete<Company>(`${this.base}/${id}`);
  }
  addEmployee(company: Company, employee: Employee): Observable<Company> {
    return this.http.put<Company>(`${this.base}/${company._id}/addEmployee`, employee);
  }
  addProject(company: Company, project: Project): Observable<Company> {
    return this.http.put<Company>(`${this.base}/${company._id}/addProject`, project);
  }
  addDepartment(company: Company, department: string): Observable<Company> {
    return this.http.put<Company>(`${this.base}/${company._id}/addDepartment`, {department});
  }
  removeProject(company: Company, projectID: string): Observable<Company> {
    return this.http.put<Company>(`${this.base}/${company._id}/removeProject`, {projectID});
  }
}
