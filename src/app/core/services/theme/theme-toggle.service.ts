import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { StorageService } from './theme-local-storage.service'

export enum ThemeMode {
  DARK,
  LIGHT,
}

@Injectable()
export class ThemeToggleService {
  public theme$ = new BehaviorSubject<ThemeMode>(ThemeMode.LIGHT)
  private readonly THEME_KEY = 'THEME'
  private readonly DARK_THEME_VALUE = 'DARK'
  private readonly LIGHT_THEME_VALUE = 'LIGHT'
  private readonly DARK_THEME_CLASS_NAME = 'theme-dark'
  private readonly LIGHT_THEME_CLASS_NAME = 'theme-light'
  private darkThemeSelected = false

  constructor(private storage: StorageService) {}

  public setThemeOnStart() {
    if (this.isDarkThemeSelected()) {
      this.setDarkTheme()
    } else {
      this.setLightTheme()
    }
    setTimeout(() => {
      document.body.classList.add('theme-animation')
    }, 200)
  }

  public toggle() {
    if (this.darkThemeSelected) {
      this.setLightTheme()
    } else {
      this.setDarkTheme()
    }
  }

  public getTheme(): boolean {
    return this.darkThemeSelected
  }

  public isDarkThemeSelected(): boolean {
    this.darkThemeSelected =
      this.storage.get(this.THEME_KEY) === this.DARK_THEME_VALUE
    return this.darkThemeSelected
  }

  private setLightTheme() {
    this.storage.set(this.THEME_KEY, this.LIGHT_THEME_VALUE)
    document.body.classList.remove(this.DARK_THEME_CLASS_NAME)
    document.body.classList.add(this.LIGHT_THEME_CLASS_NAME)
    this.darkThemeSelected = false
    this.theme$.next(ThemeMode.LIGHT)
  }

  private setDarkTheme() {
    this.storage.set(this.THEME_KEY, this.DARK_THEME_VALUE)
    document.body.classList.remove(this.LIGHT_THEME_CLASS_NAME)
    document.body.classList.add(this.DARK_THEME_CLASS_NAME)
    this.darkThemeSelected = true
    this.theme$.next(ThemeMode.DARK)
  }
}
