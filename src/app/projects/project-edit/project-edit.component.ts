import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProjectService } from 'src/app/services';
import { Project } from 'src/app/models';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  private id: string;
  private project: Project;
  constructor(
    private readonly projectService: ProjectService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.get('id');
      this.getProject(this.id);
    });
  }
  getProject(id) {
    this.projectService.getProject(id).subscribe(result => {
      this.project = result;
    });
  }
}
