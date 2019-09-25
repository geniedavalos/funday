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
  selectedCompanyID : string;
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
    if (this.isNewCompany) {
      this.newCompany.owner = this.employee;
      this.companyService.createCompany(this.newCompany).subscribe(createdCompany => {
        console.log(createdCompany);
      })
    }
    else {
      this.employeeService.createEmployee(this.employee).subscribe(newEmployee =>{
        console.log("LOGGING NEW EMPLOYEE", newEmployee);
        console.log(this.selectedCompanyID);
        this.companyService.getCompany(this.selectedCompanyID).subscribe(company => {
          const currentCompany = company;
          console.log("logging new employee", newEmployee);
          // currentCompany.employees.push(newEmployee);
          // console.log("pushed into company", currentCompany)
          this.companyService.addEmployee(currentCompany, newEmployee).subscribe(updatedCompany => {
            console.log("Logging 'updated' company...", updatedCompany);
          })
        })
      });
    }
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

  addEmployee(){
    this.companyService.addEmployee().subscribe(data => {
      console.log(data)
    })
  }

  changeCompanyInput() {
    console.log(this.companies);
    console.log(this.isNewCompany);
    this.isNewCompany = (!this.isNewCompany);
    console.log(this.isNewCompany);
  }
}
