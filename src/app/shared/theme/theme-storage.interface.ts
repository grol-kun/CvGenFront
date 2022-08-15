import { ThemeMode } from './theme.model';

export interface ThemeStorage {
  set(themeMode: ThemeMode): void;
  get(): ThemeMode;
}
