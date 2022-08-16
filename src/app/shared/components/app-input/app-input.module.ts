import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppInputComponent } from './app-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationPipesModule } from '../../pipes/application-pipes.module';

@NgModule({
  declarations: [
    AppInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ApplicationPipesModule
  ],
  exports: [
    AppInputComponent
  ]
})
export class AppInputModule { }
