import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees/employees.component';
import { ProjectsComponent } from './projects/projects.component';
import { CvsComponent } from './cvs/cvs.component';
import { EntitiesComponent } from './entities/entities.component';



@NgModule({
  declarations: [
    EmployeesComponent,
    ProjectsComponent,
    CvsComponent,
    EntitiesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
