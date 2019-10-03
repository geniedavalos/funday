import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models';
import { EmployeeService } from 'src/app/services';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  id: string;
  employee: Employee;
  managedProjects: any[];
  assignedProjects: any;
  tasks: any[];
  finishedLoading: boolean;
  constructor(
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
}
