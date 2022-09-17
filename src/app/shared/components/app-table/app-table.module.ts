import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTableComponent } from './app-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ApplicationPipesModule } from '../../pipes/application-pipes.module';
import { TranslateControlModule } from '../translate/translate-control.module';
import { ProjectsRoutingModule } from 'src/app/projects/projects-routing.module';

@NgModule({
  declarations: [AppTableComponent],
  imports: [
    ProjectsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzDropDownModule,
    ApplicationPipesModule,
    NzInputModule,
    TranslateControlModule,
    NzDatePickerModule,
  ],
  exports: [AppTableComponent],
})
export class AppTableModule {}
