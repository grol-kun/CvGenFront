import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, NzSpinModule],
  exports: [LoaderComponent],
})
export class LoaderModule {}
