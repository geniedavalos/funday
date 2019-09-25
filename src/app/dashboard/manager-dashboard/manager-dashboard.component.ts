import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {
  newProject = new Project();
  addedTeamMembers: any [];
  addedIds: any [];
  newMember: any;
  random: string;
  constructor() { }

  ngOnInit() {
    this.addedIds = [];
    this.addedTeamMembers = [];
    this.random = 'random-string';
  }

  onAdd() {
    console.log('Inside onAdd() for teammembers');
    console.log(this.newMember);

    for (const  members of this.newMember) {
      const split = members.split('-');
      this.addedIds.push(split[0]);
      this.addedTeamMembers.push(split[1]);
    }
    console.log('Ids are: ' + this.addedIds);
    console.log('Names are: ' + this.addedTeamMembers);
  }

  onSubmit() {
    console.log('Inside onSubmit() for form');
    console.log('Submitting: ' + this.newProject.title + ', ' + this.newProject.description + ', ' + this.newProject.dueDate);
  }

}
