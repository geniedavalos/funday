import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Employee, Project, Company } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService, EmployeeService, CompanyService } from 'src/app/services';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
export class OwnerDashboardComponent implements OnInit, OnChanges {
  projects: Project[];
  newProject = new Project();
  employees: Employee[];
  addedTeamMembers: any [];
  addedIds: any [];
  newMembers: any;
  newDepartment: string;
  companyExpanded = false;
  projectsExpanded = false;
  employeesExpanded = false;
  departmentMembership: any = {};
  managers = [];

  editingName = false;

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
    if (changes.currentCompany.currentValue) {
      this.getProjects();
      this.getEmployees();
    }
  }

  getProjects() {
    this.projects = this.currentCompany.projects;
    this.projects.sort((a, b) => {
      if (a.dueDate > b.dueDate) {
        return 1;
      } else if (a.dueDate < b.dueDate) {
        return -1;
      }
      return 0;
    });
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
    for (const dept of this.currentCompany.departments) {
      this.departmentMembership[dept] = 0;
    }
    for (const employee of this.employees) {
      if (employee.isManager) {
        this.managers.push(employee);
      }
      this.departmentMembership[employee.department] += 1;
    }
  }

  toggleCompany() {
    this.companyExpanded = (!this.companyExpanded);
  }

  toggleProjects() {
    this.projectsExpanded = (!this.projectsExpanded);
  }

  toggleEmployees() {
    this.employeesExpanded = (!this.employeesExpanded);
  }

  toggleEditName() {
    this.editingName = (!this.editingName);
  }

  editCompany(form: NgForm) {
    this.companyService.updateCompany(this.currentCompany).subscribe(result => {
      console.log(result);
    });
  }

  addDepartment(form: NgForm) {
    const observable = this.companyService.addDepartment(this.currentCompany, this.newDepartment);
    observable.subscribe(data => {
      console.log(data);
      this.departmentMembership[this.newDepartment] = 0;
      this.currentCompany = data;
    });
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
    console.log(form);
    if (this.addedIds.length === 0 || this.addedIds === null) {
      this.addedIds = [];
    }
    console.log('Inside onSubmit() for form');
    console.log('Submitting: ' + this.newProject.title + ', ' + this.newProject.description + ', ' + this.newProject.dueDate);
    console.log('project', this.newProject);
    this.newProject.projectLead = this.currentUser._id;
    this.newProject.teamMembers = this.addedIds;
    this.projectService.createProject(this.newProject).subscribe(result => {
      this.companyService.addProject(this.currentCompany, result).subscribe(res => {
        this.currentCompany = res;
        this.newProject = new Project();
        this.getProjects();
        this.addedIds = [];
        this.addedTeamMembers = [];
      });
    });
  }

  makeManager(id){
    this.employeeService.promoteToManager(id).subscribe(result =>{
      console.log(result)
      this.companyService.getCompany(this.currentCompany._id).subscribe(company => {
        this.currentCompany = company;
        this.getEmployees();
      })
    })
  }

  logoutButton() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigateByUrl('/home');
    } else {
      this.authService.logout(token).subscribe(result => {
        console.log('logoutButton result:', result);
        this.router.navigateByUrl('/home');
      });
    }
  }

}
