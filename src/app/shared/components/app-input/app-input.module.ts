import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppInputComponent } from './app-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationPipesModule } from '../../pipes/application-pipes.module';
import { TranslateControlModule } from '../../translate/translate-control.module';

@NgModule({
  declarations: [
    AppInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ApplicationPipesModule,
    TranslateControlModule
  ],
  exports: [
    AppInputComponent
  ]
})
export class AppInputModule { }
