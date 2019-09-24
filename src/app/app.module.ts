import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { EmployeeNewComponent } from './employees/employee-new/employee-new.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ProjectNewComponent } from './projects/project-new/project-new.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { TaskNewComponent } from './tasks/task-new/task-new.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { EmployeeLogInComponent } from './employees/employee-log-in/employee-log-in.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    EmployeeNewComponent,
    EmployeeEditComponent,
    ProjectListComponent,
    ProjectDetailsComponent,
    ProjectNewComponent,
    ProjectEditComponent,
    TaskListComponent,
    TaskDetailsComponent,
    TaskNewComponent,
    TaskEditComponent,
    EmployeeLogInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
