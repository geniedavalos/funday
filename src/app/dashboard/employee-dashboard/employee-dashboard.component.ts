import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  noteDescription: String;
  theId = 'Random';

  constructor() { }
  ngOnInit() {
  }

  onSubmit(id:String) {
    console.log('Inside onSubmit()');
    console.log(id);
    console.log(this.noteDescription);
  }
}
