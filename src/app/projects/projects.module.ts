import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { AppTextareaModule } from '../shared/components/app-textarea/app-textarea.module';
import { AppInputModule } from '../shared/components/app-input/app-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppDataPickerModule } from '../shared/components/app-data-picker/app-data-picker.module';

@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    AppTextareaModule,
    AppInputModule,
    ReactiveFormsModule,
    FormsModule,
    AppDataPickerModule
  ],
})
export class ProjectsModule { }
