import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Task } from 'src/app/models';
import { TaskService } from 'src/app/services';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  private id: string;
  private task: Task;
  constructor(
    private readonly taskService: TaskService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.get('id');
      this.getTask(this.id);
    });
  }
  getTask(id) {
    this.taskService.getTask(id).subscribe(result => {
      console.log(result);
      this.task = result;
    });
  }
}
