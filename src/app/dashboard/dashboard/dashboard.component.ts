import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services';
import { Employee } from 'src/app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: Employee;


  isManager: Boolean;
  constructor(
    private readonly authService: AuthService,
    private readonly employeeService: EmployeeService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    this.isManager = false;
    this.getCurrentUser();
  }

  getCurrentUser() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigateByUrl('/home');
    } else {
      const decoded = this.authService.getDecodedAccessToken(token);
      this.employeeService.getEmployee(decoded['id']).subscribe(result => {
        if (!result) {
          this.router.navigateByUrl('/home');
        }
        this.currentUser = result;
        this.isManager = this.currentUser.isManager;
      });
    }
  }
}
