import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTextareaComponent } from './app-textarea.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ApplicationPipesModule } from '../../pipes/application-pipes.module';
import { TranslateControlModule } from '../../translate/translate-control.module';

@NgModule({
  declarations: [
    AppTextareaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    ApplicationPipesModule,
    TranslateControlModule
  ],
  exports: [
    AppTextareaComponent
  ]
})
export class AppTextareaModule { }
