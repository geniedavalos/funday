import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models';
import { EmployeeService } from 'src/app/services';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  private id: string;
  private employee: Employee;
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.employee = new Employee();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getEmployee(this.id);
    });
  }
  getEmployee(id) {
    this.employeeService.getEmployee(id).subscribe(result => {
      console.log(result);
      this.employee = result;
    });
  }
}
