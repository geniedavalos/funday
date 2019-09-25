import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Project } from 'src/app/models';
import { ProjectService } from 'src/app/services';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
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
      console.log(result);
      this.project = result;
    });
  }
}
