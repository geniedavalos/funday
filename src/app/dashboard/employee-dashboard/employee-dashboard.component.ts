import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Employee, Company, Task} from 'src/app/models';
import { TaskService } from 'src/app/services';
import {Observable} from "rxjs";
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit, OnChanges {
  noteDescription: string;
  tasks: Task[];
  newNote: Note;
  @Input() currentUser: Observable<Employee>;
  @Input() currentCompany: Observable<Company>;
  private id: any;

  constructor(
    private readonly taskService: TaskService,
  ) { }
  ngOnInit() {
    this.newNote = new Note();
  }
  ngOnChanges(changes): void {
    if (changes.currentUser.currentValue) {
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
  onAddNote() {
    console.log('Inside onProgressUpdate()');

  }
}
