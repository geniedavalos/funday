import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { DevTeamComponent } from './dev-team/dev-team.component';
import { SiteInfoComponent } from './site-info/site-info.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ManagerDashboardComponent } from './dashboard/manager-dashboard/manager-dashboard.component';
import { EmployeeDashboardComponent } from './dashboard/employee-dashboard/employee-dashboard.component';

import * as fromEmployees from './employees';
import * as fromResolvers from './resolvers';
import * as fromProjects from './projects';
import * as fromTasks from './tasks';

@NgModule({
  declarations: [
    AppComponent,
    ...fromEmployees.components,
    ...fromProjects.components,
    ...fromTasks.components,
    HomeComponent,
    DevTeamComponent,
    SiteInfoComponent,
    DashboardComponent,
    EmployeeDashboardComponent,
    ManagerDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    fromResolvers.EmployeeResolver,
    fromResolvers.ProjectResolver,
    fromResolvers.TaskResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
