import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { AppTextareaModule } from '../shared/components/app-textarea/app-textarea.module';
import { AppInputModule } from '../shared/components/app-input/app-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppDataPickerModule } from '../shared/components/app-data-picker/app-data-picker.module';
import { AppAutocompleteModule } from '../shared/components/app-autocomplete/app-autocomplete.module';

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
    AppDataPickerModule,
    AppAutocompleteModule
  ],
})
export class ProjectsModule { }
