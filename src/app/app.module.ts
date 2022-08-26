import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SiteLayoutModule } from './site-layout/site-layout.module';
import { ThemeModule } from './shared/theme/theme.module';
import { ThemeService } from './shared/theme/theme.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Initializer } from './shared/services/initializer.service';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { PrefixHttpInterceptor } from './core/interceptors/prefix-http.interceptor';
import { CookieModule } from 'ngx-cookie';
import { HttpLoaderFactory, TranslateControlModule } from './shared/translate/translate-control.module';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LoaderService } from './shared/services/loader.service';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './ngRx/reducers';
import { AppEffects } from './ngRx/effects/app.effects';
import { tokenReducer } from './ngRx/reducers/auth.reducer';

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
    FormsModule,
    ReactiveFormsModule,
    SiteLayoutModule,
    ThemeModule,
    HttpClientModule,
    CookieModule.withOptions(),
    TranslateControlModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      useDefaultLang: false,
    }),
    EffectsModule.forRoot([AppEffects]),
    /*     StoreModule.forRoot(reducers, {
      metaReducers,
    }), */
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    //StoreModule.forRoot({ authReducer }),
  ],
  providers: [
    ThemeService,
    NzMessageService,
    LoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: (initializer: Initializer) => () => initializer.initApp(),
      deps: [Initializer],
      multi: true,
    },
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PrefixHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
