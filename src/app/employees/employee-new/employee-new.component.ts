import { Component, OnInit } from '@angular/core';
import {User} from '../../models/UserModel';
import { UserService } from '../../services/UserService';
import {Router} from '@angular/router';
@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.css']
})
export class EmployeeNewComponent implements OnInit {
  duplicatedError: any;
  errorsMessage: any;
  user = new User();

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  ngOnInit() {
  }

  CreateUser(event: Event) {

  }
}
