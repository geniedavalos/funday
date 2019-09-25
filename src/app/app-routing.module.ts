import { environment } from '../environments/environment';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EmployeeResolver } from './resolvers';
// import { ProjectResolver } from './resolvers';
// import { TaskResolver } from './resolvers';

import * as fromEmployees from './employees';
import * as fromDashboard from './dashboard';
import * as fromSiteInfo from './site-info';
import * as fromProjects from './projects';
import * as fromDevTeam from './dev-team';
import * as fromTasks from './tasks';
import * as fromHome from './home';

const enableTracing = false && !environment.production;

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: fromHome.HomeComponent,
  },
  {
    path: 'devTeam',
    component: fromDevTeam.DevTeamComponent,
  },
  {
    path: 'information',
    component: fromSiteInfo.SiteInfoComponent,
  },
  {
    path: 'login',
    component: fromEmployees.EmployeeLogInComponent,
  },
  {
    path: 'register',
    component: fromEmployees.EmployeeNewComponent,
  },
  {
    path: 'dashboard',
    component: fromDashboard.DashboardComponent,
  },
  {
    path: 'projects/:id',
    component: fromProjects.ProjectDetailsComponent,
    children: [
      {
        path: 'tasks/:id',
        component: fromTasks.TaskDetailsComponent,
      }
    ]
  },
      // {
      //   path: '',
      //   component: fromProjects.ProjectListComponent,
      //   resolve: { products: ProjectResolver}
      // },
      // {
      //   path: 'new',
      //   component: fromProjects.ProjectNewComponent,
      // },
      // {
      //   path: ':id/edit',
      //   component: fromProjects.ProjectEditComponent
      // }
      // {
      //   path: '',
      //   component: fromTasks.TaskListComponent,
      //   resolve: { tasks: TaskResolver}
      // },
      // {
      //   path: 'new',
      //   component: fromTasks.TaskNewComponent,
      // },
      // {
      //   path: ':id/edit',
      //   component: fromTasks.TaskEditComponent
      // }
  {
    path: 'employees',
    children: [
      {
        path: '',
        component: fromEmployees.EmployeeListComponent,
        resolve: { employees: EmployeeResolver}
      },
      {
        path: ':id',
        component: fromEmployees.EmployeeDetailsComponent,
      },
      {
        path: ':id/edit',
        component: fromEmployees.EmployeeEditComponent
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing,
  })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
