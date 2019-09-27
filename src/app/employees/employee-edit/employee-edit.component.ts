import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Employee } from 'src/app/models';
import { EmployeeService } from 'src/app/services';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  private id: string;
  private employee: Employee;
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.get('id');
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
