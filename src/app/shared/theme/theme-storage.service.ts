import { Injectable, InjectionToken } from '@angular/core';
import { ThemeMode } from './theme.model';
import { ThemeStorage } from './theme-storage.interface';

export const THEME_STORAGE_SERVICE = new InjectionToken<ThemeStorage>('MODE_STORAGE');

@Injectable()
export class ThemeStorageService implements ThemeStorage {
  storageKey = 'theme';
  set(themeMode: ThemeMode): void {
    localStorage.setItem(this.storageKey, themeMode.toString());
  }
  get(): ThemeMode {
    return <ThemeMode>localStorage.getItem(this.storageKey) || undefined;
  }
}
