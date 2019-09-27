import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Task } from '../models/task';
import {Note} from "../models/note";

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly base = '/api/tasks';

  constructor(private readonly http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.base);
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.base}/${id}`);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.base}/${task._id}`, task);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.base, task);
  }

  destroyTask(id: string): Observable<Task> {
    return this.http.delete<Task>(`${this.base}/${id}`);
  }

  addTeamMember(task: Task, employeeID: string): Observable<Task> {
    return this.http.put<Task>(`${this.base}/${task._id}/addTeamMember`, employeeID)
  }

  removeTeamMember(task: Task, employeeID: string): Observable<Task> {
    return this.http.put<Task>(`${this.base}/${task._id}/removeTeamMember`, employeeID)
  }
  getEmployeeTasks(id: String): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.base}/getEmployeeTasks/${id}`)
  }

  addNote(id: string, newNode: Note) : Observable<any> {
    return this.http.put(`${this.base}/addNote/${id}`, newNode)
  }
}
