import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nComponent } from './i18n/i18n.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

@NgModule({
  declarations: [I18nComponent],
  imports: [
    CommonModule,
    NzDropDownModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
      extend: true,
    }),
  ],
  providers: [TranslateStore],
  exports: [I18nComponent, TranslateModule],
})
export class I18nModule {
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
