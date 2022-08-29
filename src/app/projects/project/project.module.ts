import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';
import { AppInputModule } from 'src/app/shared/components/app-input/app-input.module';
import { AppDataPickerModule } from 'src/app/shared/components/app-data-picker/app-data-picker.module';
import { AppSelectModule } from 'src/app/shared/components/app-select/app-select.module';
import { AppTextareaModule } from 'src/app/shared/components/app-textarea/app-textarea.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    AppInputModule,
    AppDataPickerModule,
    AppSelectModule,
    AppTextareaModule,
    ReactiveFormsModule,
    NzButtonModule,
  ],
})
export class ProjectModule {}
