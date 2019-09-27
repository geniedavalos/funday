import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Task } from 'src/app/models';
import { TaskService } from 'src/app/services';
import {NoteService} from "../../services/note.service";
import {AuthService} from "../../services/auth.service";
import {Note} from "../../models/note";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  private userId : string;
  private taskId: string;
  private task: Task;
  updateProgress: string;
  percentage: string;
  newNote: any;
  constructor(
    private readonly authService : AuthService,
    private readonly taskService: TaskService,
    private readonly route: ActivatedRoute,
    private readonly noteService: NoteService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.newNote = new Note()
    this.updateProgress = '50';
    this.percentage = this.updateProgress + '%';
    this.route.params.subscribe((params: Params) => {
      console.log(params['taskID'])
      this.taskId = params['taskID'];
      this.getThisTask();
    });
    this.userId = this.authService.getDecodedAccessToken().eid
    console.log("user id = ",this.userId)
  }
  getThisTask() {
    console.log("task id = ",this.taskId)
    this.taskService.getTask(this.taskId).subscribe(result => {
      console.log(result);
      this.task = result;
    });
  }

  onAddNote() {
    console.log('Inside onAddNote()');
  }

  onProgressUpdate() {
    console.log('Inside onProgressUpdate()');
  }

  onAddNote() {
    this.newNote['sender']=this.userId;
    this.noteService.createNote(this.newNote).subscribe(newNode =>{
      console.log("created new node ", newNode)
      this.taskService.addNote(this.taskId, newNode).subscribe(result=>{
        console.log("add note to task ", result)
      })
    })
  }
}
