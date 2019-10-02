import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Project, Task, Employee, Company } from 'src/app/models';
import { ProjectService, TaskService, EmployeeService, CompanyService } from 'src/app/services';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
  projectTitle: string;
  readMore: boolean = false;
  currentUser: Employee;
  currentCompany: Company;
  isOwner: boolean;
  isManager: boolean;
  addedTeamMembers: any[];
  loadedProject: boolean = false;
  loadedUser: boolean = false;

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly companyService: CompanyService,
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit() {
    console.log(this.route)
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getProject(this.id);
      this.getCurrentUser();
    });
  }
  getProject(id: string) {
    this.projectService.getProject(id).subscribe(result => {
      this.project = result;
      console.log("Logging this.project",this.project);
      this.tasks = this.project.tasks;
      console.log("Logging this.tasks",this.tasks);
      // for(const task of this.tasks){
      //   this.taskProgressArray.push(task.progress);
      // }
      // this.project.progress = Number.parseFloat(this.getAvg(this.taskProgressArray).toFixed(1));
      console.log("logging this.project.progress",this.project.progress)
      this.loadedProject = true;
      console.log("logging type of progress", typeof this.project.progress)
    });
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
          console.log("IN DASHBOARD COMP.  LOGGING RESULT", result)
          this.loadedUser = true;
        }
      });
    }
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
      this.getProject(this.id);
    })
  }


  //called inside the addTeam modal, should add the selected employee ids to the project teammates list
  onAddTeamMembers() {
    for(let member of this.newMembers){
      this.projectService.addTeamMember(this.project, member).subscribe(result => {
        console.log("added team member");
        this.getProject(this.id)
      })
    }
  }

  onRemoveFromTeam(id: string){
    this.projectService.removeTeamMember(this.project, id).subscribe(result => {
      console.log(result)
      this.getProject(this.id)
    })
  }

  //this is called byt the editprojectbutton inside the modal which should edit the project with the given information
  populateEditProject() {
    this.editProject = this.project;
  }

  onEditProject(){
    this.projectService.updateProject(this.editProject).subscribe(data => {
      console.log(data);
      this.getProject(this.id);
    })
  }

  //this is called by the first delete button to set the deleteTask id of the task to be deleted
  onDeleteProject() {
    this.projectService.destroyProject(this.project._id).subscribe(data => {
      console.log(data)
      this.companyService.removeProject(this.currentCompany, this.project._id).subscribe(result => {
        console.log(result)
      })
      this.router.navigateByUrl('/dashboard')
    })
  }

  //this is called by the first delete button to set the deleteTask id of the task to be deleted
  setDeleteTaskID(id: string){
    this.deleteTaskId = id;
  }

  //this is called by the delete button in the modal, and should go ahead with the task delete by this.deleteTaskId
  /**
   * sadfasdfasdf
   * @param id The id of the task to be delieted
   */
  onDeleteTask() {
    this.taskService.destroyTask(this.deleteTaskId).subscribe(_data => {
      this.getProject(this.id);
    });
  }


  //this is called by the edit task button, which should set the populateEditId with the id of the task to edit
  populateEditTask(task: Task) {
    this.editTask = task;
  }

  onEditTask(task: Task){
    this.taskService.updateTask(task).subscribe(data => {
      console.log(data);
      this.getProject(this.id);
    })
  }

  onShowDetails(){
    this.readMore = !this.readMore;
  }

}
