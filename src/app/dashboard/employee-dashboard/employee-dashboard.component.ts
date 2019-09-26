import { Component, OnInit, Input } from '@angular/core';
import { Employee, Task } from 'src/app/models';
import { TaskService } from 'src/app/services';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  tasks: Task[];
  noteDescription: String;
  @Input() currentUser: Employee;
  theId = 'Random';

  constructor(
    private readonly taskService: TaskService,
  ) { }
  ngOnInit() {
    this.getTasks();
  }

  onSubmit(id:String) {
    console.log('Inside onSubmit()');
    console.log(id);
    console.log(this.noteDescription);
  }

  getTasks(){
    this.taskService.getEmployeeTasks(this.currentUser._id).subscribe(tasks => {
      this.tasks = tasks;
    })
  }
}
