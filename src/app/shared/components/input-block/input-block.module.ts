import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputBlockComponent } from './input-block.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppInputModule } from '../app-input/app-input.module';
import { AppAutocompleteModule } from '../app-autocomplete/app-autocomplete.module';
import { AppSelectModule } from '../app-select/app-select.module';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [InputBlockComponent],
  imports: [CommonModule, ReactiveFormsModule, AppInputModule, AppAutocompleteModule, AppSelectModule, NzIconModule],
  exports: [InputBlockComponent],
})
export class InputBlockModule {}
