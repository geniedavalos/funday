import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as fromEmployees from './employees';
import * as fromResolvers from './resolvers';
import * as fromProjects from './projects';
import * as fromTasks from './tasks';
import * as fromCompanies from './companies';

@NgModule({
  declarations: [
    AppComponent,
    ...fromEmployees.components,
    ...fromProjects.components,
    ...fromTasks.components,
    ...fromCompanies.components,
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
