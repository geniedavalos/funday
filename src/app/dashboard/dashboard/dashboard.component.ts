import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService, CompanyService } from 'src/app/services';
import { Employee } from 'src/app/models';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: Employee;
  currentCompany: Company;

  isOwner: boolean;
  isManager: boolean;
  constructor(
    private readonly authService: AuthService,
    private readonly employeeService: EmployeeService,
    private readonly companyService: CompanyService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    this.isOwner = false;
    this.isManager = false;
    this.getCurrentUser();
  }

  getCurrentUser() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigateByUrl('/home');
    } else {
      const decoded = this.authService.getDecodedAccessToken(token);
      console.log(decoded);
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
        }
      });
    }
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

  verifyButton() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigateByUrl('/home');
    } else {
      this.authService.verifyLogin(token).subscribe(result => {
        console.log('verifyButton result:', result);
        if (result['name'] && result['name'] === 'TokenExpiredError') {
          this.authService.logout(token).subscribe(logoutResult => {
            console.log(logoutResult);
            this.router.navigateByUrl('/home');
          });
        }
      });
    }
  }
}
