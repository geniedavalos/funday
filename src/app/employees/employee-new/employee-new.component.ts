import { Component, OnInit } from '@angular/core';
import {Employee} from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.css']
})
export class EmployeeNewComponent implements OnInit {
  duplicatedError: any;
  errorsMessage: any;
  employee = new Employee();

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly router: Router
  ) { }

  ngOnInit() {
  }

  Createemployee(event: Event) {
    event.preventDefault();
    this.employeeService.createEmployee(this.employee).subscribe(result =>{
      console.log(result);
    });
  }
}
