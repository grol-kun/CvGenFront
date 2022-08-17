import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AppInputModule } from '../shared/components/app-input/app-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ThemeModule } from '../shared/theme/theme.module';
import { I18nModule } from '../shared/translate/i18n.module';
import { TranslateModule } from '@ngx-translate/core';

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
    I18nModule,
    TranslateModule
  ],
})
export class AuthModule {}
