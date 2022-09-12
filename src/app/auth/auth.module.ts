import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AppInputModule } from '../shared/components/app-input/app-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ThemeModule } from '../shared/components/theme/theme.module';
import { TranslateControlModule } from '../shared/components/translate/translate-control.module';
import { LoaderModule } from '../shared/components/loader/loader.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AppInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    ThemeModule,
    TranslateControlModule,
    LoaderModule,
  ],
})
export class AuthModule {}
