import { Component } from '@angular/core';
import { TranslateControlService } from '../translate-control.service';

@Component({
  selector: 'app-translate-control',
  templateUrl: './translate-control.component.html',
  styleUrls: ['./translate-control.component.scss'],
})
export class TranslateControlComponent {
  langs: string[];
  constructor(public translateControlService: TranslateControlService) {
    this.langs = this.translateControlService.getLanguages();
  }
  changeLang(language: string) {
    this.translateControlService.changeLang(language);
  }
  isLangSelected(language: string) {
    return language == this.translateControlService.getCurrentLanguage();
  }
}
