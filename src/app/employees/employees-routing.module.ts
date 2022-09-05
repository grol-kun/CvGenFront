import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        data: {
          breadcrumb: null,
        },
        component: EmployeesComponent,
        title: 'Employees',
      },

      {
        path: ':id',
        data: {
          breadcrumb: 'Employee',
        },
        loadChildren: () => import('./employee/employee.module').then((m) => m.EmployeeModule),
        title: 'Employee',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
