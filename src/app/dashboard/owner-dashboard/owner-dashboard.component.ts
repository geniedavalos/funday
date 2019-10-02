import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Employee, Project, Company } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService, EmployeeService, CompanyService } from 'src/app/services';
import { ThrowStmt } from '@angular/compiler';

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
  managers: Employee[] = [];
  selectedDepartment: string;
  deleteItem: string;
  editItem: Employee;

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
    this.editItem = new Employee();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentCompany.currentValue) {
      this.getProjects();
      this.getEmployees();
      this.sortDepartments();
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
    this.managers = [];
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

  sortDepartments() {
    this.currentCompany.departments.sort((a, b) => {
      if (a === 'Unassigned') {
        return -1;
      } else if (b === 'Unassigned') {
        return 1;
      }
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  addDepartment(form: NgForm) {
    const observable = this.companyService.addDepartment(this.currentCompany, this.newDepartment);
    observable.subscribe(data => {
      this.departmentMembership[this.newDepartment] = 0;
      this.currentCompany = data;
      this.sortDepartments();
    });
  }

  onAdd() {
    for (const member of this.newMembers) {
      const split = member.split('-');
      this.addedIds.push(split[0]);
      this.addedTeamMembers.push(split[1]);
    }
  }

  onSubmit(form: NgForm) {
    if (this.addedIds.length === 0 || this.addedIds === null) {
      this.addedIds = [];
    }
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
    this.employeeService.promoteToManager(id).subscribe(result => {
      this.companyService.getCompany(this.currentCompany._id).subscribe(company => {
        this.currentCompany = company;
        this.getEmployees();
      });
    });
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

  setDeleteItem(id: string) {
    console.log('Inside setDeleteItem()');
    console.log('Id passed in is: ' + id);
    this.deleteItem = id;
  }
  // TODO: Finish onDelete in owner dashboard
  onDelete() {
    console.log('Inside onDelete()');
    console.log('Deleting: ' + this.deleteItem);
  }

  setEditEmployee(employee) {
    console.log(this.currentCompany.departments);
    console.log('Inside setEditEmployee()');
    console.log(employee);
    this.editItem = JSON.parse(JSON.stringify(employee));
  }
  // TODO: Finish onEdit in owner dashboard
  onEdit() {
    console.log('Inside onEdit()');
    console.log(this.editItem._id);
    console.log('Id to be editted: ' + this.editItem.firstName + this.editItem.lastName + this.editItem.email + this.editItem.department);
  }

}
