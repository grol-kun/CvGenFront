import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { THEME_STORAGE_SERVICE } from './theme-storage.service';
import { ThemeStorage } from './theme-storage.interface';
import { ThemeMode } from './theme.model';

@Injectable()
export class ThemeService {
  private currentTheme: ThemeMode = ThemeMode.LIGHT;
  private themeChangedSubject = new BehaviorSubject(this.currentTheme);
  themeChanged$: Observable<ThemeMode>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(THEME_STORAGE_SERVICE) private themeStorage: ThemeStorage
  ) {
    this.themeChanged$ = this.themeChangedSubject.asObservable();
    this.init();
  }

  private updateCurrentTheme(themeMode: ThemeMode) {
    this.currentTheme = themeMode;
    this.themeChangedSubject.next(this.currentTheme);
    this.themeStorage.set(this.currentTheme);
  }

  private init() {
    const deviceMode = window.matchMedia('(prefers-color-scheme: dark)');
    let initTheme = this.themeStorage.get();
    if (!initTheme) {
      deviceMode.matches ? (initTheme = ThemeMode.DARK) : (initTheme = ThemeMode.LIGHT);
    }
    this.document.body.setAttribute('data-theme', this.currentTheme);
    this.updateCurrentTheme(initTheme);
  }

  startTheme() {
    this.document.body.setAttribute('data-theme', this.currentTheme);
    this.updateCurrentTheme(this.currentTheme);
  }

  toggleTheme() {
    this.currentTheme === ThemeMode.LIGHT
      ? this.document.body.setAttribute('data-theme', ThemeMode.DARK)
      : this.document.body.setAttribute('data-theme', ThemeMode.LIGHT);
    this.updateCurrentTheme(this.currentTheme === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT);
  }

  get isDarkTheme(): boolean {
    return this.currentTheme === ThemeMode.DARK;
  }
}
