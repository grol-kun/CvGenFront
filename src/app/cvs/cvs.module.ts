import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvsComponent } from './cvs.component';
import { CvsRoutingModule } from './cvs-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { TranslateControlModule } from '../shared/components/translate/translate-control.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ApplicationPipesModule } from '../shared/pipes/application-pipes.module';
import { NzInputModule } from 'ng-zorro-antd/input';
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
    TranslateControlModule,
    NzDropDownModule,
    ApplicationPipesModule,
    NzInputModule,
  ],
})
export class CvsModule {}
