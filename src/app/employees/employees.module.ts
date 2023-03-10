import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationPipesModule } from 'src/app/shared/pipes/application-pipes.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TranslateControlModule } from '../shared/components/translate/translate-control.module';
import { AppTableModule } from '../shared/components/app-table/app-table.module';

@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    NzTableModule,
    TranslateControlModule,
    NzDropDownModule,
    ReactiveFormsModule,
    ApplicationPipesModule,
    NzIconModule,
    NzInputModule,
    AppTableModule,
  ],
})
export class EmployeesModule {}
