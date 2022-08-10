import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SiteLayoutComponent } from './core/layouts/site-layout/site-layout.component';

const routes: Routes = [

  {
    path: '', component: AuthComponent, children: [
      { path: '', redirectTo: '/auth', pathMatch: 'full' },
      { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
    ]
  },
  {
    path: '', component: SiteLayoutComponent, /* canActivate: [AuthGuard], */ children: [
      {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
        title: 'Projects'
      },
      {
        path: 'employees',
        loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule),
        title: 'Employees'
      },
      {
        path: 'cvs',
        loadChildren: () => import('./cvs/cvs.module').then(m => m.CvsModule),
        title: 'CVs'
      },
      {
        path: 'entities',
        loadChildren: () => import('./entities/entities.module').then(m => m.EntitiesModule),
        title: 'Entities'
      }
    ]
  }

  /*
   {
     path: '**',
     redirectTo: '404',
   },
   {
     path: '404',
     redirectTo: ''
   } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
