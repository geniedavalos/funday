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
  updateProgress: number;
  newNote: Note;
  testTask = {'testNumber':70};
  private notes: Note[];
  constructor(
    private readonly authService : AuthService,
    private readonly taskService: TaskService,
    private readonly route: ActivatedRoute,
    private readonly noteService: NoteService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    console.log('Inside Ngoninit, testTask.testnumber =' + this.testTask.testNumber);
    this.newNote = new Note();
    this.route.params.subscribe((params: Params) => {
      console.log(params['taskID'])
      this.taskId = params['taskID'];
      this.getThisTask();
    });
    this.userId = this.authService.getDecodedAccessToken().eid
  }
  getThisTask() {
    this.taskService.getTask(this.taskId).subscribe(result => {
      this.task = result;
      this.notes = this.task['notes'];
      console.log(this.task)
      this.updateProgress = this.task.progress;
    });
  }

  onProgressUpdate() {
    console.log('Inside onProgressUpdate()');
    this.task.progress = this.updateProgress;
    this.taskService.updateTask(this.task).subscribe(result => {
      console.log(result);
    })
  }

  onAddNote() {
    console.log("****************************",this.newNote)
    this.newNote['sender']=this.userId;
    this.noteService.createNote(this.newNote).subscribe(newNote =>{
      this.taskService.addNote(this.taskId, newNote).subscribe(result=>{
        this.getThisTask()
        this.newNote= new Note();
      })
    })
  }
}
