import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArrayBlockComponent } from './form-array-block.component';
import { AppAutocompleteModule } from '../app-autocomplete/app-autocomplete.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputBlockModule } from '../input-block/input-block.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateControlModule } from '../translate/translate-control.module';

@NgModule({
  declarations: [FormArrayBlockComponent],
  imports: [
    CommonModule,
    AppAutocompleteModule,
    ReactiveFormsModule,
    InputBlockModule,
    NzButtonModule,
    NzIconModule,
    TranslateControlModule,
  ],
  exports: [FormArrayBlockComponent],
})
export class FormArrayBlockModule {}
