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
  constructor(private translate: TranslateService, private storage: TranslateStorageService, private functions: FunctionsService) {
    this.init();
    this.languages = this.translate.getLangs();
  }

  changeLang(language: string) {
    const mode = this.functions.getEnumKeyByValue(TranslateMode, language);
    this.storage.set(TranslateMode[mode!]);
    this.translate.use(language);
  }

  getLanguages() {
    return this.languages;
  }

  init(){
    this.translate.addLangs([TranslateMode.EN, TranslateMode.RU]);
    if (this.storage.get()) {
      const browserLang = this.storage.get();
      this.translate.use(browserLang?.match(/en|ru/) ? browserLang : 'en');
    } else {
      this.storage.set(TranslateMode.EN);
      this.translate.setDefaultLang('en');
    }
    this.languages = this.translate.getLangs();
    this.translate.use('en');
  }
}
