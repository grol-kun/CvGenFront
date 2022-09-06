import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { TranslateControlModule } from '../shared/translate/translate-control.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ApplicationPipesModule } from '../shared/pipes/application-pipes.module';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzDropDownModule,
    ApplicationPipesModule,
    NzInputModule,
    TranslateControlModule,
  ],
})
export class ProjectsModule {}
