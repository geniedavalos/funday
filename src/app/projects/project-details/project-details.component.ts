import { ProjectService, TaskService, EmployeeService, CompanyService } from 'src/app/services';
import { Project, Task, Employee, Company } from 'src/app/models';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  selectedDepartments: string[] = [];
  taskProgressArray: number[] = [];
  loadedProject: boolean = false;
  loadedUser: boolean = false;
  editProject = new Project();
  readMore: boolean = false;
  currentCompany: Company;
  addedTeamMembers: any[];
  populateEditId: string;
  teamIds: string[] = [];
  currentUser: Employee;
  newTask = new Task();
  deleteTaskId: string;
  projectTitle: string;
  isManager: boolean;
  project: Project;
  isOwner: boolean;
  newMembers: any;
  lastDay: string;
  editTask: Task;
  tasks: Task[];
  today: string;
  id: string;


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
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getProject(this.id);
      this.getCurrentUser();
      this.today = new Date().toISOString().substr(0, 10);
    });
  }
  getProject(id: string) {
    this.teamIds = [];
    console.log(id);
    this.projectService.getProject(id).subscribe(result => {
      console.log(result);
      this.project = result;
      this.tasks = this.project.tasks;
      console.log(this.project);
      for(const employee of this.project.teamMembers){
        this.teamIds.push(employee['_id']);
      }
      console.log(this.project.dueDate);
      this.lastDay = this.project.dueDate.substr(0, 10);
      this.loadedProject = true;
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
    this.taskService.createTask(this.newTask).subscribe(task => {
      this.projectService.addTask(this.project, task._id).subscribe(result => {
      });
      for (const teamMember of task.teamMembers) {
        this.employeeService.addTask(teamMember, task._id).subscribe(data => {
        })
      }
      this.getProject(this.id);
    })
  }


  // called inside the addTeam modal, should add the selected employee ids to the project teammates list
  onAddTeamMembers() {
    for(let member of this.newMembers){
      this.projectService.addTeamMember(this.project, member).subscribe(result => {
        this.getProject(this.id)
      })
    }
    this.newMembers = [];
  }
  /**
   * Removes a team member from a project, and removes them from all associated tasks.
   * @param id ID of the team member to be removed from the project.
   */
  onRemoveFromTeam(id: string){
    this.projectService.removeTeamMember(this.project, id).subscribe(result => {
      this.getProject(this.id);
    });
  }

  //this is called byt the editprojectbutton inside the modal which should edit the project with the given information
  populateEditProject() {
    this.editProject = this.project;
  }

  onEditProject() {
    this.projectService.updateProject(this.editProject).subscribe(data => {
      this.getProject(this.id);
    });
  }

  //this is called by the first delete button to set the deleteTask id of the task to be deleted
  onDeleteProject() {
    this.projectService.destroyProject(this.project._id).subscribe(data => {
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
      this.projectService.removeTask(this.project, this.deleteTaskId).subscribe(result => {
        console.log(result);
      })
    });
  }


  //this is called by the edit task button, which should set the populateEditId with the id of the task to edit
  populateEditTask(task: Task) {
    this.editTask = task;
  }

  onEditTask(task: Task){
    this.taskService.updateTask(task).subscribe(data => {
      this.getProject(this.id);
    })
  }

  onShowDetails(){
    this.readMore = !this.readMore;
  }

}
