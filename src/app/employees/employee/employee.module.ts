import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { InfoComponent } from './info/info.component';
import { CvListComponent } from './cv-list/cv-list.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AppInputModule } from 'src/app/shared/components/app-input/app-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationPipesModule } from 'src/app/shared/pipes/application-pipes.module';
import { AppAutocompleteModule } from 'src/app/shared/components/app-autocomplete/app-autocomplete.module';
import { FormArrayBlockModule } from 'src/app/shared/components/form-array-block/form-array-block.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@NgModule({
  declarations: [EmployeeComponent, InfoComponent, CvListComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    NzTabsModule,
    NzCollapseModule,
    NzButtonModule,
    AppInputModule,
    ReactiveFormsModule,
    ApplicationPipesModule,
    AppAutocompleteModule,
    FormArrayBlockModule,
    NzMenuModule,
  ],
})
export class EmployeeModule {}
