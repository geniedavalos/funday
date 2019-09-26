import { Component, OnInit, Input } from '@angular/core';
import { Project, Employee } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService, EmployeeService } from 'src/app/services';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {
  projects : Project[];
  newProject = new Project();
  employees : Employee[];
  addedTeamMembers: any [];
  addedIds: any [];
  newMembers: any;
  random: string;
  @Input() currentUser: Employee;

  constructor(
    private readonly authService: AuthService,
    private readonly projectService: ProjectService,
    private readonly router: Router,
    private readonly employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.addedIds = [];
    this.addedTeamMembers = [];
    this.getProjects();
    this.getEmployees();
  }

  getProjects(){
    this.projectService.getManagedProjects(this.currentUser._id).subscribe(results => {
      this.projects = results;
    })
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe(results => {
      this.employees = results;
    })
  }

  onAdd() {
    console.log('Inside onAdd() for teammembers');
    console.log(this.newMembers);

    for (const member of this.newMembers) {
      const split = member.split('-');
      this.addedIds.push(split[0]);
      this.addedTeamMembers.push(split[1]);
    }
    console.log('Ids are: ' + this.addedIds);
    console.log('Names are: ' + this.addedTeamMembers);
  }

  onSubmit(form: NgForm) {
    console.log(form)
    if (this.addedIds.length == 0 || this.addedIds === null){
      this.addedIds = [];
    }
    console.log('Inside onSubmit() for form');
    console.log('Submitting: ' + this.newProject.title + ', ' + this.newProject.description + ', ' + this.newProject.dueDate);
    console.log('project', this.newProject);
    this.newProject.projectLead = this.currentUser._id;
    this.newProject.teamMembers = this.addedIds;
    this.projectService.createProject(this.newProject).subscribe(result => {
      console.log(result);
      this.newProject = new Project();
      this.getProjects();
      this.addedIds = [];
      this.addedTeamMembers = [];

    });
    form.reset();
  }

}
