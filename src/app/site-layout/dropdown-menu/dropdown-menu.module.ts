import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from './dropdown-menu.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [DropdownMenuComponent],
  imports: [CommonModule, NzDropDownModule, NzIconModule, NzButtonModule, NzModalModule],
  exports: [DropdownMenuComponent],
})
export class DropdownMenuModule {}
