import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Project, Task } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly base = '/api/projects';

  constructor(private readonly http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.base);
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.base}/${id}`);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.base}/${project._id}`, project);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.base, project);
  }

  destroyProject(id: string): Observable<Project> {
    return this.http.delete<Project>(`${this.base}/${id}`);
  }

  addTask(project: Project, taskID: string): Observable<Project> {
    return this.http.put<Project>(`${this.base}/${project._id}/addTask`, {taskID})
  }
  removeTask(project: Project, taskID: string): Observable<Project> {
    return this.http.put<Project>(`${this.base}/${project._id}/removeTask`, {taskID})
  }

  addTeamMember(project: Project, employeeID: string): Observable<Project> {
    return this.http.put<Project>(`${this.base}/${project._id}/addTeamMember`, {employeeID})
  }

  removeTeamMember(project: Project, employeeID: string): Observable<Project> {
    return this.http.put<Project>(`${this.base}/${project._id}/removeTeamMember`, {employeeID})
  }
  getManagedProjects(id: string): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.base}/getManagedProjects/${id}`);
  }
}
