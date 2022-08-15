import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppInputComponent } from './app-input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppInputComponent
  ],
  exports: [
    AppInputComponent
  ]
})
export class AppInputModule { }
