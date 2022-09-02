import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectModalComponent } from './project-modal.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [ProjectModalComponent],
  imports: [CommonModule, NzDropDownModule, NzIconModule, NzButtonModule, NzModalModule, NzTableModule],
  exports: [ProjectModalComponent],
})
export class ProjectModalModule {}
