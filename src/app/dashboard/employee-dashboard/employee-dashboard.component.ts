import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Employee, Company, Task, Project} from 'src/app/models';
import {TaskService, ProjectService, EmployeeService, CompanyService} from 'src/app/services';
import {Observable} from "rxjs";
import { Note } from 'src/app/models/note';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit, OnChanges {
  noteDescription: string;
  tasks: Task[];
  newNote: Note;
  teamMembers: any[] = [];
  @Input() currentUser: Employee;
  @Input() currentCompany: Company;
  private id: any;

  constructor(
    private readonly authService: AuthService,
    private readonly companyService: CompanyService,
    private readonly projectService: ProjectService,
    private readonly router: Router,
    private readonly taskService: TaskService,
  ) { }
  ngOnInit() {
    this.newNote = new Note();
  }
  ngOnChanges(changes): void {
    if (changes.currentUser.currentValue) {
      this.id = this.currentUser['_id'];
      console.log("id = ", this.id)
      this.getTeamMembers();
      console.log("logging currentUser", this.currentUser)
      this.getTasks(this.id)
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

  getTeamMembers(){
    const seenIDs = {};
    for(const project of this.currentUser.assignedProjects){
      for(const member of project['teamMembers']){
        if(!seenIDs[member['_id']]){
          this.teamMembers.push(member);
          seenIDs[member['_id']] = 1;
        }
      }
    }
  }
  logoutButton() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigateByUrl('/home');
    } else {
      this.authService.logout(token).subscribe(result => {
        console.log('logoutButton result:', result);
        this.router.navigateByUrl('/home');
      });
    }
  }
}
