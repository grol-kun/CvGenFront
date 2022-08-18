import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { LoaderModule } from '../shared/components/loader/loader.module';

@NgModule({
  declarations: [EmployeesComponent],
  imports: [CommonModule, EmployeesRoutingModule, NzTableModule, LoaderModule],
})
export class EmployeesModule {}
