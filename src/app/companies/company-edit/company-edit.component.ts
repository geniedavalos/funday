import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  company: Company = {
    _id: null,
    name: null,
    owner: null,
    employees: null,
    projects: null
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
