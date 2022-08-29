import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateMyInfo } from 'src/app/ngRx/actions/auth.actions';
import { ThemeService } from '../theme/theme.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class Initializer {
  constructor(private themeService: ThemeService, private authService: AuthService, private store: Store) {}

  initApp() {
    this.themeService.startTheme();
    this.authService.setTokenIfAvailable();
    this.store.dispatch(updateMyInfo());
  }
}
