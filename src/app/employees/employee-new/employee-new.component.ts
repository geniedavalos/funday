import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Employee} from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import {CompanyService} from '../../services/company.service';
import {Company} from '../../models/company';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.css']
})

export class EmployeeNewComponent implements OnInit {
  duplicatedError: any;
  errorsMessage: any;
  isNewCompany : boolean ;
  selectedCompanyID : string;
  employee = new Employee();
  newCompany : Company;
  companies: Company[] ;

  constructor(
    private readonly authService: AuthService,
    private readonly employeeService: EmployeeService,
    private readonly companyService: CompanyService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.newCompany = new Company();
    this.isNewCompany = true;
    this.getAllCompanies();
  }

  createEmployee(event: Event) {
    event.preventDefault();
    if (this.isNewCompany) {
      this.newCompany.owner = this.employee;
      this.authService.newCompanyRegister(this.newCompany).subscribe(createdCompany => {
        console.log(createdCompany);
      });
    } else {
      this.authService.joinCompanyRegister(this.selectedCompanyID, this.employee).subscribe(data => {
        console.log(data);
      });
    }
  }
  getAllCompanies() {
    this.companyService.getCompanies().subscribe(companies => {
      if (companies.length === 0) {
        this.companies = [];
      } else {
        this.companies = companies;
      }
    });
  }

  changeCompanyInput() {
    console.log(this.companies);
    console.log(this.isNewCompany);
    this.isNewCompany = (!this.isNewCompany);
    console.log(this.isNewCompany);
  }
}
