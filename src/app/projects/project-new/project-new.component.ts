import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';

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
    private readonly projectService: ProjectService,
    private readonly router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    this.projectService.createProject(this.project).subscribe(_createdProject => {
      this.project = new Project();
      form.reset();
      this.router.navigateByUrl('/');
    });
  }

}
