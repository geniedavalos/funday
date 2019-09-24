import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Project } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly base = '/projects';

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
}