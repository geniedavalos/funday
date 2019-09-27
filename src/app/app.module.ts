import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { SiteInfoComponent } from './site-info/site-info.component';

import { DevTeamComponent } from './dev-team/dev-team.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { SocketComponent } from './socket/socket.component';

import * as fromDashboards from './dashboard';
import * as fromEmployees from './employees';
import * as fromCompanies from './companies';
import * as fromResolvers from './resolvers';
import * as fromProjects from './projects';
import * as fromTasks from './tasks';
import { OwnerDashboardComponent } from './dashboard/owner-dashboard/owner-dashboard.component';


@NgModule({
  declarations: [
    ...fromDashboards.components,
    ...fromEmployees.components,
    ...fromCompanies.components,
    ...fromProjects.components,
    ...fromTasks.components,
    SiteInfoComponent,
    DevTeamComponent,
    HomeComponent,
    AppComponent,
    SocketComponent,
    OwnerDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['http://localhost:3000/auth/login']
      }
    })
  ],
  providers: [
    ...fromResolvers.resolvers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
