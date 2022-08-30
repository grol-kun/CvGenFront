import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ModalComponent } from './modal.component';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, NzDropDownModule, NzIconModule, NzButtonModule, NzModalModule, NzTableModule],
  exports: [ModalComponent],
})
export class ModalModule {}
