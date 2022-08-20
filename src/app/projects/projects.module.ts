import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { TranslateControlModule } from '../shared/translate/translate-control.module';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { LoaderModule } from '../shared/components/loader/loader.module';

@NgModule({
  declarations: [ProjectsComponent, ProjectInfoComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    NzTableModule,
    LoaderModule,
    TranslateControlModule,
  ],
})
export class ProjectsModule {}
