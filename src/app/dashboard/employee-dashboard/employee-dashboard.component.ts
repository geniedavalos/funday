import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Employee, Company, Task, Project} from 'src/app/models';
import {TaskService, ProjectService, EmployeeService, CompanyService} from 'src/app/services';
import {Observable} from "rxjs";
import { Note } from 'src/app/models/note';
import {AuthService} from "../../services/auth.service";
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit, OnChanges {
  noteDescription: string;
  tasks: Task[];
  newNote: Note;
  teamMembers: Employee[] = [];
  @Input() currentUser: Employee;
  @Input() currentCompany: Company;
  private id: string;
  newNoteTaskId: string;

  constructor(
    private readonly authService: AuthService,
    private readonly companyService: CompanyService,
    private readonly projectService: ProjectService,
    private readonly router: Router,
    private readonly taskService: TaskService,
    private readonly noteService: NoteService,
  ) { }
  ngOnInit() {
    this.newNote = new Note();
  }
  ngOnChanges(changes): void {
    if (changes.currentUser && changes.currentUser.currentValue) {
      this.id = this.currentUser['_id'];
      this.getTeamMembers();
      this.getTasks(this.id);
    }
  }
  // TODO: Complete note submission from employee dashboard.
  onSubmit() {
  }

  getTasks(id){
    this.taskService.getEmployeeTasks(id).subscribe(tasks => {
      this.tasks = tasks;
    });

  }

  getTeamMembers(){
    console.log(this.currentUser);
    console.log("GETTING TEAM MEMBERS");
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
  setTaskIdForNewNote(id: string){
    this.newNoteTaskId = id;
  }

  onAddNote(){
    this.newNote['sender']=this.currentUser._id;
    console.log(this.newNote)
    this.noteService.createNote(this.newNote).subscribe(note => {
      console.log(note)
      this.taskService.addNote(this.newNoteTaskId, note).subscribe(result => {
        console.log(result);
      })
    })
  }
}
