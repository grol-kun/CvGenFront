import { Injectable } from '@angular/core';
import { TranslateStorage } from './translate-storage.interface';
import { TranslateMode } from './translate.model';

@Injectable({
  providedIn: 'root'
})
export class TranslateStorageService implements TranslateStorage {
  private storageKey = 'locale';
  constructor() { }

  public set(translateMode: TranslateMode): void {
    localStorage.setItem(this.storageKey, translateMode.toString());
  }
  public get() {
    return <TranslateMode>localStorage.getItem(this.storageKey) || undefined;
  }
}
