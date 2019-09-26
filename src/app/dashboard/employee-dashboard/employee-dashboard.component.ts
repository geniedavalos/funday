import { Component, OnInit, Input } from '@angular/core';
<<<<<<< HEAD
import { Employee, Company } from 'src/app/models';
=======
import { Employee, Task } from 'src/app/models';
import { TaskService } from 'src/app/services';
import { ActivatedRoute, Router, Params } from '@angular/router';
>>>>>>> wade_branch

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
<<<<<<< HEAD
  noteDescription: string;
=======
  tasks: Task[];
  noteDescription: String;
>>>>>>> wade_branch
  @Input() currentUser: Employee;
  @Input() currentCompany: Company;
  theId = 'Random';

  constructor(
    private readonly taskService: TaskService,
  ) { }
  ngOnInit() {
    this.getTasks();
  }

  onSubmit(id: string) {
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
