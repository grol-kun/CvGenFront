import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteLayoutComponent } from './site-layout.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { RouterModule } from '@angular/router';
import { LoaderModule } from '../shared/components/loader/loader.module';
import { TranslateControlModule } from '../shared/translate/translate-control.module';
import { ThemeModule } from '../shared/theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzLayoutModule,
    NzListModule,
    NzMenuModule,
    NzPageHeaderModule,
    RouterModule,
    LoaderModule,
    TranslateControlModule,
    ThemeModule
  ],
  declarations: [SiteLayoutComponent],
  exports: [SiteLayoutComponent],
})
export class SiteLayoutModule {}
