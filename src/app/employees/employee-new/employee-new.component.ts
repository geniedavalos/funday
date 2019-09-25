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
  selectedCompany : Company;
  employee = new Employee();
  newCompany : Company;
  companies: Company[] ;

  constructor(
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
    this.employeeService.createEmployee(this.employee).subscribe(newEmployee =>{
      console.log("LOGGING NEW EMPLOYEE",newEmployee);
      if (this.isNewCompany) {
        this.newCompany.owner = newEmployee;
        this.companyService.createCompany(this.newCompany).subscribe(createdCompany => {
          console.log(createdCompany);
        })
      }
      else {
        this.selectedCompany.employees.push(newEmployee);
        this.companyService.updateCompany(this.selectedCompany).subscribe(updatedCompany => {
          console.log(updatedCompany);
        })
      }
    });
  }
  getAllCompanies() {
    this.companyService.getCompanies().subscribe(companies => {
      if (companies.length == 0){
        this.companies = [];
      }
      else {
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
