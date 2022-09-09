import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSelectComponent } from './app-select.component';
import { ApplicationPipesModule } from '../../pipes/application-pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TranslateControlModule } from '../../translate/translate-control.module';

@NgModule({
  declarations: [AppSelectComponent],
  imports: [CommonModule, ReactiveFormsModule, ApplicationPipesModule, NzSelectModule, TranslateControlModule],
  exports: [AppSelectComponent],
})
export class AppSelectModule {}
