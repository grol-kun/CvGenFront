import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvsComponent } from './cvs.component';

const routes: Routes = [
  {
    path: '',
    component: CvsComponent,
  },
  {
    path: ':id',
    loadChildren: () => import('./cv/cv.module').then((m) => m.CvModule),
    title: 'Project',
  },
  {
    path: 'new',
    loadChildren: () => import('./cv/cv.module').then((m) => m.CvModule),
    title: 'Project',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CvsRoutingModule {}
