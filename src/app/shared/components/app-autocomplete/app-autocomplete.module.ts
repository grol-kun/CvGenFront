import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAutocompleteComponent } from './app-autocomplete.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationPipesModule } from '../../pipes/application-pipes.module';
import { TranslateControlModule } from '../translate/translate-control.module';

@NgModule({
  declarations: [AppAutocompleteComponent],
  imports: [CommonModule, ReactiveFormsModule, NzAutocompleteModule, ApplicationPipesModule, TranslateControlModule],
  exports: [AppAutocompleteComponent],
})
export class AppAutocompleteModule {}
