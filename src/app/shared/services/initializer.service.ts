import { Injectable } from '@angular/core';
import { ThemeService } from '../components/theme/theme.service';
import { TranslateControlService } from '../components/translate/translate-control.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class Initializer {
  constructor(
    private themeService: ThemeService,
    private translateControlService: TranslateControlService,
    private authService: AuthService
  ) {}

  initApp() {
    this.translateControlService.init();
    this.themeService.startTheme();
    this.authService.setTokenIfAvailable();
    this.authService.updateMyInfoIfAvailable();
  }
}
