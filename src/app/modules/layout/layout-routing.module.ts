import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvsComponent } from './cvs/cvs.component';
import { EmployeesComponent } from './employees/employees.component';
import { EntitiesComponent } from './entities/entities.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
    {
        path: 'employees',
        component: EmployeesComponent,
        title: 'Employees'
    },
    {
        path: 'projects',
        component: ProjectsComponent,
        title: 'Projects'
    },
    {
        path: 'cvs',
        component: CvsComponent,
        title: 'CVs'
    },
    {
        path: 'entities',
        component: EntitiesComponent,
        title: 'Entities'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
