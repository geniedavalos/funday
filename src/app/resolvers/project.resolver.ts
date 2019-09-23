import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ProjectService } from '../services';
import { Project } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectResolver implements Resolve<Project[]> {
  constructor(private readonly projectService: ProjectService) {}

  resolve(): Observable<Project[]> {
    return this.projectService.getProjects();
  }
}