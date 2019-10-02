import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Project, Employee, Company } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService, EmployeeService, CompanyService } from 'src/app/services';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'path';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit, OnChanges {
  projects: Project[];
  newProject = new Project();
  employees: Employee[];
  addedTeamMembers: any [];
  addedIds: any [];
  newMembers: any;
  random: string;

  @Input() currentUser: Employee;
  @Input() currentCompany: Company;

  constructor(
    private readonly authService: AuthService,
    private readonly companyService: CompanyService,
    private readonly projectService: ProjectService,
    private readonly router: Router,
    private readonly employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.addedIds = [];
    this.addedTeamMembers = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentCompany && changes.currentCompany.currentValue) {
      this.getProjects();
      this.getEmployees();
    }
  }

  getProjects() {
    this.projectService.getManagedProjects(this.currentUser._id).subscribe(data => {
      this.projects = data;
      if(this.projects.length > 0){
        this.projects.sort((a, b) => {
          if (a.dueDate > b.dueDate) {
            return 1;
          } else if (a.dueDate < b.dueDate) {
            return -1;
          }
          return 0;
        });
      }
    })
  }

  getEmployees() {
    this.employees = this.currentCompany.employees;
    this.employees.sort((a, b) => {
      if (a.lastName.toUpperCase() > b.lastName.toUpperCase()) {
        return 1;
      } else if (a.lastName.toUpperCase() < b.lastName.toUpperCase()) {
        return -1;
      } else {
        if (a.firstName.toUpperCase() > b.firstName.toUpperCase()) {
          return 1;
        } else if (a.firstName.toUpperCase() < b.firstName.toUpperCase()) {
          return -1;
        }
        return 0;
      }
    });
  }

  onAdd(form: NgForm) {
    for (const member of this.newMembers) {
      const split = member.split('-');
      this.addedIds.push(split[0]);
      this.addedTeamMembers.push(split[1]);
    }
    form.reset();
  }

  onSubmit(form: NgForm) {
    if (this.addedIds.length === 0 || this.addedIds === null) {
      this.addedIds = [];
    }
    this.newProject.projectLead = this.currentUser._id;
    this.newProject.teamMembers = this.addedIds;
    this.projectService.createProject(this.newProject).subscribe(createdProject => {
      this.employeeService.addManagedProject(this.currentUser._id, createdProject._id).subscribe(_result => {

      });
      this.companyService.addProject(this.currentCompany, createdProject).subscribe(res => {
        this.companyService.getCompany(this.currentCompany._id).subscribe(finalRes => {
          this.currentCompany = finalRes;
          this.newProject = new Project();
          this.getProjects();
          this.addedIds = [];
          this.addedTeamMembers = [];
        });
      });
    });
  }
}
