import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvComponent } from './cv.component';
import { CvRoutingModule } from './cv-routing.module';
import { AppInputModule } from 'src/app/shared/components/app-input/app-input.module';
import { AppTextareaModule } from 'src/app/shared/components/app-textarea/app-textarea.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { FormArrayBlockModule } from 'src/app/shared/components/form-array-block/form-array-block.module';
import { TranslateControlModule } from 'src/app/shared/components/translate/translate-control.module';
import { ProjectModalModule } from 'src/app/employees/employee/cv-list/project-modal/project-modal.module';
import { AppProjectsArrayModule } from 'src/app/shared/components/app-projects-array/app-projects-array.module';

@NgModule({
  declarations: [CvComponent],
  imports: [
    CommonModule,
    CvRoutingModule,
    AppInputModule,
    AppTextareaModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCollapseModule,
    FormArrayBlockModule,
    TranslateControlModule,
    ProjectModalModule,
    AppProjectsArrayModule,
  ],
})
export class CvModule {}
