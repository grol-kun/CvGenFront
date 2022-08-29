import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppInputComponent } from './app-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationPipesModule } from '../../pipes/application-pipes.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [AppInputComponent],
  imports: [CommonModule, ReactiveFormsModule, ApplicationPipesModule, NzInputModule, NzIconModule],
  exports: [AppInputComponent],
})
export class AppInputModule {}
