import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  setItem(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }
}
