import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CvModalComponent } from './cv-modal.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TranslateControlModule } from 'src/app/shared/translate/translate-control.module';

@NgModule({
  declarations: [CvModalComponent],
  imports: [CommonModule, NzDropDownModule, NzIconModule, NzButtonModule, NzModalModule, NzTableModule, TranslateControlModule],
  exports: [CvModalComponent],
})
export class CvModalModule {}
