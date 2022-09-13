import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteLayoutComponent } from './site-layout.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { RouterModule } from '@angular/router';
import { LoaderModule } from '../shared/components/loader/loader.module';
import { DropdownMenuModule } from './dropdown-menu/dropdown-menu.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { ThemeModule } from '../shared/components/theme/theme.module';
import { TranslateControlModule } from '../shared/components/translate/translate-control.module';

@NgModule({
  imports: [
    CommonModule,
    NzIconModule,
    NzLayoutModule,
    NzListModule,
    NzMenuModule,
    NzPageHeaderModule,
    RouterModule,
    LoaderModule,
    DropdownMenuModule,
    ThemeModule,
    TranslateControlModule,
    BreadcrumbModule,
  ],
  declarations: [SiteLayoutComponent],
  exports: [SiteLayoutComponent],
})
export class SiteLayoutModule {}
