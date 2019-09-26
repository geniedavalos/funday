import { Component, OnInit, Input } from '@angular/core';
import { Project, Employee } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


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
  @Input() currentUser: Employee;

  constructor(
    private readonly authService: AuthService,
    private readonly projectService: ProjectService,
    private readonly router: Router
  ) { }

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

  onSubmit(form: NgForm) {
    console.log('Inside onSubmit() for form');
    console.log('Submitting: ' + this.newProject.title + ', ' + this.newProject.description + ', ' + this.newProject.dueDate);
    console.log('project', this.newProject);
    this.newProject.teamMembers = this.addedIds;
    this.projectService.createProject(this.newProject).subscribe(result => {
      console.log(result);
      this.newProject = new Project();
      form.reset();
      this.router.navigateByUrl('/dashboard');
    });
  }

}
