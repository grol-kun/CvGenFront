import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProjectsComponent,
        title: 'Project',
        data: {
          breadcrumb: null,
        },
      },
      {
        path: ':id',
        loadChildren: () => import('./project/project.module').then((m) => m.ProjectModule),
        title: 'Project',
        data: {
          breadcrumb: 'Project',
        },
      },
      {
        path: 'new',
        loadChildren: () => import('./project/project.module').then((m) => m.ProjectModule),
        title: 'Project',
        data: {
          breadcrumb: 'New',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
