import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { CompanyService } from '../services/company.service';
import { Company } from '../models/company';
import { Observable } from 'rxjs';

@Injectable()
export class CompanyResolver implements Resolve<Company[]> {
  constructor(private readonly companyService: CompanyService) {}

  resolve(): Observable<Company[]> {
    return this.companyService.getCompanies();
  }
}
