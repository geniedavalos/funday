import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { TaskService } from '../services';
import { Task } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class TaskResolver implements Resolve<Task[]> {
  constructor(private readonly taskService: TaskService) {}

  resolve(): Observable<Task[]> {
    return this.taskService.getTasks();
  }
}