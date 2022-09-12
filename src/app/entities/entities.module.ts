import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesComponent } from './entities.component';
import { EntitiesRoutingModule } from './entities-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AppInputModule } from '../shared/components/app-input/app-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationPipesModule } from '../shared/pipes/application-pipes.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { TranslateControlModule } from '../shared/components/translate/translate-control.module';
import { AbilityListComponent } from './ability-list/ability-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AbilityModalComponent } from './ability-list/ability-modal/ability-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [EntitiesComponent, AbilityListComponent, AbilityModalComponent],
  imports: [
    CommonModule,
    EntitiesRoutingModule,
    NzButtonModule,
    AppInputModule,
    ReactiveFormsModule,
    ApplicationPipesModule,
    NzMenuModule,
    NzInputModule,
    NzIconModule,
    NzTableModule,
    NzModalModule,
    NzMessageModule,
    NzPopconfirmModule,
    TranslateControlModule,
  ],
})
export class EntitiesModule {}
