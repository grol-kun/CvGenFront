import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppProjectsArrayComponent } from './app-projects-array.component';
import { AppAutocompleteModule } from '../app-autocomplete/app-autocomplete.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectCardModule } from '../project-card/project-card.module';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
  declarations: [AppProjectsArrayComponent],
  imports: [
    CommonModule,
    AppAutocompleteModule,
    ReactiveFormsModule,
    ProjectCardModule,
    NzButtonModule,
    NzIconModule,
    NzCollapseModule,
    NzPopconfirmModule,
  ],
  exports: [AppProjectsArrayComponent],
})
export class AppProjectsArrayModule {}
