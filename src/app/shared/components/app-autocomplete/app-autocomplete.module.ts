import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAutocompleteComponent } from './app-autocomplete.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppAutocompleteComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzAutocompleteModule
  ],
  exports: [
    AppAutocompleteComponent
  ]
})
export class AppAutocompleteModule { }
