import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvsComponent } from './cvs.component';
import { CvsRoutingModule } from './cvs-routing.module';



@NgModule({
  declarations: [
    CvsComponent
  ],
  imports: [
    CommonModule,
    CvsRoutingModule
  ]
})
export class CvsModule { }
