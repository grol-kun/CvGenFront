import { Injectable } from '@angular/core';
import { ThemeService } from '../theme/theme.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class Initializer {
  constructor(public themeService: ThemeService, public authService: AuthService) {}

  initApp() {
    this.themeService.startTheme();
    this.authService.setTokenIfAvailable();
  }
}
