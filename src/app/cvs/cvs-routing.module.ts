import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvsComponent } from './cvs.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CvsComponent,
        title: 'CVs',
        data: {
          breadcrumb: null,
        },
      },
      {
        path: ':id',
        loadChildren: () => import('./cv/cv.module').then((m) => m.CvModule),
        title: 'CV',
        data: {
          breadcrumb: 'CV',
        },
      },
      {
        path: 'new',
        loadChildren: () => import('./cv/cv.module').then((m) => m.CvModule),
        title: 'CV',
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
export class CvsRoutingModule {}
