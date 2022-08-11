import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvsComponent } from './cvs.component';

const routes: Routes = [
  {
    path: '',
    component: CvsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CvsRoutingModule {}
