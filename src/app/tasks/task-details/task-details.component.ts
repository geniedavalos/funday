import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Task, Employee, Company } from 'src/app/models';
import { TaskService, CompanyService, EmployeeService } from 'src/app/services';
import {NoteService} from "../../services/note.service";
import {AuthService} from "../../services/auth.service";
import {Note} from "../../models/note";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  userId : string;
  taskId: string;
  task: Task;
  updateProgress: number;
  newNote: Note;
  notes: Note[];
  finishedLoading: boolean;
  isManager: boolean = false;
  employeesExpanded: boolean = false;
  currentUser: Employee;
  loadedUser: boolean = false;
  currentCompany: Company;
  isOwner: boolean = false;

  constructor(
    private readonly companyService: CompanyService,
    private readonly employeeService: EmployeeService,
    private readonly authService : AuthService,
    private readonly taskService: TaskService,
    private readonly route: ActivatedRoute,
    private readonly noteService: NoteService,
    private readonly router: Router,
    private _location: Location
  ) { }

  ngOnInit() {
    this.finishedLoading = false;
    this.getCurrentUser();
    this.newNote = new Note();
    this.updateProgress = 55;
    this.route.params.subscribe((params: Params) => {
      this.taskId = params['taskID'];
      this.getThisTask();
    });
    this.userId = this.authService.getDecodedAccessToken().eid;
  }
  getThisTask() {
    this.taskService.getTask(this.taskId).subscribe(result => {
      this.task = result;
      this.notes = this.task['notes'];
      this.updateProgress = this.task.progress;
      this.finishedLoading = true;
    });
  }

  onProgressUpdate() {
    this.task.progress = this.updateProgress;
    this.taskService.updateTask(this.task).subscribe(result => {
    });
  }

  onAddNote() {
    this.newNote['sender']=this.userId;
    this.noteService.createNote(this.newNote).subscribe(newNote =>{
      this.taskService.addNote(this.taskId, newNote).subscribe(result=>{
        this.getThisTask();
        this.newNote = new Note();
      });
    });
  }
  backClicked() {
    this._location.back();
  }

  getCurrentUser() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigateByUrl('/home');
    } else {
      const decoded = this.authService.getDecodedAccessToken(token);
      this.employeeService.getEmployee(decoded['eid']).subscribe(result => {
        if (!result) {
          this.router.navigateByUrl('/home');
        }
        this.currentUser = result;
        this.isManager = decoded.isManager;
        this.isOwner = decoded.isOwner;
      });
      this.companyService.getCompany(decoded['cid']).subscribe(result => {
        if (result) {
          this.currentCompany = result;
          this.loadedUser = true;
        }
      });
    }
  }

  toggleEmployees() {
    this.employeesExpanded = (!this.employeesExpanded);
  }

  onRemoveFromTeam(id: string){
    this.taskService.removeTeamMember(this.task, id).subscribe(result => {
      console.log(result);
      this.getThisTask()
    })
  }
}
