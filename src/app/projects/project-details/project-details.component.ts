import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Project, Task } from 'src/app/models';
import { ProjectService, TaskService, EmployeeService } from 'src/app/services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  tasks: Task[];
  id: string;
  project: Project;
  newTask = new Task();
  editTask: Task;
  populateEditId: string;
  deleteTaskId: string;
  newMembers: any;
  editProject = new Project();
  taskProgressArray: number[] = [];

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getProject(this.id);
    });
  }
  getProject(id) {
    this.projectService.getProject(id).subscribe(result => {
      this.project = result;
      console.log("Logging this.project",this.project);
      this.tasks = this.project.tasks;
      console.log("Logging this.tasks",this.tasks);
      for(const task of this.tasks){
        this.taskProgressArray.push(task.progress);
      }
      this.project.progress = Number.parseFloat(this.getAvg(this.taskProgressArray).toFixed(1));
      console.log("logging this.project.progress",this.project.progress)
    });
  }

  getAvg(arr: number[]){
    let sum = 0;
    for(let num of arr){
      sum+=num;
    }
    const avg = sum/arr.length;
    return avg
  }

  onTaskCreate(form: NgForm) {
    console.log('Inside onTaskCreate()');
    this.taskService.createTask(this.newTask).subscribe(task => {
      this.projectService.addTask(this.project, task._id).subscribe(result => {
        console.log(result);
      });
      for(let teamMember of task.teamMembers){
        console.log("task._id = ", task._id)
        console.log("teamMember = ", teamMember)
        this.employeeService.addTask(teamMember, task._id).subscribe(data => {
          console.log(data);
        })
      }
    })
  }


  //called inside the addTeam modal, should add the selected employee ids to the project teammates list
  onAddTeam() {
    console.log('Inside onAddTeam()');
  }


  //this is called byt the editprojectbutton inside the modal which should edit the project with the given information
  onProjectEdit() {
    console.log('Inside onProjectEdit()');
  }

  //this is called by the first delete button to set the deleteTask id of the task to be deleted
  onDeleteTaskId(id: string) {
    console.log('Inside onDeleteTaskId');
    this.deleteTaskId = id;
  }

  //this is called by the delete button in the modal, and should go ahead with the task delete by this.deleteTaskId
  onDelete() {
    console.log('Inside onDelete()');
    console.log('Task to be deleted: ' + this.deleteTaskId);
  }


  //this is called by the edit task button, which should set the populateEditId with the id of the task to edit
  populateEdit(task: Task) {
    this.editTask = task;
  }
    
}
