import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Employee, Company, Task} from 'src/app/models';
import { TaskService } from 'src/app/services';
import {Observable} from "rxjs";

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  noteDescription: string;
  tasks: Task[];
  newNote: any;
  @Input() currentUser: Observable<Employee>;
  @Input() currentCompany: Observable<Company>;
  private id: any;

  constructor(
    private readonly taskService: TaskService,
  ) { }
  ngOnInit() {
  }
  ngOnChanges(changes): void {
    if ('currentUser' in changes) {
      this.currentUser = changes.currentUser.currentValue;
      this.id = this.currentUser['_id'];
      console.log("id = ", this.id)
      this.getTasks(this.id);
    }
  }

  onSubmit() {
    console.log('Inside onSubmit()');
    console.log(this.noteDescription);
  }

  getTasks(id){

    this.taskService.getEmployeeTasks(id).subscribe(tasks => {
      console.log('tasks = ', tasks)
      this.tasks = tasks;
    })
  }
}
