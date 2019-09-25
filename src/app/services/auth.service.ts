import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { Employee } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly base = '/auth';

  constructor(private readonly http: HttpClient) {}

  newCompanyRegister(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.base}/register`, company);
  }
  joinCompanyRegister(companyID: string, employee: Employee): Observable<Company> {
    return this.http.post<Company>(`${this.base}/register/${companyID}`, employee);
  }
  login(login : Object) {
    return this.http.post(`${this.base}/login`, login);
  }
}
