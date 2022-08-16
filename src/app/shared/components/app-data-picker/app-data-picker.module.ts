import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDataPickerComponent } from './app-data-picker.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationPipesModule } from '../../pipes/application-pipes.module';

@NgModule({
  declarations: [
    AppDataPickerComponent
  ],
  imports: [
    CommonModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    ApplicationPipesModule
  ],
  exports: [
    AppDataPickerComponent
  ]
})
export class AppDataPickerModule { }
