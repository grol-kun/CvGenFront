import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';



@NgModule({
  declarations: [
    SiteLayoutComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SiteLayoutComponent,
    AuthLayoutComponent
  ]
})
export class CoreModule { }
