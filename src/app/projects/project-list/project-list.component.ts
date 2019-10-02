import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services';
import { Router } from '@angular/router';
import { Project } from 'src/app/models';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[];
  constructor(
    private readonly projectService: ProjectService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.getProjects();
  }
  getProjects() {
    this.projectService.getProjects().subscribe(result => {
      this.projects = result;
    });
  }
}
