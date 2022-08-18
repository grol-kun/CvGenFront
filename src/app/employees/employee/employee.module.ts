import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { InfoComponent } from './info/info.component';
import { CvListComponent } from './cv-list/cv-list.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

@NgModule({
  declarations: [EmployeeComponent, InfoComponent, CvListComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    NzTabsModule,
    NzCollapseModule,
  ],
})
export class EmployeeModule {}
