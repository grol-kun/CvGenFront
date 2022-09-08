import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CvPreviewComponent } from './cv-preview.component';
import { TranslateControlModule } from 'src/app/shared/translate/translate-control.module';

@NgModule({
  declarations: [CvPreviewComponent],
  imports: [CommonModule, NzIconModule, NzButtonModule, NzModalModule, TranslateControlModule],
  exports: [CvPreviewComponent],
})
export class CvPreviewModule {}
