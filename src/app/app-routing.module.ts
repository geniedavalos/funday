import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { environment } from '../environments/environment';


import { ProjectResolver } from './resolvers';
import { TaskResolver } from './resolvers';
import { EmployeeResolver } from './resolvers';


import * as fromProjects from './projects';
import * as fromTasks from './tasks';
import * as fromEmployees from './employees';

const enableTracing = false && !environment.production;

const routes: Routes = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
  {
    path: 'projects',
    children: [
      {
        path: '',
        component: fromProjects.ProjectListComponent,
        resolve: { products: ProjectResolver}
      },
      {
        path: 'new',
        component: fromProjects.ProjectNewComponent,
      },
      {
        path: ':id',
        component: fromProjects.ProjectDetailsComponent,
      },
      {
        path: ':id/edit',
        component: fromProjects.ProjectEditComponent
      }
    ],
  },
  {
    path: 'tasks',
    children: [
      {
        path: '',
        component: fromTasks.TaskListComponent,
        resolve: { tasks: TaskResolver}
      },
      {
        path: 'new',
        component: fromTasks.TaskNewComponent,
      },
      {
        path: ':id',
        component: fromTasks.TaskDetailsComponent,
      },
      {
        path: ':id/edit',
        component: fromTasks.TaskEditComponent
      }
    ],
  },
  {
    path: 'employees',
    children: [
      {
        path: '',
        component: fromEmployees.EmployeeListComponent,
        resolve: { employees: EmployeeResolver}
      },
      {
        path: 'new',
        component: fromEmployees.EmployeeNewComponent,
      },
      {
        path: 'login',
        component: fromEmployees.EmployeeLogInComponent
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
    redirectTo: 'projects',
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
