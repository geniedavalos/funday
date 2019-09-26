import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { Employee } from '../models';
import { tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly base = '/auth';

  constructor(private readonly http: HttpClient) {}

  newCompanyRegister(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.base}/register`, company).pipe(tap(res => {
      localStorage.setItem('access_token', res['data']['token'])
    }));
  }
  joinCompanyRegister(companyID: string, employee: Employee): Observable<Company> {
    return this.http.post<Company>(`${this.base}/register/${companyID}`, employee).pipe(tap(res => {
      localStorage.setItem('access_token', res['data']['token']);
    }));
  }
  login(login : Object) {
    return this.http.post(`${this.base}/login`, login).pipe(tap(res => {
      try {
        localStorage.setItem('access_token', res['data']['token']);
      } catch (err) {
        console.log('Login failed!');
      }
    }));
  }
  logout() {
    localStorage.removeItem('access_token');
  }
  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (err) {
      return null;
    }
  }
}
