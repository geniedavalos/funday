import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-employee-log-in',
  templateUrl: './employee-log-in.component.html',
  styleUrls: ['./employee-log-in.component.css']
})
export class EmployeeLogInComponent implements OnInit {
  employeeLogin : {email: string, password : string };

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.employeeLogin = {email : '', password : ''};
  }

  ngOnInit() {
  }


  onSubmit(event: Event) {
    event.preventDefault();
    this.authService.login(this.employeeLogin).subscribe(result =>{
      if(result['status'] == "success"){
        this.router.navigateByUrl('/dashboard')
      }
    })
  }
}
