import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/models';
import { TaskService } from 'src/app/services';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  constructor(
    private readonly taskService: TaskService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.getTasks();
  }
  getTasks() {
    this.taskService.getTasks().subscribe(result => {
      console.log(result);
      this.tasks = result;
    });
  }
}
