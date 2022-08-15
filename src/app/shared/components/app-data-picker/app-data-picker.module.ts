import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDataPickerComponent } from './app-data-picker.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NzDatePickerModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppDataPickerComponent
  ],
  exports: [
    AppDataPickerComponent
  ]
})
export class AppDataPickerModule { }
