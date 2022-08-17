import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { CoreModule } from './core/core.module';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SiteLayoutModule } from './site-layout/site-layout.module';
import { ThemeModule } from './shared/theme/theme.module';
import { ThemeService } from './shared/theme/theme.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterseptor } from './core/interceptors/token.interseptor';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthInterseptor } from './core/interceptors/auth.interseptor';
import { CookieService } from './shared/services/cookie.service';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    SiteLayoutModule,
    ThemeModule,
    HttpClientModule
  ],
  providers: [
    ThemeService,
    NzMessageService,
    CookieService,
    {
      provide: APP_INITIALIZER,
      useFactory: (themeService: ThemeService) => () => themeService.startTheme(),
      deps: [ThemeService],
      multi: true,
    },
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterseptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterseptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
