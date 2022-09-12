import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateControlModule } from 'src/app/shared/translate/translate-control.module';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [CommonModule, NzBreadCrumbModule, RouterModule, NzIconModule, TranslateControlModule],
  exports: [BreadcrumbComponent],
})
export class BreadcrumbModule {}
