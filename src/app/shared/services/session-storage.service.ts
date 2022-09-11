import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  setItem(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }

  getItem(key: string): any | null {
    const result = sessionStorage.getItem(key);
    if (result) {
      return JSON.parse(result);
    }
    return null;
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
