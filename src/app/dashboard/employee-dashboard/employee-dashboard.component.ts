import { Component, OnInit, Input } from '@angular/core';
import { Employee, Company } from 'src/app/models';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  noteDescription: string;
  @Input() currentUser: Employee;
  @Input() currentCompany: Company;
  theId = 'Random';

  constructor() { }
  ngOnInit() {
  }

  onSubmit(id: string) {
    console.log('Inside onSubmit()');
    console.log(id);
    console.log(this.noteDescription);
  }
}
