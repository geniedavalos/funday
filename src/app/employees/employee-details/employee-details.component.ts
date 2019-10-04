import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { Employee, Company } from 'src/app/models';
import { EmployeeService, CompanyService } from 'src/app/services';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  id: string;
  loadedUser: boolean;
  isManager: boolean;
  isOwner: boolean;
  currentCompany: Company;
  currentUser: Employee;
  employee: Employee;
  managedProjects: any[];
  assignedProjects: any;
  tasks: any[];
  finishedLoading: boolean;
  constructor(
    private readonly authService: AuthService,
    private readonly companyService: CompanyService,
    private readonly employeeService: EmployeeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly _location: Location,
  ) { }

  ngOnInit() {
    this.finishedLoading = false;
    this.employee = new Employee();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getCurrentUser();
      this.getEmployee(this.id);
    });
  }
  getEmployee(id) {
    this.employeeService.getEmployee(id).subscribe(result => {
      this.employee = result;
      this.managedProjects = result.managedProjects;
      this.assignedProjects = result.assignedProjects;
      this.tasks = result['tasks'];
      this.finishedLoading = true;
    });
  }

  backClicked() {
    this._location.back();
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
  makeManager(){
    this.employeeService.promoteToManager(this.id).subscribe(_result => {
      this.companyService.getCompany(this.currentCompany._id).subscribe(company => {
        this.currentCompany = company;
        this.getEmployee(this.id);
      });
    });
  }
}
