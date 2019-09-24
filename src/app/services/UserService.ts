import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';

import { User } from '../models/UserModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly base = '/employees';

  constructor(private readonly http: HttpClient) {}

  getEmployees(): Observable<User[]> {
    return this.http.get<User[]>(this.base);
  }

  getEmployee(id: string): Observable<User> {
    return this.http.get<User>(`${this.base}/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.base}/${user._id}`, user);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.base, User);
  }

  removeUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.base}/${id}`);
  }
}
