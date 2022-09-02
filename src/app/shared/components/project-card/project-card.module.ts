import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from './project-card.component';
import { AppAutocompleteModule } from '../app-autocomplete/app-autocomplete.module';
import { AppInputModule } from '../app-input/app-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AppSelectModule } from '../app-select/app-select.module';
import { AppDataPickerModule } from '../app-data-picker/app-data-picker.module';
import { AppTextareaModule } from '../app-textarea/app-textarea.module';

@NgModule({
  declarations: [ProjectCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppInputModule,
    AppAutocompleteModule,
    AppSelectModule,
    NzIconModule,
    AppDataPickerModule,
    AppTextareaModule,
  ],
  exports: [ProjectCardComponent],
})
export class ProjectCardModule {}
