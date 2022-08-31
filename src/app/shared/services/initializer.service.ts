import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { updateMyInfo } from 'src/app/core/store/actions/auth.actions';
import { ThemeService } from '../theme/theme.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class Initializer {
  langs: string[];
  constructor(private themeService: ThemeService, private translateService: TranslateService, private authService: AuthService, private store: Store) {
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      translateService.use(browserLang?.match(/en|ru/) ? browserLang : 'en');
    } else {
      localStorage.setItem('locale', 'en');
      translateService.setDefaultLang('en');
    }
    this.langs = translateService.getLangs();
  }

  initApp() {
    this.themeService.startTheme();
    this.authService.setTokenIfAvailable();
    this.store.dispatch(updateMyInfo());
  }
}
