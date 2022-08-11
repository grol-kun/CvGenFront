import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SiteLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzLayoutModule,
    NzListModule,
    NzMenuModule,
    NzPageHeaderModule,
  ],
  exports: [SiteLayoutComponent],
})
export class CoreModule {}
