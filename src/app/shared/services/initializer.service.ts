import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateMyInfo } from 'src/app/core/store/actions/auth.actions';
import { ThemeService } from '../theme/theme.service';
import { TranslateControlService } from '../translate/translate-control.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class Initializer {
  constructor(
    private themeService: ThemeService,
    private translateControlService: TranslateControlService,
    private authService: AuthService,
    private store: Store
  ) {}

  initApp() {
    this.translateControlService.init();
    this.themeService.startTheme();
    this.authService.setTokenIfAvailable();
    if (this.authService.getTokenFromCookies()) {
      this.store.dispatch(updateMyInfo());
    }
  }
}
