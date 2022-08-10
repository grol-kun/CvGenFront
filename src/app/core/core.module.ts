import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { NgZorroAntdModule } from './ng-zorro-antd.module';



@NgModule({
  declarations: [
    SiteLayoutComponent,

  ],
  imports: [
    CommonModule,
    NgZorroAntdModule
  ],
  exports: [
    SiteLayoutComponent,
    NgZorroAntdModule
  ]
})
export class CoreModule { }
