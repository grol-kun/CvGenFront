import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    title: 'Auth'
  },
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
  },
  {
    path: '**',
    redirectTo: '404',
  },
  {
    path: '404',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
