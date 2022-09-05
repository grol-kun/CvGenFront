import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { SiteLayoutComponent } from './site-layout/site-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/employees', pathMatch: 'full' },
      {
        path: 'employees',
        loadChildren: () => import('./employees/employees.module').then((m) => m.EmployeesModule),
        title: 'Εmployees',
      },
      {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then((m) => m.ProjectsModule),
        title: 'Projects',
      },
      {
        path: 'cvs',
        loadChildren: () => import('./cvs/cvs.module').then((m) => m.CvsModule),
        title: 'CVs',
      },
      {
        path: 'entities',
        loadChildren: () => import('./entities/entities.module').then((m) => m.EntitiesModule),
        title: 'Entities',
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
