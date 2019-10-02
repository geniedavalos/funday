import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { EmployeeService } from 'src/app/services';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.css']
})
export class ProjectNewComponent implements OnInit {
  project = new Project();

  @Output()
  createProject = new EventEmitter<Project>();

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly projectService: ProjectService,
    private readonly router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    this.projectService.createProject(this.project).subscribe(createdProject => {
      for(let teamMember of createdProject.teamMembers){
        this.employeeService.addProject(teamMember, createdProject._id).subscribe(data => {
        })
      }
      this.project = new Project();
      form.reset();
      this.router.navigateByUrl('/');
    });
  }

}
