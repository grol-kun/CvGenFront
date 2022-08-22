import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSelectComponent } from './app-select.component';
import { ApplicationPipesModule } from '../../pipes/application-pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';

@NgModule({
  declarations: [AppSelectComponent],
  imports: [CommonModule, ReactiveFormsModule, ApplicationPipesModule, NzCascaderModule],
  exports: [AppSelectComponent],
})
export class AppSelectModule {}
