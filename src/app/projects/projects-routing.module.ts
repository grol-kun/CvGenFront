import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
  },
  {
    path: ':id',
    loadChildren: () => import('./project/project.module').then((m) => m.ProjectModule),
    title: 'Project',
  },
  {
    path: 'new',
    loadChildren: () => import('./project/project.module').then((m) => m.ProjectModule),
    title: 'Project',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
