import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvsComponent } from './cvs.component';
import { CvsRoutingModule } from './cvs-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
@NgModule({
  declarations: [CvsComponent],
  imports: [
    CommonModule,
    CvsRoutingModule,
    ReactiveFormsModule,
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzPopconfirmModule,
  ],
})
export class CvsModule {}
