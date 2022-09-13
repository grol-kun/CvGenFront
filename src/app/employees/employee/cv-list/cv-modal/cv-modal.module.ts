import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CvModalComponent } from './cv-modal.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TranslateControlModule } from 'src/app/shared/components/translate/translate-control.module';
import { ApplicationPipesModule } from 'src/app/shared/pipes/application-pipes.module';

@NgModule({
  declarations: [CvModalComponent],
  imports: [
    CommonModule,
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzTableModule,
    TranslateControlModule,
    ApplicationPipesModule,
  ],
  exports: [CvModalComponent],
})
export class CvModalModule {}
