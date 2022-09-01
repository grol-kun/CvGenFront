import { Component } from '@angular/core';
import { TranslateControlService } from '../translate-control.service';
import { TranslateMode } from '../translate.model';

@Component({
  selector: 'app-translate-control',
  templateUrl: './translate-control.component.html',
  styleUrls: ['./translate-control.component.scss'],
})
export class TranslateControlComponent {
  langs: string[];
  constructor(public translate: TranslateControlService) {
    this.langs = this.translate.getLanguages();
  }
  changeLang(language: string) {
    this.translate.changeLang(language);
  }
}
