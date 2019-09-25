import { Component, OnInit } from '@angular/core';
import {Employee} from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import {Router} from '@angular/router';
import {CompanyService} from '../../services/company.service';
import {Company} from '../../models/company';
@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.css']
})
export class EmployeeNewComponent implements OnInit {
  duplicatedError: any;
  errorsMessage: any;
  isNewCompany : boolean ;
  employee = new Employee();
  private companies: Company[] ;
  private ConfirmPassword: string;
  private isMatch: boolean = false;

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly companyService: CompanyService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.isNewCompany = true;
    this.GetAllCompany();
  }

  Createemployee(event: Event) {
    event.preventDefault();
    this.employeeService.createEmployee(this.employee).subscribe(result =>{
      console.log(result);
    });
  }
  GetAllCompany() {
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
    });
  }

  MustMatch() {
    if(this.employee.password === this.ConfirmPassword){
      this.isMatch = true;
      return this.isMatch;
    }
  }
}
