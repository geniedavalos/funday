import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { EmployeeService, CompanyService } from 'src/app/services';
import { Employee, Company } from 'src/app/models';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.css']
})
export class ProjectNewComponent implements OnInit {
  newProject: Project = new Project();
  newProjectLead: string;
  addedTeamMembers: Employee[] = [];
  addedIds: string[] = [];
  newMembers: any[] = [];
  selectedDepartments: string[] = [];

  @Output()
  createProjectEmitter = new EventEmitter<Project>();

  @Input() currentUser: Employee;
  @Input() currentCompany: Company;
  @Input() managers: Employee[];
  @Input() employees: Employee[];

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly projectService: ProjectService,
    private readonly companyService: CompanyService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.newProjectLead = (this.currentUser.isOwner) ? '' : this.currentUser._id;
  }

  onAdd(form: NgForm) {
    for (const member of this.newMembers) {
      const split = member.split('-');
      this.addedIds.push(split[0]);
      this.addedTeamMembers.push(split[1]);
    }
    this.newMembers = [];
  }

  closeModal(event) {
    console.log(event);
  }


  onSubmit(form: NgForm, event: Event) {
    event.preventDefault();
    console.log(event);
    if (this.addedIds.length === 0 || this.addedIds === null) {
      this.addedIds = [];
    }
    this.newProject.projectLead = this.newProjectLead;
    this.newProject.teamMembers = this.addedIds;
    this.createProjectEmitter.emit(this.newProject);
    form.reset();
    this.newProject = new Project();
    this.addedIds = [];
    this.addedTeamMembers = [];
    this.newProjectLead = (this.currentUser.isOwner) ? '' : this.currentUser._id;
    this.selectedDepartments = [];
    // form.reset();
    // this.projectService.createProject(this.newProject).subscribe(createdProject => {
    //   this.employeeService.addManagedProject(this.currentUser._id, createdProject._id).subscribe(_result => {

    //   });
    //   this.companyService.addProject(this.currentCompany, createdProject).subscribe(_res => {
    //     this.companyService.getCompany(this.currentCompany._id).subscribe(finalRes => {
    //       this.currentCompany = finalRes;
    //       this.newProject = new Project();
    //       this.addedIds = [];
    //       this.addedTeamMembers = [];
    //       form.reset();
    //     });
    //   });
    // });
  }

}
