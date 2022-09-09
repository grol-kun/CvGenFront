import { Injectable } from '@angular/core';
import { TranslateMode } from './translate.model';
import { TranslateService } from '@ngx-translate/core';
import { TranslateStorageService } from './translate-storage.service';
import { FunctionsService } from '../services/functions.service';

@Injectable({
  providedIn: 'root',
})
export class TranslateControlService {
  languages: string[];
  constructor(
    private translateService: TranslateService,
    private translateStorageService: TranslateStorageService,
    private functionsService: FunctionsService
  ) {
    this.init();
    this.languages = this.translateService.getLangs();
  }

  changeLang(language: string) {
    const mode = this.functionsService.getEnumKeyByValue(TranslateMode, language);
    this.translateStorageService.set(TranslateMode[mode!]);
    this.translateService.use(language);
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
