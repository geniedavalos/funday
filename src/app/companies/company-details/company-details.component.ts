import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  company: Company = {
    _id: null,
    name: null,
    owner: null,
    employees: null,
    projects: null,
    departments: null,
  };
  id: string;
  constructor(
    private readonly companyService: CompanyService,
    private readonly _route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.id = params.get('id');
      this.getCompany(this.id);
    });
  }
  getCompany(id) {
    this.companyService.getCompany(id).subscribe(result => {
      console.log(result);
      this.company = result;
    });
  }
}
