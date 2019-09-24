import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-employee-log-in',
  templateUrl: './employee-log-in.component.html',
  styleUrls: ['./employee-log-in.component.css']
})
export class EmployeeLogInComponent implements OnInit {

  employeeLogin : {email: string, password : string }
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly router: Router
  ) {
    this.employeeLogin = {email : '', password : ''};
  }

  ngOnInit() {
  }


  Login(event: Event) {
    this.employeeService.login(this.employeeLogin).subscribe(result =>{
      console.log(result);
    })
  }
}
