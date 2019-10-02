import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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
  task: Task;
  updateProgress: number;
  newNote: Note;
  notes: Note[];
  finishedLoading: boolean;
  constructor(
    private readonly authService : AuthService,
    private readonly taskService: TaskService,
    private readonly route: ActivatedRoute,
    private readonly noteService: NoteService,
    private readonly router: Router,
    private _location: Location
  ) { }

  ngOnInit() {
    this.finishedLoading = false;
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
}
