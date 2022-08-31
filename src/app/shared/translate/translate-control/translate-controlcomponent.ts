import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translate-control',
  templateUrl: './translate-control.component.html',
  styleUrls: ['./translate-control.component.scss'],
})
export class TranslateControlComponent {
  langs: string[];
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    this.langs = translate.getLangs();
  }
  changeLang(language: string) {
    localStorage.setItem('locale', language);
    this.translate.use(language);
  }
}
