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
  newMembers: any;
  editProject = new Project();
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
      console.log(this.project);
      this.tasks = this.project.tasks;
      console.log(this.tasks);
    });
  }

  onTaskCreate(form: NgForm) {
    console.log('Inside onTaskCreate()');
    this.taskService.createTask(this.newTask).subscribe(task => {
      this.projectService.addTask(this.project, task).subscribe(result => {
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

  onAddTeam() {
    console.log('Inside onAddTeam()');
  }

  onProjectEdit() {
    console.log('Inside onProjectEdit()');
  }
}
