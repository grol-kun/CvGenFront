import { Injectable } from '@angular/core';
import { TranslateMode } from './translate.model';
import { TranslateService } from '@ngx-translate/core';
import { TranslateStorageService } from './translate-storage.service';
import { FunctionsService } from '../../services/functions.service';
import { en_US, NzI18nInterface, NzI18nService, ru_RU } from 'ng-zorro-antd/i18n';

@Injectable({
  providedIn: 'root',
})
export class TranslateControlService {
  languages: string[];
  nzLocales: NzI18nInterface[] = [en_US, ru_RU];
  constructor(
    private translateService: TranslateService,
    private translateStorageService: TranslateStorageService,
    private functionsService: FunctionsService,
    private nzI18nService: NzI18nService
  ) {
    this.init();
    this.languages = this.translateService.getLangs();
  }

  changeLang(language: string) {
    const mode = this.functionsService.getEnumKeyByValue(TranslateMode, language);
    this.translateStorageService.set(TranslateMode[mode!]);
    this.translateService.use(language);
    const locale = this.nzLocales.find((obj) => {
      return obj.locale === language;
    });
    this.nzI18nService.setLocale(locale!);
  }

  getLanguages() {
    return this.languages;
  }

  getCurrentLanguage() {
    return this.translateStorageService.get();
  }

  init() {
    this.translateService.addLangs([TranslateMode.EN, TranslateMode.RU]);
    if (this.translateStorageService.get()) {
      const browserLang = this.translateStorageService.get();
      this.translateService.use(browserLang?.match(/en|ru/) ? browserLang : 'en');
    } else {
      this.translateStorageService.set(TranslateMode.EN);
      this.translateService.setDefaultLang('en');
    }
    this.languages = this.translateService.getLangs();
  }
}
